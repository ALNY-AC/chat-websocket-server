const Component = require('./Component')
const RoomList = require('../Script/RoomList')



let userRoomList = {};

class RoomComponent extends Component {
    send(clientMsg, player) {
        // this.getPlayer().getSocket().send(this.data);
        // 查询此用户是否在房间内
        let room = RoomList.isPlayerInRoom(this.data.roomId, this.data.userName, player);
        room.update(this.data, 'send');

        Object.keys(userRoomList).forEach(key => {
            userRoomList[key].socket.send({ data: this.getRoomList() }, 'roomList');
        });
    }
    getRoomList() {

        let list = [];
        const roomList = RoomList.roomList;
        Object.keys(roomList).forEach(key => {
            const room = roomList[key];
            const item = {
                roomId: room.room_id,
                roomName: room.room_name,
                content: room.contentList[room.contentList.length - 1],
            }
            list.push(item);
        });
        return list;

    }
    getList(clientMsg, player) {
        userRoomList[this.data.userName] = player;
        player.socket.send({ data: this.getRoomList() }, 'roomList');
    }
    getContentList(clientMsg, player) {
        let room = RoomList.isPlayerInRoom(this.data.roomId, this.data.userName, player);
        player.socket.send({ data: room.contentList }, 'getContentList');
    }
}

module.exports = RoomComponent;