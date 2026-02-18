import { Request, Response } from 'express';
import {
  getHealthCentersService,
  getLocationsService,
  getRoleService,
  getUsernameService,
} from '../../service/get/get.service';

export const getUsernameController = async (req: Request, res: Response) => {
  const { name, firstname } = req.body;

  try {
    const result = await getUsernameService(name, firstname);

    return res.status(result.status).json(result.data);
  } catch (error) {
    console.log(error);
  }
};

export const getRoleController = async (req: Request, res: Response) => {
  try {
    const result = await getRoleService();

    return res.status(result.status).json(result.data);
  } catch (error) {
    console.log(error);
  }
};

export const getLocationsController = async (req: Request, res: Response) => {
  try {
    const result = await getLocationsService();

    return res.status(result.status).json(result.data);
  } catch (error) {
    console.log(error);
  }
};

export const getHealthCentersController = async (req: Request, res: Response) => {
  try {
    const result = await getHealthCentersService();

    return res.status(result.status).json(result.data);
  } catch (error) {
    console.log(error);
  }
};
