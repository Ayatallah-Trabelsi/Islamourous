const { Client, IntentsBitField, Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const client = new Client({
    intents: [IntentsBitField.Flags.Guilds],
});

// Load commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    client.commands.set(command.data.name, command);
}

// Handle interactions
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) {
        return interaction.reply({ content: "Command not found.", ephemeral: true });
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error("Error executing command:", error);
        await interaction.reply({
            content: "There was an error executing this command.",
            ephemeral: true,
        });
    }
});

// Login the bot
client.login(process.env.TOKEN);
