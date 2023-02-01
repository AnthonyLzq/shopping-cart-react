import { CartItem } from './CartItem'

import { makeStyles } from 'utils'
import { type FC } from 'react'

const useStyles = makeStyles()(() => ({
  container: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    width: '500px',
    padding: '20px'
  }
}))

type CartProps = {
  cartItems: CartItemType[]
  addToCart: (clickedItem: CartItemType) => void
  removeFromCart: (id: number) => void
}

const Cart: FC<CartProps> = props => {
  const { cartItems, addToCart, removeFromCart } = props
  const { classes } = useStyles()

  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0)

  return (
    <aside className={classes.container}>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>
        Total: ${' '}
        {Intl.NumberFormat('en-US', { currency: 'USD' }).format(
          calculateTotal(cartItems)
        )}
      </h2>
    </aside>
  )
}

export { Cart }
