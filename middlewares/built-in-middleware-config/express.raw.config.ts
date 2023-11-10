import {Options} from 'body-parser';

export const expressDotRawOptions: Options | undefined = {
    inflate: true,
    limit: '100kb',
    type: 'application/octet-stream',
    verify: undefined,
};