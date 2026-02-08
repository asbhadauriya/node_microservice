/**
 * @swagger
 * tags:
 *   name: Listings
 *   description: Work/service listings
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Listing:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - price
 *         - billingType
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *           example: Fix React bugs
 *         description:
 *           type: string
 *           example: I will fix frontend issues
 *         price:
 *           type: number
 *           example: 1500
 *         billingType:
 *           type: string
 *           enum: [hour, day, month]
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /listings:
 *   post:
 *     summary: Create a listing
 *     tags: [Listings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Listing'
 *     responses:
 *       201:
 *         description: Listing created
 */

/**
 * @swagger
 * /listings:
 *   get:
 *     summary: Get all listings
 *     tags: [Listings]
 *     responses:
 *       200:
 *         description: List of listings
 */

/**
 * @swagger
 * /listings/{id}:
 *   get:
 *     summary: Get listing by ID
 *     tags: [Listings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Listing found
 *       404:
 *         description: Listing not found
 */
