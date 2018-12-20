
import urllib.request, json
import bot_settings
import textwrap
import sqlite3
import datetime

conn = sqlite3.connect('db.sqlite3')
last_id = 0
timer = 3600
today = datetime.datetime.now()


with urllib.request.urlopen(bot_settings.VK_URL) as url:
    data = json.loads(url.read().decode())
    # post_id = data['response']['items'][i]['id']
    print(data['response']['items'])
    for i in range(0,10):
        post_id = data['response']['items'][i]['id']
        print(post_id)
        if data['response']['items'][i]['text'] != '':
            if data['response']['items'][i]['attachments'][0]['type'] == 'photo':
                print('PHOTO POST...')
                post_image = data['response']['items'][i]['attachments'][0]['photo']['sizes'][6]['url']
                post_name = textwrap.shorten(data['response']['items'][i]['text'], width=40, placeholder="...")
            if data['response']['items'][i]['attachments'][0]['type'] == 'link':
                print('LINK POST...')
                post_image = data['response']['items'][i]['attachments'][0]['link']['photo']['sizes'][6]['url']
                post_name = textwrap.shorten(data['response']['items'][i]['attachments'][0]['link']['title'], width=40, placeholder="...")

            if data['response']['items'][i]['attachments'][0]['type'] == 'video':
                try:
                    print('VIDEO POST...')
                    post_image = data['response']['items'][i]['attachments'][0]['video']['photo_640']
                    post_name = textwrap.shorten(data['response']['items'][i]['text'], width=40, placeholder="...")
                except:
                    pass


            post_url = 'https://vk.com/scum_survival?w=wall' + str(data['response']['items'][i]['from_id']) + '_' + str(data['response']['items'][i]['id'])

            print(post_name)
            print(post_url)
            print(post_id)
            print(post_image)

            cursor = conn.cursor()
            print(cursor)
            cursor.execute("SELECT post_id FROM news_news WHERE post_id=(?)", (post_id,))
            result = cursor.fetchall()
            if result:
                print('пост уже есть в базе')
            else:
                print('новый пост')
                cursor.execute("INSERT INTO news_news ( post_id, post_name, post_url, post_image,post_local,created_at) VALUES ( ?,?,?,?,?,?);", ( post_id, post_name, post_url, post_image,False,today ))
                conn.commit()
conn.close()



