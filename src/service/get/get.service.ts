import { readFile } from 'fs/promises';
import HealthCenter from '../../models/HealthCenter';
import Role from '../../models/Role';
import User from '../../models/User';

export const getUsernameService = async (name: string, firstname: string) => {
  if (!name || !firstname) return { status: 400, error: 'Il y a des informations manquant' };

  let exists: boolean = true;
  let username: string;

  while (exists) {
    const base: string = (firstname[0] + name).toLowerCase().replace(/[^a-z0-9]/g, '');

    const randomNum: number = Math.floor(100 + Math.random() * 900);

    username = `${base}${randomNum}`;

    const user = await User.findOne({ where: { username } });
    if (!user) exists = false;
  }

  return { status: 200, data: { message: 'Username généré avec succès', username } };
};

export const getRoleService = async () => {
  const roles = await Role.findAll();

  const id = roles.map((r) => r.id);

  const name = roles.map((r) => r.name);

  return { status: 200, data: { roles: { id, name } } };
};

export const getLocationsService = async () => {
  const dir = {
    pathRegion: 'data-location/liste_region.json',
    pathDistrict: 'data-location/liste_district_par_region.json',
    pathCommune: 'data-location/liste_commune_par_district.json',
  };

  const dataRegion = await readFile(dir.pathRegion, 'utf8');
  const dataDistrict = await readFile(dir.pathDistrict, 'utf8');
  const dataCommune = await readFile(dir.pathCommune, 'utf8');

  return {
    status: 200,
    data: JSON.stringify({ region: dataRegion, district: dataDistrict, commune: dataCommune }),
  };
};

export const getHealthCentersService = async () => {
  try {
    const healthCenters = await HealthCenter.findAll({ attributes: ['id', 'name'] });

    const id = healthCenters.map((h) => h.id);

    const name = healthCenters.map((h) => h.name);

    return { status: 200, data: { healthCenters: { id, name } } };
  } catch (error) {
    return { status: 400, error: error };
  }
};
