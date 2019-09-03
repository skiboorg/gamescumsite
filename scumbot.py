import json

from lxml import html
import requests
import bot_settings
import random
import asyncio
from datetime import datetime, timedelta

import discord
from discord import Game
from discord.ext.commands import Bot
import sqlite3


conn = sqlite3.connect(bot_settings.DB_PATH, timeout=10)
cursor = conn.cursor()

DEV_MODE = False
BOT_PREFIX = ("?", "!")
TOKEN = bot_settings.BOT_TOKEN

client = Bot(command_prefix=BOT_PREFIX)
client.remove_command('help')


@client.command(name='help')
async def help():
    pass

if not DEV_MODE:
    @client.event
    async def on_ready():
        await client.change_presence(game=Game(name="c Вами 😉 "))
        print("Logged in as " + client.user.name)


    @client.command(pass_context=True)
    async def zp(ctx):
        conn = sqlite3.connect(bot_settings.DB_PATH)
        cursor = conn.cursor()
        player_discord_id = str(ctx.message.author.id)
        user = ctx.message.author
        print('ZP request')
        try:
            cursor.execute("SELECT steamid FROM authentication_steamuser WHERE discord_id=(?)", (player_discord_id,))
            steam_id = cursor.fetchone()[0]
            print('ZP request from: ', steam_id)
        except:
            steam_id = False
        if steam_id:
            print('SteamID FOUND')
            cursor.execute("SELECT last_zp FROM authentication_steamuser WHERE discord_id=(?)", (player_discord_id,))

            last_zp = datetime.strptime(cursor.fetchone()[0].split('.')[0], '%Y-%m-%d %H:%M:%S')

            print(last_zp)
            print(datetime.now())
            print(last_zp < datetime.now())

            if last_zp < datetime.now():
                new_zp = datetime.now() + timedelta(days=1)
                print(new_zp)
                cursor.execute("UPDATE authentication_steamuser SET last_zp = (?) WHERE discord_id = (?); ",
                               (new_zp, player_discord_id,))
                print('ZP is gived to player')
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
                    cursor.execute("SELECT vip_start FROM authentication_steamuser WHERE discord_id=(?)", (player_discord_id,))

                    vip_start = datetime.strptime(cursor.fetchone()[0].split('.')[0], '%Y-%m-%d')
                    print('vip_start + timedelta(days=30)')
                    print(vip_start + timedelta(days=30))
                    print('datetime.now()')
                    print(datetime.now())
                    if vip_start + timedelta(days=30) < datetime.now():
                        print('vip end')
                        await client.send_message(user,
                                                  'Срок действия VIP статуса закончен')
                        cursor.execute("UPDATE authentication_steamuser SET vip = (?) WHERE discord_id = (?); ",
                                       (0, player_discord_id,))
                        player_rating += 1
                        to_pay = 25 + (player_level * 5)
                        player_wallet += to_pay
                        await client.send_message(user,
                                                  'Выплата в размере {} RC выдана. Текущий баланс {} RC'.format(str(to_pay),
                                                                                                                str(
                                                                                                                    player_wallet)))
                        cursor.execute("UPDATE authentication_steamuser SET rating = (?) WHERE discord_id = (?); ",
                                       (player_rating, player_discord_id,))
                        cursor.execute("UPDATE authentication_steamuser SET wallet = (?) WHERE discord_id = (?); ",
                                       (player_wallet, player_discord_id,))

                    else:
                        print('vip ')
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
                    to_pay = 25 + (player_level * 5)
                    player_wallet += to_pay
                    await client.send_message(user, 'Выплата в размере {} RC выдана. Текущий баланс {} RC'.format(str(to_pay), str(player_wallet)))
                    cursor.execute("UPDATE authentication_steamuser SET rating = (?) WHERE discord_id = (?); ",
                                   (player_rating, player_discord_id,))
                    cursor.execute("UPDATE authentication_steamuser SET wallet = (?) WHERE discord_id = (?); ",
                                   (player_wallet, player_discord_id,))

                conn.commit()
                conn.close()
            else:
                print('ZP complete')
                await client.send_message(user, 'Выплата доступна 1 раз в сутки. Получить выплату можно после : {}'.format(str(last_zp)))

        else:
            print('SteamID not FOUND')
            await client.send_message(user, 'Аккаунт не активирован!')
        conn.close()


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


    @client.command(pass_context=True)
    async def stat(ctx):
        conn = sqlite3.connect(bot_settings.DB_PATH)
        cursor = conn.cursor()
        player_discord_id = str(ctx.message.author.id)
        user = ctx.message.author

        try:
            cursor.execute("SELECT steamid FROM authentication_steamuser WHERE discord_id=(?)", (player_discord_id,))
            steam_id = cursor.fetchone()[0]
            print(steam_id)
        except:
            steam_id = False
        if steam_id:
            print('Аккаунт найден')

            cursor.execute("SELECT id FROM authentication_steamuser WHERE discord_id=(?)", (player_discord_id,))
            player_id = cursor.fetchone()[0]
            cursor.execute("SELECT personaname FROM authentication_steamuser WHERE discord_id=(?)", (player_discord_id,))
            player_nick = cursor.fetchone()[0]
            cursor.execute("SELECT level FROM authentication_steamuser WHERE discord_id=(?)", (player_discord_id,))
            player_level = cursor.fetchone()[0]
            cursor.execute("SELECT wallet FROM authentication_steamuser WHERE discord_id=(?)", (player_discord_id,))
            player_wallet = cursor.fetchone()[0]
            cursor.execute("SELECT rating FROM authentication_steamuser WHERE discord_id=(?)", (player_discord_id,))
            player_rating = cursor.fetchone()[0]
            cursor.execute("SELECT kills FROM authentication_steamuser WHERE discord_id=(?)", (player_discord_id,))
            player_kills = cursor.fetchone()[0]
            cursor.execute("SELECT deaths FROM authentication_steamuser WHERE discord_id=(?)", (player_discord_id,))
            player_deaths = cursor.fetchone()[0]
            cursor.execute("SELECT avatarmedium FROM authentication_steamuser WHERE discord_id=(?)", (player_discord_id,))
            player_avatar = cursor.fetchone()[0]
            cursor.execute("SELECT vip FROM authentication_steamuser WHERE discord_id=(?)", (player_discord_id,))
            player_vip = cursor.fetchone()[0]

            try:
                cursor.execute("SELECT squad_id FROM squads_squadmembers WHERE player_id=(?)", (player_id,))
                player_squad_id = cursor.fetchone()[0]
                print('player_squad_id')
                print(player_squad_id)
                is_player_in_squad = True
            except:
                is_player_in_squad = False

            if is_player_in_squad:
                cursor.execute("SELECT name FROM squads_squad WHERE id=(?)", (player_squad_id,))
                player_squad_name = cursor.fetchone()[0]

            embed = discord.Embed()
            embed.set_thumbnail(
                url=player_avatar)
            embed.set_image(url="https://cdn.discordapp.com/attachments/524819840515702808/593691053165379614/logo.png")
            embed.add_field(name="**Уровень : " + str(player_level) + "**",
                            value="================================")
            embed.add_field(name="**Рейтинг : " + str(player_rating) + "**",
                            value="================================")
            embed.add_field(name="**Баланс : " + str(player_wallet) + "**",
                            value="================================")
            embed.add_field(name="**Убийств : " + str(player_kills) + " | " + "Смертей : " + str(player_deaths) + "**",
                            value="================================")

            if is_player_in_squad:
                embed.add_field(name="**Отряд : " + str(player_squad_name) + "**",
                            value="================================")
            else:
                embed.add_field(name="**Отряд : НЕТ**",
                                value="================================")

            if player_vip:
                cursor.execute("SELECT vip_start FROM authentication_steamuser WHERE discord_id=(?)", (player_discord_id,))

                vip_start = datetime.strptime(cursor.fetchone()[0].split('.')[0], '%Y-%m-%d')
                if vip_start + timedelta(days=30) < datetime.now():
                    print('vip end')
                    await client.send_message(user,
                                              'Срок действия VIP статуса закончен')
                    cursor.execute("UPDATE authentication_steamuser SET vip = (?) WHERE discord_id = (?); ",
                                   (0, player_discord_id,))
                    embed.add_field(name="**Статус VIP : ЗАКОНЧЕН СРОК ДЕЙСТВИЯ**",
                                    value="================================")
                else:

                    embed.add_field(name="**Статус VIP до : " + str(vip_start + timedelta(days=30)) + "**",
                                value="================================")
            else:
                embed.add_field(name="**Статус VIP : НЕТ**",
                            value="================================")

            await client.say(content="================Статистика игрока " + player_nick +" ================", embed=embed)
        else:
            print('Аккаунт не активирован!')
            await client.send_message(user, 'Аккаунт не активирован!')
        conn.close()

    @client.command()
    async def server():

        page = requests.get(bot_settings.SERVER_URL)
        tree = html.fromstring(page.content)
        players = tree.xpath('//*[@id="serverPage"]/div[1]/div/dl/dd[2]/text()')
        rank = tree.xpath('//*[@id="serverPage"]/div[1]/div/dl/dd[1]/text()')
        name = tree.xpath('//*[@id="serverPage"]/h2/text()')
        ip = tree.xpath('//*[@id="serverPage"]/div[1]/div/dl/dd[3]/text()')
        embed = discord.Embed(title="RU/EU SURVIVAL PvP [HARDCORE] discord.me/scumsurvival",
                              colour=discord.Colour(0xa1885c), url="https://www.battlemetrics.com/servers/scum/3163030",
                              description="[Наш сайт](http://www.gamescum.ru) | [ВК](https://vk.com/scum_survival) | [Steam](https://steamcommunity.com/app/513710/discussions/4/3104564981115010821/) | [Discord](https://discord.gg/sgUz53k)")

        embed.set_image(url="https://cdn.discordapp.com/attachments/519049749656109086/541194143242911745/2.png")
        embed.set_thumbnail(
            url="https://cdn.discordapp.com/attachments/519049749656109086/525958386232197131/1logo_scum_survival.png")
        embed.set_author(name="𝕊ℂ𝕌𝕄 𝕊𝕌ℝ𝕍𝕀𝕍𝔸𝕃", url="https://discord.gg/sgUz53k",
                         icon_url="https://cdn.discordapp.com/attachments/519049749656109086/525399460793155588/zzz3z.png")
        embed.set_footer(text="ПРИСОЕДИНЯЙСЯ И ТЫ;)",
                         icon_url="https://cdn.discordapp.com/attachments/519049749656109086/525399460793155588/zzz3z.png")

        embed.add_field(name="**IP сервера : " + str(ip[0]) + "**",
                        value="================================")
        embed.add_field(name="**Плановые рестарты в: 02:30 и 14:30 МСК**",
                        value="================================")
        embed.add_field(name="**Ранг сервера:**", value=str(rank[0]), inline=True)
        embed.add_field(name="**Онлайн сервера**", value=str(players[0]), inline=True)

        await client.say(content="================Статистика сервера================", embed=embed)


    @client.command(pass_context=True)
    async def activate(ctx, steamid):
        if ctx.message.channel.is_private:
            conn = sqlite3.connect(bot_settings.DB_PATH)
            cursor = conn.cursor()
            steam_id = str(steamid)
            discord_nickname = str(ctx.message.author)
            discord_id = str(ctx.message.author.id)
            print('Activation request from: ', steam_id)

            cursor.execute("SELECT steamid FROM authentication_steamuser WHERE steamid=(?)", (steam_id,))
            result = cursor.fetchone()
            if result:
                cursor.execute("SELECT discord_id FROM authentication_steamuser WHERE steamid=(?)", (steam_id,))
                discordid = cursor.fetchone()[0]

                if discordid == None:
                    # cursor.execute("SELECT id FROM authentication_steamuser WHERE steamid=(?)", (steam_id,))
                    # player_number = cursor.fetchone()[0]
                    # if int(player_number) <= 100:
                    #     cursor.execute("SELECT wallet FROM authentication_steamuser WHERE steamid=(?)", (steam_id,))
                    #     player_wallet = 0
                    #     player_wallet = int(cursor.fetchone()[0])
                    #     player_wallet += 1000
                    #     cursor.execute("UPDATE authentication_steamuser SET wallet = (?) WHERE steamid = (?); ",
                    #                    (player_wallet, steam_id,))
                    #     await client.say('Тебе начислен бонус +1000 RC !')

                    cursor.execute("UPDATE authentication_steamuser SET discord_id = (?) WHERE steamid = (?); ",
                                   (discord_id, steam_id,))
                    cursor.execute("UPDATE authentication_steamuser SET discord_nickname = (?) WHERE steamid = (?); ",
                                   (discord_nickname, steam_id,))
                    conn.commit()
                    conn.close()

                    result = 'Activated:'

                    await client.say('Твой аккаунт активирован, спасибо за интерес, проявленный к нашему серверу!')
                else:
                    conn.close()
                    result = 'Activated already:'

                    await client.say('Твой аккаунт уже активирован ранее!')
            else:
                result = 'SteamID not found :'

                await client.say('Нет такого SteamID')
            print(result, steam_id)

        else:
            await client.say('Для активации аккаунта нужно отправить личное сообщение <@525364065933983744>')


async def get_players():
    await client.wait_until_ready()
    while not client.is_closed:
        server_response = requests.get('https://api.g-portal.com/gameserver/query/500119')
        json_data = json.loads(server_response.text)
        if json_data['online']:
            print('Server ONLINE... Get players')
            await client.change_presence(game=Game(name='SCUM {} / {}'.format(json_data['currentPlayers'],
                                                                                        json_data['maxPlayers'])))
        else:
            print('Server OFFLINE...')
            await client.change_presence(game=Game(name='Сервер OFFLINE'))
        await asyncio.sleep(60)

async def get_zone():
    await client.wait_until_ready()
    while not client.is_closed:
        cursor.execute("SELECT * FROM pages_warzone ")

        result = cursor.fetchall()
        print('Generating new warzone')
        totalItems = len(result)
        zoneNumber = random.randint(0, totalItems - 1)

        print(result[zoneNumber][0])

        cursor.execute("SELECT id FROM pages_warzone WHERE id=(?)", (zoneNumber,))
        result = cursor.fetchone()
        cursor.execute("UPDATE pages_warzone SET isActive = (?) WHERE id = (?); ",
                       (1, zoneNumber,))

        await client.send_message(client.get_channel('503982204074852352'), str(random.randint(1, 18)))

        await asyncio.sleep(10)



# async def list_servers():
#     await client.wait_until_ready()
#     while not client.is_closed:
#         print("Current servers:")
#         for server in client.servers:
#             print(server.name)
#         await asyncio.sleep(100)
#
#
client.loop.create_task(get_players())
client.run(TOKEN)