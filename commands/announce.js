const Discord = require('discord.js');
const settings = require('../settings');

module.exports = {
	name: 'announce',
	description: 'Announcement for the server',
	usage: '<title message>, <description>, <link of title>, <main image>, <footer image>, <Field Title>, <field>',
	exec: async (message) => {
		const rest_of_the_string = message.content.slice('!announce'.length);
		const array_of_arguments = rest_of_the_string.split(',');
		const embed = new Discord.RichEmbed()
			.setTitle(array_of_arguments[0])
			.setDescription(array_of_arguments[1])
			.setImage(array_of_arguments[3])
			.setURL(array_of_arguments[2])
			.addField(array_of_arguments[4], array_of_arguments[5])
			.setColor(0x00AE86)
			.setFooter(`${message.author.tag}`, array_of_arguments[3])
			.setTimestamp();

		const announcechannel = message.guild.channels.find(s => s.name === settings.announcechannel);

		if (!announcechannel) return message.channel.send('Announcement channel cannot be found', [(announcechannel)]);
		announcechannel.send(embed);
		message.delete();
	},
};