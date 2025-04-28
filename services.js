let services = [
    {
        id: 'P0101',
        name: 'Steam',
        group: 'services',
        fixedPayment: 'no',
        country: 'Пополнение международных аккаунтов стран СНГ и Турции. Пополнение осуществляется в срок до 2 часов',
        isPopular: true,
        serviceImage: './img/services/steam.jpeg',
        inputs: [
            {
                "name": "account",
                "required": true,
                "title": "Введите аккаунт",
                "regexp": "^\\d{1,3}$"
            }
        ]
    },

    {
        id: 'P0102',
        name: 'Minecraft',
        group: 'games',
        fixedPayment: 'no',
        country: 'Для аккаунтов любого региона. При регистрации нового аккаунта использовать почту с доменом gmail.com',
        isPopular: true,
        serviceImage: './img/games/minecraft.jpg',
        inputs: [
            {
                "name": "account",
                "required": true,
                "title": "Введите аккаунт",
                "regexp": "^\\d{1,3}$"
            }
        ]
    },

    {
        id: 'P0103',
        name: 'Roblox',
        group: 'games',
        fixedPayment: 'no',
        country: 'При регистрации нового аккаунта используйте почту с доменом gmail.com',
        isPopular: true,
        serviceImage: './img/roblox.png',
        inputs: [
            {
                "name": "account",
                "required": true,
                "title": "Введите аккаунт",
                "regexp": "^\\d{1,3}$"
            }
        ]
    },

    {
        id: 'P0113',
        name: 'Valorant',
        group: 'games',
        fixedPayment: 'no',
        country: 'При регистрации нового аккаунта используйте почту с доменом gmail.com',
        isPopular: true,
        serviceImage: './img/games/valorant.png',
        inputs: [
            {
                "name": "account",
                "required": true,
                "title": "Введите аккаунт",
                "regexp": "^\\d{1,3}$"
            }
        ]
    },

    {
        id: 'P0104',
        name: 'Genshin Impact',
        group: 'games',
        fixedPayment: 'no',
        country: 'При регистрации нового аккаунта используйте почту с доменом gmail.com',
        isPopular: true,
        serviceImage: './img/games/genshin.webp',
        inputs: [
            {
                "name": "account",
                "required": true,
                "title": "Введите аккаунт",
                "regexp": "^\\d{1,3}$"
            }
        ]
    },

    {
        id: 'P0105',
        name: 'Identity V',
        group: 'games',
        fixedPayment: 'no',
        country: 'При регистрации нового аккаунта используйте почту с доменом gmail.com',
        isPopular: true,
        serviceImage: './img/games/identity.jpg',
        inputs: [
            {
                "name": "account",
                "required": true,
                "title": "Введите аккаунт",
                "regexp": "^\\d{1,3}$"
            }
        ]
    },

    {
        id: 'P0106',
        name: 'PUBG Butterfield',
        group: 'games',
        fixedPayment: 'no',
        country: 'При регистрации нового аккаунта используйте почту с доменом gmail.com',
        isPopular: true,
        serviceImage: './img/games/pubg.jpg',
        inputs: [
            {
                "name": "account",
                "required": true,
                "title": "Введите аккаунт",
                "regexp": "^\\d{1,3}$"
            }
        ]
    },

    {
        id: 'P0107',
        name: 'Fortnite',
        group: 'games',
        fixedPayment: 'no',
        country: 'При регистрации нового аккаунта используйте почту с доменом gmail.com',
        isPopular: true,
        serviceImage: './img/games/fortnite.png',
        inputs: [
            {
                "name": "account",
                "required": true,
                "title": "Введите аккаунт",
                "regexp": "^\\d{1,3}$"
            }
        ]
    },

    {
        id: 'P0108',
        name: 'Netflix',
        group: 'services',
        fixedPayment: 'no',
        country: 'При регистрации нового аккаунта используйте почту с доменом gmail.com',
        isPopular: true,
        serviceImage: './img/services/netflix.png',
        inputs: [
            {
                "name": "account",
                "required": true,
                "title": "Введите аккаунт",
                "regexp": "^\\d{1,3}$"
            }
        ]
    },

    {
        id: 'P0109',
        name: 'Twitch',
        group: 'services',
        fixedPayment: 'no',
        country: 'При регистрации нового аккаунта используйте почту с доменом gmail.com',
        isPopular: true,
        serviceImage: './img/services/twitch.jpg',
        inputs: [
            {
                "name": "account",
                "required": true,
                "title": "Введите аккаунт",
                "regexp": "^\\d{1,3}$"
            }
        ]
    },

    {
        id: 'P0110',
        name: 'Airbnb',
        group: 'services',
        fixedPayment: 'no',
        country: 'При регистрации нового аккаунта используйте почту с доменом gmail.com',
        isPopular: true,
        serviceImage: './img/services/airbnb.jpeg',
        inputs: [
            {
                "name": "account",
                "required": true,
                "title": "Введите аккаунт",
                "regexp": "^\\d{1,3}$"
            }
        ]
    },

    {
        id: 'P0111',
        name: 'Playstation Network',
        group: 'services',
        fixedPayment: 'no',
        country: 'При регистрации нового аккаунта используйте почту с доменом gmail.com',
        isPopular: true,
        serviceImage: './img/services/playstation.png',
        inputs: [
            {
                "name": "account",
                "required": true,
                "title": "Введите аккаунт",
                "regexp": "^\\d{1,3}$"
            }
        ]
    },

    {
        id: 'P0112',
        name: 'Xbox',
        group: 'services',
        fixedPayment: 'no',
        country: 'При регистрации нового аккаунта используйте почту с доменом gmail.com',
        isPopular: true,
        serviceImage: './img/services/xbox.jpg',
        inputs: [
            {
                "name": "account",
                "required": true,
                "title": "Введите аккаунт",
                "regexp": "^\\d{1,3}$"
            }
        ]
    },

    {
        id: 'P0113',
        name: 'Windows 11',
        group: 'programms',
        fixedPayment: 'no',
        country: 'При регистрации нового аккаунта используйте почту с доменом gmail.com',
        isPopular: true,
        serviceImage: './img/programms/windows.jpg',
        inputs: [
            {
                "name": "account",
                "required": true,
                "title": "Введите аккаунт",
                "regexp": "^\\d{1,3}$"
            }
        ]
    },

    {
        id: 'P0114',
        name: 'ChatGPT',
        group: 'programms',
        fixedPayment: 'no',
        country: 'При регистрации нового аккаунта используйте почту с доменом gmail.com',
        isPopular: true,
        serviceImage: './img/programms/chatgpt.jpg',
        inputs: [
            {
                "name": "account",
                "required": true,
                "title": "Введите аккаунт",
                "regexp": "^\\d{1,3}$"
            }
        ]
    },

    {
        id: 'P0115',
        name: 'Zoom',
        group: 'programms',
        fixedPayment: 'no',
        country: 'При регистрации нового аккаунта используйте почту с доменом gmail.com',
        isPopular: true,
        serviceImage: './img/programms/zoom.webp',
        inputs: [
            {
                "name": "account",
                "required": true,
                "title": "Введите аккаунт",
                "regexp": "^\\d{1,3}$"
            }
        ]
    },

    {
        id: 'P0116',
        name: 'Discord Nitro',
        group: 'programms',
        fixedPayment: 'no',
        country: 'При регистрации нового аккаунта используйте почту с доменом gmail.com',
        isPopular: true,
        serviceImage: './img/programms/discord.png',
        inputs: [
            {
                "name": "account",
                "required": true,
                "title": "Введите аккаунт",
                "regexp": "^\\d{1,3}$"
            }
        ]
    },

    {
        id: 'P0117',
        name: 'Adobe Photoshop',
        group: 'programms',
        fixedPayment: 'no',
        country: 'При регистрации нового аккаунта используйте почту с доменом gmail.com',
        isPopular: true,
        serviceImage: './img/programms/photoshop.webp',
        inputs: [
            {
                "name": "account",
                "required": true,
                "title": "Введите аккаунт",
                "regexp": "^\\d{1,3}$"
            }
        ]
    },

    {
        id: 'P0118',
        name: 'Duolingo',
        group: 'programms',
        fixedPayment: 'no',
        country: 'При регистрации нового аккаунта используйте почту с доменом gmail.com',
        isPopular: true,
        serviceImage: './img/programms/duolingo.png',
        inputs: [
            {
                "name": "account",
                "required": true,
                "title": "Введите аккаунт",
                "regexp": "^\\d{1,3}$"
            }
        ]
    }
]