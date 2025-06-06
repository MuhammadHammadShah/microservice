import app from './app'
import { Config } from './config'
import logger from './logger'

const startServer = () => {
    const PORT = Config.PORT
    try {
        app.listen(PORT, () => {
            logger().info(`Listening on the PORT: ${PORT}`)
        })
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

startServer()
