export interface Response {
  pageNumber: number;
  pageSize: number;
  succeeded: boolean;
  message: string;
  erros: any;
  data: any;
  totalItems: number;
}

export interface AuthenticationResponse {
  token: string;
  expiration: Date;
  roleId: string;
  roleName: string;
  id: string;
  user: UserLogin;
  empresaId: string;
  empresa: any;
  rutasAsignadas: any;
}
export interface UserLogin {
  idTypeDocument: string | any;
  document: string | any;
  idCompany: string | any;
  idCountry: string | any;
  names: string | any;
  surnames: string | any;
  email: string | any;
  phoneNumber: string | any;
  idRol: string | any;
  idEstado: string | any;
  role: string | any;
  id: string | any;
}
