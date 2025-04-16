import discord
import os

TOKEN = "MTM2MTg2NTQ1NzI1ODMzMjl4MQ.GfhbDg.vtbdPH1uQxRBSji3Kmf1eMwENF74mCAzwPTt4"
client = discord.Client(intents=discord.Intents.all())

@client.event
async def on_ready():
    print(f"Bot online as {client.user}")

@client.event
async def on_message(message):
    if message.author == client.user: return
    if message.content.startswith("!sendbuild"):
        file_path = message.content.split(" ")[1]
        if os.path.exists(file_path):
            await message.author.send("Here's your build:", file=discord.File(file_path))
        else:
            await message.channel.send("Build not found.")

client.run(TOKEN)
