/**
 * Project wide configuration.
 */
export interface Config {
    /** GraphQL options */
    graphql: {
        /** Whether or not to generate a schema */
        generateSchema?: boolean;
        /** Whether or not to enable the playground */
        enablePlayground?: boolean;
    };
}
