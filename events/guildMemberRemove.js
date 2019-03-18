const Discord = require('discord.js');

module.exports = (client, member) => {
	const settings = require('../settings.json');
	const channel = member.guild.channels.find(c => c.name === settings.memberlog);
	if (channel) {
		const lEmbed = new Discord.RichEmbed()
			.setColor('#c40404')
			.setDescription(`${member.user.tag} Has left ${member.guild.name}`)
			.setTimestamp();
		channel.send(lEmbed);
	}
};