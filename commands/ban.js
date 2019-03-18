const Discord = require('discord.js');
const settings = require('../settings.json');

module.exports = {
	name: 'ban',
	description: 'Ban a server from the server',
	usage: '<@user> <reason>',
	exec: async (message, args) => {
		const bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		const bReason = args.slice(1).join(' ');
		if (!message.member.hasPermission('BAN_MEMBERS')) {
			const oEmbed = new Discord.RichEmbed()
				.setColor('#8e0f08')
				.setDescription('Permission Denied!');
			message.channel.send(oEmbed);
			return;
		}
		if (!bUser) {
			const qEmbed = new Discord.RichEmbed()
				.setColor('#8e0f08')
				.setDescription('Couldnt find that user!');
			message.channel.send(qEmbed);
			return;
		}
		const bEmbed = new Discord.RichEmbed()
			.setTitle('Ban Log')
			.setColor('#8e0f08')
			.addField('Banned User', `${bUser} With ID: ${bUser.id}`)
			.addField('Banned By', `${message.author} With ID: ${message.author.id}`)
			.addField('Banned From:', message.channel)
			.addField('Time Banned:', message.createdAt)
			.addField('Reason', bReason);

		const kChannel = message.guild.channels.find(s => s.name === settings.banchannel);

		if (!kChannel) return message.channel.send('Punishment channel cannot be found', [(kChannel)]);

		message.guild.member(bUser).kick(bReason);
		kChannel.send(bEmbed);
		message.delete();
	},
};