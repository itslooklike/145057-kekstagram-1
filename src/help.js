const manualMap = {
  "--help": `печатает этот текст`,
  "--version": `печатает версию приложения`,
  "--description": `показывает описание проекта`,
  "--author": `показывает автора`,
  "--license": `показывает лицензию проекта`,
};

const getMaxWordLength = (list) => {
  let maxWordLength = 0;

  for (const item in list) {
    if (list.hasOwnProperty(item) && item.length > maxWordLength) {
      maxWordLength = item.length;
    }
  }

  return maxWordLength;
};

const generateManual = (list) => {
  const maxWordLength = getMaxWordLength(list);
  let manualList = ``;

  Object.keys(list).forEach((item) => {
    const pad = maxWordLength - item.length;

    manualList += `${item.gray}${` `.repeat(pad)} - ${list[item].green}\n`;
  });

  return manualList;
};

const helpText = `
Доступные команды:
${generateManual(manualMap)}
`;

module.exports = {
  name: `help`,
  description: `Показывает помощь`,
  execute() {
    console.log(helpText);
  },
};
