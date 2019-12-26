import React, { useReducer, createContext } from 'react'
import Products from './shopify/Products'
import * as ContextReducer from '../store/hooks_reducers/context_reducer'

const Store = createContext()
const State = createContext()
// import store from '../store'

const GenericProductsPage = () => {
  const [state, dispatch] = useReducer(ContextReducer, {
    isCartOpen: false,
    checkout: { lineItems: [] },
    products: [],
    shop: {},
  })

  const addVariantToCart = (variantId, quantity) => {
    const lineItemsToAdd = [
      { variantId, quantity: parseInt(quantity, 10) },
    ]
    const checkoutId = state.checkout.id
    state.client.checkout
      .addLineItems(checkoutId, lineItemsToAdd)
      .then(res => {
        Store.dispatch({
          type: 'ADD_VARIANT_TO_CART',
          payload: { isCartOpen: true, checkout: res },
        })
      })
  }
  // const state = store.getState() // state from redux store
  let oProducts = (
    <Products
      products={state.products}
      client={state.client}
      addVariantToCart={addVariantToCart}
    />
  )
  return (
    <State.Provider value={state}>
      <Store.Provider value={dispatch}>
        <div>
          <h1>dev-store9</h1>
          <p>Sandbox store with fake products</p>
          <br />
          <p>Built with React 16.11.0, Redux, and shopify-buy</p>
          {oProducts}
          {/*         <pre>{JSON.stringify(state, null, 2)}</pre> */}
        </div>
      </Store.Provider>
    </State.Provider>
  )
}

export default GenericProductsPage
