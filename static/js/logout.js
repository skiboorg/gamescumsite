function animate(typewriter) {
    sequence = [
        {
            text: "user@gamescum.ru:~$ ",
            instant: true,
            delayAfter: 500
        },
        {
            text: "logout\n",
            delayAfter: 500
        },
        {
            text: "PLEASE WAIT ",
            instant: true,
            delayAfter: 500
        },
        {
            text: ".................................\n",
            delayAfter: 1000,

        },


        {
            text: "\n\n-- LINE DISCONNECTED --",
            instant: true
        },
    ];

    typewriter.playSequence(sequence);
}
