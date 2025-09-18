'use strict';
const fp = require('fastify-plugin');

function sendSuccess(reply, { message, description }) {
  reply.status(200).send({
    status: 'success',
    code: reply.statusCode,
    message,
    description
  });
}

function sendError(reply, { message, description }) {
  reply.status(500).send({
    status: 'error',
    code: reply.statusCode,
    message,
    description
  });
}

module.exports = fp(async function (fastify) {
  fastify.decorate('sendSuccess', sendSuccess);
  fastify.decorate('sendError', sendError);
});