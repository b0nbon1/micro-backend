import * as admin from 'firebase-admin';

const serviceAccount = require('../serviceAccountKey.json');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://micro-serv-ae1f5.firebaseio.com"
});

const getUser: any = async (email: string) => {
    let existUser;
    await admin.auth().getUserByEmail(email)
      .then(function(userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully fetched user data:', userRecord.toJSON());
        existUser = userRecord.toJSON();
        return userRecord.toJSON()
      })
      .catch(function(error) {
        console.log('Error fetching user data:', error);
        existUser = null;
      });

    return existUser;
};

export default getUser;

