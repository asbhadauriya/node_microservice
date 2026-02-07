import { Router } from 'express'
import { ListingController } from './listing.controller'

const router = Router()

router.post('/', ListingController.createListing)
router.get('/', ListingController.getListings)
router.get('/:id', ListingController.getListingById)

export default router
