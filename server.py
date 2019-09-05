
import json

import socket

sock = socket.socket()
sock.bind(('', 9099))
sock.listen(1)




while True:
    conn, addr = sock.accept()
    print('connected:', addr)

    raw_data = conn.recv(1024)
    data = json.loads(raw_data.decode("utf-8"))
    print(data)
    print(data['sender'])

    print(data['instruction'][0])
    if data['sender'] == 'test1':
        break
    conn.close()