const { SlashCommandBuilder } = require("@discordjs/builders");
const discord = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
    .setName("support")
    .setDescription("Bot's Support Server Link"),
	run: async ({ client, interaction }) => {
		await interaction.editReply('https://discord.gg/hwBTCQujAW')
	},
}
