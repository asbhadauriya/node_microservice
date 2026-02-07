import { z } from 'zod'

export const createListingSchema = z.object({
  providerId: z.string().uuid(),
  title: z.string().min(5),
  description: z.string().min(20),
  category: z.string()
})
