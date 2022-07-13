const { SlashCommandBuilder } = require("@discordjs/builders");
const discord = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Bot's Invite Link"),
	run: async ({ client, interaction }) => {
		await interaction.editReply('https://discord.com/api/oauth2/authorize?client_id=996747348178907177&permissions=139623524704&scope=bot%20applications.commands')
	},
}
