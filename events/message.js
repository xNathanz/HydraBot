module.exports = (client, message) => {
	if (!message.content.startsWith(client.config.prefix) || message.author.bot) return;

	const args = message.content.slice(client.config.prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).exec(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}

};