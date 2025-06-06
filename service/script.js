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
let loaderPopup = popup.querySelector('.loader');
let currency = document.querySelector('.currency');
let payButtonDesktop = document.querySelector('.pay_desktop');
let payButtonMobile = document.querySelector('.pay_mobile');
let paymentServiceParameters = document.querySelector('.payment-info__form');
let popupInfo = document.querySelector('.popup__content');
let popupIcon = popup.querySelector('.popup__icon');
let payAfterCheck = popup.querySelector('.payAfterCheck');

let paymentSum = document.querySelector('.topup-sum');
let paymentComission = document.querySelector('.payment-comission');
let cashback = document.querySelector('.cashback-sum');
let finalSum = document.querySelector('.summary');
let finalSumMobileSticky = document.querySelector('.summary-mobile');

let comission = 50;
let cyberCashback = 0.05;
let sumToPay = 0;
let sumToPopup = 0;

// Определяем id сервиса

let params = new URLSearchParams(document.location.search);
let value = params.get('id'); // 'id' – это имя целевого параметра
let theService = services.find((element) => element.id == value);

loadServiceParameters(theService);

// Запрос всех доступных сервисов

// fetch('https://api.payforsteam.ru/services', { 
//     method: 'POST', 
//     headers: { 
//         'Content-Type': 'application/json'
//      }})
// .then(res => {
//     return res.json()
//   })
//   .then(res => console.log(res)) // отправляется ответ на клиент
//   .catch(err => console.log({ err }))

// Данные сервиса заполняем

let serviceImage = document.querySelector('.payment__image');
let serviceTitle = document.querySelector('.payment__service-title');
let serviceSubtitle = document.querySelector('.payment-info__text');

serviceImage.setAttribute('style', `background-image:url(${theService.serviceImage})`);
serviceTitle.textContent = theService.name;
serviceSubtitle.textContent = theService.country;

// Параметры оплаты (инпуты и пр.)

function loadServiceParameters(theService) {
    
    theService.inputs.forEach(el => {
        let paymentElementInput = document.createElement('div');
        let paymentElementLabel = document.createElement('label');
        let paymentInput = document.createElement('input');
        let paymentInputError = document.createElement('p');
        let paymentInputQuestionIcon = document.createElement('div');

        paymentElementInput.classList.add('payment-info__element');
        paymentElementLabel.classList.add('payment-info__label');
        paymentInput.classList.add('payment-info__input');
        paymentInput.setAttribute('name', el.name)
        paymentInputError.classList.add('error')
        paymentInputQuestionIcon.classList.add('payment-info__question-icon');
        paymentInputQuestionIcon.setAttribute('style', 'background-image: url(./img/question.png);')

        paymentServiceParameters.appendChild(paymentElementInput);
        paymentElementInput.appendChild(paymentElementLabel);
        paymentElementInput.appendChild(paymentInput);
        paymentElementInput.appendChild(paymentInputError);
        paymentElementInput.appendChild(paymentInputQuestionIcon);

        paymentElementLabel.textContent = el.title;
        paymentInput.setAttribute('placeholder', el.title + ' ' + theService.name);
    })

    // Если не ваучер - отрисовываем инпут для ввода суммы

    if(theService.fixedPayment == 'no') {
        let paymentElementInput = document.createElement('div');
        let paymentElementLabel = document.createElement('label');
        let paymentInput = document.createElement('input');
        let paymentInputError = document.createElement('p');
        let paymentInputQuestionIcon = document.createElement('div');
        let paymentChipsets = document.createElement('div');

        paymentElementInput.classList.add('payment-info__element');
        paymentElementLabel.classList.add('payment-info__label');
        paymentInput.classList.add('payment-info__input');
        paymentInput.classList.add('payment-sum');
        paymentInput.setAttribute('name', 'sumToPay');
        paymentInputError.classList.add('error')
        paymentInputQuestionIcon.classList.add('payment-info__question-icon');
        paymentInputQuestionIcon.setAttribute('style', 'background-image: url(./img/question.png);')
        paymentChipsets.classList.add('payment-info__chipsets');

        paymentServiceParameters.appendChild(paymentElementInput);
        paymentElementInput.appendChild(paymentElementLabel);
        paymentElementInput.appendChild(paymentInput);
        paymentElementInput.appendChild(paymentInputError);
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
        paymentInput.setAttribute('value', '300');

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
        location.reload()
    })
    popupWrapper.addEventListener('click', () => {
        popup.classList.add('hidden');
        popupContent.textContent = '';
        location.reload()
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
    finalSum.textContent = formatSum(Number(thePaymentDetails.amount) + Number(thePaymentDetails.comission) - Number(thePaymentDetails.promoCode)) + ' ' + '₽';
    finalSumMobileSticky.textContent = formatSum(Number(thePaymentDetails.amount) + Number(thePaymentDetails.comission) - Number(thePaymentDetails.promoCode)) + ' ' + '₽';
}

// мобильная оплата при скролле

window.onscroll = function() {

if (screen.width < 431) {
    window.onscroll = function() {
        let intro = window.document.getElementById("summary-block").offsetTop;
        let fixed = document.querySelector(".sticky-element");
        let scrolled = window.pageYOffset;
    
        if(scrolled < intro) {
            fixed.style = 'display: block';
        } else {
            fixed.style = 'display: none';
        }
    };
 }
}

// запрос check для получения курса

getCurrencyRate();

function getCurrencyRate() {
    fetch('https://api.payforsteam.ru/check', { 
        method: 'POST', 
        headers: { 
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            'serviceId': 'P0101',
            'account': '0',
            'agentTransactionId': '111',
            'agentTransactionDate': '2025-01-23T20:41:13',
            'amountTo': 500.00,
            'amountFrom': 500.00
    })})
    .then(res => {
        return res.json()
    })
    .then(res => setLocalStorage(res))
    .catch(err => console.log({ err }))
}

function setLocalStorage(res) {
    if(res.result == 220) {
        popup.classList.remove('hidden');
        loaderPopup.classList.add('hidden');
        popupInfo.textContent = `Произошла ошибка. Мы уже знаем об этом и работаем над ее устранением. Пожалуйста, повторите попытку позже`;
        return;
    } else {
        localStorage.setItem('currencyRate', res.rate);
        localStorage.setItem('currency', res.currency);
        currency.textContent = localStorage.getItem('currency');
    }
}

// Нажатие кнопки "Оплатить"

payButtonDesktop.addEventListener('click', function(e) {
    e.preventDefault()
    
    if(cyberCard.checked) {
        comission = 0;
    }

    let result = checkInputs();
    if(result == 'error') {
        return;
    } else if(result == 'ok') {

        let theForm = document.forms.paymentParams;
        console.log(theForm.elements)
        payButtonDesktop.removeAttribute('disabled');
        let agentTransactionId = generatetransactionId();
        
        sumToPay = theForm.elements.sumToPay.value;

        let dateTime = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0];
        popup.classList.remove('hidden');
        loaderPopup.classList.remove('hidden');

            fetch('https://api.payforsteam.ru/check', { 
                method: 'POST', 
                headers: { 
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify({
                    'serviceId': value,
                    'account': theForm.elements.account.value,
                    'agentTransactionId': agentTransactionId,
                    'agentTransactionDate': dateTime,
                    'amountTo': Number(sumToPay),
                    'amountFrom': Number(sumToPay) + comission
            })})
            .then(res => {
                return res.json()
            })
            .then(res => resultOrcestrator(res.result, agentTransactionId, res, dateTime, theForm.elements.account.value))
                // параметры сервиса - ответ от сервера
            .catch(err => console.log({ err }))

            let thePayment = {
                'serviceId': value,
                'account': theForm.elements.account.value,
                'agentTransactionId': agentTransactionId,
                'agentTransactionDate': dateTime,
                'amountTo': Number(sumToPay),
                'amountFrom': Number(sumToPay) + comission
            }

        popup.addEventListener('click', (e) => {
            if(e.target.classList.contains('close') || e.target.classList.contains('popup__wrapper')) {
                popup.classList.add('hidden');
                popupIcon.classList.add('hidden');
                popupInfo.textContent = '';
                location.reload()
            }
        })
    }
})

// Обработка ответа от сервера Партнера

function resultOrcestrator(result, agentTransactionId, res, dateTime, acc) {

    // Добавляем запись в базу
    
    if(cyberCard.checked) {
        comission = 0;
    }
    
        fetch('https://api.payforsteam.ru/newpayment', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                'agentTransactionId': res.agentTransactionId,
                'transactionId': res.transactionId,
                'date': dateFormat(),
                'time': timeFormat(),
                'serviceId': value,
                'serviceName': theService.name,
                'sumFrom': Number(sumToPay),
                'sumTo': ((Number(sumToPay) - Number(sumToPay) * 0.035) * localStorage.getItem('currencyRate')).toFixed(2),
                'sumCurrency': localStorage.getItem('currency'),
                'comissionPercentage': 3.5,
                'comissionFee': comission,
                'statusBank': 'В процессе',
                'statusPartner': 'Запрос check ' + res.resultMessage,
                'clientAccountId': acc
        })})
        .then(res => {
            return res.json()
        })
        .then(res => res)
        .catch(err => console.log({ err }))
    
    // Обработка ответа от сервера
    
        if(result == 300) {
            loaderPopup.classList.add('hidden');
            popupIcon.setAttribute('src', './img/error.png')
            popupIcon.classList.remove('hidden');
            popupInfo.textContent = 'Техническая ошибка на стороне провайдера. Попробуйте позже';
        } if(result == 0) {
    
            let order = {
                // "TerminalKey": "1574412702003DEMO",
                "Amount": (Number(sumToPay) + 50) * 100,
                "OrderId": res.agentTransactionId,
                "Description": "Оплата покупки",
            }
    
            startSBP(order, agentTransactionId, dateTime);
    
        } if(result == 1) {
            loaderPopup.classList.add('hidden');
            popupInfo.textContent = 'Запрос в обработке, повторите запрос позже';
        } if(result == 4) {
            loaderPopup.classList.add('hidden');
            popupIcon.setAttribute('src', '../img/attention.png')
            popupIcon.classList.remove('hidden');
            popupInfo.textContent = 'Неверный формат идентификатора абонента';
        } if(result == 5) {
            loaderPopup.classList.add('hidden');
            popupInfo.textContent = 'Идентификатор не найден (проверьте номер)';
        } if(result == 7) {
            loaderPopup.classList.add('hidden');
            popupInfo.textContent = 'Техническая ошибка на стороне провайдера. Попробуйте позже';
        } if(result == 8) {
            loaderPopup.classList.add('hidden');
            popupInfo.textContent = 'Техническая ошибка на стороне провайдера. Попробуйте позже';
        } if(result == 130) {
            loaderPopup.classList.add('hidden');
            popupIcon.setAttribute('src', './img/error.png')
            popupIcon.classList.remove('hidden');
            popupInfo.textContent = 'Техническая ошибка на стороне провайдера. Попробуйте позже';
        } if(result == 220) {
            loaderPopup.classList.add('hidden');
            popupIcon.setAttribute('src', './img/error.png')
            popupIcon.classList.remove('hidden');
            popupInfo.textContent = 'Баланс закончился. Повторите попытку позже';
        } if(result == 204) {
            loaderPopup.classList.add('hidden');
            popupIcon.setAttribute('src', './img/error.png')
            popupIcon.classList.remove('hidden');
            popupInfo.textContent = 'Прием платежа в указанной валюте не возможен';
        } if(result == 202) {
            loaderPopup.classList.add('hidden');
            popupIcon.setAttribute('src', './img/error.png')
            popupIcon.classList.remove('hidden');
            popupInfo.textContent = 'Ошибка данных запроса';
        }
        
    }

// Формат даты 

function dateFormat() {

    let today = new Date();
    let month = today.getMonth();
    let date = today.getDate();

    switch (month)
    {
      case 0: fMonth="01"; break;
      case 1: fMonth="02"; break;
      case 2: fMonth="03"; break;
      case 3: fMonth="04"; break;
      case 4: fMonth="05"; break;
      case 5: fMonth="06"; break;
      case 6: fMonth="07"; break;
      case 7: fMonth="08"; break;
      case 8: fMonth="09"; break;
      case 9: fMonth="10"; break;
      case 10: fMonth="11"; break;
      case 11: fMonth="12"; break;
    }

    switch (date)
    {
      case 1: fDate="01"; break;
      case 2: fDate="02"; break;
      case 3: fDate="03"; break;
      case 4: fDate="04"; break;
      case 5: fDate="05"; break;
      case 6: fDate="06"; break;
      case 7: fDate="07"; break;
      case 8: fDate="08"; break;
      case 9: fDate="09"; break;
    }

    let theDate = today.getDate() < 10 ? '0' + today.getDate() + '.' + (fMonth) + '.' + today.getFullYear() : today.getDate() + '.' + (fMonth) + '.' + today.getFullYear();
    return theDate;
}

function timeFormat() {
    let today = new Date();
    let hours = today.getHours() < 10 ? '0' + today.getHours() : today.getHours();
    let minutes = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
    let seconds = today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds();
    let time = hours + ':' + minutes + ':' + seconds;
    return time;
}

// валидация полей

function checkInputs() {

    for(let i = 0; i < paymentServiceParameters.elements.length; i++) {
        if(paymentServiceParameters.elements[i].value == '') {
            paymentServiceParameters.elements[i].nextElementSibling.classList.remove('hidden');
            paymentServiceParameters.elements[i].nextElementSibling.textContent = 'Это обязательное поле';
            return 'error';
        } 
        else if(paymentServiceParameters.elements[i].nextElementSibling.textContent != '') {
            paymentServiceParameters.elements[i].nextElementSibling.textContent = '';
            return 'ok';
        }
    }

    if(document.querySelector('.payment-sum') && document.querySelector('.payment-sum').value < 10 || document.querySelector('.payment-sum').value > 15000) {
        let sumInput = document.querySelector('.payment-sum');
        sumInput.nextElementSibling.classList.remove('hidden');
        sumInput.nextElementSibling.textContent = 'Минимальная сумма оплаты 10 рублей, максимальная 15 000 рублей';
        return 'error';
    }
    return 'ok';
}

// Генерация id транзакции

function generatetransactionId() {
    const min = 1000000;
    const max = 9999999;
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    let transactionId = ((new Date()).getTime()).toString().slice(1,6) + randomNum.toString();
    return Number(transactionId);
}




// СБП

function startSBP(order, agentTransactionId, dateTime) {

    let paymentAmount = document.querySelector('.payment-sum');

    if(cyberCard.checked) {
        order.Amount = (Number(paymentAmount.value)) * 100;
    }

    fetch('https://api.payforsteam.ru/sbpInit', { 
        method: 'POST',
        headers: { 
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                "Amount": order.Amount,
                "OrderId": order.OrderId.toString(),
                "Description": "Оплата покупки"
            }         
        )})
        .then(res => {
            return res.json();
        })
        .then(res => {
            getQR(res, agentTransactionId, dateTime);
        })
        .catch(err => console.log({ err })
        );
}

function generateToken(string) {
    const utf8 = new TextEncoder().encode(string);
    return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
    .map((bytes) => bytes.toString(16).padStart(2, '0'))
    .join('');
    return hashHex;
    });
}

// function sbpInit(order, agentTransactionId, dateTime) {
//     fetch('http://localhost:3000/sbpInit', { 
//     method: 'POST',
//     headers: { 
//     'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(
//         {
//             "Amount": order.Amount,
//             "OrderId": order.OrderId.toString(),
//             "Description": "Оплата покупки",
//             "Token": order.Token
//         }         
//     )})
//     .then(res => {
//         return res.json();
//     })
//     .then(res => getQR(res, agentTransactionId, dateTime))
//     .catch(err => console.log({ err }))
// }


// function getQR(res, agentTransactionId, dateTime) {

// let result = '';
//     if(res.ErrorCode == 0) {
//         let password = 'o6zmp4svjrvxg68a';

//         if( screen.width <= 480 ) {
//             let token = [{"DataType": "PAYLOAD"},{"Password": `${password}`},{"PaymentId": `${res.PaymentId}`},{"TerminalKey": `${res.TerminalKey}`}];
                
//             let values = [];
//             for(let i = 0; i < token.length; i++) {
//                 values.push(String(Object.values(token[i])))
//             }
//             result = values.join('');
//         } else {
//             let token = [{"DataType": "IMAGE"},{"Password": `${password}`},{"PaymentId": `${res.PaymentId}`},{"TerminalKey": `${res.TerminalKey}`}];
                
//             let values = [];
//             for(let i = 0; i < token.length; i++) {
//                 values.push(String(Object.values(token[i])))
//             }
        
//             result = values.join('');
//         }
        
//         generateToken(result).then((result) => {
//                 localStorage.setItem('token', result);

//                 if( screen.width <= 480 ) {
//                     let theOrder = {
//                         "TerminalKey": res.TerminalKey.toString(),
//                         "PaymentId": res.PaymentId,
//                         "DataType": "PAYLOAD",
//                         "Token": result
//                     }

//                     showPayload(theOrder, agentTransactionId, dateTime);
//                 } else {
//                     let theOrder = {
//                         "TerminalKey": res.TerminalKey.toString(),
//                         "PaymentId": res.PaymentId,
//                         "DataType": "IMAGE",
//                         "Token": result
//                     }
//                     showQR(theOrder, agentTransactionId, dateTime);
//                 }

//             })
//     } else {
//         console.log('Ошибка запроса QR')
//     }
// }


function getQR(result, agentTransactionId, dateTime) {

        if(result.ErrorCode == 0) {
    
            if( screen.width <= 480 ) {

                fetch('https://api.payforsteam.ru/generateQR', { 
                    method: 'POST',
                    headers: { 
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            "DataType": "PAYLOAD",
                            "PaymentId": result.PaymentId
                        }         
                    )})
                    .then(res => {
                        return res.text();
                    })
                    .then(res => {
                        let theOrder = {
                            "PaymentId": result.PaymentId,
                            "DataType": "PAYLOAD",
                            "Token": res
                        }
                        showPayload(theOrder, agentTransactionId, dateTime);
                    })
                    .catch(err => console.log({ err }));

            } else {

                fetch('https://api.payforsteam.ru/generateQR', { 
                    method: 'POST',
                    headers: { 
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            "DataType": "IMAGE",
                            "PaymentId": result.PaymentId
                        }         
                    )})
                    .then(res => {
                        return res.text();
                    })
                    .then(res => {
                        let theOrder = {
                            "PaymentId": result.PaymentId,
                            "DataType": "IMAGE",
                            "Token": res
                        }
                        showQR(theOrder, agentTransactionId, dateTime);
                    })
                    .catch(err => console.log({ err }));
            }
        } else {
                loaderPopup.classList.add('hidden');
                popupIcon.setAttribute('src', '../img/error.png')
                popupIcon.classList.remove('hidden');
                popupInfo.textContent = `Произошла ошибка. Мы уже знаем об этом и работаем над ее устранением. Пожалуйста, повторите попытку позже`;
                popup.addEventListener('click', (e) => {
                    if(e.target.classList.contains('close') || e.target.classList.contains('popup__wrapper')) {
                        popup.classList.add('hidden');
                        popupIcon.classList.add('hidden');
                        popupInfo.textContent = '';
                        location.reload()
                    }
                })
            console.log('Ошибка запроса QR');

                // Обновление записи в базе

                fetch('https://api.payforsteam.ru/payresultSBP', { 
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json'
                    }, 
                    body: JSON.stringify({
                        'statusBank': "Ошибка генерации QR",
                        'statusPartner': "Операция неуспешна",
                        'agentTransactionId': agentTransactionId
                })})
                .then(res => {
                    return res.json()
                })
                .then(res => res)
                .catch(err => console.log({ err }))
        }
    }

function showQR(res, agentTransactionId, dateTime) {

    fetch('https://api.payforsteam.ru/getQr', { 
        method: 'POST',
        headers: { 
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                "PaymentId": res.PaymentId,
                "DataType": "IMAGE",
                "Token": res.Token
            }         
        )})
        .then(res => {
            return res.json();
        })
        .then(res => showQRforClient(res, agentTransactionId, dateTime)) // отправляется ответ на клиент
        .catch(err => console.log({ err }))
}

function showPayload(res, agentTransactionId, dateTime) {
    fetch('https://api.payforsteam.ru/getQr', { 
        method: 'POST',
        headers: { 
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                "PaymentId": res.PaymentId,
                "DataType": "PAYLOAD",
                "Token": res.Token
            }         
        )})
        .then(res => {
            return res.json();
        })
        .then(res => showQRforClient(res, agentTransactionId, dateTime)) // отправляется ответ на клиент
        .catch(err => console.log({ err }))
}

function showQRforClient(res, agentTransactionId, dateTime) {

    if(res.ErrorCode == '99' || res.ErrorCode == '3001') {
        loaderPopup.classList.add('hidden');
        popupIcon.setAttribute('src', '../img/error.png')
        popupIcon.classList.remove('hidden');
        popupInfo.textContent = `Произошла ошибка. Мы уже знаем об этом и работаем над ее устранением. Пожалуйста, повторите попытку позже`;
        popup.addEventListener('click', (e) => {
            if(e.target.classList.contains('close') || e.target.classList.contains('popup__wrapper')) {
                popup.classList.add('hidden');
                popupIcon.classList.add('hidden');
                popupInfo.textContent = '';
                location.reload();
            }
        })
        return;
    } else {
        loaderPopup.classList.add('hidden');
        popupInfo.textContent = 'Отсканируйте QR код СБП для проведения оплаты с использованием мобильного приложения Вашего банка';
        payAfterCheck.setAttribute('style', 'width: fit-content; background-color: #fff;');
    
        if(screen.width <= 480 ) {
            let paySbpButton = document.createElement('a');
            paySbpButton.setAttribute('href', res.Data);
            paySbpButton.classList.add('pay');
            paySbpButton.setAttribute('style', 'padding: 10px 15px');
            payAfterCheck.setAttribute('style', 'background: none');
            payAfterCheck.setAttribute('style', 'width: fit-content');
            paySbpButton.setAttribute('target', '_blank');
            payAfterCheck.appendChild(paySbpButton);
            paySbpButton.textContent = 'Оплатить по СБП';
            popupInfo.textContent = '';
        } else {
            payAfterCheck.innerHTML = `${res.Data}`;
        }
        popup.classList.remove('hidden');
        payAfterCheck.classList.remove('hidden');
        getState(res, agentTransactionId, dateTime);
    }
}





function getState(payment, agentTransactionId, dateTime) {

let password = 'o6zmp4svjrvxg68a';
let token = [{"Password": `${password}`},{"PaymentId": `${payment.PaymentId}`},{"TerminalKey": `${payment.TerminalKey}`}];

let values = [];
for(let i = 0; i < token.length; i++) {
    values.push(String(Object.values(token[i])))
}

const result = values.join('');

generateToken(result).then((result) => {
    localStorage.setItem('token', result);

    fetch('https://api.payforsteam.ru/getState', { 
        method: 'POST',
        headers: { 
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                "TerminalKey": payment.TerminalKey.toString(),
                "PaymentId": payment.PaymentId.toString(),
                "Token": result
            }         
        )})
        .then(res => {
            // console.log(res);
            return res.json();
        })
        .then(res => statesOrcestrator(res, agentTransactionId, dateTime, payment)) // отправляется ответ на клиент
        .catch(err => console.log({ err }))
    })
}

function statesOrcestrator(res, agentTransactionId, dateTime, payment) {

    testPaymentSuccess(res);
    testPaymentTimeout(res);
    testPaymentReject(res);

    if(res.ErrorCode == 0) {
        if(res.Status == "CONFIRMED") {

            pay(serviceId, agentTransactionId, dateTime);
        
        } if(res.Status == "NEW" || res.Status == "AUTHORIZING" || res.Status == "AUTHORIZED" || res.Status == "CONFIRMING" || res.Status == "FORM_SHOWED") {
            console.log('Повторить запрос статуса');
            const timerId = setTimeout(() => { getState(payment, agentTransactionId, dateTime)}, 5000)
        } if(res.Status == "DEADLINE_EXPIRED") {
            console.log('НЕУСПЕШНО - ТАЙМАУТ');
            payAfterCheck.classList.add('hidden');
            loaderPopup.classList.add('hidden');
            popupIcon.setAttribute('src', '../img/error.png')
            popupIcon.classList.remove('hidden');
            popupInfo.textContent = 'Истекло время ожидания оплаты. Повторите попытку';
            
            // Обновление записи в базе

            fetch('https://api.payforsteam.ru/payresultSBP', { 
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify({
                    'statusBank': "Отклонен банком плательщика",
                    'statusPartner': "Операция неуспешна",
                    'agentTransactionId': agentTransactionId
            })})
            .then(res => {
                return res.json()
            })
            .then(res => res)
            .catch(err => console.log({ err }))

        } if(res.Status == "REJECTED") {
            console.log('НЕУСПЕШНО');
            loaderPopup.classList.add('hidden');
            payAfterCheck.classList.add('hidden');
            popupIcon.setAttribute('src', '../img/error.png')
            popupIcon.classList.remove('hidden');
            popupInfo.textContent = 'Банк отклонил оплату. Повторите попытку';

            // Обновление записи в базе

            fetch('https://api.payforsteam.ru/payresultSBP', { 
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify({
                    'statusBank': "Отклонен банком плательщика",
                    'statusPartner': "Операция неуспешна",
                    'agentTransactionId': agentTransactionId
            })})
            .then(res => {
                return res.json()
            })
            .then(res => res)
            .catch(err => console.log({ err }))

        }
    } else {
        console.log('Запрос статуса неуспешен')
    }
}

// Тест успех

function testPaymentSuccess(res) {
    localStorage.setItem('paymentId', res.PaymentId);
    let password = 'o6zmp4svjrvxg68a';
    let token = [{"Password": `${password}`},{"PaymentId": `${res.PaymentId}`},{"TerminalKey": `${res.TerminalKey}`}];

    let values = [];
    for(let i = 0; i < token.length; i++) {
        values.push(String(Object.values(token[i])))
    }

    const result = values.join('');

    generateToken(result).then((result) => {
        localStorage.setItem('token', result);
        })
}

// Тест таймаут

function testPaymentTimeout(res) {
    localStorage.setItem('paymentId', res.PaymentId);
    let password = 'o6zmp4svjrvxg68a';
    let token = [{"IsDeadlineExpired": `true`},{"Password": `${password}`},{"PaymentId": `${res.PaymentId}`},{"TerminalKey": `${res.TerminalKey}`}];

    let values = [];
    for(let i = 0; i < token.length; i++) {
        values.push(String(Object.values(token[i])))
    }

    const result = values.join('');

    generateToken(result).then((result) => {
        localStorage.setItem('tokenDeadlineExpired', result);
        })
}

// Тест отказ

function testPaymentReject(res) {
    localStorage.setItem('paymentId', res.PaymentId);
    let password = 'o6zmp4svjrvxg68a';
    let token = [{"IsRejected": `true`},{"Password": `${password}`},{"PaymentId": `${res.PaymentId}`},{"TerminalKey": `${res.TerminalKey}`}];

    let values = [];
    for(let i = 0; i < token.length; i++) {
        values.push(String(Object.values(token[i])))
    }

    const result = values.join('');

    generateToken(result).then((result) => {
        localStorage.setItem('tokenRejected', result);
        })
}