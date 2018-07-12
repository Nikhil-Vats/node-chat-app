const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    var users;
    beforeEach(()=>{
        users = new Users();
        users.users = [{
            id:'1',
            name:'Mike',
            room:'Node course'
        }, {
            
            id:'2',
            name:'Jen',
            room:'Vue course'
        }, {
            
            id:'3',
            name:'Tom',
            room:'Node course'
        }];
    });
    it('should add new user', () => {
    
    var users = new Users();
    var user = {
        id:'123',
        name:'Nikhil',
        room:'Coding'
    };
    var resUser = users.addUser(user.id,user.name,user.room);
    
    expect(users.users).toEqual([user]);
        
  });
    
    it('should remove a user', () => {
        var userID = '1';
        var user = users.removeUser(userID);
        expect(user.id).toBe(userID);
        expect(users.users.length).toBe(2);
    });
    
    it('should not remove a user', () => {
        var userID = '11';
        var user = users.removeUser(userID);
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });
    
    it('should find a user', () => {
        var userID = '2';
        var user = users.getUser(userID);
        expect(user.id).toBe(userID);
    });
    
    it('should not find a user', () => {
        var userID='9';
        var user = users.getUser(userID);
        expect(user).toNotExist();
    });
    
    
    
    
    
    
    
    
    
    
    it('should return names for Node course', () => {
       var userList = users.getUserList('Node course');
        expect(userList).toEqual(['Mike','Tom']);
    });
    it('should return names for Vue course', () => {
       var userList = users.getUserList('Vue course');
        expect(userList).toEqual(['Jen']);
    });
});