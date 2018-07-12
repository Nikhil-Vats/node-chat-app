const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    it('should add new user', () => {
    
    var users1 = new Users();
    var user = {
        id:'123',
        name:'Nikhil',
        room:'Coding'
    };
    var resUser = users1.addUser(user.id,user.name,user.room);
    
    expect(users1.users).toEqual([user]);
        
  });
});