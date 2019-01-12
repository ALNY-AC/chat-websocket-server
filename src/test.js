
// const mysql = new MySQL();
// let data = {
//     room_name: '测试2号',
//     add_time: parseInt(Date.now() / 1000),
//     edit_time: parseInt(Date.now() / 1000),
// }
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

// let head = {
//     type: '',//类型
//     roomId: '',//房间号
//     data: {},//扩展参数
//     userInfo: {
//         userId: '',
//         userName: '',
//     },
//     message: '',//发来的消息
// }
// let RoomList = [
//     new Room(-1, '起源大厅'),
// ];


const Room = require("./room/Room");
const Player = require("./room/Player");

const MySQL = require("./MySQL/MySQL");



return;
console.log("开始建立连接...")
var server = ws.createServer(function (conn) {

    console.warn(conn);

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
        // console.log("关闭连接：", room_id);
        RoomList.forEach(room => {
            if (room.room_id == room_id) {
                room.removePlayer(userName);
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
        console.log("异常关闭：", room_id);
        RoomList.forEach(room => {
            if (room.room_id == room_id) {
                room.removePlayer(userName);
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




