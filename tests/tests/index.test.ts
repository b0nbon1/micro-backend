import getUser from './firebase';
import app from '../../validator/src/index';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';

chai.use(chaiHttp);
chai.should();

describe('Test the micro-services', () => { 
  it('first test', (done: any) => {
   chai
    .request(app)
    .post('/post')
    .send({
      name: "Bonvic",
      password: "nggtu578tnhr",
      email: "bonbon123456@email.com",
    }).end(async (err, res) => {
      const newUser = await getUser('bonbon123456@email.com');
      expect(newUser).to.not.be.an('null');
      expect(newUser?.email).to.equal('bonbon123456@email.com');
      expect(newUser?.displayName).to.equal('Bonvic');
      done();
    })

    // done();
  });
});

