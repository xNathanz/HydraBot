module.exports = {
	name: 'stop',
	description: 'Stop the bot entirely.',
	usage: '-',
	exec: async (message) => {

		if (message.author.id !== '121270635191205888') return message.channel.send('You\'re not the bot owner!');

		try {
			await message.channel.send('**Bot is shutting down!**');
			process.exit();
		}
		catch(e) {
			message.channel.send('ERROR:' `${e.message}`);
		}
	},
};