type Listing = {
  id: string
  providerId: string
  title: string
  description: string
  category: string
  hourlyRate?: number
  dailyRate?: number
  monthlyRate?: number
  createdAt?: string
  updatedAt?: string
}

const listings: Listing[] = []

const generateId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8)

export const prisma = {
  listing: {
    async create({ data }: { data: Partial<Listing> }) {
      const newListing: Listing = {
        id: generateId(),
        providerId: data.providerId || '',
        title: data.title || '',
        description: data.description || '',
        category: data.category || '',
        hourlyRate: data.hourlyRate,
        dailyRate: data.dailyRate,
        monthlyRate: data.monthlyRate,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      listings.push(newListing)
      return newListing
    },

    async findMany() {
      return listings
    },

    async findUnique({ where }: { where: { id?: string } }) {
      if (!where || !where.id) return null
      return listings.find((l) => l.id === where.id) ?? null
    }
  }
} as any
