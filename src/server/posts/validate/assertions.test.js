const assert = require(`assert`);

const {
  isArrOfStringsContainFirstSymbol,
  isArrOfStringsContainSymbol,
  isStringInArrTooLong,
} = require(`./assertions`);

describe(`Проверка асёрт функции isArrOfStringsContainSymbol`, () => {
  it(`стандартный кейс`, () => {
    const case1 = [`#блокчейн`, `#хайп`, `#смузи`, `#биткоин`];
    assert(isArrOfStringsContainSymbol(case1, ` `));
  });

  it(`содержит ошибку`, () => {
    const case1 = [` #блокчейн`, `#хайп`, `#смузи`];
    const case2 = [`#блокчейн`, `#ха йп`, `#смузи`];
    const case3 = [`#блокчейн`, `#хайп`, `#смузи `];
    const case4 = [` #блокчейн`];
    assert.ifError(isArrOfStringsContainSymbol(case1, ` `));
    assert.ifError(isArrOfStringsContainSymbol(case2, ` `));
    assert.ifError(isArrOfStringsContainSymbol(case3, ` `));
    assert.ifError(isArrOfStringsContainSymbol(case4, ` `));
  });

  it(`пустые данные`, () => {
    const case1 = [];
    assert(isArrOfStringsContainSymbol(case1, ` `));
  });
});

describe(`Проверка асёрт функции isArrOfStringsContainFirstSymbol`, () => {
  it(`стандартный кейс`, () => {
    const case1 = [`#блокчейн`, `#хайп`, `#смузи`, `#биткоин`];
    assert(isArrOfStringsContainFirstSymbol(case1, `#`));
  });

  it(`содержит ошибку`, () => {
    const case1 = [`блокчейн`, `#хайп`, `#смузи`];
    const case2 = [`#блокчейн`, `хайп`, `#смузи`];
    const case3 = [`#блокчейн`, `#хайп`, `смузи`];
    const case4 = [`блокчейн`, `хайп`, `смузи`];
    const case5 = [`блокчейн`];
    assert.ifError(isArrOfStringsContainFirstSymbol(case1, `#`));
    assert.ifError(isArrOfStringsContainFirstSymbol(case2, `#`));
    assert.ifError(isArrOfStringsContainFirstSymbol(case3, `#`));
    assert.ifError(isArrOfStringsContainFirstSymbol(case4, `#`));
    assert.ifError(isArrOfStringsContainFirstSymbol(case5, `#`));
  });

  it(`пустые данные`, () => {
    const case1 = [];
    assert(isArrOfStringsContainFirstSymbol(case1, `#`));
  });
});

describe(`Проверка асёрт функции isStringInArrTooLong`, () => {
  it(`стандартный кейс`, () => {
    const case1 = [`привет`];
    assert(isStringInArrTooLong(case1, 40));
  });

  it(`содержит ошибку`, () => {
    const case1 = [`я хочу передать тебе большой привет!`];
    assert.ifError(isStringInArrTooLong(case1, 10));
  });

  it(`пустые данные`, () => {
    const case1 = [``];
    assert(isStringInArrTooLong(case1, 10));
  });
});
