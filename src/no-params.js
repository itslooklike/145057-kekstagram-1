const readline = require(`readline`);
const fs = require(`fs`);
const path = require(`path`);
const writeFileSyncWithDirs = require(`./utils/writeFileSyncWithDirs`);
const generateEntity = require(`./generate-entity`);

const helloText = `
  Привет пользователь!
`;

const checkPositiveAnswer = (answer) =>
  [`yes`, `y`, `да`, `д`].indexOf(answer) > -1;

module.exports = {
  name: `no-params`,
  description: `Показывает информацию, если не было аргументов`,
  execute() {
    console.log(helloText);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const writeToFile = (amount, name) => {
      const generatedData = [];
      const url = path.normalize(__dirname + `/../build/${name}.json`);

      Array.from({length: amount}).forEach(() =>
        generatedData.push(generateEntity())
      );

      writeFileSyncWithDirs(url, JSON.stringify(generatedData, null, 2));
      rl.close();
    };

    const wantRegenerateData = (amount, name) =>
      rl.question(`Файл уже есть, перезаписать его (yes / no)? `, (answer) => {
        if (checkPositiveAnswer(answer)) {
          writeToFile(amount, name);
        } else {
          console.log(`отказались переписывать файл`);
        }
        rl.close();
      });

    const amountDataGenerate = (amount) =>
      rl.question(`Укажите название файла `, (name) => {
        if (
          fs.existsSync(path.normalize(__dirname + `/../build/${name}.json`))
        ) {
          wantRegenerateData(amount, name);
        } else {
          writeToFile(amount, name);
        }
      });

    const wantGenerateData = () =>
      rl.question(`Сколько нужно данных? `, (amount) => {
        if (parseInt(amount, 10)) {
          amountDataGenerate(amount);
        } else {
          console.log(`что-то не то ввели, должны быть цифры`);
          rl.close();
        }
      });

    rl.question(`Хочешь сгенерировать данные (yes / no)? `, (answer) => {
      if (checkPositiveAnswer(answer)) {
        wantGenerateData();
      } else {
        console.log(`вы отказались создавать файл`);
        rl.close();
      }
    });
  },
};
