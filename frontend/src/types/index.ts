export interface ILoginRefreshResponse {
  status: string;
  message: string;
  accessToken: string;
}

export interface IGenericResponse {
  status: string;
  message: string;
}

export interface IGetCurrentUserResponse {
  status: string;
  user: {
    id: number;
    email: string;
    name: string;
    tasks: [
      {
        id: number;
        title: string;
        description: string;
        tag: string;
        priority: "low" | "normal" | "high" | "urgent";
        status: "started" | "in_progress" | "completed";
        createdAt: Date;
        updatedAt: Date;
      }
    ];
  };
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  tag: string;
  priority: "low" | "normal" | "high" | "urgent";
  status: "started" | "in_progress" | "completed" | string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRegisterProp {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export interface ILoginProp {
  email: string;
  password: string;
}
