const fs = require("fs");
const path = require("path");

const packageJsonPath = path.join(__dirname, "package.json");
const readmePath = path.join(__dirname, "README.md");

// Read package.json
const packageJson = require(packageJsonPath);

// Increase the patch version (third digit)
const versionParts = packageJson.version.split(".");
let newPatchVersion = parseInt(versionParts[2]) + 1;
let newMinorVersion = versionParts[1];

if (newPatchVersion > 100) {
  newPatchVersion = 0;
  newMinorVersion = parseInt(versionParts[1]) + 1;
}

versionParts[1] = newMinorVersion.toString();
versionParts[2] = newPatchVersion.toString();
const newVersion = versionParts.join(".");

// Update package.json version
packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

// Update README badge and release information
const newReleaseDate = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const readmeContent = fs.readFileSync(readmePath, "utf-8");
const updatedReadmeContent = readmeContent
  .replace(
    /Version of Repo.*$/m,
    `Version of Repo](https://img.shields.io/badge/Version-${newVersion}-success)`
  )
  .replace(
    /We released version [\d.]+ on [\w\s,]+ \d{4}/,
    `We released version ${newVersion} on ${newReleaseDate}`
  );

// Write the updated content back to the README file
fs.writeFileSync(readmePath, updatedReadmeContent, "utf-8");

console.log(`Version and badge updated to ${newVersion} on ${newReleaseDate}.`);
