import "dotenv/config";

import {
  Client,
  Events,
  GatewayIntentBits,
} from "discord.js";

const token = process.env.DISCORD_TOKEN;

if (!token) {
  throw new Error("DISCORD_TOKEN이 설정되지 않았습니다.");
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
  ],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`${readyClient.user.tag} 로그인 완료`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) {
    return;
  }

  if (interaction.commandName === "ping") {
    const latency = Date.now() - interaction.createdTimestamp;

    await interaction.reply(
      `Pong! 응답 시간: ${latency}ms`,
    );
  }
});

client.login(token).catch((error: unknown) => {
  console.error("Discord 로그인에 실패했습니다.");
  console.error(error);
  process.exit(1);
});