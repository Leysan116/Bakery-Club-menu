class User {
    constructor(socketId) {
        this.socketId = socketId;
        this.products = [];
    }
}

module.exports = User;