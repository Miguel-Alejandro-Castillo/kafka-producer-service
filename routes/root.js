'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', {
    schema: {
      hide: true
    }
  }, async function (request, reply) {
    return { root: true }
  });
}
