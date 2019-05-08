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
        data.uninxTime = parseInt(new Date().valueOf() / 1000);
        if (!component) {
            console.warn("component不存在！", data);
        }
        let sendData = {
            data: data,
            component: component,
        }
        sendData = JSON.stringify(sendData);
        if (this.socket.readyState == 1) {
            this.socket.send(sendData);
        }
    }
    on(name, fun) {
        this.socket.on(name, fun);
    }

}


module.exports = Socket;