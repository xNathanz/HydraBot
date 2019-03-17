const fs = require('fs');
const moment = require('moment');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const settings = require('./settings.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	client.user.setPresence({ game: { name: '!help | Hydra', type: 'streaming', url: 'https://www.twitch.tv/runez' } }); 	console.log(`Client Logged in as: ${client.user.tag} with the ID: ${client.user.id}`);
	console.log(`| Client Guilds: ${client.guilds.size} | Client Users: ${client.guilds.reduce((m, g) => m += g.memberCount, 0)} Users. |`);
	console.log('Invite Link: https://discordapp.com/api/oauth2/authorize?client_id=556921796801200163&scope=bot&permissions=8');
});

client.on('guildMemberAdd', member => {
	const channel = member.guild.channels.find(ch => ch.name === settings.memberlog);
	if (channel) {
		const membericon = member.user.avatarURL;
		const jEmbed = new Discord.RichEmbed()
			.setColor('#28c935')
			.setDescription(`${member.user.tag} Has joined ${member.guild.name}`)
			.setFooter(`User creation date: ${moment(member.user.createdAt).format('Do MMMM YYYY, h:mm a')}`, (membericon));
		channel.send(jEmbed);
	}
});

client.on('guildMemberRemove', member => {
	const channel = member.guild.channels.find(c => c.name === settings.memberlog);
	if (channel) {
		const lEmbed = new Discord.RichEmbed()
			.setColor('#c40404')
			.setDescription(`${member.user.tag} Has left ${member.guild.name}`)
			.setTimestamp();
		channel.send(lEmbed);
	}
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}

});

client.login(token);