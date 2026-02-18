import { Router } from 'express';
import {
  getHealthCentersController,
  getLocationsController,
  getUsernameController,
  getRoleController,
} from '../controllers/get/get.controller';

const getRoute = Router();

getRoute.get('/username', getUsernameController);
getRoute.get('/roles', getRoleController);
getRoute.get('/locations', getLocationsController);
getRoute.get('/healthcenters', getHealthCentersController);

export default getRoute;
