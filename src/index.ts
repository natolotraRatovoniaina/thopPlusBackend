import MyServer from './server';
import { serverConfig } from './serverConfig';

const server = new MyServer();
server.start(serverConfig.ip, serverConfig.port);
