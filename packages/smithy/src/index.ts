import { Client } from "@smithy/smithy-client";
import { Context, Effect, Layer, Scope } from "effect";

export interface SmithyShape<
    Ctor extends new (...args: any) => Client<any, any, any, any>
> {
    acquireClient: Effect.Effect<InstanceType<Ctor>, never, Scope.Scope>;
    useClient: <A, E, R>(
        use: (client: InstanceType<Ctor>) => Effect.Effect<A, E, R>
    ) => Effect.Effect<A, E, R>;
}

export const make = <
    Ctor extends new (...args: any) => Client<any, any, any, any>
>(
    ctor: Ctor,
    ...args: ConstructorParameters<Ctor>
): SmithyShape<Ctor> => {
    const acquire = Effect.sync(() => new ctor(...args) as InstanceType<Ctor>);
    const release = (client: InstanceType<Ctor>) =>
        Effect.sync(() => client.destroy());

    return {
        acquireClient: Effect.acquireRelease(acquire, release),
        useClient: (use) => Effect.acquireUseRelease(acquire, use, release),
    };
};

export interface Tag<
    in out Id,
    in out Ctor extends new (...args: any) => Client<any, any, any, any>
> extends Context.Tag<Id, SmithyShape<Ctor>> {}

export interface TagClass<
    Self,
    Id,
    Ctor extends new (...args: any) => Client<any, any, any, any>
> extends Context.TagClass<Self, Id, SmithyShape<Ctor>> {
    new: (...args: ConstructorParameters<Ctor>) => Context.TagClassShape<Id, SmithyShape<Ctor>>
    provideService: {
        <A, E, R>(
            self: Effect.Effect<A, E, R>,
            ...args: ConstructorParameters<Ctor>
        ): Effect.Effect<A, E, Exclude<R, Self>>;
        (...args: ConstructorParameters<Ctor>): <A, E, R>(
            self: Effect.Effect<A, E, R>
        ) => Effect.Effect<A, E, Exclude<R, Self>>;
    };
    layer: {
        (...args: ConstructorParameters<Ctor>): Layer.Layer<Self>;
    };
}

export const provideService = <
    Self,
    Id,
    Ctor extends new (...args: any) => Client<any, any, any, any>
>(
    tag: Tag<Self, Ctor>,
    ctor: Ctor
): TagClass<Self, Id, Ctor>["provideService"] => {
    const f = <A, E, R>(
        self: Effect.Effect<A, E, R>,
        ...args: ConstructorParameters<Ctor>
    ): Effect.Effect<A, E, Exclude<R, Self>> => {
        return Effect.provideService(self, tag, make(ctor, ...args));
    };

    return ((...args: any[]) => {
        if (Effect.isEffect(args[0])) {
            const self = args[0] as Effect.Effect<any, any, any>;
            const rest = args.slice(1) as ConstructorParameters<Ctor>;
            return f(self, ...rest);
        } else {
            const rest = args as ConstructorParameters<Ctor>;
            return (self: Effect.Effect<any>) => f(self, ...rest);
        }
    }) as any;
};

export const layer = <
    Self,
    Id,
    Ctor extends new (...args: any) => Client<any, any, any, any>
>(
    tag: Tag<Self, Ctor>,
    ctor: Ctor
): TagClass<Self, Id, Ctor>["layer"] => (
    ...args
) => Layer.succeed(
    tag,
    make(ctor, ...args),
);

export const Tag =
    <
        const Id extends string,
        Ctor extends new (...args: any) => Client<any, any, any, any>
    >(
        id: Id,
        ctor: Ctor
    ) =>
    <Self>(): TagClass<Self, Id, Ctor> => {
        const TagClass = Context.Tag(id)<Self, SmithyShape<Ctor>>();
        const parent = Object.getPrototypeOf(TagClass);
        const proto: TagClass<Self, Id, Ctor> = {
            ...parent,
            provideService: provideService(TagClass, ctor),
            layer: layer(TagClass, ctor),
        }

        Object.setPrototypeOf(TagClass, proto);
        return TagClass as any;
    };
