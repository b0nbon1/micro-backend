import {validate, Contains, IsInt, Length, IsEmail, Min, Max} from "class-validator";
import express from 'express';
import RabbMq from './services/rabbMq';

export const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());

export class Entry {
    @Length(10, 20)
    title: string;
 
    @Contains("hello")
    body: string;
 
    @IsInt()
    @Min(0)
    @Max(10)
    rating: number
}


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
  let entry = new Entry();

  user.name = req.body.user?.name;
  user.password = req.body.user?.password;
  user.email = req.body.user?.email;

  entry.title = req.body.title;
  entry.body = req.body.body;
  entry.rating = req.body.rating;

  const entryErrors = await validate(entry);
  if (entryErrors.length > 0) {
    return res.status(400).json({
      status: "error",
      errors: entryErrors
    })
  }

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

