import { prisma } from '../../config/db'
import { CreateListingDTO } from './listing.types'

export class ListingRepository {
  static create(data: CreateListingDTO) {
    return prisma.listing.create({ data })
  }

  static findAll() {
    return prisma.listing.findMany()
  }

  static findById(id: string) {
    return prisma.listing.findUnique({
      where: { id }
    })
  }
}
