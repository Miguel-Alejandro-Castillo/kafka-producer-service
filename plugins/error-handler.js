'use strict';
const fp = require('fastify-plugin');

async function errorHandler(fastify, opts) {
    fastify.setErrorHandler((error, request, reply) => {
        fastify.log.error(error, 'Error capturado por el manejador global');
        // Validación de esquema
        if (error.validation) {
          reply.status(400).send({
            status: 'error',
            code: 400,
            message: 'Los datos enviados no cumplen con el formato esperado',
            description: error.message
          });
          return;
        }
      
        // Otros errores (por ejemplo, JSON mal formado, errores internos, etc.)
        reply.status(error.statusCode || 500).send({
          status: 'error',
          code: error.statusCode || 500,
          message: 'Se produjo un error inesperado en el servidor',
          description: error.message
        });
    });
    
    fastify.setNotFoundHandler((request, reply) => {
        reply.status(404).send({
            status: 'error',
            code: 404,
            message: 'Ruta no encontrada',
            description: `No existe la ruta ${request.method}:${request.url}`
        });
    });
};
module.exports = fp(errorHandler);