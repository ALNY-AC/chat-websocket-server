var ws = require("nodejs-websocket");
console.log("开始建立连接...")
let chatList = [];
var server = ws.createServer(function (conn) {
    conn.on("text", function (str) {
        console.log("收到的信息为:" + str)
        let isAdd = true;
        chatList.forEach(el => {
            if (el.name == JSON.parse(str).name) {
                isAdd = false;
            }
        });
        if (isAdd) {
            chatList.push({
                name: JSON.parse(str).name,
                conn: conn
            });
        }

        chatList.forEach(el => {
            el.conn.sendText(str);
        });
        console.log(chatList);


        // if (str === "game1") {
        //     game1 = conn;
        //     game1Ready = true;
        //     conn.sendText("success");
        // }
        // if (str === "game2") {
        //     game2 = conn;
        //     game2Ready = true;
        // }

        // if (game1Ready && game2Ready) {
        //     game2.sendText(str);
        // }

    })
    conn.on("close", function (code, reason) {
        console.log("关闭连接")
    });
    conn.on("error", function (code, reason) {
        console.log("异常关闭")
    });
}).listen(12138)
console.log("WebSocket建立完毕.")