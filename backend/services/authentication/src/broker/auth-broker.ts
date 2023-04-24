import {Kafka} from 'kafkajs'

const kafkaClient = new Kafka({
    clientId: 'my-auth-service',
    brokers: ['kafka:9092']
});
  
export {kafkaClient}