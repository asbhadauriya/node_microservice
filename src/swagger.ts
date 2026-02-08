import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Express } from 'express'
import path from 'path'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node Microservice API',
      version: '1.0.0',
      description: 'API documentation for Node Microservice'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      },
        {
        url: 'https://didactic-carnival-467r7rp664vc75v9-3000.app.github.dev/api',
        description: 'Github server'
      }
    ],
    components: {
      schemas: {
        Listing: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' }
          }
        }
      }
    }
  },
apis: ['./src/routes/*.ts', './src/routes/**/*.ts', './src/modules/**/*.ts']
}

const specs = swaggerJsdoc(options)

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(specs)
  })
}