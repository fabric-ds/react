import { readdirSync, statSync } from 'fs';
import { join, dirname, resolve, basename } from 'path';

// Define the root directory to start the search
export const rootDir = resolve(process.cwd(), 'packages');

// Define the name of the file to search for
export const fileName = 'i18n.ts';

// Define a function to recursively search for the file
export function findI18nEnabledPackages(dir: string, fileName: string) {
  // Define an array to hold the names of the folders that contain the file
  const folders: string[] = [];

  // Get an array of all files and directories in the current directory
  const files = readdirSync(dir);

  // Loop through each file and directory
  for (const file of files) {
    // Construct the full path to the file or directory
    const filePath = join(dir, file);

    // Check if the current item is a directory
    if (statSync(filePath).isDirectory()) {
      // Recursively search the directory
      folders.push(...findI18nEnabledPackages(filePath, fileName));
    } else if (file === fileName) {
      // If the current item is the file we're looking for, add its parent directory to the list
      const folderPath = dirname(filePath);
      const secondToLastSection = basename(dirname(folderPath));
      folders.push(secondToLastSection);
    }
  }

  return folders;
}
