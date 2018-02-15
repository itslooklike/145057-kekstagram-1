const version = require(`./src/version`);
const error = require(`./src/error`);
const noParams = require(`./src/no-params`);
const help = require(`./src/help`);
const author = require(`./src/author`);
const license = require(`./src/license`);
const description = require(`./src/description`);

const argumentsMap = {
  [`--${version.name}`]: () => version.execute(),
  [`--${help.name}`]: () => help.execute(),
  [`--${author.name}`]: () => author.execute(),
  [`--${license.name}`]: () => license.execute(),
  [`--${description.name}`]: () => description.execute(),
};

const onWrongParam = (param) => {
  error.execute(param);
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

const userArgument = process.argv.slice(2)[0];

checkUserParam(userArgument);
