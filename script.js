let searchIcon = document.querySelector('.topline__search-icon');
let popup = document.querySelector('.popup')
let popupCloseButton = document.querySelector('.popup__close');
let popupWrapper = document.querySelector('.popup__wrapper');
let popupTitle = document.querySelector('.popup__title');
let popupContent = document.querySelector('.popup__content');
let findButton = document.querySelector('.banner__button_find');
let faqSector = document.querySelector('.faq__questions');
let faqQuestion = document.querySelector('.faq__question');

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
        let searchResult = document.createElement('div');

        searchArea.classList.add('popup__search-area');
        searchImage.classList.add('popup__search-icon');
        searchImage.setAttribute('src', './img/search.png');
        searchInput.classList.add('popup__search');
        searchInput.classList.add('play-regular');
        searchInput.setAttribute('type', 'text');
        searchInput.setAttribute('placeholder', 'Поиск');
        searchResult.classList.add('search-result');

        popupContent.appendChild(searchArea);
        searchArea.appendChild(searchImage);
        searchArea.appendChild(searchInput);
        popupContent.appendChild(searchResult);

        // Поиск

        searchInput.addEventListener('input', () => {

            searchResult.textContent = '';
            if(searchService(searchInput.value) == false) {
                searchResult.textContent = 'Ничего не найдено';
            } else if(searchInput.value == '') {
                searchResult.textContent = '';
            } else {
                let res = searchService(searchInput.value);

                res.forEach(el => {

                    let searchResultItem = document.createElement('a');
                    let searchResultItemImage = document.createElement('div');
                    let searchResultItemTitle = document.createElement('h3');

                    searchResultItem.classList.add('search-result__item');
                    searchResultItemImage.classList.add('search-result__img');
                    searchResultItemTitle.classList.add('search-result__title');

                    searchResult.appendChild(searchResultItem);
                    searchResultItem.appendChild(searchResultItemImage);
                    searchResultItem.appendChild(searchResultItemTitle);
                    
                    searchResultItemImage.setAttribute('style', `background-image:url(${el.serviceImage})`);
                    searchResultItem.setAttribute('href', `/service?id=${el.id}`)
                    searchResultItemTitle.textContent = el.name;
                })

            }


        });

    }   if(e.target == findButton) {
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

// if(screen.width < 430) {
//     document.querySelector('.content__items_games').classList.remove('swiper-games');
//     document.querySelector('.content__items_games').querySelector('.content__items').classList.add('mobile');
// } if(screen.width > 430) {
//     document.querySelector('.content__items_games').classList.add('swiper-games');

// }

// FAQ

faqSector.addEventListener('click', (e) => {
    if(e.target.classList.contains('faq__question')) {
        e.target.querySelector('.faq__answer').classList.toggle('hidden');
        e.target.querySelector('.faq__arrow-icon').classList.toggle('rotate');
    }
})

// Загрузка всех сервисов

// console.log(services);

// Поиск

function searchService(value) {
    let searchResult = [];

    services.forEach(el => {
        if(el.name.toLowerCase().includes(value.toLowerCase())) {
            searchResult.push(el);
        }
    })

    if(searchResult.length == 0) {
        return false;
    } else {
        return searchResult
    }
}