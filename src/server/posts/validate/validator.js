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
    validate(val) {
      const errors = [];

      if (!val.mimetype.startsWith(`image/`)) {
        errors.push(
            errorType(`filename`, val.mimetype, `должно быть картинкой`)
        );
      }

      return errors;
    },
  },
  scale: {
    required: true,
    validate(val) {
      const errors = [];

      if (!numberInRange(val, 0, 100)) {
        errors.push(errorType(`scale`, val, `число, в пределах от 0 до 100`));
      }

      return errors;
    },
  },
  effect: {
    required: true,
    validate(val) {
      const errors = [];

      if (effectsName.indexOf(val) === -1) {
        errors.push(
            errorType(
                `description`,
                val,
                `поле должно содержать одно из значение: ${effectsName}`
            )
        );
      }

      return errors;
    },
  },
  hashtags: {
    required: false,
    validate(val) {
      const errors = [];

      if (val.length > 5) {
        errors.push(errorType(`hashtags`, val, `не более 5 элементов`));
      }

      if (!isArrOfStringsContainFirstSymbol(val, `#`)) {
        errors.push(
            errorType(`hashtags`, val, `каждая строка начинается с символа '#'`)
        );
      }

      if (isArrOfStringsContainSymbol(val, ` `)) {
        errors.push(
            errorType(`hashtags`, val, `должно содержать одно слово без пробелов`)
        );
      }

      if (!isArrayUnique(val)) {
        errors.push(errorType(`hashtags`, val, `слова не должны повторяться`));
      }

      if (isStringInArrTooLong(val, 20)) {
        errors.push(
            errorType(
                `hashtags`,
                val,
                `длина одного слова не превышает 20 символов`
            )
        );
      }

      return errors;
    },
  },
  description: {
    required: false,
    validate(val) {
      const errors = [];

      if (val.length > 140) {
        errors.push(
            errorType(`description`, val, `строка — не более 140 символов`)
        );
      }

      return errors;
    },
  },
};

const validator = (obj) => {
  const errors = [];

  Object.keys(schema).forEach((item) => {
    if (obj[item]) {
      const err = schema[item].validate(obj[item]);

      if (err.length > 0) {
        errors.push(...err);
      }
    } else if (schema[item].required) {
      errors.push(
          errorType(item, obj[item], `Поле ${item} является обязательным`)
      );
    }
  });

  return errors;
};

module.exports = validator;
