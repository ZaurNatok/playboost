let searchIcon = document.querySelector('.topline__search-icon');
let popup = document.querySelector('.popup')
let popupCloseButton = document.querySelector('.popup__close');
let popupWrapper = document.querySelector('.popup__wrapper');
let popupTitle = document.querySelector('.popup__title');
let popupContent = document.querySelector('.popup__content');
let findButton = document.querySelector('.banner__button_find');
let faqSector = document.querySelector('.faq__questions');
let faqQuestion = document.querySelector('.faq__question');
let paymentMethods = document.querySelector('.pay-info__payment-methods');
let cyberCard = document.querySelector('.cybercard');
let cyberIcon = document.querySelector('.cyber');

let paymentSum = document.querySelector('.topup-sum');
let paymentComission = document.querySelector('.payment-comission');
let cashback = document.querySelector('.cashback-sum');
let finalSum = document.querySelector('.summary');

let comission = 50;
let cyberCashback = 0.05;

// Определяем id сервиса

let params = new URLSearchParams(document.location.search);
let value = params.get('id'); // 'id' – это имя целевого параметра
let theService = services.find((element) => element.id == value);

console.log(theService);
loadServiceParameters(theService);

// Данные сервиса заполняем

let serviceImage = document.querySelector('.payment__image');
let serviceTitle = document.querySelector('.payment__service-title');
let serviceSubtitle = document.querySelector('.payment-info__text');

serviceImage.setAttribute('style', `background-image:url(${theService.serviceImage})`);
serviceTitle.textContent = theService.name;
serviceSubtitle.textContent = theService.country;

// Параметры оплаты (инпуты и пр.)

function loadServiceParameters(theService) {
    let paymentServiceParameters = document.querySelector('.payment-info__form');

    theService.inputs.forEach(el => {
        let paymentElementInput = document.createElement('div');
        let paymentElementLabel = document.createElement('label');
        let paymentInput = document.createElement('input');
        let paymentInputQuestionIcon = document.createElement('div');

        paymentElementInput.classList.add('payment-info__element');
        paymentElementLabel.classList.add('payment-info__label');
        paymentInput.classList.add('payment-info__input');
        paymentInputQuestionIcon.classList.add('payment-info__question-icon');
        paymentInputQuestionIcon.setAttribute('style', 'background-image: url(./img/question.png);')

        paymentServiceParameters.appendChild(paymentElementInput);
        paymentElementInput.appendChild(paymentElementLabel);
        paymentElementInput.appendChild(paymentInput);
        paymentElementInput.appendChild(paymentInputQuestionIcon);

        paymentElementLabel.textContent = el.title;
        paymentInput.setAttribute('placeholder', el.title + ' ' + theService.name);
    })

    // Если не ваучер - отрисовываем инпут для ввода суммы

    if(theService.fixedPayment == 'no') {
        let paymentElementInput = document.createElement('div');
        let paymentElementLabel = document.createElement('label');
        let paymentInput = document.createElement('input');
        let paymentInputQuestionIcon = document.createElement('div');
        let paymentChipsets = document.createElement('div');

        paymentElementInput.classList.add('payment-info__element');
        paymentElementLabel.classList.add('payment-info__label');
        paymentInput.classList.add('payment-info__input');
        paymentInput.classList.add('payment-sum');
        paymentInputQuestionIcon.classList.add('payment-info__question-icon');
        paymentInputQuestionIcon.setAttribute('style', 'background-image: url(./img/question.png);')
        paymentChipsets.classList.add('payment-info__chipsets');

        paymentServiceParameters.appendChild(paymentElementInput);
        paymentElementInput.appendChild(paymentElementLabel);
        paymentElementInput.appendChild(paymentInput);
        paymentElementInput.appendChild(paymentInputQuestionIcon);
        paymentElementInput.appendChild(paymentChipsets);

        chipsets.forEach(el => {
            let paymentChipset = document.createElement('div');
            let paymentChipsetId = document.createElement('span');
            paymentChipset.textContent = formatSum(el.value) + ' ' + '₽';
            paymentChipsetId.classList.add('chipset-id')
            paymentChipset.classList.add('payment-info__chipset');
            paymentChipsets.appendChild(paymentChipset);
            paymentChipset.appendChild(paymentChipsetId);
            paymentChipsetId.textContent = el.id;
        });

        paymentElementLabel.textContent = 'Сумма пополнения';
        paymentInput.setAttribute('type', 'number');
        paymentInput.setAttribute('placeholder', 'Введите сумму');

        paymentChipsets.addEventListener('click', function(e) {
            let chipsetId = e.target.querySelector('.chipset-id').textContent;
            let chipset = chipsets.find((element) => element.id == chipsetId);
            paymentInput.value = chipset.value;
            paymentAmountAndCashbacks();
        })

        paymentInput.addEventListener('input', () => {
            paymentAmountAndCashbacks();
        } )
    }
}

// Popup

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

        searchInput.focus();

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
                    searchResultItem.setAttribute('href', `./index.html?id=${el.id}`)
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
        return searchResult;
    }
}

// формат сумм на порядки

function formatSum(sum) {
    return sum.toLocaleString();
}

// FAQ

faqSector.addEventListener('click', (e) => {
    if(e.target.classList.contains('faq__question')) {
        e.target.querySelector('.faq__answer').classList.toggle('hidden');
        e.target.querySelector('.faq__arrow-icon').classList.toggle('rotate');
    }
})

// Если выбрал киберкарту

function ifCyberCard() {
    if(cyberCard.checked) {
        cyberIcon.setAttribute('src', '../img/cybercard_chosen.png');
        return true;
    } else {
        cyberIcon.setAttribute('src', '../img/cybercard.png');
        return false;
    }
}


paymentMethods.addEventListener('click', function(){
    ifCyberCard();
    paymentAmountAndCashbacks();
    
    // if(cyberCard.checked) {
    //     comission = 0;
    //     paymentComission.textContent = 0 + ' ' + '₽';
    //     let paymentAmount = document.querySelector('.summary');
    //     finalSum.textContent = Number(paymentAmount.value) + Number(comission).toLocaleString() + ' ' + '₽';
    // } else {
    //     comission = 50;
    //     paymentComission.textContent = 50 + ' ' + '₽';
    //     finalSum.textContent = (Number(paymentAmount.value) + Number(comission)).toLocaleString() + ' ' + '₽';
    // }
});

// расчет суммы к оплате, к зачислению, скидок и кэшбеков
paymentAmountAndCashbacks();

function paymentAmountAndCashbacks() {
    let thePaymentDetails = {
        amount: document.querySelector('.payment-sum').value,
        comission: comission,
        cashback: 0,
        promoCode: 0
    }

    if(ifCyberCard() == true) {
        thePaymentDetails = {
            amount: document.querySelector('.payment-sum').value,
            comission: 0,
            cashback: document.querySelector('.payment-sum').value * cyberCashback,
            promoCode: 0
        }
    } else {
        thePaymentDetails = {
            amount: document.querySelector('.payment-sum').value,
            comission: comission,
            cashback: document.querySelector('.payment-sum').value * 0,
            promoCode: 0
        }
    }

    paymentSum.textContent = formatSum(thePaymentDetails.amount) + ' ' + '₽';
    paymentComission.textContent = formatSum(thePaymentDetails.comission) + ' ' + '₽';
    cashback.textContent = formatSum(thePaymentDetails.cashback) + ' ' + '₽';
    finalSum.textContent = formatSum(Number(thePaymentDetails.amount) + Number(thePaymentDetails.comission) - Number(thePaymentDetails.promoCode)) + ' ' + '₽'
}