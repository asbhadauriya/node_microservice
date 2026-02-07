import { Request, Response } from 'express'
import { ListingService } from './listing.service'

export class ListingController {
  static async createListing(req: Request, res: Response) {
    const listing = await ListingService.createListing(req.body)
    res.status(201).json(listing)
  }

  static async getListings(req: Request, res: Response) {
    const listings = await ListingService.getAllListings()
    res.json(listings)
  }

  static async getListingById(req: Request, res: Response) {
    const listing = await ListingService.getListingById(req.params.id)
    res.json(listing)
  }
}
