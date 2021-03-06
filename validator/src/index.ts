import {validate, IsInt, Length, IsEmail} from "class-validator";
import express from 'express';
import RabbMq from './services/rabbMq';

export const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());

export class User {
 
    @Length(2, 20)
    name: string;
 
    @Length(8, 50)
    password: string;

    @IsEmail()
    email: string;
}

app.post("/post", async (req, res) => {
  let user = new User();

  user.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;

  const userErrors = await validate(user);
  if (userErrors.length > 0) {
    return res.status(400).json({
      status: "error",
      errors: userErrors,
    })
  }

  RabbMq("registerUser", "send", JSON.stringify(req.body), (value: any) => {
    console.log(value);
  });

  return res.status(200).json({
    status: "success"
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export default app;

