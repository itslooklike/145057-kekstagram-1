const errorText = (arg) => `
  Неизвестная команда '${arg.red}'.
  Чтобы прочитать правила использования приложения, наберите "${`--help`.green}"
`;

module.exports = {
  name: `error`,
  description: `Показывает информацию о неверном аргументе`,
  execute(arg) {
    console.error(errorText(arg));
  },
};
