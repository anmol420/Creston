require("dotenv").config();
const Discord = require("discord.js");
const fs = require("fs");
const { Client , Intents } = require('discord.js');
const client = new Client({
    intents: [
        "GUILDS",
        "GUILD_VOICE_STATES"
    ]
});
const { Player } = require("discord-player");
const express = require("express");
const cors = require("cors");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const app = express();
app.use(cors());
app.get("/", (req, res) => {
	res.send({
		name: "creston",
		author: "Anmol Anand",
	});
});

client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
});

client.slashcommands = new Discord.Collection()
const slashFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"))
for (const file of slashFiles){
    const slashcmd = require(`./commands/${file}`)
    client.slashcommands.set(slashcmd.data.name, slashcmd)
}

client.on("interactionCreate", (interaction) => {
    async function handleCommand() {
        if (!interaction.isCommand()) return

        const slashcmd = client.slashcommands.get(interaction.commandName)
        if (!slashcmd) interaction.reply("Not a valid slash command")

        await interaction.deferReply()
        await slashcmd.run({ client, interaction })
    }
    handleCommand()
})

client.on('ready', async client =>{
    console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setActivity(`/help`, { type: "LISTENING" });

		const commands = [];
		const commandFiles = fs
			.readdirSync("./commands")
			.filter((file) => file.endsWith(".js"));

		for (const file of commandFiles) {
			command = require(`./commands/${file}`);
			commands.push(command.data.toJSON());
		}

		const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

		(async () => {
			try {
				await rest.put(
					Routes.applicationCommands(process.env.clientId),
					{ body: commands }
				);

				console.log("Successfully registered application commands.");
			} catch (error) {
				console.error(error);
			}
		})();
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isSelectMenu()) return;

	if (interaction.customId === "help_menu") {
		let msg = await interaction.channel.messages.fetch(
			interaction.message.id
		);

		if (interaction.values[0] === "music") {
			await interaction.deferUpdate();

			const music = new Discord.MessageEmbed()
			.setTitle(":musical_note: Music")
			.setDescription("`play` | `stop` | `pause` | `resume` | `info` | `queue` | `skip`")
			.setThumbnail(interaction.client.user.displayAvatarURL())
			.setColor("YELLOW");
			await msg.edit({
				embeds: [music]
			});
		} else if (interaction.values[0] === "system") {
			await interaction.deferUpdate();

			const system = new Discord.MessageEmbed()
			.setTitle(":robot: System")
			.setDescription("`ping` | `invite` | `support`")
			.setThumbnail(interaction.client.user.displayAvatarURL())
			.setColor("YELLOW");
			await msg.edit({
				embeds: [system]
			});
		}
	}
});

/*client.commands.delete('')*/

client.login(process.env.TOKEN);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`server running on port: ${port}`);
});
