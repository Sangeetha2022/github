#!/usr/bin/env ts-node
import { Command } from 'commander';
import { prompt } from 'inquirer';
import { shared_features } from './commandmodel';
import { listSharedFeatures, findSharedFeature, updateSharedFeature, initializeSharedFeature, removeSharedFeature, initializeAllSharedFeature } from './services';

const program = new Command();

program.version('1.0.0').alias('v').description('Client Management System')

// // Add Command
// program
//     .command('add')
//     .alias('a')
//     .description('Add a sharedfeature')
//     .action(() => {
//         prompt(questions).then(answers => addSharedFeature(answers));
//     });

// initialize Command
program
    .command('initialize <name>')
    .alias('i')
    .description('Add a sharedfeature')
    .action((name) => {
        // prompt(questions).then(answers => addSharedFeature(answers));
        initializeSharedFeature(name);
    });

// initialize all Command
program
.command('init <name> features')
.alias('iA')
.description('init all sharedfeatures')
.action((name) => {
    // prompt(questions).then(answers => addSharedFeature(answers));
    initializeAllSharedFeature(name, (callback) => {
        console.log(callback)
    });
});

// List Command
program
    .command('list')
    .alias('l')
    .description('List all sharedfeatures')
    .action(() => listSharedFeatures());


// Find Command
program
    .command('find <name>')
    .alias('f')
    .description('Find a sharedfeature')
    .action(name => findSharedFeature(name));

// Update Command
program
    .command('update <_id>')
    .alias('u')
    .description('Update a sharedfeature')
    .action(_id => {
        prompt(shared_features).then(answers => updateSharedFeature(_id, answers));
    });

// Remove Command
program
.command('delete <name>')
.alias('d')
.description('Remove a sharedfeature')
.action(name => removeSharedFeature(name));


program.parse(process.argv);
