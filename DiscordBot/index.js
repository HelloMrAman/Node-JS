import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();
import openai from 'openai';

//Open-AI configuration
const api = new openai.OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

//Discord bot configuration
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    try {
        // Send the user's message to OpenAI
        const response = await api.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: message.content }
            ],
        });

        const reply = response.choices[0].message.content;

        // Send ChatGPT's reply to Discord
        message.reply({
            content: reply,
        });
    } catch (error) {
        console.error("Error with OpenAI API:", error);
        message.reply({
            content: "I'm sorry, something went wrong while processing your message.",
        });
    }
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commandName === "ping") {
        interaction.reply("Pong!!");
    }
});

client.login(process.env.TOKEN);