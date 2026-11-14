// Points every manifest at one @getaktar/cli version.
// Usage: node .github/bump.mjs <version>   (prints "unchanged" when already there)
import { readFileSync, writeFileSync } from "node:fs";

const version = process.argv[2];
if (!/^\d+\.\d+\.\d+$/.test(version ?? "")) {
  console.error(`Unexpected version: '${version}'`);
  process.exit(1);
}

const pinned = /@getaktar\/cli@\d+\.\d+\.\d+/g;
const pin = `@getaktar/cli@${version}`;

// Files that run the server, and manifests that carry the plugin's version.
const runsServer = [".mcp.json", "gemini-extension.json", "README.md"];
const hasVersion = [".claude-plugin/plugin.json", ".cursor-plugin/plugin.json", "gemini-extension.json"];

let changed = false;
const update = (file, edit) => {
  const before = readFileSync(file, "utf8");
  const after = edit(before);
  if (after !== before) {
    writeFileSync(file, after);
    changed = true;
  }
};

for (const file of runsServer) {
  update(file, (text) => {
    if (text.search(pinned) === -1) throw new Error(`${file} has no @getaktar/cli@<version> to update`);
    return text.replace(pinned, pin);
  });
}
for (const file of hasVersion) {
  update(file, (text) => text.replace(/^(  "version": )"\d+\.\d+\.\d+"/m, `$1"${version}"`));
}

console.log(changed ? `updated to ${version}` : "unchanged");
