let services = [
    {
        id: 'P0101',
        name: 'Steam',
        group: 'games',
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
    }
]