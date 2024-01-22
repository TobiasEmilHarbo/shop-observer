import { pathsToModuleNameMapper } from 'ts-jest';
import tsconfig from './tsconfig.json';

const rootDir = '<rootDir>/';

const aliasMap: { [key: string]: Array<string> } =
	tsconfig.compilerOptions.paths;

Object.keys(aliasMap).forEach((alias) => {
	aliasMap[alias] = aliasMap[alias].map((path) => `${rootDir}${path}`);
});

export default {
	preset: 'jest-preset-angular',
	setupFilesAfterEnv: [`${rootDir}setup-jest.ts`],
	moduleNameMapper: pathsToModuleNameMapper(aliasMap),
};
