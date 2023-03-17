import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { extract } from '@formatjs/cli-lib';
import {
  fileName,
  findI18nEnabledPackages,
  rootDir,
} from './findI18nEnabledPackages.js';

const packagesWithI18nEnabled = findI18nEnabledPackages(rootDir, fileName);

function extractLocaleFiles(packages: string[]) {
  const pathsToInvestigate = packages.map((pkg) =>
    join(process.cwd(), 'packages', pkg),
  );

  pathsToInvestigate.forEach(async (pkg, i) => {
    const files = [`${pkg}/src/${fileName}`];
    const content = await extract(files, {});
    const localeFolder = join(pathsToInvestigate[i], 'locale');

    if (!existsSync(localeFolder)) {
      mkdirSync(localeFolder);
    }

    writeFileSync(`${localeFolder}/en.json`, content);
  });
}

extractLocaleFiles(packagesWithI18nEnabled);
