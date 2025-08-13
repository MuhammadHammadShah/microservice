import app from "./app";
import { Config } from "./config";
import { AppDataSource } from "./config/data-source";
import logger from "./config/logger";

const startServer = async () => {
    const PORT = Config.PORT;
    try {
        await AppDataSource.initialize();
        logger().info("Database connected successfully.");
        app.listen(PORT, () => logger().info(`Listening on port ${PORT}`));
    } catch (err: unknown) {
        if (err instanceof Error) {
            logger().error(err.message);
            logger().error(
                "Failed to connect to database. Retrying in 5 seconds...",
            );
            console.error(err.stack); // Add stack trace for debugging
            setTimeout(() => {
                process.exit(1);
            }, 5000); // Give more time before exiting
        }
    }
};

void startServer();
