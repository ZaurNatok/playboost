let success = document.querySelector('.button_sussess');
let timeout = document.querySelector('.button_timeout');
let reject = document.querySelector('.button_rejected');

document.addEventListener('click', function(e) {
    if(e.target.classList.contains('button_sussess')) {

        fetch('https://api.payforsteam.ru/SbpPayTest', { 
            method: 'POST',
            headers: { 
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "TerminalKey": "1574412702003DEMO",
                    "PaymentId": localStorage.getItem('paymentId'),
                    "Token": localStorage.getItem('token')
                  }
            )})
            .then(res => {
                // console.log(res);
                return res.json();
            })
            .then(res => console.log(res)) // отправляется ответ на клиент
            .catch(err => console.log({ err }))
  
    } if(e.target.classList.contains('button_timeout')) {
        
        fetch('https://api.payforsteam.ru/SbpPayTest', { 
            method: 'POST',
            headers: { 
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "TerminalKey": "1574412702003DEMO",
                    "PaymentId": localStorage.getItem('paymentId'),
                    "Token": localStorage.getItem('tokenDeadlineExpired'),
                    "IsDeadlineExpired": true
                  }
            )})
            .then(res => {
                // console.log(res);
                return res.json();
            })
            .then(res => console.log(res)) // отправляется ответ на клиент
            .catch(err => console.log({ err }))

    }  if(e.target.classList.contains('button_rejected')) {
        
        fetch('https://api.payforsteam.ru/aSbpPayTest', { 
            method: 'POST',
            headers: { 
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "TerminalKey": "1574412702003DEMO",
                    "PaymentId": localStorage.getItem('paymentId'),
                    "Token": localStorage.getItem('tokenRejected'),
                    "IsRejected": true
                  }
            )})
            .then(res => {
                // console.log(res);
                return res.json();
            })
            .then(res => console.log(res)) // отправляется ответ на клиент
            .catch(err => console.log({ err }))

    }
})