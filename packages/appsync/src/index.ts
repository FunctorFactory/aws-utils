import * as SDK from "@aws-sdk/client-appsync";
import * as SmithyClient from "@functorfactory/smithy-client";

export namespace AppSync {
    export class AppSyncClient extends SmithyClient.Tag(
        "AppSync",
        SDK.AppSyncClient
    )<AppSyncClient>() {}

    export const associateApi = AppSyncClient.command(SDK.AssociateApiCommand);
    export const associateMergedGraphqlApi = AppSyncClient.command(
        SDK.AssociateMergedGraphqlApiCommand
    );
    export const associateSourceGraphqlApi = AppSyncClient.command(
        SDK.AssociateSourceGraphqlApiCommand
    );
    export const createApiCache = AppSyncClient.command(
        SDK.CreateApiCacheCommand
    );
    export const createApiKey = AppSyncClient.command(SDK.CreateApiKeyCommand);
    export const createDataSource = AppSyncClient.command(
        SDK.CreateDataSourceCommand
    );
    export const createDomainName = AppSyncClient.command(
        SDK.CreateDomainNameCommand
    );
    export const createFunction = AppSyncClient.command(
        SDK.CreateFunctionCommand
    );
    export const createGraphqlApi = AppSyncClient.command(
        SDK.CreateGraphqlApiCommand
    );
    export const createResolver = AppSyncClient.command(
        SDK.CreateResolverCommand
    );
    export const createType = AppSyncClient.command(SDK.CreateTypeCommand);
    export const deleteApiCache = AppSyncClient.command(
        SDK.DeleteApiCacheCommand
    );
    export const deleteApiKey = AppSyncClient.command(SDK.DeleteApiKeyCommand);
    export const deleteDataSource = AppSyncClient.command(
        SDK.DeleteDataSourceCommand
    );
    export const deleteDomainName = AppSyncClient.command(
        SDK.DeleteDomainNameCommand
    );
    export const deleteFunction = AppSyncClient.command(
        SDK.DeleteFunctionCommand
    );
    export const deleteGraphqlApi = AppSyncClient.command(
        SDK.DeleteGraphqlApiCommand
    );
    export const deleteResolver = AppSyncClient.command(
        SDK.DeleteResolverCommand
    );
    export const deleteType = AppSyncClient.command(SDK.DeleteTypeCommand);
    export const disassociateApi = AppSyncClient.command(
        SDK.DisassociateApiCommand
    );
    export const disassociateMergedGraphqlApi = AppSyncClient.command(
        SDK.DisassociateMergedGraphqlApiCommand
    );
    export const disassociateSourceGraphqlApi = AppSyncClient.command(
        SDK.DisassociateSourceGraphqlApiCommand
    );
    export const evaluateCode = AppSyncClient.command(SDK.EvaluateCodeCommand);
    export const evaluateMappingTemplate = AppSyncClient.command(
        SDK.EvaluateMappingTemplateCommand
    );
    export const flushApiCache = AppSyncClient.command(
        SDK.FlushApiCacheCommand
    );
    export const getApiAssociation = AppSyncClient.command(
        SDK.GetApiAssociationCommand
    );
    export const getApiCache = AppSyncClient.command(SDK.GetApiCacheCommand);
    export const getDataSource = AppSyncClient.command(
        SDK.GetDataSourceCommand
    );
    export const getDataSourceIntrospection = AppSyncClient.command(
        SDK.GetDataSourceIntrospectionCommand
    );
    export const getDomainName = AppSyncClient.command(
        SDK.GetDomainNameCommand
    );
    export const getFunction = AppSyncClient.command(SDK.GetFunctionCommand);
    export const getGraphqlApi = AppSyncClient.command(
        SDK.GetGraphqlApiCommand
    );
    export const getGraphqlApiEnvironmentVariables = AppSyncClient.command(
        SDK.GetGraphqlApiEnvironmentVariablesCommand
    );
    export const getIntrospectionSchema = AppSyncClient.command(
        SDK.GetIntrospectionSchemaCommand
    );
    export const getResolver = AppSyncClient.command(SDK.GetResolverCommand);
    export const getSchemaCreationStatus = AppSyncClient.command(
        SDK.GetSchemaCreationStatusCommand
    );
    export const getSourceApiAssociation = AppSyncClient.command(
        SDK.GetSourceApiAssociationCommand
    );
    export const getType = AppSyncClient.command(SDK.GetTypeCommand);
    export const listApiKeys = AppSyncClient.command(SDK.ListApiKeysCommand);
    export const listDataSources = AppSyncClient.command(
        SDK.ListDataSourcesCommand
    );
    export const listDomainNames = AppSyncClient.command(
        SDK.ListDomainNamesCommand
    );
    export const listFunctions = AppSyncClient.command(
        SDK.ListFunctionsCommand
    );
    export const listGraphqlApis = AppSyncClient.command(
        SDK.ListGraphqlApisCommand
    );
    export const listResolversByFunction = AppSyncClient.command(
        SDK.ListResolversByFunctionCommand
    );
    export const listResolvers = AppSyncClient.command(
        SDK.ListResolversCommand
    );
    export const listSourceApiAssociations = AppSyncClient.command(
        SDK.ListSourceApiAssociationsCommand
    );
    export const listTagsForResource = AppSyncClient.command(
        SDK.ListTagsForResourceCommand
    );
    export const listTypesByAssociation = AppSyncClient.command(
        SDK.ListTypesByAssociationCommand
    );
    export const listTypes = AppSyncClient.command(SDK.ListTypesCommand);
    export const putGraphqlApiEnvironmentVariables = AppSyncClient.command(
        SDK.PutGraphqlApiEnvironmentVariablesCommand
    );
    export const startDataSourceIntrospection = AppSyncClient.command(
        SDK.StartDataSourceIntrospectionCommand
    );
    export const startSchemaCreation = AppSyncClient.command(
        SDK.StartSchemaCreationCommand
    );
    export const startSchemaMerge = AppSyncClient.command(
        SDK.StartSchemaMergeCommand
    );
    export const tagResource = AppSyncClient.command(SDK.TagResourceCommand);
    export const untagResource = AppSyncClient.command(
        SDK.UntagResourceCommand
    );
    export const updateApiCache = AppSyncClient.command(
        SDK.UpdateApiCacheCommand
    );
    export const updateApiKey = AppSyncClient.command(SDK.UpdateApiKeyCommand);
    export const updateDataSource = AppSyncClient.command(
        SDK.UpdateDataSourceCommand
    );
    export const updateDomainName = AppSyncClient.command(
        SDK.UpdateDomainNameCommand
    );
    export const updateFunction = AppSyncClient.command(
        SDK.UpdateFunctionCommand
    );
    export const updateGraphqlApi = AppSyncClient.command(
        SDK.UpdateGraphqlApiCommand
    );
    export const updateResolver = AppSyncClient.command(
        SDK.UpdateResolverCommand
    );
    export const updateSourceApiAssociation = AppSyncClient.command(
        SDK.UpdateSourceApiAssociationCommand
    );
    export const updateType = AppSyncClient.command(SDK.UpdateTypeCommand);
}
