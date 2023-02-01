import type { FC } from 'react'
import { Button } from '@mui/material'

import { makeStyles } from 'utils'

const useStyles = makeStyles()(() => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    border: '1px solid lightblue',
    borderRadius: '20px',
    '& div': {
      fontFamily: 'Arial, Helvetica, sans-serif',
      padding: '1rem',
      height: '100%'
    },
    '& button': {
      borderRadius: '0 0 20px 20px'
    },
    '& img': {
      maxHeight: '250px',
      objectFit: 'cover',
      borderRadius: '20px 20px 0 0'
    }
  }
}))

type ItemProps = {
  item: CartItemType
  handleAddToCart: (clickedItem: CartItemType) => void
}

const Item: FC<ItemProps> = props => {
  const { item, handleAddToCart } = props
  const { classes } = useStyles()

  return (
    <article className={classes.container}>
      <img src={item.image} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h3>
          ${' '}
          {Intl.NumberFormat('en-US', {
            currency: 'USD'
          }).format(item.price)}
        </h3>
      </div>
      <Button
        onClick={() => {
          handleAddToCart(item)
        }}
      >
        ADD TO CART
      </Button>
    </article>
  )
}

export { Item }
