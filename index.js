require(`colors`);
const version = require(`./src/version`);
const error = require(`./src/error`);
const noParams = require(`./src/no-params`);
const help = require(`./src/help`);
const author = require(`./src/author`);
const license = require(`./src/license`);
const description = require(`./src/description`);
const server = require(`./src/server`);

const commands = [version, help, author, license, description, server];

const isCommandExist = (arg) => commands.find((item) => item.name === arg);

const onWrongParam = (param) => {
  error.execute(param);
  process.exit(1);
};

const checkUserParam = (arg, rest) => {
  if (arg) {
    const command = isCommandExist(arg.replace(`--`, ``));

    if (command) {
      command.execute(rest[0]);
    } else {
      onWrongParam(arg);
    }

    return;
  }

  noParams.execute();
};

const [, , userArgument, ...rest] = process.argv;

checkUserParam(userArgument, rest);
