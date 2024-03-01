#! /usr/bin/env bun

import { write as BunWrite } from 'bun';
import path from 'path';
import log from 'colored-terminal'
import { mkdir } from "node:fs/promises";

// Function to create files
async function createFiles(basePath: string, files: string[]) {
    for (const file of files) {
        const filePath = path.join(basePath, file);
        await BunWrite(filePath, ''); 
        log.info(`${filePath} created.`)
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
                log.error('Error parsing --structure argument: '+ err);
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
            await mkdir(dirname, { recursive: true })
            log.info(`${dirname} created.`)
        } catch (err) {
            log.error('Error creating directory: '+ err);
        }

        try {
            await createFiles(dirname, [basename]);
        } catch (err) {
            log.error('Error creating file: '+ err);
            continue;
        }
    }

    if (structure) {
        for (const basePath in structure) {
            const dirs = structure[basePath];
            await mkdir(basePath, { recursive: true });
            log.info(`${basePath} created.`)
    
            for (const dir of dirs) {
                const dirPath = path.join(basePath, dir);
                await mkdir(dirPath, { recursive: true });
                log.info(`${dirPath} created.`)
            }
        }
    }

    log.success('Files and directories created successfully!');
}

main().catch(err => {
    log.error('An error occurred: '+ err);
    process.exit(1);
});