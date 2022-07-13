const { SlashCommandBuilder } = require("@discordjs/builders");
const discord = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Help Menu"),
	run: async ({ client, interaction }) => {
		await interaction.editReply("play | stop | pause | resume | info | queue | skip")
	},
}