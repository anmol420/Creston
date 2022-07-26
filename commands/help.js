const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Help Menu"),
	run: async ({ client, interaction }) => {
		const menu = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageSelectMenu()
            .setCustomId('help_menu')
            .setPlaceholder('Help')
            .setMaxValues(1)
            .setMaxValues(1)
            .addOptions([
                {
                    label : "Music",
                    description : "Show's All The Music Commands",
                    value : "music",
                    emoji : "1️⃣"
                },
                {
                    label : "Sytem",
                    description : "Show's All The Bot's System Commands",
                    value : "system",
                    emoji: "2️⃣"
                }
            ])
        )

        const buttons = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setLabel('Invite Me !')
            .setURL('https://google.com')
            .setStyle('LINK'),
            new Discord.MessageButton()
            .setLabel('Need Support ?')
            .setURL('https://discord.com')
            .setStyle('LINK')
        );

        const help = new Discord.MessageEmbed()
        .setTitle('Help ??')
        .setURL('https://discord.com')
        .setDescription('\`\`\`Use the Drop Down Menu and Explore the Corresponding Category \`\`\` \nHi! Thanks For Inviting Me In Your Server! \n• Juke Completely Runs On Slash Commands\n• To contact my Developers : `/support`\n• By Support command you can request for some features too\n• To add Me in your sever you can [click here](https://discord.com/) ')
        .setColor('BLURPLE')
        
        await interaction.editReply({
            embeds : [help],
            components : [menu , buttons]
        });
	},
}

//await interaction.editReply("play | stop | pause | resume | info | queue | skip | ping | invite | support")
