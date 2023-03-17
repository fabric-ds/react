import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { compile } from '@formatjs/cli-lib';
import {
  fileName,
  findI18nEnabledPackages,
  rootDir,
} from './findI18nEnabledPackages.js';
import { supportedLocales } from './constants.js';

const packagesWithI18nEnabled = findI18nEnabledPackages(rootDir, fileName);

function compileLocaleFiles(packages: string[]) {
  const pathsToInvestigate = packages.map((pkg) =>
    join(process.cwd(), 'packages', pkg),
  );

  pathsToInvestigate.forEach((pkg, i) => {
    supportedLocales.map(async (locale) => {
      const fileToCompile = `${pkg}/locale/${locale}.json`;
      const compiledOutput = await compile([fileToCompile], { ast: true });
      const compiledFolder = join(pathsToInvestigate[i], 'locale', 'compiled');

      if (!existsSync(compiledFolder)) {
        mkdirSync(compiledFolder);
      }
      writeFileSync(`${compiledFolder}/${locale}.json`, compiledOutput);
    });
  });
}

compileLocaleFiles(packagesWithI18nEnabled);
