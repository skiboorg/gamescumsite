from lxml import html
import requests
import bot_settings
import random
import asyncio
from datetime import datetime, timedelta
import json
import discord
from discord import Game
from discord.ext.commands import Bot
import sqlite3

conn = sqlite3.connect(bot_settings.DB_PATH)
cursor = conn.cursor()

BOT_PREFIX = ("?", "!")
TOKEN = bot_settings.BOT_TOKEN

client = Bot(command_prefix=BOT_PREFIX)
client.remove_command('help')

@client.command(name='help')
async def help():
    pass

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
    await client.change_presence(game=Game(name="Я ЕСТЬ БОТ!"))
    print("Logged in as " + client.user.name)


@client.command(pass_context=True)
async def zp(ctx):
    player_discord_id = str(ctx.message.author.id)
    user = ctx.message.author


    try:
        cursor.execute("SELECT steamid FROM authentication_steamuser WHERE discord_id=(?)", (player_discord_id,))
        steam_id = cursor.fetchone()[0]
        print(steam_id)
    except:
        steam_id = False
    if steam_id:
        print('Аккаунт гайден')
        cursor.execute("SELECT last_zp FROM authentication_steamuser WHERE discord_id=(?)", (player_discord_id,))
        last_zp = datetime.strptime(cursor.fetchone()[0], '%Y-%m-%d %H:%M:%S.%f')
        print(last_zp)
        print(datetime.now())
        print(last_zp < datetime.now())

        if last_zp < datetime.now():
            new_zp = datetime.now() + timedelta(days=1)
            print(new_zp)
            cursor.execute("UPDATE authentication_steamuser SET last_zp = (?) WHERE discord_id = (?); ",
                           (new_zp, player_discord_id,))
            print('выдача')
            cursor.execute("SELECT rating FROM authentication_steamuser WHERE discord_id=(?)", (player_discord_id,))
            player_rating = cursor.fetchone()[0]
            print(player_rating)
            cursor.execute("SELECT wallet FROM authentication_steamuser WHERE discord_id=(?)", (player_discord_id,))
            player_wallet = cursor.fetchone()[0]
            print(player_wallet)
            cursor.execute("SELECT level FROM authentication_steamuser WHERE discord_id=(?)", (player_discord_id,))
            player_level = cursor.fetchone()[0]
            print(player_level)
            cursor.execute("SELECT vip FROM authentication_steamuser WHERE discord_id=(?)", (player_discord_id,))
            player_vip = cursor.fetchone()[0]
            print(player_vip)
            if player_vip:
                print('vip')
                player_rating += 2
                to_pay = 50 + (player_level * 5)
                player_wallet += to_pay
                await client.send_message(user,
                                          'VIP выплата в размере {} RC выдана. Текущий баланс {} RC'.format(str(to_pay),
                                                                                                        str(
                                                                                                            player_wallet)))
                cursor.execute("UPDATE authentication_steamuser SET rating = (?) WHERE discord_id = (?); ",
                               (player_rating, player_discord_id,))
                cursor.execute("UPDATE authentication_steamuser SET wallet = (?) WHERE discord_id = (?); ",
                               (player_wallet, player_discord_id,))


            else:
                print('notvip')

                player_rating += 1
                to_pay = 30 + (player_level * 5)
                player_wallet += to_pay
                await client.send_message(user, 'Выплата в размере {} RC выдана. Текущий баланс {} RC'.format(str(to_pay), str(player_wallet)))
                cursor.execute("UPDATE authentication_steamuser SET rating = (?) WHERE discord_id = (?); ",
                               (player_rating, player_discord_id,))
                cursor.execute("UPDATE authentication_steamuser SET wallet = (?) WHERE discord_id = (?); ",
                               (player_wallet, player_discord_id,))

            conn.commit()
        else:
            print('выдано')
            await client.send_message(user, 'Выплата доступна 1 раз в сутки.')

    else:
        print('Аккаунт не активирован!')


@client.command()
async def p():
    page = requests.get(bot_settings.SERVER_URL)
    tree = html.fromstring(page.content)
    players = tree.xpath('//*[@id="serverPage"]/div[1]/div/dl/dd[2]/text()')
    embed = discord.Embed(colour=discord.Colour(0x36393e),
                          description="\n```cs\n# Игроков онлайн : " + str(players[0])+ "\n```\nРестарты сервера в: 02:30 и 14:30 МСК")

    embed.set_thumbnail(
        url="https://cdn.discordapp.com/attachments/519049749656109086/525958386232197131/1logo_scum_survival.png")



    await client.say(embed=embed)


@client.command()
async def server():
    page = requests.get(bot_settings.SERVER_URL)
    tree = html.fromstring(page.content)
    players = tree.xpath('//*[@id="serverPage"]/div[1]/div/dl/dd[2]/text()')
    rank = tree.xpath('//*[@id="serverPage"]/div[1]/div/dl/dd[1]/text()')
    name = tree.xpath('//*[@id="serverPage"]/h2/text()')
    ip = tree.xpath('//*[@id="serverPage"]/div[1]/div/dl/dd[3]/text()')
    await client.say('**Название сервера** : ' + str(name[0]) + '\n' +
                     '**Ранг сервера** : ' + str(rank[0]) + '\n' +
                     '**Игроков** : ' + str(players[0]) + '\n' +
                     '**IP сервера** : ' + str(ip[0]) + '\n' +
                     '----------------------------------\n' +
                     '3 реальных часа - 1 игровой день\n' +
                     '**Рестарты сервера в: 02:30 и 14:30 МСК**\n' +
                     '----------------------------------\n' +
                     '**Группа ВК** : https://vk.com/scum_lasthero\n' +
                     '**Сайт** : http://www.gamescum.ru/')


@client.command(pass_context=True)
async def activate(ctx, steamid):
    if ctx.message.channel.is_private:
        steam_id = str(steamid)
        discord_nickname = str(ctx.message.author)
        discord_id = str(ctx.message.author.id)

        cursor.execute("SELECT steamid FROM authentication_steamuser WHERE steamid=(?)", (steam_id,))
        result = cursor.fetchone()
        if result:
            cursor.execute("SELECT discord_id FROM authentication_steamuser WHERE steamid=(?)", (steam_id,))
            discordid = cursor.fetchone()[0]

            if discordid == None:
                cursor.execute("SELECT id FROM authentication_steamuser WHERE steamid=(?)", (steam_id,))
                player_number = cursor.fetchone()[0]
                if int(player_number) <= 100:
                    cursor.execute("SELECT wallet FROM authentication_steamuser WHERE steamid=(?)", (steam_id,))
                    player_wallet = 0
                    player_wallet = int(cursor.fetchone()[0])
                    player_wallet += 1000
                    cursor.execute("UPDATE authentication_steamuser SET wallet = (?) WHERE steamid = (?); ",
                                   (player_wallet, steam_id,))
                    await client.say('Тебе начислен бонус +1000 RC !')

                cursor.execute("UPDATE authentication_steamuser SET discord_id = (?) WHERE steamid = (?); ",
                               (discord_id, steam_id,))
                cursor.execute("UPDATE authentication_steamuser SET discord_nickname = (?) WHERE steamid = (?); ",
                               (discord_nickname, steam_id,))
                conn.commit()

                result = 'Активирован'
                await client.say('Твой аккаунт активирован, спасибо за интерес, проявленный к нашему серверу!')
            else:
                await client.say('Твой аккаунт уже активирован ранее!')
        else:
            result = 'Нет steamid'
            await client.say('Нет такого SteamID')
        print(result)
    else:
        await client.say('Для активации аккаунта нужно отправить личное сообщение <@525364065933983744>')









# async def list_servers():
#     await client.wait_until_ready()
#     while not client.is_closed:
#         print("Current servers:")
#         for server in client.servers:
#             print(server.name)
#         await asyncio.sleep(100)
#
#
# client.loop.create_task(list_servers())
client.run(TOKEN)