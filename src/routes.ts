import { Router } from 'express'
import listingRoutes from './modules/listing/listing.routes'

const router = Router()

router.use('/listings', listingRoutes)

export default router
