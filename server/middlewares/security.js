import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

export const applySecurityMiddleware = (app) => {
  app.use(helmet());  // HTTP headers security

  app.use(cors());

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again later.',
  });

  app.use(limiter);
};
