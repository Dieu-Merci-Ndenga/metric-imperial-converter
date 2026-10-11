const units = {
  gal: { name: 'gallons', returnUnit: 'L', factor: 3.78541 },
  l: { name: 'liters', returnUnit: 'gal', factor: 1 / 3.78541 },
  mi: { name: 'miles', returnUnit: 'km', factor: 1.60934 },
  km: { name: 'kilometers', returnUnit: 'mi', factor: 1 / 1.60934 },
  lbs: { name: 'pounds', returnUnit: 'kg', factor: 0.453592 },
  kg: { name: 'kilograms', returnUnit: 'lbs', factor: 1 / 0.453592 }
};
const unitNames = { ...Object.fromEntries(Object.entries(units).map(([key, unit]) => [key, unit.name])), L: 'liters' };

const numberPattern = '(?:\\d+(?:\\.\\d+)?|\\.\\d+)';
const validNumber = new RegExp(`^-?${numberPattern}(?:/-?${numberPattern})?$`);

function parseNumber(input) {
  if (!input) return 1;
  if (!validNumber.test(input)) return null;

  const parts = input.split('/').map(Number);
  if (parts.length === 2 && parts[1] === 0) return null;
  return parts.length === 2 ? parts[0] / parts[1] : parts[0];
}

function convertHandler(input) {
  const rawInput = String(input || '').trim();
  const unitStart = rawInput.search(/[a-z]/i);
  const numberInput = unitStart === -1 ? rawInput : rawInput.slice(0, unitStart);
  const unitInput = unitStart === -1 ? '' : rawInput.slice(unitStart).toLowerCase();
  const initNum = parseNumber(numberInput);
  const unit = units[unitInput];
  const hasValidNumber = initNum !== null;
  const hasValidUnit = Boolean(unit);

  if (!hasValidNumber && !hasValidUnit) return { error: 'invalid number and unit' };
  if (!hasValidNumber) return { error: 'invalid number' };
  if (!hasValidUnit) return { error: 'invalid unit' };

  const returnNum = Math.round(initNum * unit.factor * 100000) / 100000;
  return {
    initNum,
    initUnit: unitInput === 'l' ? 'L' : unitInput,
    returnNum,
    returnUnit: unit.returnUnit,
    string: `${initNum} ${unit.name} converts to ${returnNum} ${unitNames[unit.returnUnit]}`
  };
}

module.exports = convertHandler;