class Component {
    constructor() {
        this.player = null;
        this.data = null;
        this.component = null;
        this.clientMsg = null;
    }
    setPlayer(player) {
        this.player = player;
    }
    getPlayer() {
        return this.player;
    }
    setData(data) {
        this.data = data;
    }
    setClientComponent(component) {
        this.component = component;
    }
    setClientMsg(clientMsg) {
        this.clientMsg = clientMsg;
    }
}

module.exports = Component;