const version = require(`./src/version`);
const error = require(`./src/error`);
const noParams = require(`./src/no-params`);
const help = require(`./src/help`);
const author = require(`./src/author`);
const license = require(`./src/license`);
const description = require(`./src/description`);

const commands = [version, help, author, license, description];

const isCommandExist = (arg) => commands.find((item) => item.name === arg);

const onWrongParam = (param) => {
  error.execute(param);
  process.exit(1);
};

const checkUserParam = (arg) => {
  if (arg) {
    const command = isCommandExist(arg.replace(`--`, ``));

    if (command) {
      command.execute();
      return;
    } else {
      onWrongParam(arg);
      return;
    }
  }

  noParams.execute();
};

const [, , userArgument] = process.argv;

checkUserParam(userArgument);
