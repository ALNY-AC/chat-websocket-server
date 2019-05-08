const Room = require('./Room');

RoomList = {

    roomList: {},
    /**
     * 判断是否有此房间，且是否有此用户，如果没有房间，将创建房间，如果此房间没有此用户，将追加用户，最终返回此房间。
     * 
     * @param {String} roomId 要判断的房间id
     * @param {String} userName  要判断的用户name
     * @param {Player} player 当房间不存在用户时，将会把此用户添加进去
     * 
     * @returns 用户所在的房间。
     */
    isPlayerInRoom(roomId, userName, player) {

        if (!this.roomList[roomId]) {
            // 不存在
            // 创建一个
            this.roomList[roomId] = new Room(roomId, userName);
            console.warn(`用户：[${userName}] 创建房间:[${roomId}]`);

        }
        if (!this.roomList[roomId].getPlayer(userName)) {
            this.roomList[roomId].addPlayer(player);
            console.warn(`用户：[${userName}] 加入房间:[${roomId}]`);
        }

        return this.roomList[roomId];

    }
}


module.exports = RoomList;  