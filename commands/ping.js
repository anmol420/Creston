const { SlashCommandBuilder } = require("@discordjs/builders");
const discord = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Bot's Ping"),
	run: async ({ client, interaction }) => {
		await interaction.editReply(`${interaction.client.ws.ping}ms`)
	},
}
