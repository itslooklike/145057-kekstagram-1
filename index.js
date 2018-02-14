const version = require(`./src/version`);
const error = require(`./src/error`);
const noParams = require(`./src/no-params`);
const help = require(`./src/help`);
const author = require(`./src/author`);
const license = require(`./src/license`);
const description = require(`./src/description`);

const userArgument = process.argv.slice(2)[0];

const argumentsMap = {
  "--version": () => version.execute(),
  "--help": () => help.execute(),
  "--author": () => author.execute(),
  "--license": () => license.execute(),
  "--description": () => description.execute(),
};

const onWrongParam = () => {
  error.execute(userArgument);
  process.exit(1);
};

const checkUserParam = (arg) => {
  if (arg && argumentsMap[arg]) {
    argumentsMap[arg]();
    return;
  }

  if (arg) {
    onWrongParam(arg);
    return;
  }

  noParams.execute();
};

checkUserParam(userArgument);
