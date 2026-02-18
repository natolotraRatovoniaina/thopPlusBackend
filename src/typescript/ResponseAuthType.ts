export type ResponseLogoutType = {
  status: number;
  data: {
    message?: string | undefined;
    error?: string | undefined;
  };
};

export type ResponseRefreshType = {
  status: number;
  data: {
    message?: string | undefined;
    error?: string | undefined;
    accessToken?: string | undefined;
    expiresIn?: string | undefined;
  };
};

export type ResponseRegisterType = {
  status: number;
  data: {
    message?: string | undefined;
    error?: string | undefined;
    accessToken?: string | undefined;
    expiresIn?: string | undefined;
  };
  userInfo?: {
    id: string;
    username: string;
  };
};

export type ResponseLoginType = {
  status: number;
  data: {
    message?: string | undefined;
    error?: string | undefined;
    accessToken?: string | undefined;
    expiresIn?: string | undefined;
  };
};
