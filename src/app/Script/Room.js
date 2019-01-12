class Room {
    constructor(room_id, room_name) {
        this.playerList = [];
        this.room_id = room_id;
        this.room_name = room_name;
        this.add_time = '';
        this.edit_time = '';
    }
    update(data, copm) {
        this.playerList.forEach(player => {
            player.socket.send(data, copm);
        });
    }
    addPlayer(player) {
        this.playerList.push(player);


        const remove = () => {
            this.removePlayer(player.clientMsg.data.userName);
            this.update({
                userName: player.clientMsg.data.userName,
                msg: '[ ' + player.clientMsg.data.userName + ' ] 退出房间'
            }, 'userExit');
        }

        player.socket.on('close', remove)
        player.socket.on('error', remove)


    }
    getPlayer(name = '') {
        let list = this.playerList.filter((el) => el.clientMsg.data.userName == name);

        return list.length > 0 ? list[0] : null;
    }
    removePlayer(sub = '') {

        if (typeof sub == 'string') {
            let index = -1;
            let list = this.playerList.filter((el) => el.clientMsg.data.userName != sub);
            this.playerList = list;
        }

        if (typeof sub == 'number') {
            this.playerList.splice(sub, 1);
            return this.playerList[sub];
        }

    }
    get() {
        return this.playerList;
    }
}



module.exports = Room