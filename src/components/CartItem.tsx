import { Button } from '@mui/material'
import { type FC } from 'react'

import { makeStyles } from 'utils'

declare module '@mui/material' {
  interface ButtonPropsColorOverrides {
    neutral: true
  }
}

const useStyles = makeStyles()(() => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: 'Arial, Helvetica, sans-serif',
    borderBottom: '1px solid lightblue',
    paddingBottom: 20,
    '& article, div, img': {
      flex: 1
    },
    '& .information, .buttons': {
      display: 'flex',
      justifyContent: 'space-between'
    },
    '& img': {
      maxWidth: 80,
      objectFit: 'cover',
      marginLeft: 40
    }
  }
}))

type CartItemProps = {
  item: CartItemType
  addToCart: (clickedItem: CartItemType) => void
  removeFromCart: (id: number) => void
}

const CartItem: FC<CartItemProps> = props => {
  const { item, addToCart, removeFromCart } = props
  const { classes } = useStyles()

  return (
    <div className={classes.container}>
      <article>
        <h3>{item.title}</h3>
        <div className='information'>
          <p>
            Price: ${' '}
            {Intl.NumberFormat('en-US', {
              currency: 'USD'
            }).format(item.price)}
          </p>
          <p>
            Total: ${' '}
            {Intl.NumberFormat('en-US', {
              currency: 'USD'
            }).format(item.amount * item.price)}
          </p>
        </div>
        <div className='buttons'>
          <Button
            color='neutral'
            size='small'
            disableElevation
            variant='contained'
            onClick={() => {
              removeFromCart(item.id)
            }}
          >
            -
          </Button>
          <p>{item.amount}</p>
          <Button
            color='neutral'
            size='small'
            disableElevation
            variant='contained'
            onClick={() => {
              addToCart(item)
            }}
          >
            +
          </Button>
        </div>
      </article>
      <img src={item.image} alt={item.title} />
    </div>
  )
}

export { CartItem }
