class Player {
    constructor(socket) {
        this.socket = socket;//连接句柄
        socket.setPlayer(this);
        this.parent = null;//所属父级
        this.clientMsg = null;
    }
    setSocket(socket) {
        this.socket = socket;
        socket.setPlayer(this);
    }
    getSocket() {
        return this.socket;
    }
    setClientMsg(clientMsg) {
        this.clientMsg = clientMsg;
    }
}

module.exports = Player;