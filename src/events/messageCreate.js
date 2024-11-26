const {Events} = require("discord.js");

module.exports = {
    name: Events.MessageCreate,
    once: false,
    execute(message) {
        if(message.content === 'kaskrout') {
            message.reply('7lowww');
        }
    }
}