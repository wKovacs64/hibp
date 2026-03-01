import { writeFileSync } from "node:fs";
import path from "pathe";
import packageJson from "../package.json" with { type: "json" };

const content = `// This file is auto-generated. Do not edit.
export const PACKAGE_NAME = ${JSON.stringify(packageJson.name)};
export const PACKAGE_VERSION = ${JSON.stringify(packageJson.version)};
`;

const outPath = path.resolve("./src/api/haveibeenpwned/package-info.ts");
writeFileSync(outPath, content);
