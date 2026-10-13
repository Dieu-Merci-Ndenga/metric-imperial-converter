const units = {
  gal: { name: 'gallons', returnUnit: 'L', factor: 3.78541 },
  l: { name: 'liters', returnUnit: 'gal', factor: 1 / 3.78541 },
  mi: { name: 'miles', returnUnit: 'km', factor: 1.60934 },
  km: { name: 'kilometers', returnUnit: 'mi', factor: 1 / 1.60934 },
  lbs: { name: 'pounds', returnUnit: 'kg', factor: 0.453592 },
  kg: { name: 'kilograms', returnUnit: 'lbs', factor: 1 / 0.453592 }
};

const numberPattern = '[+-]?(?:\\d+(?:\\.\\d*)?|\\.\\d+)';
const validNumber = new RegExp(`^${numberPattern}(?:/${numberPattern})?$`);

function parseNumber(input) {
  if (input === '' || input === undefined || input === null) return 1;

  const fractions = input.split('/');
  if (fractions.length > 2 || !validNumber.test(input)) return 'invalid number';

  const parts = fractions.map(Number);
  if (parts.length === 2 && parts[1] === 0) return 'invalid number';
  return parts.length === 2 ? parts[0] / parts[1] : parts[0];
}

class ConvertHandler {
  getNum(input) {
    const unitStart = String(input || '').search(/[a-z]/i);
    const numberInput = unitStart === -1 ? String(input || '') : input.slice(0, unitStart);
    return parseNumber(numberInput);
  }

  getUnit(input) {
    const unitStart = String(input || '').search(/[a-z]/i);
    if (unitStart === -1) return 'invalid unit';
    const unit = input.slice(unitStart).toLowerCase();
    return units[unit] ? (unit === 'l' ? 'L' : unit) : 'invalid unit';
  }

  getReturnUnit(initUnit) {
    const unit = units[String(initUnit || '').toLowerCase()];
    return unit ? unit.returnUnit : undefined;
  }

  spellOutUnit(unit) {
    const normalizedUnit = String(unit || '').toLowerCase();
    if (normalizedUnit === 'l') return 'L';
    return units[normalizedUnit] ? normalizedUnit : 'invalid unit';
  }

  convert(initNum, initUnit) {
    const unit = units[String(initUnit || '').toLowerCase()];
    if (!unit || typeof initNum !== 'number') return undefined;
    return Math.round(initNum * unit.factor * 100000) / 100000;
  }

  getString(initNum, initUnit, returnNum, returnUnit) {
    const names = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };
    return `${initNum} ${names[this.spellOutUnit(initUnit)]} converts to ${returnNum} ${names[this.spellOutUnit(returnUnit)]}`;
  }

  convertInput(input) {
    const initNum = this.getNum(input);
    const initUnit = this.getUnit(input);

    if (initNum === 'invalid number' && initUnit === 'invalid unit') return { error: 'invalid number and unit' };
    if (initNum === 'invalid number') return { error: 'invalid number' };
    if (initUnit === 'invalid unit') return { error: 'invalid unit' };

    const returnUnit = this.getReturnUnit(initUnit);
    const returnNum = this.convert(initNum, initUnit);
    return {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: this.getString(initNum, initUnit, returnNum, returnUnit)
    };
  }
}

// Astuce majeure : Permet d'utiliser convertHandler('10L') directement OU new ConvertHandler()
const instance = new ConvertHandler();
function exportWrapper(input) {
  if (input === undefined) return instance;
  return instance.convertInput(input);
}

// On attache aussi les méthodes pour satisfaire les tests unitaires exigeants
Object.getOwnPropertyNames(ConvertHandler.prototype).forEach((method) => {
  if (method !== 'constructor') {
    exportWrapper[method] = ConvertHandler.prototype[method].bind(instance);
  }
});

module.exports = exportWrapper;