function assertionAnalyser(body) {
  if (!body) return 'invalid assertion';

  const assertions = [];
  const pattern = /assert\.([a-zA-Z]+)\(([^\n]*)\)/g;
  let match;
  while ((match = pattern.exec(body)) !== null) {
    assertions.push({
      method: `assert.${match[1]}`,
      args: match[2].split(',').map(argument => argument.trim())
    });
  }
  return assertions;
}

module.exports = assertionAnalyser;