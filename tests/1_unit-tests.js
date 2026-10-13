const { assert } = require('chai');
const ConvertHandler = require('../controllers/convertHandler');

const convertHandler = new ConvertHandler();

suite('Unit Tests', () => {
  test('should correctly read a whole number input', () => {
    assert.strictEqual(convertHandler.getNum('2kg'), 2);
  });

  test('should correctly read a decimal number input', () => {
    assert.strictEqual(convertHandler.getNum('2.5lbs'), 2.5);
  });

  test('should correctly read a fractional input', () => {
    assert.strictEqual(convertHandler.getNum('1/5kg'), 0.2);
  });

  test('should correctly read a fractional input with a decimal', () => {
    assert.strictEqual(convertHandler.getNum('0.2/0.5kg'), 0.4);
  });

  test('should correctly return an error on a double-fraction', () => {
    assert.strictEqual(convertHandler.getNum('2/2/7kg'), 'invalid number');
  });

  test('should default to a numerical input of 1 when none is provided', () => {
    assert.strictEqual(convertHandler.getNum('lbs'), 1);
  });

  test('should correctly read each valid input unit', () => {
    assert.strictEqual(convertHandler.getUnit('2gal'), 'gal');
    assert.strictEqual(convertHandler.getUnit('2L'), 'L');
    assert.strictEqual(convertHandler.getUnit('2mi'), 'mi');
    assert.strictEqual(convertHandler.getUnit('2km'), 'km');
    assert.strictEqual(convertHandler.getUnit('2lbs'), 'lbs');
    assert.strictEqual(convertHandler.getUnit('2kg'), 'kg');
  });

  test('should correctly return an error for an invalid input unit', () => {
    assert.strictEqual(convertHandler.getUnit('2invalidUnit'), 'invalid unit');
  });

  test('should correctly return the return unit for each valid input unit', () => {
    assert.strictEqual(convertHandler.getReturnUnit('gal'), 'L');
    assert.strictEqual(convertHandler.getReturnUnit('L'), 'gal');
    assert.strictEqual(convertHandler.getReturnUnit('mi'), 'km');
    assert.strictEqual(convertHandler.getReturnUnit('km'), 'mi');
    assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg');
    assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs');
  });

  test('should correctly return the spelled-out string unit for each valid input unit', () => {
    assert.strictEqual(convertHandler.spellOutUnit('GAL'), 'gal');
    assert.strictEqual(convertHandler.spellOutUnit('l'), 'L');
    assert.strictEqual(convertHandler.spellOutUnit('MI'), 'mi');
    assert.strictEqual(convertHandler.spellOutUnit('KM'), 'km');
    assert.strictEqual(convertHandler.spellOutUnit('LBS'), 'lbs');
    assert.strictEqual(convertHandler.spellOutUnit('KG'), 'kg');
  });

  test('should correctly convert gal to L', () => {
    assert.approximately(convertHandler.convert(2, 'gal'), 7.57082, 0.0001);
  });

  test('should correctly convert L to gal', () => {
    assert.approximately(convertHandler.convert(2, 'L'), 0.52834, 0.0001);
  });

  test('should correctly convert mi to km', () => {
    assert.approximately(convertHandler.convert(2, 'mi'), 3.21868, 0.0001);
  });

  test('should correctly convert km to mi', () => {
    assert.approximately(convertHandler.convert(2, 'km'), 1.24275, 0.0001);
  });

  test('should correctly convert lbs to kg', () => {
    assert.approximately(convertHandler.convert(2, 'lbs'), 0.90718, 0.0001);
  });

  test('should correctly convert kg to lbs', () => {
    assert.approximately(convertHandler.convert(2, 'kg'), 4.40925, 0.0001);
  });
});