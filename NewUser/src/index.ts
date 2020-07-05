import {validate, Contains, IsInt, Length, IsEmail, Min, Max} from "class-validator";
import express from 'express';
import RabbMq from './services/rabbMq';
import createUser from './services/firebase';

const app = express();
app.use(express.json());

console.log('hello world')

RabbMq("registerUser", "receive", null, async (value: any) => {
  const data = JSON.parse(value);
  const createdUser = await createUser(data.user);
  console.log('Im going to send this', createdUser);
});

