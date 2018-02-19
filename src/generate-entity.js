const getRandomElement = require(`./utils/getRandomElement`);
const getRandomValue = require(`./utils/getRandomValue`);
const getUniqFromArray = require(`./utils/getUniqFromArray`);

const urls = [
  `https://picsum.photos/600/?random`,
  `https://picsum.photos/600/?random`,
  `https://picsum.photos/600/?random`,
  `https://picsum.photos/600/?random`,
  `https://picsum.photos/600/?random`,
  `https://picsum.photos/600/?random`,
  `https://picsum.photos/600/?random`,
  `https://picsum.photos/600/?random`,
  `https://picsum.photos/600/?random`,
  `https://picsum.photos/600/?random`,
];

const effects = [`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`];

const hashtags = [
  `#лайк`,
  `#шер`,
  `#репост`,
  `#блокчейн`,
  `#такси`,
  `#реакт`,
  `#убер`,
  `#хайп`,
  `#смузи`,
  `#вейп`,
  `#стартап`,
  `#крипта`,
  `#биткоин`,
  `#барбер`,
  `#жижа`,
];

const descriptions = [
  `Губерниев в шоке от новости про мельдоний Крушельницкого`,
  `Керлингист Крушельницкий не в курсе сообщений о мельдонии в его допинг-пробе`,
  `Российского призера Олимпийских игр в Пхенчхане подозревают в использовании допинга`,
  `Первый вице-президент федерации керлинга назвал провокацией обвинения Крушельницкого`,
  `Российского керлингиста Крушельницкого заподозрили в употреблении допинга`,
  `Что известно о положительной допинг-пробе «агента 007» Крушельницкого`,
  `Созин заявил, что в пробе Крушельницкого нет мельдония`,
  `Губерниев не сдержался от нецензурных выражений после сообщения МОК`,
  `Андрей Созин: у МОК есть желание дискредитировать Россию`,
  `У керлингиста Крушельницкого обнаружили следы мельдония`,
  `В употреблении запрещенного препарата заподозрили бронзового призера Пхенчанга`,
  `Россия попалась на допинге на Олимпиаде-2018 в Пхенчхане (Обозреватель)`,
  `«Это смешно»: в Федерации керлинга усомнились в применении Крушельницким мельдония`,
];

const comments = [
  [
    `Ученые рассказали, какой будет встреча с пришельцами`,
    `Учёные: Новость о существовании внеземных цивилизаций оказала бы позитивный эффект`,
    `Ученые предположили человеческую реакцию на встречу с пришельцами`,
    `Как люди отреагируют на встречу с инопланетянами, сообщили ученые`,
    `Ученые рассказали о наиболее вероятной реакции людей на существование пришельцев`,
    `Специалисты сообщили о вероятной реакции людей на встречу с пришельцами`,
    `Американские ученые объяснили, почему земляне обрадуются встрече с инопланетянами`,
  ],
  [
    `В допинг-тесте керлингиста Крушельницкого обнаружили следы мельдония`,
    `Губерниев в шоке от новости про мельдоний Крушельницкого`,
    `Керлингист Крушельницкий не в курсе сообщений о мельдонии в его допинг-пробе`,
    `Чтобы показать заказчику эскизы, нужно где-то найти тексты и картинки.  Рыбу.`,
    `Рыбу можно вставлять, использовать, вешать, заливать, показывать, запихивать...`,
    `Словом, с ней делают что угодно, лишь бы эскиз был максимально похож на готовую работу.`,
    `Как правило, ни того, ни другого в момент показа эскизов у дизайнера нету.`,
  ],
];

const generate = () => ({
  url: getRandomElement(urls),
  scale: getRandomValue(1, 10),
  effect: getRandomElement(effects),
  hashtags: getUniqFromArray(hashtags, getRandomValue(0, 5)),
  description: getRandomElement(descriptions),
  likes: getRandomValue(0, 1000),
  comments: getRandomElement(comments),
});

const generateEntity = () => generate();

module.exports = generateEntity;

// Пример сгенерированных данных
// const generateEntityExample = {
//   url: `https://picsum.photos/600/?random`,
//   scale: 2,
//   effect: `chrome`,
//   hashtags: [`#лакшери`, `#потрясно`, `#лав`],
//   description: `фотка просто космос!!`,
//   likes: 342,
//   comments: [
//     `хорошо отдохнули?`,
//     `а еще фотки будут?`,
//     `выглядишь потрясно!!!`,
//   ],
// };
