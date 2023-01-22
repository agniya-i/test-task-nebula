import { apiClient } from './apiClient'
import { User } from '../types/User'

type ExpertsResponse = {
  data: User[]
  total: number
}

export const getExperts = async (
  limit: number,
  offset: number,
): Promise<ExpertsResponse> => {
  return await apiClient.get<ExpertsResponse>(
    `api/experts?limit=${limit}&offset=${offset}`,
  )
}

export const getExpertById = async (userId: string): Promise<any> => {
  return await apiClient.get<User>(`api/experts/${userId}`)
}
