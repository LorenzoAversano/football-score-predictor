const getRandomNumber = require('./index');

test('It should return an interger', () => {
    const number = getRandomNumber();
    expect(number). toBeGreaterThanOrEqual(0);
    expect(number). toBeLessThanOrEqual(100);
});