import { DatabaseModels } from '../../database/DatabaseModels';
import { describe, it, before } from 'mocha';
import { UserModel } from '../../database/model/UserModel';
import { IUserModel } from '../../database/interfaces/IUserModel';


describe('GET single User', function() {
    let user:any;
    let userModel:UserModel;

    before(async () => {
        await global.serverReady;
        userModel = DatabaseModels.UserModel;
        user = await userModel.createUser({
            username: "user", 
            email: "test@gmail.com", 
            fName: "dave", 
            lName: "anderson",
            eventsVisible: true, 
            friends: []
        });
    });

    it('should retrieve the created user and check attributes', async () => {
        const chai = await import('chai');
        const chaiHttp = await import('chai-http');
        chai.default.use(chaiHttp.default);

        const res = await chai.default.request('http://localhost:8080')
                             .get(`/user/${user._id}`);
        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.username).to.equal('user');
        chai.expect(res.body.email).to.equal('test@gmail.com');
        chai.expect(res.body.fName).to.equal('dave');
        chai.expect(res.body.lName).to.equal('anderson');
        chai.expect(res.body.eventsVisible).to.be.true;
        chai.expect(res.body.friends).to.be.an('array').that.is.empty;
    });

    after(async () => {
        try {
            await userModel.deleteUser(user._id);
        } catch (error) {
            console.error('Failed to clean up user:', error);
        }
    });

    
});


describe('GET list of Users', function() {
    let users: IUserModel[] = [];  // Array to store valid user objects
    let userModel: UserModel;

    before(async () => {
        await global.serverReady;
        userModel = DatabaseModels.UserModel;

        const user1 = await userModel.createUser({
            username: "test_user1",
            email: "test_user1@test.com",
            fName: "Dave",
            lName: "Anderson",
            eventsVisible: true,
            friends: []
        });

        const user2 = await userModel.createUser({
            username: "test_user2",
            email: "test_user2@test.com",
            fName: "Mahir",
            lName: "Bathija",
            eventsVisible: true,
            friends: []
        });

        // Check if users are successfully created before pushing to array
        if (user1) users.push(user1);
        else console.error("Failed to create test_user1");

        if (user2) users.push(user2);
        else console.error("Failed to create test_user2");
    });

    it('should retrieve the created users and check attributes', async () => {
        const chai = await import('chai');
        const chaiHttp = await import('chai-http');
        chai.default.use(chaiHttp.default);

        const res = await chai.default.request('http://localhost:8080').get(`/user`);
        const testUsers = res.body.filter((user: IUserModel) => user.email.includes('test.com'));
    
        chai.expect(testUsers.length).to.equal(users.length);
        testUsers.forEach((user: IUserModel, index: number) => {
            chai.expect(user.username).to.equal(users[index].username);
            chai.expect(user.email).to.equal(users[index].email);
            chai.expect(user.fName).to.equal(users[index].fName);
            chai.expect(user.lName).to.equal(users[index].lName);
            chai.expect(user.eventsVisible).to.be.true;
            chai.expect(user.friends).to.be.an('array').that.is.empty;
        });
    });

    after(async () => {
        // Attempt to delete all users created during the test
        for (let user of users) {
            try {
                await userModel.deleteUser(user._id);
            } catch (error) {
                console.error(`Failed to clean up user ${user.username}:`, error);
            }
        }
    });
});

