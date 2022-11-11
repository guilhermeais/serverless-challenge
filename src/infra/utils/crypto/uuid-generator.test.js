const { UUIDGenerator } = require('./uuid-generator');
const crypto = require('crypto');
const { faker } = require('@faker-js/faker');

jest.mock('crypto', () => ({
  randomUUID: jest.fn()
}));
describe('UUIDGenerator', () => {
  function makeSut() {
    const sut = new UUIDGenerator()
    return { sut }
  }

  test('should call randomUUID', async () => {
    const { sut } = makeSut()
    sut.generate()
    expect(crypto.randomUUID).toHaveBeenCalled()
  });

  test('should return crypto.randomUUID value', async () => {
    const mocked_uuid = faker.datatype.uuid()
    crypto.randomUUID.mockReturnValueOnce(mocked_uuid)
    const { sut } = makeSut()
    const result = sut.generate()
    expect(result).toEqual(mocked_uuid)
  });
});