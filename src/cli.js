require(`colors`);
const version = require(`./cli/version`);
const error = require(`./cli/error`);
const noParams = require(`./cli/no-params`);
const help = require(`./cli/help`);
const author = require(`./cli/author`);
const license = require(`./cli/license`);
const description = require(`./cli/description`);
const server = require(`./server/server`);

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
