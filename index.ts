#! /usr/bin/env bun

import { file as BunFile, write as BunWrite } from 'bun';
import path from 'path';

// Function to create directory structure recursively
async function createDirectoryStructure(basePath: string, dirs: any) {
    for (const dir of dirs) {
        const dirPath = path.join(basePath, dir);
        await BunWrite(dirPath, ''); // In Bun, writing to a directory path creates the directory
    }
}

// Function to create files
async function createFiles(basePath: string, files: string[]) {
    for (const file of files) {
        const filePath = path.join(basePath, file);
        await BunWrite(filePath, ''); // Writing an empty string to create the file
    }
}

// Function to parse command line arguments
function parseArgs() {
    const args = Bun.argv.slice(2);
    const paths = [];
    let structure = null;

    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--structure') {
            try {
                structure = JSON.parse(args[i + 1]);
                i++; // skip the next argument as it's already parsed
            } catch (err) {
                console.error('Error parsing --structure argument:', err);
                process.exit(1);
            }
        } else {
            paths.push(args[i]);
        }
    }

    return { paths, structure };
}

// Main function
async function main() {
    const { paths, structure } = parseArgs();

    for (const p of paths) {
        const dirname = path.dirname(p);
        const basename = path.basename(p);

        try {
            await BunWrite(dirname, ''); // In Bun, writing to a directory path creates the directory
        } catch (err) {
            console.error('Error creating directory:', err);
        }

        try {
            await createFiles(dirname, [basename]);
        } catch (err) {
            console.error('Error creating file:', err);
            continue;
        }
    }

    if (structure) {
        for (const basePath in structure) {
            const dirs = structure[basePath];
            await createDirectoryStructure(basePath, dirs);
        }
    }

    console.log('Files and directories created successfully!');
}

main().catch(err => {
    console.error('An error occurred:', err);
    process.exit(1);
});