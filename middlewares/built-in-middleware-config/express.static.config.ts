import {ServeStaticOptions} from 'serve-static';
import {Response} from 'express-serve-static-core';

export const expressDotStaticOptions: ServeStaticOptions<Response<any, Record<string, any>>> = {
    dotfiles: 'ignore',
    etag: true,
    extensions: ['html', 'htm'],
    fallthrough: true,
    immutable: false,
    index: 'index.html',
    lastModified: true,
    maxAge: 0,
    redirect: true,
    setHeaders: function (res: Response<any, Record<string, any>>, path: string, stat: any) {
        
    }
  }