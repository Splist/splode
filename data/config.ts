import { Config } from '../src/config';

export const config: Config = {
    graphql: {
        generateSchema: true,
        enablePlayground: true
    },
    jwt: {
        secret: 'You should probably change this'
    }
};
