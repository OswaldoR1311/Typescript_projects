import type { Request, Response, NextFunction } from 'express'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['x-api-key']

    if (apiKey !== 'secret123') {
        return res.status(401).json({ error: 'Unauthorized: Missing or invalid Api Key' })
    }

    next()
}
