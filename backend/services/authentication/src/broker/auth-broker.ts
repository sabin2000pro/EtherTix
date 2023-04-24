import {Kafka} from 'kafkajs'

const kafkaClient = new Kafka({
    clientId: 'my-auth-service',
    brokers: ['localhost:9092']
});
  
export {kafkaClient}