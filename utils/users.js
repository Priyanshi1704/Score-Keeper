class User {

    //creating a ner user list
    constructor(){
        this.users = [];
    }

    // adding a new user
    addUser(id, name, room)
    {
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }

    // getting list of users of same room
    getUserList (room){
        let users = this.users.filter((user) => user.room === room);

        let nameArray = users.map((user) => user.name);

        return nameArray;
    }

    // getting user detail
    getUser(id) {
        let userList = this.users.filter((user) => user.id === id);

        return userList[0];
    }

    // removing a user
    removeUser (id) {
        let user = this.getUser(id);

        if(user)
            this.users = this.users.filter((user) => user.id !== id);

        return user;
    }
}

module.exports = {User};