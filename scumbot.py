


import random
import asyncio
import aiohttp
import json
from discord import Game
from discord.ext.commands import Bot
import sqlite3

conn = sqlite3.connect('C:\/Users\ххх\PycharmProjects\gamescumsite\db.sqlite3')

BOT_PREFIX = ("?", "!")
TOKEN = 'NTIyNjc0NDMzMjc0Njc1MjEx.DvOzsg.xFzEhfWc1FdNMqA0Qb9zu2RlMDw'

client = Bot(command_prefix=BOT_PREFIX)

@client.command(name='8ball',
                description="Answers a yes/no question.",
                brief="Answers from the beyond.",
                aliases=['eight_ball', 'eightball', '8-ball'],
                pass_context=True)
async def eight_ball(context):
    possible_responses = [
        'That is a resounding no',
        'It is not looking likely',
        'Too hard to tell',
        'It is quite possible',
        'Definitely',
    ]
    await client.say(random.choice(possible_responses) + ", " + context.message.author.mention)


@client.command(pass_context=True)
async def test(ctx):

    await client.say(ctx.message.author.mention + ',' + ctx.message.author.id + ', ' + ctx)


@client.event
async def on_ready():
    await client.change_presence(game=Game(name="with humans"))
    print("Logged in as " + client.user.name)


@client.command()
async def bitcoin():
    url = 'https://api.coindesk.com/v1/bpi/currentprice/BTC.json'
    async with aiohttp.ClientSession() as session:  # Async HTTP request
        raw_response = await session.get(url)
        response = await raw_response.text()
        response = json.loads(response)
        await client.say("Bitcoin price is: $" + response['bpi']['USD']['rate'])

@client.command()
async def activate(steamid):
    cursor = conn.cursor()
    cursor.execute("SELECT steamid FROM authentication_steamuser WHERE steamid=(?)", (steamid,))
    result = cursor.fetchall()
    if result:
        cursor.execute("UPDATE authentication_steamuser SET discord_id = (?) WHERE steamid = (?); ", (dis, steamid,))
    else:
        result = 'Нет steamid'
    print(result)
    conn.commit()

    conn.close()
    await client.say(steamid)

    conn.close()


async def list_servers():
    await client.wait_until_ready()
    while not client.is_closed:
        print("Current servers:")
        for server in client.servers:
            print(server.name)
        await asyncio.sleep(100)


client.loop.create_task(list_servers())
client.run(TOKEN)