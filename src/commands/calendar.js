const { SlashCommandBuilder } = require("discord.js");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
        .setName("calendar")
        .setDescription("Get today's date in the Islamic calendar"),
    async execute(interaction) {
        const apiUrl = "https://api.aladhan.com/v1/gToH";

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.data && data.data.hijri && data.data.hijri.date) {
                const hijriDate = data.data.hijri.date;
                await interaction.reply(`Today's Islamic date is: **${hijriDate}**`);
            } else {
                await interaction.reply("Sorry, I couldn't retrieve the Islamic date. Please try again later.");
            }
        } catch (error) {
            console.error("Error fetching data from API:", error);
            await interaction.reply("An error occurred while fetching the Islamic date. Please try again later.");
        }
    },
};
