export interface IUsuario {
  idUsuario: number;
  loginUsuario: string;
  ativoUsario: boolean;
  tipoUsuario: "ADMIN" | "CLIENTE" | "ORGANIZADOR";
}

export interface IUsuarioLogado {
  idUsuario: number;
  loginUsuario: string;
  tokenUsuario: string;
  tipoUsuario: string;
}
