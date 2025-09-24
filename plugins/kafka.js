const fp = require('fastify-plugin');
const { Kafka } = require('kafkajs');

async function kafkaPlugin(fastify, opts) {
  const kafka = new Kafka({
    clientId: 'fastify-producer',
    brokers: [process.env.KAFKA_BROKER]
  });

  const producer = kafka.producer();

  // Función para intentar reconectar a Kafka
  async function connectToKafka() {
    try {
      fastify.log.info('Intentando conectar a Kafka...');
      await producer.connect();
      fastify.log.info('Conexión a Kafka exitosa');
    } catch (err) {
      fastify.log.error('Error al conectar a Kafka:', err.message);
      fastify.log.warn('Reintentando conexión a Kafka en 30 segundos...');
      setTimeout(connectToKafka, 30000); // Reintenta después de 30 segundos
    }
  }

  // Intenta conectarte al inicio
  connectToKafka();

  // Decora Fastify con el productor
  fastify.decorate('kafkaProducer', producer);

  // Desconecta el productor al cerrar Fastify
  fastify.addHook('onClose', async () => {
    try {
      await producer.disconnect();
      fastify.log.info('Desconexión de Kafka exitosa');
    } catch (err) {
      fastify.log.warn('Error al desconectar de Kafka:', err.message);
    }
  });
}

module.exports = fp(kafkaPlugin);
