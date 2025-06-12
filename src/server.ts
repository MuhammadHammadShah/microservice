import app from './app'
import { Config } from './config'
import { AppDataSource } from './config/data-source'
import logger from './config/logger'

const startServer = async () => {
    try {
        await AppDataSource.initialize()
        logger().info('Database connected successfully')

        const PORT = Config.PORT || 8000
        app.listen(PORT, () => {
            logger().info(`Server listening on port ${PORT}`)
        })
    } catch (error) {
        logger().error('Error during server startup:', error)
        process.exit(1)
    }
}

startServer().catch((err) => {
    console.error(err)
    process.exit(1)
})

process.on('unhandledRejection', (err) => {
    logger().error('Unhandled Rejection:', err)
    process.exit(1)
})
