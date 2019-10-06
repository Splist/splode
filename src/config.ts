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

    /** Json Web Token options */
    jwt: {
        /**
         * The secret used to sign tokens
         * MUST KEEP SECRET AT ALL COSTS
         * ANYONE WITH THIS STRING CAN FORGE FAKE TOKENS AND LOG IN AS ANYONE
         */
        secret: string;
    };
}
