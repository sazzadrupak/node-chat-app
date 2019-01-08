class User {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        let user = this.getUser(id);
        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }

    getUser(id) {
        let user = this.users.filter((user) => user.id === id)[0];
        return user;
    }

    getUserList(room) {
        let users = this.users.filter((user) => user.room === room);
        let userNameArray = users.map((user) => user.name);
        return userNameArray;
    }
}

module.exports.User = User;