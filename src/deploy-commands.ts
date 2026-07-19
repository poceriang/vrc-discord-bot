import  "dotenv/config"

import {
    REST,
    Routes,
    SlashCommandBuilder,
} from "discord.js"

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.DISCORD_CLIENT_ID;
const guildId = process. env.DISCORD_GUILD_ID;

if(!token) 
{
    throw new Error("DISCORD_TOKEN 오류");
}

if(!clientId)
{
    throw new Error("DISCORD_CLIENT_ID 오류");
}

if(!guildId)
{
    throw new Error("DISCORD_GUILD_ID 오류");
}

const commands = [
    new SlashCommandBuilder()
        .setName("ping")
        .setDescription("ping test"),
].map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(token);

async function deployCommands(): Promise<void> {
    
    console.log("슬래시 명령어 등록을 시작합니다.");

    await rest.put(
        Routes.applicationGuildCommands(clientId!, guildId!),
        {
            body: commands,
        },
    );

    console.log("등록 성공");
};

deployCommands().catch((error:unknown) => {
    console.error("등록 실패");
    console.error(error);
    process.exit(1);
});
