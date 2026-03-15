// infrastructure/utils/file-system.util.ts
import * as fs from 'fs';
import { join } from 'path';
import { promisify } from 'util';

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

export const unlinkAsync = promisify(fs.unlink);

export async function deleteFileSafe(relativePath: string): Promise<boolean> {
  if (!relativePath) return false;

  try {
    const absolutePath = join(process.cwd(), relativePath);

    // await fs.access(absolutePath);
    await unlinkAsync(absolutePath);
    return true;
  } catch (_) {
    return false;
  }
}
