const expect = require('expect');
const {User} = require('../../utils/users');

describe('Users', () => {
    let users;
    beforeEach( () => {
        users = new User();
        users.users = [
            {
                id: '1',
                name: 'Ami',
                room: 'room 1'
            },
            {
                id: '2',
                name: 'Tumi',
                room: 'room 2'
            },
            {
                id: '3',
                name: 'Se',
                room: 'room 1'
            },
        ];
    });

    it('should add user', () => {
        let new_user = new User();
        let user = {
            id: 123,
            name: 'sazzad',
            room: 'Room1'
        };
        let resUser = new_user.addUser(user.id, user.name, user.room);
        expect(new_user.users).toEqual([user]);
    });

    it('should find a user', () => {
        let userId = '2';
        let user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });

    it('should not find a user', () => {
        let userId = '23';
        let user = users.getUser(userId);
        expect(user).toNotExist(userId);
    });

    it('should remove a user', () => {
        let userId = '1';
        let user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
        let userId = '99';
        let user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should return names for node course', () => {
        let userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Mike', 'Julie']);
    });

    it('should return names for react course', () => {
        let userList = users.getUserList('React Course');

        expect(userList).toEqual(['Jen']);
    });
});