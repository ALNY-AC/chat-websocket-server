class Player {
    constructor(name, conn) {
        this.name = '';//用户名称
        this.conn = conn;//连接句柄
        this.parent = null;//所属父级
    }
    setConn(conn) {
        this.conn = conn;
    }
    setParent(parent) {
        this.parent = parent;
    }
    getParent() {
        return this.parent;
    }
    update(info) {
        let _info = info;
        if (this.conn) {
            _info = JSON.stringify(_info);
            this.conn.sendText(_info);
        }
    }
}

module.exports = Player;