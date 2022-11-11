const crypto = require('crypto')

class UUIDGenerator {
  generate() {
    return crypto.randomUUID()
  }
}

module.exports = { UUIDGenerator }
