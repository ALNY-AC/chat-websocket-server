
const routerList = {};

class Router {
    constructor() {
    }
    static add(routerName, behavior) {
        routerList[routerName] = behavior;
    }
    trigger(clientMsg, player) {

        let behavior = routerList[clientMsg.path];
        if (typeof behavior == 'string') {

            let file = behavior.split('@')[0];
            let methods = behavior.split('@')[1];
            const Component = require(`../app/component/${file}`);

            player.setClientMsg(clientMsg);
            const comp = new Component();
            comp.setPlayer(player);
            comp.setClientMsg(clientMsg);
            comp.setData(clientMsg.data);
            comp.setClientComponent(clientMsg.component);
            return comp[methods](clientMsg, player);

        }
        if (typeof behavior == 'function') {
            return behavior(data, clientMsg.component);
        }

    }
}



module.exports = Router;