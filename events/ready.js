module.exports = (client) => {
	client.user.setPresence({ game: { name: `Watching ${client.guilds.reduce((m, g) => m += g.memberCount, 0)} Users`, type: 'streaming', url: 'https://www.twitch.tv/runez' } }); 	console.log(`Client Logged in as: ${client.user.tag} with the ID: ${client.user.id}`);
	console.log(`| Client Guilds: ${client.guilds.size} | Client Users: ${client.guilds.reduce((m, g) => m += g.memberCount, 0)} Users. |`);
	console.log('Invite Link: https://discordapp.com/api/oauth2/authorize?client_id=556921796801200163&scope=bot&permissions=8');

};