import * as fs from 'fs';
export declare function fileDelete(relativeFilePath: string): boolean;
export declare const unlinkAsync: typeof fs.unlink.__promisify__;
export declare function deleteFileSafe(relativePath: string): Promise<boolean>;
