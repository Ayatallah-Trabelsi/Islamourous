const { REST, Routes } = require("discord.js");
require("dotenv").config();

const commands = [
    {
        name: "asma",
        description: "Fetch a specific name from the 99 Names of Allah (Al-Asma ul-Husna)",
        options: [
            {
                type: 4, // Integer type
                name: "number",
                description: "Number of the name (1-99)",
                required: false,
            },
        ],
    },
    {
        name: "calendar",
        description: "Get today's date in the Islamic calendar",
    },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("Started refreshing application (/) commands.");

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        );

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error("Error registering commands:", error);
    }
})();
