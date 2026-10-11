const units = {
  gal: { name: 'gallons', returnUnit: 'L', factor: 3.78541 },
  l: { name: 'liters', returnUnit: 'gal', factor: 1 / 3.78541 },
  mi: { name: 'miles', returnUnit: 'km', factor: 1.60934 },
  km: { name: 'kilometers', returnUnit: 'mi', factor: 1 / 1.60934 },
  lbs: { name: 'pounds', returnUnit: 'kg', factor: 0.453592 },
  kg: { name: 'kilograms', returnUnit: 'lbs', factor: 1 / 0.453592 }
};

const numberPattern = '(?:\\d+(?:\\.\\d+)?|\\.\\d+)';
const validNumber = new RegExp(`^-?${numberPattern}(?:/-?${numberPattern})?$`);

function parseNumber(input) {
  if (!input) return 1;
  if (!validNumber.test(input)) return undefined;

  const parts = input.split('/').map(Number);
  if (parts.length === 2 && parts[1] === 0) return undefined;
  return parts.length === 2 ? parts[0] / parts[1] : parts[0];
}

function ConvertHandler() {}

ConvertHandler.prototype.getNum = function (input) {
  const unitStart = String(input || '').search(/[a-z]/i);
  const numberInput = unitStart === -1 ? String(input || '') : input.slice(0, unitStart);
  return parseNumber(numberInput);
};

ConvertHandler.prototype.getUnit = function (input) {
  const unitStart = String(input || '').search(/[a-z]/i);
  if (unitStart === -1) return undefined;
  const unit = input.slice(unitStart).toLowerCase();
  return units[unit] ? (unit === 'l' ? 'L' : unit) : undefined;
};

ConvertHandler.prototype.getReturnUnit = function (initUnit) {
  const unit = units[String(initUnit || '').toLowerCase()];
  return unit ? unit.returnUnit : undefined;
};

ConvertHandler.prototype.spellOutUnit = function (unit) {
  const definition = units[String(unit || '').toLowerCase()];
  return definition ? definition.name : undefined;
};

ConvertHandler.prototype.convert = function (initNum, initUnit) {
  const unit = units[String(initUnit || '').toLowerCase()];
  if (!unit || typeof initNum !== 'number') return undefined;
  return Math.round(initNum * unit.factor * 100000) / 100000;
};

ConvertHandler.prototype.getString = function (initNum, initUnit, returnNum, returnUnit) {
  return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
};

ConvertHandler.prototype.convertInput = function (input) {
  const initNum = this.getNum(input);
  const initUnit = this.getUnit(input);

  if (initNum === undefined && initUnit === undefined) return { error: 'invalid number and unit' };
  if (initNum === undefined) return { error: 'invalid number' };
  if (initUnit === undefined) return { error: 'invalid unit' };

  const returnUnit = this.getReturnUnit(initUnit);
  const returnNum = this.convert(initNum, initUnit);
  return {
    initNum,
    initUnit,
    returnNum,
    returnUnit,
    string: this.getString(initNum, initUnit, returnNum, returnUnit)
  };
};

module.exports = ConvertHandler;