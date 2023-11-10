import {OptionsUrlencoded} from 'body-parser';

export const expressDotUrlEncodedOptions: OptionsUrlencoded | undefined = {
    extended: true,
    inflate: true,
    limit: '100kb',
    parameterLimit: 1000,
    type: 'application/x-www-form-urlencoded',
    verify: undefined,
};