import * as admin from 'firebase-admin';

const serviceAccount = require('../../../serviceAccountKey.json');

export interface IUser {
  email: string;
  password: string;
  name: string;
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://micro-serv-ae1f5.firebaseio.com"
});

const createUser = async (user : IUser) => {
  try {
    let existUser;
    await admin.auth().getUserByEmail(user.email)
      .then(function(userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully fetched user data:', userRecord.toJSON());
        existUser = userRecord.toJSON();
        return userRecord.toJSON()
      })
      .catch(function(error) {
        console.log('Error fetching user data:', error);
        existUser = undefined;
      });

    if (!existUser) {
      console.log('this user exist and you are trying to create', existUser);
      const res = await admin.auth().createUser({
        email: user.email,
        emailVerified: false,
        password: user.password,
        displayName: user.name,
        photoURL: 'https://picsum.photos/seed/picsum/200/300',
        disabled: false
      });
      console.log('new user created here', res)
      return res;
    }

    console.log('This User exist', existUser);
    return existUser;
  } catch (err) {
    console.log('error occurred while creating user', err);
  }
};

export default createUser;
