const { SlashCommandBuilder } = require("discord.js");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
        .setName("asma")
        .setDescription("Fetch a specific name from the 99 Names of Allah (Al-Asma ul-Husna)")
        .addIntegerOption((option) =>
            option
                .setName("number")
                .setDescription("Number of the name (1-99)")
                .setRequired(false)
        ),
    async execute(interaction) {
        const number = interaction.options.getInteger("number") || 1;
        const apiUrl = `https://api.islamicdevelopers.com/v1/al-asma-ul-husna?number=${number}`;

        console.log(`Fetching from URL: ${apiUrl}`); // Debug: Check the API request URL

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            console.log("API Response:", data); // Debug: Log API response

            // Validate the response structure
            if (data.native && data.latin) {
                await interaction.reply(
                    `**Name ${number}**\n**Arabic:** ${data.native}\n**Transliteration:** ${data.latin}`
                );
            } else {
                await interaction.reply(
                    "Sorry, I couldn't fetch the requested name. Ensure the number is between 1 and 99."
                );
            }
        } catch (error) {
            console.error("Error fetching data from API:", error);
            await interaction.reply("An error occurred while fetching the name. Please try again later.");
        }
    },
};
