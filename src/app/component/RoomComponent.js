const Component = require('./Component')
const RoomList = require('../Script/RoomList')


class RoomComponent extends Component {
    send(clientMsg, player) {
        // this.getPlayer().getSocket().send(this.data);

        // 查询此用户是否在房间内

        let room = RoomList.isPlayerInRoom(this.data.roomId, this.data.userName, player);
        room.update(this.data);

    }
}

module.exports = RoomComponent;