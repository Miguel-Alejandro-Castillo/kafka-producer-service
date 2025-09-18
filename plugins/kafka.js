const fp = require('fastify-plugin');
const { Kafka } = require('kafkajs');

async function kafkaPlugin(fastify, opts) {
  const kafka = new Kafka({
    clientId: 'fastify-producer',
    brokers: [process.env.KAFKA_BROKER],
  });

  const producer = kafka.producer();
  await producer.connect();

  fastify.decorate('kafkaProducer', producer);

  fastify.addHook('onClose', async () => {
    await producer.disconnect();
  });
}

module.exports = fp(kafkaPlugin);
