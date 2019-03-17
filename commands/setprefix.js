const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
	name: 'setprefix',
	description: 'Set the prefix of the server!',
	execute(message, args) {
		if (!message.member.hasPermission('MANAGE_GUILD')) {
			const hEmbed = new Discord.RichEmbed()
				.setColor('#c40404')
				.addDescription('Permission Denied!');
			message.channel.send(hEmbed);
		}
		if(!args[0] || args[0 == 'help']) return message.reply('Usage: !prefix <prefix here>');

		const prefixes = JSON.parse(fs.readFileSync('../prefixes.json', 'utf8'));

		prefixes[message.guild.id] = {
			prefixes: args[0],
		};

		fs.writeFile('../prefixes.json', JSON.stringify(prefixes), (err) => {
			if (err) console.log(err);
		});

		const sEmbed = new Discord.RichEmbed()
			.setColor('#8e0f08')
			.setTitle('Prefix Set!')
			.setDescription(`Set to ${args[0]}`);
		message.channel.send(sEmbed);
	},
};