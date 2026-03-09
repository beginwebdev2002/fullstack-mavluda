// infrastructure/utils/file-system.util.ts
import * as fs from 'fs';
import { join } from 'path';

export function fileDelete(relativeFilePath: string): boolean {
  try {
    const absolutePath = join(process.cwd(), relativeFilePath);
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }
    return true;
  } catch (err) {
    console.error(`Error deleting file ${relativeFilePath}:`, err);
    return false;
  }
}
