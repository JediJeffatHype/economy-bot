const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('sussy'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};