'use strict'

const example200 = {
  "status": "success",
  "code": 200,
  "message": "Mensaje enviado a Kafka",
  "description": "Publicado en el tópico 'topic'"
};

const example400 = {
  "status": "error",
  "code": 400,
  "message": "Solicitud mal formada o inválida",
  "description": "Los datos enviados no cumplen con el formato esperado"
};

const example500 = { 
  "status": "error",
  "code": 500,
  "message": "Error al enviar el mensaje a Kafka",
  "description": "KAFKA_ERROR_CODE - Descripción del error"
};

module.exports = async function (fastify, opts) {
  fastify.post('/publish', {
    schema: {
      description: 'Envía un mensaje al tópico Kafka especificado',
      tags: ['Kafka'],
      body: {
        type: 'object',
        required: ['topic', 'message'],
        additionalProperties: false,
        properties: {
          topic: { 
            type: 'string',
            description: 'Nombre del tópico Kafka' 
          },
          message: {
            type: 'string',
            description: 'Contenido del mensaje que se enviará a Kafka'
          }
        },
        examples: [
          {
            topic: 'mi-topico',
            message: 'Este es un mensaje de prueba'
          }
        ]
      },
      response: {
        200: fastify.responseSchema('Mensaje enviado correctamente', example200),
        400: fastify.responseSchema('Solicitud mal formada o inválida', example400),
        500: fastify.responseSchema('Error al enviar el mensaje a Kafka', example500)
      }
    }
  }, async (request, reply) => {
    const { topic, message } = request.body;
    try {
      await fastify.kafkaProducer.send({
        topic: topic,
        messages: [{ value: message }],
      });
      
      fastify.sendSuccess(reply, {
        message: 'Mensaje enviado a Kafka',
        description: `Publicado en el tópico '${topic}'`
      });
    } catch (error) {
      const messageError = 'Error al enviar mensaje a Kafka';
      fastify.log.error(error, messageError);
      const kafkaErrorCode = error.code || error.type || error.name || 'UNKNOWN_ERROR'
      const kafkaErrorMessage = error.message || 'Error desconocido';
      fastify.sendError(reply, {
        message: messageError,
        description: `${kafkaErrorCode} - ${kafkaErrorMessage}`
      });
      
    }
  });
}
