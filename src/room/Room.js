class Room {
    constructor(room_id, room_name) {
        this.playerLis = [];
        this.room_id = room_id;
        this.room_name = room_name;
        this.add_time = '';
        this.edit_time = '';
    }
    update(info) {
        this.playerLis.forEach(item => {
            item.update(info);
        });
    }
    addPlayer(player) {
        player.setParent(this);
        this.playerLis.push(player);
    }
    getPlayer(name = '') {
        let list = this.playerLis.filter((el) => el.name == name);
        return list.length > 0 ? list[0] : null;
    }
    removePlayer(sub = '') {

        if (typeof sub == 'string') {
            let index = -1;
            this.playerLis.forEach((el, i) => {
                if (el.name == sub) {
                    index = i;
                }
            });

            if (index >= 0) {
                this.playerLis.splice(index, 1);
            }

        }

        if (typeof sub == 'number') {
            this.playerLis.splice(sub, 1);
            return this.playerLis[sub];
        }

    }
    get() {
        return this.playerLis;
    }
}



module.exports = Room