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
const { clientId, guildId } = require("./config.json");

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
					Routes.applicationCommands(clientId),
					{ body: commands }
				);

				console.log("Successfully registered application commands.");
			} catch (error) {
				console.error(error);
			}
		})();
});

/*client.commands.delete('')*/

client.login(process.env.TOKEN);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`server running on port: ${port}`);
});
