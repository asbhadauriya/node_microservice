import { Router } from 'express'
import listingRoutes from './modules/listing/listing.routes'
import authRoutes from './modules/auth/auth.routes'

const router = Router()

router.use('/listings', listingRoutes)
router.use('/auth', authRoutes)

export default router
