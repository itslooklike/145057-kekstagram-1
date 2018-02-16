const helpText = `
  Доступные команды:
  --help        — печатает этот текст;
  --version     — печатает версию приложения;
  --description — показывает описание проекта;
  --author      — показывает автора;
  --license     — показывает лицензию проекта;
`;

module.exports = {
  name: `help`,
  description: `Показывает помощь`,
  execute() {
    console.log(helpText);
  },
};
