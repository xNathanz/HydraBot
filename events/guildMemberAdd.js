const Discord = require('discord.js');
const moment = require('moment');

module.exports = (client, member) => {
	const settings = require('../settings.json');
	const channel = member.guild.channels.find(ch => ch.name === settings.memberlog);
	if (channel) {
		const membericon = member.user.avatarURL;
		const jEmbed = new Discord.RichEmbed()
			.setColor('#28c935')
			.setDescription(`${member.user.tag} Has joined ${member.guild.name}`)
			.setFooter(`User creation date: ${moment(member.user.createdAt).format('Do MMMM YYYY, h:mm a')}`, (membericon));
		channel.send(jEmbed);
	}
};