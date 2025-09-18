'use strict';
const fp = require('fastify-plugin');

function responseSchema(description, example = null) {
    let schemaResponse = {
        description,
        type: 'object',
        properties: {
            status: { type: 'string' },
            code: { type: 'integer' },
            message: { type: 'string' },
            description: { type: 'string' }
        }
    };
    if (example)
        schemaResponse.examples = [example];
    return schemaResponse;
}

module.exports = fp(async function (fastify) {
  fastify.decorate('responseSchema', responseSchema);
});
