/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Products from './components/shopify/Products'
import Cart from './components/shopify/Cart'

const App = props => {
  const [products, setProducts] = useState([])
  const [isCartOpen, setCartOpen] = useState(false)
  const [checkout, setCheckout] = useState({ lineItems: [] })
  const [shop, setShop] = useState({})
  console.log(props)
  const cartOpen = () => {
    setCartOpen(true)
  }

  useEffect(() => {
    props.client.checkout.create().then(res => {
      setCheckout(res)
    })

    props.client.product.fetchAll().then(res => {
      setProducts(res)
    })

    props.client.shop.fetchInfo().then(res => {
      setShop(res)
    })
  }, [])

  let defaultOptionValues = {}
  console.log(products)

//let sizes = []
products.forEach(selector => {
    defaultOptionValues[selector.title] = selector.options[0]
  })

  const addVariantToCart = (variantId, quantity, title) => {
    setCartOpen(true)

    const lineItemsToAdd = [
      { variantId, quantity: parseInt(quantity, 10), title: title}
    ]
    const checkoutId = checkout.id

    return props.client.checkout
      .addLineItems(checkoutId, lineItemsToAdd)
      .then(res => {
        setCheckout(res)
      })
  }

  const updateQuantityInCart = (lineItemId, quantitys) => {
    const checkoutId = checkout.id
    const lineItemsToUpdate = [
      { id: lineItemId, quantity: parseInt(quantitys, 10) },
    ]

    return props.client.checkout
      .updateLineItems(checkoutId, lineItemsToUpdate)
      .then(res => {
        setCheckout(res)
      })
  }
  
  const updateOptionsInCart = (lineItemId, variant) => {
    const checkoutId = checkout.id
    const lineItemsToUpdateOpt = [
      { id: lineItemId, variant: variant.title},
    ]

    return props.client.checkout
      .updateLineItems(checkoutId, lineItemsToUpdateOpt)
      .then(res => {
        setCheckout(res)
      })
  }

  const removeLineItemInCart = lineItemId => {
    const checkoutId = checkout.id

    return props.client.checkout
      .removeLineItems(checkoutId, [lineItemId])
      .then(res => {
        setCheckout(res)
      })
  }

  const handleCartClose = () => {
    setCartOpen(false)
  }

  return (
    <div className="App">
      <header className="App__header">
        {!isCartOpen && (
          <div className="App__view-cart-wrapper">
            <button className="App__view-cart" onClick={cartOpen}>
              🛒
            </button>
          </div>
        )}
        <div className="App__title">
          <h1>{shop.name}: React Example</h1>
          <h2>{shop.description}</h2>
        </div>
      </header>
      <Products
        products={products}
        client={props.client}
        addVariantToCart={addVariantToCart}
      />
      <Cart
        checkout={checkout}
        isCartOpen={isCartOpen}
        handleCartClose={handleCartClose}
        updateQuantityInCart={updateQuantityInCart}
        removeLineItemInCart={removeLineItemInCart}
        updateOptionsInCart={updateOptionsInCart}
      />
    </div>
  )
}

export default App
