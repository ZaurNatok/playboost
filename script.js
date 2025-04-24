let searchIcon = document.querySelector('.topline__search-icon');
let popup = document.querySelector('.popup')
let popupCloseButton = document.querySelector('.popup__close');
let popupWrapper = document.querySelector('.popup__wrapper');
let popupTitle = document.querySelector('.popup__title');
let popupContent = document.querySelector('.popup__content');
let findButton = document.querySelector('.banner__button_find');

document.addEventListener('click', (e) => {

    popupCloseButton.addEventListener('click', () => {
        popup.classList.add('hidden');
        popupContent.textContent = '';
    })
    popupWrapper.addEventListener('click', () => {
        popup.classList.add('hidden');
        popupContent.textContent = '';
    })

    if(e.target == searchIcon) {
        popup.classList.remove('hidden');
        popupTitle.textContent = 'Найти на PlayBoost';
        let searchArea = document.createElement('div');
        let searchImage = document.createElement('img');
        let searchInput = document.createElement('input');

        searchArea.classList.add('popup__search-area');
        searchImage.classList.add('popup__search-icon');
        searchImage.setAttribute('src', './img/search.png');
        searchInput.classList.add('popup__search');
        searchInput.classList.add('play-regular');
        searchInput.setAttribute('type', 'text');
        searchInput.setAttribute('placeholder', 'Поиск');

        popupContent.appendChild(searchArea);
        searchArea.appendChild(searchImage);
        searchArea.appendChild(searchInput);
    }     if(e.target == findButton) {
        popup.classList.remove('hidden');
        popupTitle.textContent = 'Оставьте заявку на добавление игры, сервиса или программы в наш каталог';
        
        // общий контейнер

        let findServiceArea = document.createElement('div');
        findServiceArea.classList.add('popup__find-service-area');

        // инпут email

        let findServiceAreaEmailLabel = document.createElement('label');
        let findServiceEmailArea = document.createElement('div');
        let findServiceAreaEmailInput = document.createElement('input');
        let inputDeleteIcon = document.createElement('img');

        findServiceAreaEmailLabel.classList.add('popup__label');
        findServiceAreaEmailLabel.classList.add('play-regular');
        findServiceAreaEmailLabel.setAttribute('for', 'email');
        findServiceEmailArea.classList.add('input-area');
        findServiceAreaEmailInput.classList.add('popup__input');
        findServiceAreaEmailInput.classList.add('play-regular')
        inputDeleteIcon.classList.add('popup__input-icon');
        inputDeleteIcon.setAttribute('src', './img/close.png');
        findServiceAreaEmailInput.setAttribute('placeholder', 'Введите email');
        findServiceAreaEmailLabel.textContent = 'Ваш email';

        popupContent.appendChild(findServiceArea);
        findServiceArea.appendChild(findServiceAreaEmailLabel);
        findServiceArea.appendChild(findServiceEmailArea);
        findServiceEmailArea.appendChild(findServiceAreaEmailInput);
        findServiceEmailArea.appendChild(inputDeleteIcon);

        // инпут название сервиса

        let findServiceAreaNameLabel = document.createElement('label');
        let findServiceNameArea = document.createElement('div');
        let findServiceAreaNameInput = document.createElement('input');
        let inputNameDeleteIcon = document.createElement('img');

        findServiceAreaNameLabel.classList.add('popup__label');
        findServiceAreaNameLabel.classList.add('play-regular');
        findServiceAreaNameLabel.setAttribute('for', 'name');
        findServiceNameArea.classList.add('input-area');
        findServiceAreaNameInput.classList.add('popup__input');
        findServiceAreaNameInput.classList.add('play-regular');
        inputNameDeleteIcon.classList.add('popup__input-icon');
        inputNameDeleteIcon.setAttribute('src', './img/close.png');
        findServiceAreaNameInput.setAttribute('placeholder', 'Введите название');
        findServiceAreaNameLabel.textContent = 'Ваш Название игры, программы или сервиса';

        popupContent.appendChild(findServiceArea);
        findServiceArea.appendChild(findServiceAreaNameLabel);
        findServiceArea.appendChild(findServiceNameArea);
        findServiceNameArea.appendChild(findServiceAreaNameInput);
        findServiceNameArea.appendChild(inputNameDeleteIcon);
        
        let findSearviceAreaButton = document.createElement('div');
        findSearviceAreaButton.classList.add('banner__button');
        findSearviceAreaButton.classList.add('banner__button_coloured');
        findSearviceAreaButton.classList.add('play-bold');
        findSearviceAreaButton.textContent = 'Отправить заявку';
        findServiceArea.appendChild(findSearviceAreaButton);
    }
})

// Адаптив

if(screen.width < 430) {
    document.querySelector('.content__items_games').classList.remove('swiper-games');
    document.querySelector('.content__items_games').querySelector('.content__items').classList.add('mobile');
} if(screen.width > 430) {
    document.querySelector('.content__items_games').classList.add('swiper-games');

}