var ws = require("nodejs-websocket");
const MySQL = require("./MySQL/MySQL");
const Room = require("./room/Room");
const Player = require("./room/Player");

// const mysql = new MySQL();
let data = {
    room_name: '测试2号',
    add_time: parseInt(Date.now() / 1000),
    edit_time: parseInt(Date.now() / 1000),
}
// MySQL.table('room')
//     .add(data, (res) => {
//         console.warn(res);
//     })
// MySQL.table('room')
//     .get((res) => {
//         res.forEach((item) => {
//             console.warn(item);
//         })
//     });
// MySQL.table('room')
//     .where('room_id', 1)
//     .save({
//         room_name: Math.ceil(Math.random() * 100) + '',
//         add_time: parseInt(Date.now() / 1000),
//     }, (res) => {
//         console.warn(res);
//         MySQL.table('room')
//             .where('room_id', 1)
//             .get((res) => {
//                 res.forEach((item) => {
//                     console.warn(item);
//                 })
//             });

//     })

// MySQL.table('room')
//     // .field("room_id,room_name")
//     // .where('room_id', '=', 1)
//     // .where([
//     //     ['room_name', '=', '起源会议中心'],
//     //     ['add_time', '=', 0],
//     // ])
//     .get((res) => {
//         res.forEach((item) => {
//             console.warn(item);
//         })
//     });

let head = {
    type: '',//类型
    roomId: '',//房间号
    data: {},//扩展参数
    userInfo: {
        userId: '',
        userName: '',
    },
    message: '',//发来的消息
}
let RoomList = [
    new Room(-1, '起源大厅'),
];

console.log("开始建立连接...")
var server = ws.createServer(function (conn) {


    let room_id = '';
    let userName = '';

    conn.on("text", function (text) {
        console.warn(RoomList);
        let info = JSON.parse(text);//转换text
        info.time = new Date().Format("yyyy-MM-dd hh:mm:ss");
        // // 将用户加入房间
        // RoomList.forEach(room => {
        //     room.addPlayer();
        // });
        /**
         * addRoom：客户端要加入新房间
         * 
         * 
         * 
         */
        room_id = info.roomId;
        userName = info.userInfo.userName;
        if (info.type == 'addRoom') {
            info.message = '进入房间';
            let isAdd = true;
            RoomList.forEach(room => {
                if (room.room_id == info.roomId) {
                    isAdd = false;
                    console.warn(room);
                    room.addPlayer(new Player(info.userInfo.userName, conn));
                }
            });
            if (isAdd) {
                let room = new Room(info.roomId, info.roomId);
                RoomList.push(room);
                room.addPlayer(new Player(info.userInfo.userName, conn));
            }
        }
        RoomList.forEach(room => {
            if (room.room_id == info.roomId) {
                room.update(info);
            }
        });

    })
    conn.on("close", function (code, reason) {
        console.log("关闭连接：", room_id)
        RoomList.forEach(room => {
            if (room.room_id == room_id) {
                room.update({
                    type: '',//类型
                    roomId: room_id,//房间号
                    data: {},//扩展参数
                    userInfo: {
                        userId: '',
                        userName: userName,
                    },
                    message: '退出房间',//发来的消息
                });
            }
        });
    });
    conn.on("error", function (code, reason) {
        console.log("异常关闭：", room_id)
        RoomList.forEach(room => {
            if (room.room_id == room_id) {
                room.update({
                    type: '',//类型
                    roomId: room_id,//房间号
                    data: {},//扩展参数
                    userInfo: {
                        userId: '',
                        userName: userName,
                    },
                    message: '退出房间',//发来的消息
                });
            }
        });
    });
}).listen(12138)
console.log("WebSocket建立完毕.")







// // 对Date的扩展，将 Date 转化为指定格式的String
// // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// // 例子：
// // (new Date()).Format("yyyy-MM-dd.S") ==> 2006-07-02 08:09:04.423
// // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
