const {isArrayUnique, numberInRange} = require(`../../../utils/assertions`);
const {
  effectsName,
  isArrOfStringsContainSymbol,
  isArrOfStringsContainFirstSymbol,
  isStringInArrTooLong,
} = require(`./assertions`);

const errorType = (name, value, message) => ({
  fieldName: name,
  fieldValue: value,
  errorMessage: message,
});

const schema = {
  filename: {
    required: true,
    validate(val, errors) {
      if (!val.mimetype.startsWith(`image/`)) {
        errors.push(
            errorType(`filename`, val.mimetype, `должно быть картинкой`)
        );
      }
    },
  },
  scale: {
    required: true,
    validate(val, errors) {
      if (!numberInRange(val, 0, 100)) {
        errors.push(errorType(`scale`, val, `число, в пределах от 0 до 100`));
      }
    },
  },
  effect: {
    required: true,
    validate(val, errors) {
      if (effectsName.indexOf(val) === -1) {
        errors.push(
            errorType(
                `description`,
                val,
                `поле должно содержать одно из значение: ${effectsName}`
            )
        );
      }
    },
  },
  hashtags: {
    required: false,
    validate(val, errors) {
      if (val.length > 5) {
        errors.push(errorType(`hashtags`, val, `не более 5 элементов`));
      }

      if (!isArrOfStringsContainFirstSymbol(val, `#`)) {
        errors.push(
            errorType(`hashtags`, val, `каждая строка начинается с символа '#'`)
        );
      }

      if (!isArrOfStringsContainSymbol(val, ` `)) {
        errors.push(
            errorType(`hashtags`, val, `должно содержать одно слово без пробелов`)
        );
      }

      if (!isArrayUnique(val)) {
        errors.push(errorType(`hashtags`, val, `слова не должны повторяться`));
      }

      if (!isStringInArrTooLong(val, 20)) {
        errors.push(
            errorType(
                `hashtags`,
                val,
                `длина одного слова не превышает 20 символов`
            )
        );
      }
    },
  },
  description: {
    required: false,
    validate(val, errors) {
      if (val.length > 140) {
        errors.push(
            errorType(`description`, val, `строка — не более 140 символов`)
        );
      }
    },
  },
};

const validator = (obj) => {
  const errors = [];

  for (const i in schema) {
    if (schema.hasOwnProperty(i)) {
      if (obj[i]) {
        schema[i].validate(obj[i], errors);
      } else if (schema[i].required) {
        errors.push(errorType(i, obj[i], `Поле ${i} является обязательным`));
      }
    }
  }

  return errors;
};

module.exports = validator;
