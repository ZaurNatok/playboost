import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import mongoose from 'mongoose';
import crypto from 'crypto';
const app = express();

app.use(cors());
app.use(express.json());

import dotenv from 'dotenv';
dotenv.config();

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const authorizationProfitable = process.env.PROFITABLE_AUTH;
const bankPassword = process.env.BANK_PASSWORD;
const bankTerminalKey = process.env.BANK_TERMINAL_KEY;

// База данных

mongoose.connect(
  `${dbHost}`,
  {
    user: `${dbUser}`,
    pass: `${dbPassword}`
  }
).then(() => console.log('Connected!'));

// mongoose.connect(
//   'mongodb+srv://zmnatok:adiTjCdhhLbgnTG6@bestgame.idpdx.mongodb.net/?retryWrites=true&w=majority&appName=BestGame',
//   {
//     // useNewUrlParcer: true,
//     // useUnifiedTopology: true
//   }
// ).then(() => console.log('Connected!'));

const { Schema, model } = mongoose

const paymentSchema = new Schema({ 
  agentTransactionId: 'string',
  transactionId: 'string',
  date: 'string',
  time: 'string',
  serviceId: 'string',
  serviceName: 'string',
  sumFrom: 'number',
  sumTo: 'number',
  sumCurrency: 'string',
  comissionPercentage: 'number',
  comissionFee: 'number',
  statusBank: 'string',
  statusPartner: 'string',
  clientAccountId: 'string'
})
const Payment = model('Payment', paymentSchema);

// // Insert payments into the database
// const payments = [
//   { agentTransactionId: '111', transactionId: '123', date: 24/12/2024, time: '15:12:22', serviceId: 'P1011', serviceName: 'Steam', sumFrom: 100, sumTo: 100, sumCurrency: 'USD', comissionPercentage: 0.025, comissionFee: 50, statusBank: 'Confirmed', statusPartner: 'Confirmed', clientAccountId: '1234567890' },
//   { agentTransactionId: '111', transactionId: '123', date: 24/12/2024, time: '15:12:22', serviceId: 'P1011', serviceName: 'Steam', sumFrom: 100, sumTo: 100, sumCurrency: 'USD', comissionPercentage: 0.025, comissionFee: 50, statusBank: 'Confirmed', statusPartner: 'Confirmed', clientAccountId: '1234567890' },
//   { agentTransactionId: '111', transactionId: '123', date: 24/12/2024, time: '15:12:22', serviceId: 'P1011', serviceName: 'Steam', sumFrom: 100, sumTo: 100, sumCurrency: 'USD', comissionPercentage: 0.025, comissionFee: 50, statusBank: 'Confirmed', statusPartner: 'Confirmed', clientAccountId: '1234567890' },
//   { agentTransactionId: '111', transactionId: '123', date: 24/12/2024, time: '15:12:22', serviceId: 'P1011', serviceName: 'Steam', sumFrom: 100, sumTo: 100, sumCurrency: 'USD', comissionPercentage: 0.025, comissionFee: 50, statusBank: 'Confirmed', statusPartner: 'Confirmed', clientAccountId: '1234567890' }
// ];

// // Insert multiple documents (payments) into the collection
// Payment.insertMany(payments)
//   .then(() => {
//     console.log('Payments inserted successfully');
//   })
//   .catch((err) => {
//     console.error('Error inserting books:', err);
//     mongoose.connection.close(); // Close the connection on error
//   });

// удаление пустых

// const result = await Payment.deleteMany({agentTransactionId: null})
// const result = await Payment.deleteMany({sumFrom: 100})


// Добавление платежа в базу на запросе /check

app.post('/newpayment', (req, res) => {
  try {
    // Fetch all payments from the database
    var object = req.body;
    Payment.create(object);
    return res.json(200)
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Обновление статуса на запросе /pay

app.post('/payresult', async (req, res) => {

  try {
    const filter = { agentTransactionId: req.body.agentTransactionId };
    const update = { statusPartner: req.body.statusPartner };
    const opts = { new: true };

    let updatedStatus = await Payment.findOneAndUpdate(filter, update, opts);

    const filter1 = { agentTransactionId: req.body.agentTransactionId };
    const update2 = { statusBank: 'Успешно' };
    const opts3 = { new: true };

    let updatedAgentStatus = await Payment.findOneAndUpdate(filter1, update2, opts3);

    const filter2 = { agentTransactionId: req.body.agentTransactionId };
    const update3 = { transactionId: req.body.transactionId};
    const opts4 = { new: true };

    let updatedAgentStatusTransactionId = await Payment.findOneAndUpdate(filter2, update3, opts4);

    return res.json(updatedStatus, updatedAgentStatus, updatedAgentStatusTransactionId);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// const payment = { agentTransactionId: '111231231', transactionId: '1202123', date: 21/12/2024, time: '15:12:22', serviceId: 'P1011', serviceName: 'Steam', sumFrom: 150, sumTo: 100, sumCurrency: 'USD', comissionPercentage: 0.025, comissionFee: 50, statusBank: 'Confirmed', statusPartner: 'Confirmed', clientAccountId: '1234567890' }

// Payment.insertMany(payment);

// Выгрузка всех платежей из базы

app.get('/payments', async (req, res) => {
  try {
    // Fetch all books from the database
    const info = await Payment.find();
    console.log(res.json(info)); // Respond with the list of payments as JSON
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// const { Schema, model } = mongoose


// const paymentsSchema = new Schema({
  // id: String,
  // date: Date,
  // sumFrom: Number,
  // sumTo: Number
// })

// console.log(paymentsSchema.id)

// const payment = new Schema({
//   serviceId: ObjectId,
//   serviceName: String,
//   transactionId: String,
//   agentTransactionId: String,
//   Datetime: Date,
//   sumFrom: Number,
//   sumTo: Number
// });

// const Payments = mongoose.model('Payments', { serviceId: String })
// const payment = new Payments({ name: 'P1011' })
// payment.save().then(() => console.log('Done'))

//



app.post('/check', ((reqClient, resClient) => {
console.log('вот он', reqClient.body)
    fetch('http://185.102.73.67:8081/TestPTService/api/v20/check', {
      method: 'POST',
      headers: {
          'content-type': 'application/json',
          'Authorization': `${authorizationProfitable}`
      },
      body: JSON.stringify(reqClient.body) // прокисуются данные с клиента
    })
    .then(res => {
      console.log(res);
      return res.json()
    })
    .then(res => resClient.send(res)) // отправляется ответ на клиент
    .catch(err => console.log({ err }))
  }))

  app.post('/service', ((reqClient, resClient) => {
    console.log(reqClient);
      fetch('http://185.102.73.67:8081/TestPTService/api/v20/service', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': `${authorizationProfitable}`,
        },
        body: JSON.stringify(reqClient.body) // прокисуются данные с клиента
      })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(res => resClient.send(res)) // отправляется ответ на клиент
      .catch(err => console.log({ err }))
    }))

  app.post('/balance', ((reqClient, resClient) => {
    console.log(reqClient);
      fetch('http://185.102.73.67:8081/TestPTService/api/v20/balance', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': `${authorizationProfitable}`,
        },
        body: JSON.stringify(reqClient.body) // прокисуются данные с клиента
      })
      .then(res => {
        console.log(res);
        return res.json()
      })
      .then(res => resClient.send(res)) // отправляется ответ на клиент
      .catch(err => console.log({ err }))
    }))

  app.post('/services', ((reqClient, resClient) => {

      fetch('http://185.102.73.67:8081/TestPTService/api/v20/services', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': `${authorizationProfitable}`,
        },
        body: JSON.stringify(reqClient.body) // прокисуются данные с клиента
      })
      .then(res => {
        console.log(res);
        return res.json()
      })
      .then(res => resClient.send(res)) // отправляется ответ на клиент
      .catch(err => console.log({ err }))
    }))

  app.post('/pay', ((reqClient, resClient) => {
    console.log(reqClient);
      fetch('http://185.102.73.67:8081/TestPTService/api/v20/pay', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': `${authorizationProfitable}`,
        },
        body: JSON.stringify(reqClient.body) // прокисуются данные с клиента
      })
      .then(res => {
        return res.json()
      })
      .then(res => resClient.send(res)) // отправляется ответ на клиент
      .catch(err => console.log({ err }))
    }))





    // СБП

    app.post('/sbpInit', (async (reqClient, resClient) => {

      let token = [{"Amount": `${reqClient.body.Amount}`},{"Description": `${reqClient.body.Description}`},{"OrderId": `${reqClient.body.OrderId}`},{"Password": `${bankPassword}`},{"TerminalKey": `${bankTerminalKey}`}];

      let values = [];

      for(let i = 0; i < token.length; i++) {
          values.push(String(Object.values(token[i])))
      }

      const result = values.join('');

      const utf8 = new TextEncoder().encode(result);
      try {
        const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
          .map((bytes) => bytes.toString(16).padStart(2, '0'))
          .join('');
        const res = hashHex;

        res => res.json();

        fetch('https://rest-api-test.tinkoff.ru/v2/Init', {
          method: 'POST',
          headers: {
              'content-type': 'application/json'
          },
          body: JSON.stringify(
            {
              "TerminalKey": `${bankTerminalKey}`,
              "Amount": reqClient.body.Amount,
              "OrderId": reqClient.body.OrderId.toString(),
              "Description": reqClient.body.Description,
              "Token": res
            }
          ) // прокисуются данные с клиента
        })
        .then(res => {
          return res.json()
        })
        .then(res => resClient.send(res)) // отправляется ответ на клиент
        .catch(err => resClient.send({ err }))

      } 
      catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    
  }))

    

  app.post('/generateQR', (async (reqClient, resClient) => {

    let token = [{"DataType": `${reqClient.body.DataType}`},{"Password": `${bankPassword}`},{"PaymentId": `${reqClient.body.PaymentId}`},{"TerminalKey": `${bankTerminalKey}`}];

    let values = [];

    for(let i = 0; i < token.length; i++) {
        values.push(String(Object.values(token[i])))
    }

    const result = values.join('');

    const utf8 = new TextEncoder().encode(result);
    try {
      const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((bytes) => bytes.toString(16).padStart(2, '0'))
        .join('');
      const res = hashHex;

      res => res.text();
      resClient.send(res);

    } 
    catch (err) {
      console.error('Error fetching books:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  
}))

    // function generateToken(amount, description, orderId) {
  

    //     const utf8 = new TextEncoder().encode(result);
    //     try {
    //       const hashBuffer = crypto.subtle.digest('SHA-256', utf8);
    //       const hashArray = Array.from(new Uint8Array(hashBuffer));
    //       const hashHex = hashArray
    //         .map((bytes) => bytes.toString(16).padStart(2, '0'))
    //         .join('');
    //       const res = hashHex;
    //       console.log('token', res)

    //       res => res.json();
    //       return res;
          
    //     } catch (err) {
    //       console.error('Error fetching books:', err);
    //       res.status(500).json({ message: 'Internal Server Error' });
    //     }
    // }


  //   function generateToken(string) {
  //     const utf8 = new TextEncoder().encode(string);
  //     return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
  //     const hashArray = Array.from(new Uint8Array(hashBuffer));
  //     const hashHex = hashArray
  //     .map((bytes) => bytes.toString(16).padStart(2, '0'))
  //     .join('');
  //     return hashHex;
  //     });
  // }

  // app.post('/sbpInit', ((reqClient, resClient) => {

 
  //   fetch('https://rest-api-test.tinkoff.ru/v2/Init', {
  //     method: 'POST',
  //     headers: {
  //         'content-type': 'application/json'
  //     },
  //     body: JSON.stringify(
  //       {
  //         "TerminalKey": `${bankTerminalKey}`,
  //         "Amount": reqClient.body.Amount,
  //         "OrderId": reqClient.body.OrderId.toString(),
  //         "Description": reqClient.body.Description,
  //         "Token": reqClient.body.Token
  //       }
  //     ) // прокисуются данные с клиента
  //   })
  //   .then(res => {
  //     return res.json()
  //   })
  //   .then(res => resClient.send(res)) // отправляется ответ на клиент
  //   .catch(err => resClient.send({ err }))
  // }))
  
    
    // app.post('/sbpInit', ((reqClient, resClient) => {
 
    //     fetch('https://rest-api-test.tinkoff.ru/v2/Init', {
    //       method: 'POST',
    //       headers: {
    //           'content-type': 'application/json'
    //       },
    //       body: JSON.stringify(reqClient.body) // прокисуются данные с клиента
    //     })
    //     .then(res => {
    //       return res.json()
    //     })
    //     .then(res => resClient.send(res)) // отправляется ответ на клиент
    //     .catch(err => resClient.send({ err }))
    //   }))













    app.post('/getQr', ((reqClient, resClient) => {

      fetch('https://rest-api-test.tinkoff.ru/v2/GetQr', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(
          {
            "TerminalKey": `${bankTerminalKey}`,
            "PaymentId": reqClient.body.PaymentId,
            "DataType": reqClient.body.DataType,
            "Token": reqClient.body.Token
          }
        ) // прокисуются данные с клиента
      })
      .then(res => {
        return res.json()
      })
      .then(res => resClient.send(res)) // отправляется ответ на клиент
      .catch(err => console.log({ err }))
    }))

    app.post('/getState', ((reqClient, resClient) => {

      fetch('https://rest-api-test.tinkoff.ru/v2/GetState', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(reqClient.body) // прокисуются данные с клиента
      })
      .then(res => {
        return res.json()
      })
      .then(res => resClient.send(res)) // отправляется ответ на клиент
      .catch(err => console.log({ err }))
    }))

    app.post('/SbpPayTest', ((reqClient, resClient) => {

      fetch('https://rest-api-test.tinkoff.ru/v2/SbpPayTest', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(reqClient.body) // прокисуются данные с клиента
      })
      .then(res => {
        return res.json()
      })
      .then(res => resClient.send(res)) // отправляется ответ на клиент
      .catch(err => console.log({ err }))
    }))

    app.post('/payresultSBP', async (req, res) => {

      try {
        const filter = { agentTransactionId: req.body.agentTransactionId };
        const update = { statusBank: req.body.statusBank, statusPartner: req.body.statusPartner };
        const opts = { new: true };
    
        let updatedStatus = await Payment.findOneAndUpdate(filter, update, opts);
    
        return res.json(updatedStatus);
      } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });



app.listen(3000, () => {
    console.log('Application listening on port 3000!');
});
