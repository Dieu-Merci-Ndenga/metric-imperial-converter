const { assert } = require('chai');
const convertHandler = require('../controllers/convertHandler');

describe('convertHandler unit tests', () => {
  it('should correctly read a whole number input', () => {
    assert.strictEqual(convertHandler('10L').initNum, 10);
  });

  it('should correctly read a decimal number input', () => {
    assert.strictEqual(convertHandler('2.5L').initNum, 2.5);
  });

  it('should correctly read a fractional input', () => {
    assert.strictEqual(convertHandler('1/2L').initNum, 0.5);
  });

  it('should correctly read a fractional input with a decimal', () => {
    assert.strictEqual(convertHandler('2.5/2L').initNum, 1.25);
  });

  it('should correctly return an error on a double-fraction', () => {
    assert.deepEqual(convertHandler('3/2/3L'), { error: 'invalid number' });
  });

  it('should default to a numerical input of 1 when none is provided', () => {
    assert.strictEqual(convertHandler('kg').initNum, 1);
  });

  ['gal', 'L', 'mi', 'km', 'lbs', 'kg'].forEach((unit) => {
    it(`should correctly read the ${unit} input unit`, () => {
      const expectedUnit = unit === 'L' ? 'L' : unit.toLowerCase();
      assert.strictEqual(convertHandler(`1${unit}`).initUnit, expectedUnit);
    });
  });

  it('should correctly return an error for an invalid input unit', () => {
    assert.deepEqual(convertHandler('1g'), { error: 'invalid unit' });
  });

  it('should correctly return the return unit for each valid input unit', () => {
    assert.strictEqual(convertHandler('1gal').returnUnit, 'L');
    assert.strictEqual(convertHandler('1L').returnUnit, 'gal');
    assert.strictEqual(convertHandler('1mi').returnUnit, 'km');
    assert.strictEqual(convertHandler('1km').returnUnit, 'mi');
    assert.strictEqual(convertHandler('1lbs').returnUnit, 'kg');
    assert.strictEqual(convertHandler('1kg').returnUnit, 'lbs');
  });

  it('should correctly return the spelled-out units', () => {
    assert.match(convertHandler('1gal').string, /gallons converts to .* liters/);
  });

  it('should correctly convert gal to L', () => {
    assert.strictEqual(convertHandler('1gal').returnNum, 3.78541);
  });

  it('should correctly convert L to gal', () => {
    assert.strictEqual(convertHandler('1L').returnNum, 0.26417);
  });

  it('should correctly convert mi to km', () => {
    assert.strictEqual(convertHandler('1mi').returnNum, 1.60934);
  });

  it('should correctly convert km to mi', () => {
    assert.strictEqual(convertHandler('1km').returnNum, 0.62137);
  });

  it('should correctly convert lbs to kg', () => {
    assert.strictEqual(convertHandler('1lbs').returnNum, 0.45359);
  });

  it('should correctly convert kg to lbs', () => {
    assert.strictEqual(convertHandler('1kg').returnNum, 2.20462);
  });
});