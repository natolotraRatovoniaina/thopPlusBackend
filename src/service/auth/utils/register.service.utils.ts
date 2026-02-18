import bcrypt from 'bcrypt';
import HealthCenter from '../../../models/HealthCenter';
import HealthCenterType from '../../../models/HealthCenterType';
import Person from '../../../models/Person';
import Role from '../../../models/Role';
import Staff from '../../../models/Staff';
import StaffHealthCenter from '../../../models/StaffHealthCenter';
import User from '../../../models/User';
import { AssignedHealthCenterType } from '../../../typescript/AssignedHealthCenterType';
import { ResponseRegisterType } from '../../../typescript/ResponseAuthType';
import { StaffAssignmentType } from '../../../typescript/StaffAssignmentType';
import { StaffEnqueryType } from '../../../typescript/StaffEnqueryType';
import { signAccessToken } from '../../../utils/jwt';

export const userTypeChecker = (role: string, staff: StaffEnqueryType | null) => {
  if (role.toLowerCase() === 'simple') {
    return 'Simple';
  } else {
    if (!staff) {
      return 'Staff';
    }
    return 'HealthCenter';
  }
};

export const simpleUserRegister = async (
  {
    username,
    email,
    phone,
    password,
    firstname,
    lastname,
    sexe = true,
  }: {
    username: string;
    email: string | null;
    phone: string | null;
    password: string;
    firstname?: string;
    lastname?: string;
    sexe?: boolean;
  },
  url: string | null,
): Promise<ResponseRegisterType> => {
  try {
    const user = await User.findOne({ where: { username: username } });

    if (user) return { status: 400, data: { error: 'Utilisateur deja existant' } };

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = { username, password: passwordHash, phone, email, url };

    const userCreated = await User.create(newUser);

    const newPerson = { id_user: userCreated.id, first_name: firstname, last_name: lastname, sexe };

    await Person.create(newPerson);

    const accessToken = signAccessToken({
      id: userCreated.id,
      username: username,
    });

    return {
      status: 200,
      data: { message: 'Utilisateur enregistrer', accessToken },
      userInfo: { id: userCreated.id, username },
    };
  } catch (error) {
    console.log(error);
  }
};

export const staffUserRegister = async (
  {
    username,
    email,
    phone,
    password,
    firstname,
    lastname,
    sexe,
  }: {
    username: string;
    email: string | null;
    phone: string | null;
    password: string;
    firstname?: string;
    lastname?: string;
    sexe?: boolean;
  },
  url: string | null,
  {
    healthCenter,
    assignation,
  }: { healthCenter: AssignedHealthCenterType; assignation: StaffAssignmentType },
): Promise<ResponseRegisterType> => {
  if (!healthCenter || !assignation)
    return { status: 400, data: { error: 'Il y a des informations manquant' } };

  try {
    const user = await User.findOne({ where: { username: username } });

    if (user) return { status: 400, data: { error: 'Utilisateur deja existant' } };

    const rolechecker = await Role.findOne({ where: { id: assignation.id } });

    if (!rolechecker) return { status: 400, data: { error: "Le role n'existe pas" } };

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = { username, password: passwordHash, phone, email, url };

    const userCreated = await User.create(newUser);

    const newPerson = { id_user: userCreated.id, firstname, lastname, sexe };

    await Person.create(newPerson);

    const staffCreated = await Staff.create({ id_role: assignation.id, id_user: userCreated.id });

    await StaffHealthCenter.create({
      id_health_center: healthCenter.id,
      id_staff: staffCreated.id,
    });

    const accessToken = signAccessToken({
      id: userCreated.id,
      username: username,
    });

    return {
      status: 200,
      data: { message: 'Utilisateur enregistrer', accessToken },
      userInfo: { id: userCreated.id, username },
    };
  } catch (error) {
    console.log(error);
  }
};

export const healthCenterUserRegister = async (
  {
    username,
    email,
    phone,
    password,
  }: { username: string; email: string | null; phone: string | null; password: string },
  url: string | null,
  { name, type, location }: { name: string; type: { id: number; name: string }; location: string },
): Promise<ResponseRegisterType> => {
  if (!name || !type || !location)
    return { status: 400, data: { error: 'Il y a des informations manquant' } };

  try {
    const user = await User.findOne({ where: { username: username } });

    if (user) return { status: 400, data: { error: 'Utilisateur deja existant' } };

    const healthCenterTypechecker = await HealthCenterType.findOne({ where: { id: type.id } });

    if (!healthCenterTypechecker)
      return { status: 400, data: { error: "Le type de centre n'existe pas" } };

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = { username, password: passwordHash, phone, email, url };

    const userCreated = await User.create(newUser);

    await HealthCenter.create({
      id_type: type.id,
      name,
      id_user: userCreated.id,
      location,
    });

    const accessToken = signAccessToken({
      id: userCreated.id,
      username: username,
    });

    return {
      status: 200,
      data: { message: 'Utilisateur enregistrer', accessToken },
      userInfo: { id: userCreated.id, username },
    };
  } catch (error) {
    console.log(error);
  }
};
