import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Client from 'shopify-buy'

import * as serviceWorker from './serviceWorker'

const client = Client.buildClient({
  domain: `${process.env.REACT_APP_SHOP_NAME}.myshopify.com`,
  storefrontAccessToken: `${process.env.REACT_APP_SHOPIFY_ACCESS_TOKEN}`
});

console.log(<App client={client} />)
ReactDOM.render(<App client={client} />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
