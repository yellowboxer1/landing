import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert the file URL to a file path
const __filename = fileURLToPath(import.meta.url);
// Get the directory name
const __dirname = path.dirname(__filename);

// Define the source and destination directories
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const destinationBasePath = path.resolve(__dirname, 'src/assets/libs');

// Load the package configuration file
const configPath = path.resolve(__dirname, 'package-libs-config.json');
let packagesToCopy = [];

try {
    const configContent = fs.readFileSync(configPath, 'utf-8');
    const config = JSON.parse(configContent);
    packagesToCopy = config.packagesToCopy || [];
} catch (err) {
    console.error('Error reading package-libs-config.json:', err);
}

// Function to copy a package
async function copyPackage(packageName) {
    const sourcePath = (fs.existsSync(path.join(__dirname, 'node_modules', packageName + "/dist"))) ?
        path.join(__dirname, 'node_modules', packageName + "/dist")
        : path.join(__dirname, 'node_modules', packageName);

    // Check if the source path exists
    if (!fs.existsSync(sourcePath)) {
        console.error(`Source path does not exist for package: ${packageName}`);
        return;
    }

    const destinationPath = path.join(destinationBasePath, packageName);

    try {
        // Ensure the destination directory exists
        await fs.ensureDir(destinationPath);
        // Copy the package from node_modules to the destination
        await fs.copy(sourcePath, destinationPath);
        console.log(`Copied ${packageName} successfully.`);
    } catch (err) {
        console.error(`Error copying ${packageName}:`, err);
    }
}

// Copy all specified packages
async function copyAllPackages() {
    for (const packageName of packagesToCopy) {
        await copyPackage(packageName);
    }
}

// Execute the copy function
copyAllPackages().then(() => {
    console.log('All packages copied successfully.');
}).catch(err => {
    console.error('Error during package copying:', err);
});