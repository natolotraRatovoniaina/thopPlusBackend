import { healthCenterEnqueryType } from './HealthCenterEnqueryType';
import { StaffEnqueryType } from './StaffEnqueryType';

export type RegisterDataType = {
  role: string;
  staff: StaffEnqueryType | null;
  healthCenter: healthCenterEnqueryType | null;
  general: {
    username: string;
    email: string | null;
    phone: string | null;
    password: string;
    firstname?: string;
    lastname?: string;
    sexe?: boolean;
  };
  url: string;
};
