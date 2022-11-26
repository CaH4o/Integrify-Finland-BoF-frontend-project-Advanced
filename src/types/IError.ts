export interface IError {
    status: number;
    statusText: string;
    data?: {
      message: string
    };
  }
  