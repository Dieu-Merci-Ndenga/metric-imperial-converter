const { assert } = require('chai');
const ConvertHandler = require('../controllers/convertHandler');
const convertHandler = new ConvertHandler();
const convert = (input) => convertHandler.convertInput(input);

describe('convertHandler unit tests', () => {
  it('should correctly read a whole number input', () => {
    assert.strictEqual(convert('10L').initNum, 10);
  });

  it('should correctly read a decimal number input', () => {
    assert.strictEqual(convert('2.5L').initNum, 2.5);
  });

  it('should correctly read a fractional input', () => {
    assert.strictEqual(convert('1/2L').initNum, 0.5);
  });

  it('should correctly read a fractional input with a decimal', () => {
    assert.strictEqual(convert('2.5/2L').initNum, 1.25);
  });

  it('should correctly return an error on a double-fraction', () => {
    assert.deepEqual(convert('3/2/3L'), { error: 'invalid number' });
  });

  it('should default to a numerical input of 1 when none is provided', () => {
    assert.strictEqual(convert('kg').initNum, 1);
  });

  ['gal', 'L', 'mi', 'km', 'lbs', 'kg'].forEach((unit) => {
    it(`should correctly read the ${unit} input unit`, () => {
      const expectedUnit = unit === 'L' ? 'L' : unit.toLowerCase();
      assert.strictEqual(convert(`1${unit}`).initUnit, expectedUnit);
    });
  });

  it('should correctly return an error for an invalid input unit', () => {
    assert.deepEqual(convert('1g'), { error: 'invalid unit' });
  });

  it('should correctly return the return unit for each valid input unit', () => {
    assert.strictEqual(convert('1gal').returnUnit, 'L');
    assert.strictEqual(convert('1L').returnUnit, 'gal');
    assert.strictEqual(convert('1mi').returnUnit, 'km');
    assert.strictEqual(convert('1km').returnUnit, 'mi');
    assert.strictEqual(convert('1lbs').returnUnit, 'kg');
    assert.strictEqual(convert('1kg').returnUnit, 'lbs');
  });

  it('should correctly return the spelled-out units', () => {
    assert.match(convert('1gal').string, /gallons converts to .* liters/);
  });

  it('should correctly convert gal to L', () => {
    assert.approximately(convert('1gal').returnNum, 3.78541, 0.0001);
  });

  it('should correctly convert L to gal', () => {
    assert.approximately(convert('1L').returnNum, 0.26417, 0.0001);
  });

  it('should correctly convert mi to km', () => {
    assert.approximately(convert('1mi').returnNum, 1.60934, 0.0001);
  });

  it('should correctly convert km to mi', () => {
    assert.approximately(convert('1km').returnNum, 0.62137, 0.0001);
  });

  it('should correctly convert lbs to kg', () => {
    assert.approximately(convert('1lbs').returnNum, 0.45359, 0.0001);
  });

  it('should correctly convert kg to lbs', () => {
    assert.approximately(convert('1kg').returnNum, 2.20462, 0.0001);
  });
});