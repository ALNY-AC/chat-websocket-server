const getRandom = require('./getRandom')

class Room {
    constructor(room_id, room_name) {
        this.playerList = [];
        this.contentList = [];
        this.room_id = room_id;
        this.room_name = room_name;
        this.add_time = '';
        this.edit_time = '';
    }
    update(data, copm) {

        this.contentList.push(data);

        console.warn();
        console.warn('发送聊天广播：=========== ---> ' + copm);
        console.warn(`用户[${data.userName}]说：${data.msg}`);

        this.playerList.forEach(player => {
            console.warn(`[${data.userName}]------->[${player.clientMsg.data.userName}]`);
            player.socket.send(data, copm);
        });
        console.warn('结束聊天广播：===========');
        console.warn();

    }
    addPlayer(player) {
        this.playerList.push(player);


        const remove = () => {
            this.removePlayer(player.clientMsg.data.userName);
            // this.update({
            //     id: getRandom(),
            //     userName: player.clientMsg.data.userName,
            //     msg: '[ ' + player.clientMsg.data.userName + ' ] 退出'
            // }, 'userExit');
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