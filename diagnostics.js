const fs = require("fs");
const path = require("path");

function validatePackageJson() {
    try {
        const packagePath = path.join(__dirname, "package.json");
        const packageContent = fs.readFileSync(packagePath, "utf8");
        const packageJson = JSON.parse(packageContent);

        console.log("✓ package.json is valid JSON");

        // Check required fields
        const requiredFields = [
            "name",
            "displayName",
            "version",
            "engines",
            "activationEvents",
            "main",
        ];
        const missingFields = requiredFields.filter(
            (field) => !packageJson[field],
        );

        if (missingFields.length) {
            console.error(
                `✗ Missing required fields in package.json: ${missingFields.join(
                    ", ",
                )}`,
            );
        } else {
            console.log("✓ All required fields present in package.json");
        }

        // Check if main file exists
        if (packageJson.main) {
            const mainPath = path.join(__dirname, packageJson.main);
            if (!fs.existsSync(mainPath)) {
                console.error(`✗ Main file not found: ${mainPath}`);
            } else {
                console.log(`✓ Main file exists: ${packageJson.main}`);
            }
        }

        return packageJson;
    } catch (error) {
        console.error("✗ Error validating package.json:", error.message);
        return null;
    }
}

function checkSyntaxDefinitions(packageJson) {
    if (
        !packageJson ||
        !packageJson.contributes ||
        !packageJson.contributes.languages
    ) {
        console.error("✗ No language contributions found in package.json");
        return;
    }

    for (const lang of packageJson.contributes.languages) {
        if (lang.configuration) {
            const configPath = path.join(__dirname, lang.configuration);
            if (!fs.existsSync(configPath)) {
                console.error(
                    `✗ Language configuration file not found: ${lang.configuration}`,
                );
            } else {
                console.log(
                    `✓ Language configuration file exists: ${lang.configuration}`,
                );
            }
        }
    }

    if (packageJson.contributes.grammars) {
        for (const grammar of packageJson.contributes.grammars) {
            if (grammar.path) {
                const grammarPath = path.join(__dirname, grammar.path);
                if (!fs.existsSync(grammarPath)) {
                    console.error(`✗ Grammar file not found: ${grammar.path}`);
                } else {
                    console.log(`✓ Grammar file exists: ${grammar.path}`);
                }
            }
        }
    }
}

console.log("Running VS Code extension diagnostics...");
const packageJson = validatePackageJson();
if (packageJson) {
    checkSyntaxDefinitions(packageJson);
}
console.log("Diagnostics complete.");
