import express from 'express';
import RabbMq from './services/rabbMq';
import createUser from './services/firebase';

const app = express();
app.use(express.json());

console.log('hello world')

RabbMq("createEntry", "receive", null, async (value: any) => {
  const data = JSON.parse(value);
  const createdEntry = await createEntry(data);
  console.log('Im going to send this', createdUser);
});

