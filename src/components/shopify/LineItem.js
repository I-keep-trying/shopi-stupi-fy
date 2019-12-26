import React, { useState, useEffect, useContext } from 'react'
import Context from '../../utils/context'

/* const context = useContext(Context)
console.log(context) */

// export function Sizes(props)  {
  const Sizes = (props) => {

  
  let defaultOptionValues = {}
    
/* props.product.options.forEach(selector => {
    defaultOptionValues[selector.name] = selector.values[0].value
  })
  console.log(defaultOptionValues)

  const handleOptionChange = (event) => {
    const target = event.target
     defaultOptionValues[target.name] = target.value

    const selectedVariant = props.client.product.helpers.variantForOptions(
      props.product,
      defaultOptionValues
    )

    setState({
      selectedVariant: selectedVariant,
      selectedVariantImage: selectedVariant.attrs.image,
    })
  }

  let aOptionNames = []
  let variantSelectors = props.product.options.map(option => {
    aOptionNames.push(option.name)
    return (
      <>
      <VariantSelector
        handleOptionChange={handleOptionChange}
        key={option.id.toString()}
        option={option}
      />
      <div>
      {variantSelectors}
      </div>
      </>
    )
  }) */
  return null

}

const LineItem = props => {
  const [products, setProducts] = useState([])
  const [state, setState] = useState(props)

useEffect(() => {
  setState(props)
}, [props])
console.log(state)
  const decrementQuantity = lineItemId => {
    const updatedQuantity = props.line_item.quantity - 1
    props.updateQuantityInCart(lineItemId, updatedQuantity)
  }

  const incrementQuantity = lineItemId => {
    const updatedQuantity = props.line_item.quantity + 1
    props.updateQuantityInCart(lineItemId, updatedQuantity)
  }

  return (
    <li className="Line-item">
      <div className="Line-item__img">
        {props.line_item.variant.image ? (
          <img
            src={props.line_item.variant.image.src}
            alt={`${props.line_item.title} product shot`}
          />
        ) : null}
      </div>
      <div className="Line-item__content">
        <div className="Line-item__content-row">
          <div className="Line-item__variant-title">
            {props.line_item.variant.title}
          </div>
          <span className="Line-item__title">
            {props.line_item.title}
          </span>
        </div>
        <div className="Line-item__content-row">
          <div className="Line-item__quantity-container">
            <button
              className="Line-item__quantity-update"
              onClick={() => decrementQuantity(props.line_item.id)}
            >
              -
            </button>
            <span className="Line-item__quantity">
              {props.line_item.quantity}
            </span>
            <button
              className="Line-item__quantity-update"
              onClick={() => incrementQuantity(props.line_item.id)}
            >
              +
            </button>
          </div>
          <Sizes />
          <span className="Line-item__price">
            ${' '}
            {(
              props.line_item.quantity * props.line_item.variant.price
            ).toFixed(2)}
          </span>
          <button
            className="Line-item__remove"
            onClick={() =>
              props.removeLineItemInCart(props.line_item.id)
            }
          >
            ×
          </button>
        </div>
      </div>
    </li>
  )
}

export default LineItem
