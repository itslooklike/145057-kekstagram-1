const userArgs = process.argv.slice(2);

const helpText = `
  Доступные команды:
  --help    — печатает этот текст;
  --version — печатает версию приложения;
`;

const noParamsText = `
  Привет пользователь!
  Эта программа будет запускать сервер «Кекстаграм».

  Автор: Кекс.
`;

const errorText = arg => `
  Неизвестная команда ${arg}.
  Чтобы прочитать правила использования приложения, наберите "--help"
`;

switch (userArgs[0]) {
  case `--version`:
    console.log(process.version);
    break;
  case `--help`:
    console.log(helpText);
    break;
  case void 0:
    console.log(noParamsText);
    break;
  default:
    console.error(errorText(userArgs[0]));
    process.exit(1);
    break;
}
