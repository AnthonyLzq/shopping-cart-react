import { useState } from 'react'
import { useQuery } from 'react-query'

// Components
import { Badge, Drawer, Grid, LinearProgress } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

import { Cart, Item } from 'components'
import { makeStyles } from 'utils'
import { StyledButton } from 'App.styles'

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json()

const useStyles = makeStyles()(() => ({
  container: {
    margin: '40px'
  }
}))

const App = () => {
  const [cartIsOpen, setCartIsOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItemType[]>([])
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  )
  const { classes } = useStyles()

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((acc: number, item) => acc + item.amount, 0)

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItem.id)

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        )
      }

      // First time the item is added
      return prev.concat({ ...clickedItem, amount: 1 })
    })
  }

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce<CartItemType[]>((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc

          return acc.concat({ ...item, amount: item.amount - 1 })
        } else return acc.concat(item)
      }, [])
    )
  }

  if (isLoading) return <LinearProgress />

  if (error) return <div>Something went wrong</div>

  return (
    <main className={classes.container}>
      <Drawer
        anchor='right'
        open={cartIsOpen}
        onClose={() => {
          setCartIsOpen(false)
        }}
      >
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton
        onClick={() => {
          setCartIsOpen(true)
        }}
      >
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </main>
  )
}

export default App
