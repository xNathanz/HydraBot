const prefixes = require('../prefixes');
const globalPrefix = require('../bot.js');

module.exports = {
	name: 'setprefix',
	description: 'Set the prefix of the server!',
	exec: async (message, args) => {
		if (args.length) {
			prefixes.set(message.guild.id, args[0]);
			return message.channel.send(`Successfully set prefix to \`${args[0]}\``);
		}

		return message.channel.send(`Prefix is \`${prefixes.get(message.guild.id) || globalPrefix}\``);

	},
};