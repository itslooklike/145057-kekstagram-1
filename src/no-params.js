const noParamsText = `
  Привет пользователь!
  Эта программа будет запускать сервер «Кекстаграм».

  Автор: Кекс.
`;

module.exports = {
  name: `no-params`,
  description: `Показывает информацию, если не было аргументов`,
  execute() {
    console.log(noParamsText);
  },
};
