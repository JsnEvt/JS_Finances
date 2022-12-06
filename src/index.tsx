import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { createServer, Model } from 'miragejs'


//usando o MirageJS
createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2022-08-22 09:00:00')
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1000,
          createdAt: new Date('2022-08-05 10:00:00')
        }
      ],
    })
  },


  routes() {
    this.namespace = 'api'
    this.get('/transactions', () => {
      return this.schema.all('transaction')
      // return [
      // {
      //   id: 1,
      //   title: 'Transaction1',
      //   amount: 400,
      //   type: 'deposit',
      //   category: 'Food',
      //   createAt: new Date()
      // }
      // ]
    })
    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)
      return schema.create('transaction', data) // O MirageJS tem possibilidade de tratar as informaoes
      //como se fosse banco de dados, por isso o uso do 'schema'.
    })
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
