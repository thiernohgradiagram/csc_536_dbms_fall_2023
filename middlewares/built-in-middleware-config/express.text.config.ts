import {OptionsText} from 'body-parser';

export const expressDotTextOptions: OptionsText | undefined = {
    defaultCharset: 'utf-8',
    inflate: true,
    limit: '100kb',
    type: 'text/plain',
    verify: undefined
};