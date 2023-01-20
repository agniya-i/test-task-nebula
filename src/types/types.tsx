export interface User {
  name: string
  id: string
  description: string
  status: string
  slogan: string
  rating: number
  experience: number
  total_orders: number
  image: string
  specializations: Specialization[]
}

interface Specialization {
  id: number
  name: string
}
