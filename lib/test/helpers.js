function argList(args) {
  return args.map(arg => JSON.stringify(arg)).join(', ');
}

function execute(fn, ...args) {
  const description = `${fn.name}(${argList(args)})`;
  const returnValue = fn.call(null, ...args);

  return {
    description,
    returnValue
  };
}

function itExpects(execution) {
  return {
    toEqual: (expectedValue) => {
      return describe(execution.description, () => {
        it(`=> "${expectedValue}"`, () => expect(execution.returnValue).toEqual(expectedValue));
      });
    }
  };
}

module.exports = {
  execute,
  itExpects
};
