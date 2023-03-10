interface CartItemType {
  id: number
  category: string
  description: string
  image: string
  price: number
  title: string
  rating: {
    rate: number
    count: number
  }
  amount: number
}
