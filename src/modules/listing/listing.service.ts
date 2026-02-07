import { ListingRepository } from './listing.repository'
import { CreateListingDTO } from './listing.types'

export class ListingService {
  static async createListing(data: CreateListingDTO) {
    // business rules live here
    return ListingRepository.create(data)
  }

  static async getAllListings() {
    return ListingRepository.findAll()
  }

  static async getListingById(id: string) {
    return ListingRepository.findById(id)
  }
}
