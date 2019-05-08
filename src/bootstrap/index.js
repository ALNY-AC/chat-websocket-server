var WebSocket = require("ws");
const ws = require("../router/ws");//用户注册的路由
const Router = require("./Router");//路由类
const Player = require("./Player");
const Socket = require("./Socket");


class Bootstrap {
    constructor(port) {
        this.port = port;
    }
    init(fun) {
        const router = new Router();//创建一个路由实例
        //开启
        const wss = new WebSocket.Server({
            port: this.port,
        });
        wss.on('connection', function connection(socket) {
            setTimeout(() => {
                const player = new Player(new Socket(socket));//创建用户
                socket.on('message', function incoming(msg) {
                    let clientMsg = JSON.parse(msg);//接收数据
                    router.trigger(clientMsg, player);//传送给组件进行处理并接收返回
                });
            }, 100);
        });
        fun();
    }

}


module.exports = Bootstrap