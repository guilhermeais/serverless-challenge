const { faker } = require('@faker-js/faker');

class UUIDGereratorSpy {
  constructor() {
    this.result = faker.datatype.uuid();
    this.callsCount = 0;
  }

  generate() {
    this.callsCount++;
    return this.result;
  }
}

module.exports = { UUIDGereratorSpy };