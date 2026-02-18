import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import helmet from 'helmet';
import http from 'http';
import { connectDb } from './db/sequelize';
import authRoute from './routes/auth.routes';
import getRoute from './routes/get.routes';
import uploadRoute from './routes/upload.routes';
import { createTable } from './utils/createTable';

dotenv.config();

class MyServer {
  private app: Application;
  private server: http.Server;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.useMiddlewares();
    this.useRoutes();
  }

  private useMiddlewares() {
    this.app.use(cors({ credentials: true }));
    this.app.use(cookieParser());
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  private useRoutes() {
    this.app.use('/api/auth', authRoute);
    this.app.use('/api/images', express.static('images', { index: false }));
    this.app.use('/api', uploadRoute);
    this.app.use('/api', getRoute);
  }

  async start(ip: string, port: number) {
    try {
      await connectDb();
      await createTable();
      this.server.listen(port, ip, () => {
        console.log(`Server is running in http://${ip}:${port}`);
      });
    } catch (error) {
      console.error('Failed to start server:', error);
    }
  }
}

export default MyServer;
