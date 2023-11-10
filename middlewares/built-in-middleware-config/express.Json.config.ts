import {OptionsJson} from 'body-parser';

export const expressDotJsonOptions: OptionsJson = {
    inflate: true,
    limit: '100kb',
    reviver: undefined, // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#Example.3A_Using_the_reviver_parameter
    strict: true,
    type: 'application/json',
    verify: undefined,
};