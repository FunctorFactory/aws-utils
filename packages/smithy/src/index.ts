import {
    Client,
    ServiceException,
    SmithyResolvedConfiguration,
} from "@smithy/smithy-client";
import { Command, MetadataBearer } from "@smithy/types";
import { Context, Effect, Layer, Scope } from "effect";
import { UnknownException } from "effect/Cause";

export interface Tag<
    in out Id,
    in out Ctor extends new (...args: any) => Client<any, any, any, any>
> extends Context.Tag<Id, InstanceType<Ctor>> {}

export interface TagClass<
    Self,
    Id,
    Ctor extends new (...args: any) => Client<any, any, any, any>,
    HandlerOptions = InstanceType<Ctor> extends Client<
        infer H,
        any,
        any,
        any
    >
        ? H
        : never,
    ClientInput extends object = InstanceType<Ctor> extends Client<
        any,
        infer I,
        any,
        any
    >
        ? I
        : never,
    ClientOutput extends MetadataBearer = InstanceType<Ctor> extends Client<
        any,
        any,
        infer O,
        any
    >
        ? O
        : never,
    ResolvedClientConfiguration extends SmithyResolvedConfiguration<HandlerOptions> = InstanceType<Ctor> extends Client<
        any,
        any,
        any,
        infer R
    >
        ? R
        : never
> extends Context.TagClass<Self, Id, InstanceType<Ctor>> {
    readonly make: (
        ...args: ConstructorParameters<Ctor>
    ) => Effect.Effect<Self, never, Scope.Scope>;

    readonly layer: (
        ...args: ConstructorParameters<Ctor>
    ) => Layer.Layer<Self, never, Scope.Scope>;

    readonly command: <
        CmdCtor extends new (...args: any) => Command<ClientInput, any, ClientOutput, any, ResolvedClientConfiguration>,
        InputType extends ClientInput = InstanceType<CmdCtor> extends Command<any, infer I, any, any, any> ? I : never,
        OutputType extends ClientOutput = InstanceType<CmdCtor> extends Command<any, any, any, infer O, any> ? O : never
    >(
        ctor: CmdCtor,
    ) => (
        input: InputType
    ) => Effect.Effect<OutputType, ServiceException | UnknownException, Self>;
}

export const make =
    <Ctor extends new (...args: any) => Client<any, any, any, any>>(
        ctor: Ctor
    ) =>
    (...args: ConstructorParameters<Ctor>) => {
        const getInstance = () => new ctor(...args) as InstanceType<Ctor>;

        const acquire = Effect.sync(getInstance);

        const release = (instance: InstanceType<Ctor>) =>
            Effect.sync(() => instance.destroy());

        return Effect.acquireRelease(acquire, release);
    };

export const layer =
    <
        Self,
        Id,
        Ctor extends new (...args: any) => Client<any, any, any, any>
    >(
        tag: Context.TagClass<Self, Id, InstanceType<Ctor>>,
        ctor: Ctor
    ) =>
    (
        ...args: ConstructorParameters<Ctor>
    ): Layer.Layer<Self, never, Scope.Scope> =>
        Layer.effect(tag, make(ctor)(...args));

export const command = <
        Service extends TagClass<any, any, any>,
        Ctor extends new (...args: any) => Client<any, any, any, any> = Service extends TagClass<any, any, infer C> ? C : never,
    HandlerOptions = InstanceType<Ctor> extends Client<
        infer H,
        any,
        any,
        any
    >
        ? H
        : never,
    ClientInput extends object = InstanceType<Ctor> extends Client<
        any,
        infer I,
        any,
        any
    >
        ? I
        : never,
    ClientOutput extends MetadataBearer = InstanceType<Ctor> extends Client<
        any,
        any,
        infer O,
        any
    >
        ? O
        : never,
    ResolvedClientConfiguration extends SmithyResolvedConfiguration<HandlerOptions> = InstanceType<Ctor> extends Client<
        any,
        any,
        any,
        infer R
    >
        ? R
    : never
    >(service: Service) => <
        CmdCtor extends new (...args: any) => Command<ClientInput, any, ClientOutput, any, ResolvedClientConfiguration>,
        InputType extends ClientInput = InstanceType<CmdCtor> extends Command<any, infer I, any, any, any> ? I : never,
        OutputType extends ClientOutput = InstanceType<CmdCtor> extends Command<any, any, any, infer O, any> ? O : never
    >(
        ctor: CmdCtor
    ) => (
        input: InputType
    ): Effect.Effect<OutputType, ServiceException | UnknownException, Service> => Effect.gen(function* () {
        const client: InstanceType<Ctor> = yield* service;
        const cmd = new ctor(input) as InstanceType<CmdCtor>;

        return yield* Effect.tryPromise({
            try: () => client.send(cmd),
            catch: (err) => {
                if (err instanceof ServiceException) {
                    return err;
                } else {
                    return new UnknownException(err);
                }
            },
        });
    })


export const Tag =
    <
        const Id extends string,
        Ctor extends new (...args: any) => Client<any, any, any, any>
    >(
        id: Id,
        ctor: Ctor
    ) =>
    <Self>(): TagClass<Self, Id, Ctor> => {
        const TagClass = Context.Tag(id)<Self, InstanceType<Ctor>>();
        const parent = Object.getPrototypeOf(TagClass);
        const proto: TagClass<Self, Id, Ctor> = {
            ...parent,
            make: make(ctor),
            layer: layer(TagClass, ctor),
            command: command(TagClass as any),
        };

        Object.setPrototypeOf(TagClass, proto);
        return TagClass as any;
    };

export type * as SmithyClient from '@smithy/smithy-client';
export type * as SmithyTypes from '@smithy/types';
