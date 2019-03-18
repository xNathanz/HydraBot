const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
	name: 'info',
	description: 'Display the current servers information.',
	usage: '',
	// eslint-disable-next-line no-unused-vars
	exec: async (message, args) => {
		const servericon = message.guild.iconURL;
		const serverEmbed = new Discord.RichEmbed()
			.setColor('#0099ff')
			.setTitle(`${message.member.client.user.username}`)
			.setDescription('Multi purpose Discord bot, Click above for our support Discord.')
			.setURL('https://discord.gg/TWxeQGx')
			.addField('Creator', 'xNathanz#3092', true)
			.addField('Guilds', `${message.member.client.guilds.size}`, true)
			.addField('Total Users', `${message.member.client.guilds.reduce((m, g) => m += g.memberCount, 0)}`, true)
			.setThumbnail(servericon)
			.setFooter(`ID: ${message.member.client.user.id} | Bot Created - ${moment(message.member.client.user.createdAt).format('DD/MM/YYYY')}`, (servericon));
		message.channel.send(serverEmbed);

	},
};