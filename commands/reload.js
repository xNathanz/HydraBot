const Discord = require('discord.js');

module.exports = {
	name: 'reload',
	description: 'Reload a singular file',
	usage: '<file>',
	exec: async (message, args) => {
		if (message.author.id !== '121270635191205888') return message.channel.send('You are not the bot owner!');

		if (!args[0]) return message.channel.send('Please specify a file to reload!');

		const commandName = args[0].toLowerCase();

		try {
			delete require.cache[require.resolve(`./${commandName}.js`)];
			message.client.commands.delete(commandName);
			const pull = require(`./${commandName}.js`);
			message.client.commands.set(commandName, pull);
		}
		catch(e) {
			const cEmbed = new Discord.RichEmbed()
				.setColor('#c40404')
				.setDescription(`Could not reload: **${args[0].toUpperCase()}**`);
			message.channel.send(cEmbed);
			message.delete();
			return;
		}
		const aEmbed = new Discord.RichEmbed()
			.setColor('#28c935')
			.setDescription(`The command: **${args[0].toUpperCase()}** Has been reloaded.`);
		message.channel.send(aEmbed);
		message.delete();
	},
};