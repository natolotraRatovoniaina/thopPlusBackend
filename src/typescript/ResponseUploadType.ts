export type ResponseUploadType = {
  status: number;
  data: {
    message: string;
    filePath?: string | undefined;
    error?: any | undefined;
  };
};
