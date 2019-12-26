import * as ACTION_TYPES from '../actions/action_types'

export const initState = {
  isCartOpen: false,
  checkout: { lineItems: [] },
  products: [],
  shop: {},
}

export const ContextReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPES.CLIENT_CREATED:
      return {
        ...state,
        client: action.payload,
      }
    case ACTION_TYPES.PRODUCTS_FOUND:
      return {
        ...state,
        products: action.payload,
      }
    case ACTION_TYPES.CHECKOUT_FOUND:
      return {
        ...state,
        checkout: action.payload,
      }
    case ACTION_TYPES.SHOP_FOUND:
      return {
        ...state,
        shop: action.payload,
      }
    case ACTION_TYPES.ADD_VARIANT_TO_CART:
      return {
        ...state,
        isCartOpen: action.payload.isCartOpen,
        checkout: action.payload.checkout,
      }
    case ACTION_TYPES.UPDATE_QUANTITY_IN_CART:
      return {
        ...state,
        checkout: action.payload.checkout,
      }
    case ACTION_TYPES.REMOVE_LINE_ITEM_IN_CART:
      return {
        ...state,
        checkout: action.payload.checkout,
      }
    case ACTION_TYPES.OPEN_CART:
      return {
        ...state,
        isCartOpen: true,
      }
    case ACTION_TYPES.CLOSE_CART:
      return {
        ...state,
        isCartOpen: false,
      }
    default:
      throw new Error()
  }
}
