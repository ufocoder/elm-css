#!/usr/bin/env node
//@flow

const elmCss = require("../"),
  program = require("commander"),
  chalk = require("chalk"),
  path = require("path"),
  pkg = require("../package.json");

program
  .version(pkg.version)
  .usage("PATH # path to your Stylesheets.elm file")
  .option(
    "-o, --output [outputDir]",
    "(optional) directory in which to write CSS files. Defaults to build/",
    path.join(process.cwd(), "build")
  )
  .option("-m, --pathToMake [pathToMake]", "(optional) path to elm-make")
  .parse(process.argv);

elmCss(process.cwd(), program.output, program.pathToMake)
  .then(function(results) {
    console.log(
      chalk.green(
        "Successfully generated output! The following css files were created: "
      )
    );
    results.forEach(function(result) {
      console.log(chalk.blue("- " + result.filename));
    });
  })
  .catch(function(error) {
    console.error(chalk.red(error));
    process.exit(1);
  });
