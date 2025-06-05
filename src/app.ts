// app.ts
import express from 'express'
import productionLogger from './logger'

const app = express()

// middleware

const logger = productionLogger()

app.use(express.json())

// routes
app.get('/', (req, res) => {
    logger.info('Root endpoint hit')
    logger.error('Root endpoint hit')
    logger.warn('Root endpoint hit')
    res.send('hello world')
})

app.post('/event', () => {})
app.post('/quests/complete', () => {})
app.post('hearts/refill', () => {})
app.get('user/:id/status', () => {})
app.get('quests/daily', () => {})
app.get('leaderboard', () => {})

export default app
