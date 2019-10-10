import React, { Component } from 'react'
import axios from 'axios'
import './App.css'

const TITLE = 'React GraphQL Shopify Client'

const SHOPIFY_BASE_URL = `https://${process.env.REACT_APP_SHOP_NAME}.myshopify.com/api/graphql`

const config = {
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': `${process.env.REACT_APP_SHOPIFY_ACCESS_TOKEN}`,
  },
}

const axiosGitHubGraphQL = axios.create({
  baseURL: SHOPIFY_BASE_URL,
  headers: config.headers,
})

const GET_PRODUCTS = `
query{
  shop {
    name
  }
products(first:20) {
  
    edges {
      node {
        vendor
        title
        description
        productType
        onlineStoreUrl
       
        
      
      }
    }
  }
}
`

class App extends Component {
  state = {
    products: 20,
    errors: null,
  }
  componentDidMount() {
    this.onFetchFromGitHub()
  }

  onSubmit = event => {
    // fetch data

    event.preventDefault()
  }

  onFetchFromGitHub = () => {
    axiosGitHubGraphQL
      .post('', { query: GET_PRODUCTS })
      .then(result =>
        this.setState(() => ({
          products: result.data.data.products,
          errors: result.data.errors,
        }))
      )
  }

  render() {
    const { products, errors } = this.state

    const Products = ({ products, errors }) => {
      if (errors) {
        return (
          <p>
            <strong>Something went wrong:</strong>
            {errors.map(error => error.message).join(' ')}
          </p>
        )
      }

      return (
        <div>
            <strong>Products from Vendor:</strong>
           
            <div>
              <a href={products.onlineStoreUrl}>
                <br>{products.title}</br>
                <br>{products.description}</br>
              </a>
            </div>
        </div>
      )
    }

    return (
      <div>
        <h1>{TITLE}</h1>

        <form onSubmit={this.onSubmit}>
          <label htmlFor="url">Show products for dev-store9</label>
          <input
            id="url"
            type="text"
            value={products}
            onChange={this.onChange}
            style={{ width: '300px' }}
          />
          <button type="submit">Search</button>
        </form>

        <hr />

        {products ? (
          <Products products={products} errors={errors} />
        ) : (
          <p>No information yet ...</p>
        )}
      </div>
    )
  }
}

export default App
