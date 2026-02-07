export interface CreateListingDTO {
  providerId: string
  title: string
  description: string
  category: string
  hourlyRate?: number
  dailyRate?: number
  monthlyRate?: number
}
