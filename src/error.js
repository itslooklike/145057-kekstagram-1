const errorText = (arg) => `
  Неизвестная команда '${arg}'.
  Чтобы прочитать правила использования приложения, наберите "--help"
`;

module.exports = {
  name: `error`,
  description: `Показывает информацию о неверном аргументе`,
  execute(arg) {
    console.error(errorText(arg));
  },
};
