class Socket {

    constructor(socket) {
        this.socket = socket;
        this.player = null;
    }
    setPlayer(player) {
        this.player = player;
    }
    send(data = {}, component) {
        data.time = new Date().Format("yyyy-MM-dd hh:mm:ss")
        let sendData = {
            data: data,
            component: !component ? this.player.clientMsg.component : component,
        }
        sendData = JSON.stringify(sendData);
        this.socket.send(sendData);
    }
    on(name, fun) {
        this.socket.on(name, fun);
    }

}


module.exports = Socket;