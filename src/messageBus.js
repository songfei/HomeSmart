

let messageMap = {}

/**
 * 发送消息给订阅者
 * 
 * @param {String} receiverId  接受消息者的Id， null表示发送给所有人
 * @param {String} name 消息名称
 * @param {Object} info 附加信息
 */
function sendMessage(receiverId, name, info) {
    let message = messageMap[name];
    if(message) {
        if (!receiverId) {
            for(let j in message) {
                let handlers = message[j];
                for (let i in handlers) {
                    let handle = handlers[i];
                    handle(info);
                }
            }
        }
        else {
            let handlers = message[receiverId];
            for (let i in handlers) {
                let handle = handlers[i];
                handle(info);
            }
        }
    }
}

/**
 * 订阅消息
 * 
 * @param {String} receiverId 接受消息者的Id，一般填自己的Id， （填null时只有发送给所有人的消息才能收到，而且不能移除消息，不建议填null）
 * @param {String} name 消息名称
 * @param {Function} handler 处理函数
 */
function subscribeMessage(receiverId, name, handler) {
    let message = messageMap[name];
    if(!message) {
        message = {};
    }

    if (!receiverId) {
        receiverId = '***';
    }
    let handlers = message[receiverId];
    if(!handlers) {
        handlers = [];
    }
    handlers.push(handler);

    message[receiverId] = handlers;
    messageMap[name] = message;
}

module.exports = {
    sendMessage,
    subscribeMessage,
};