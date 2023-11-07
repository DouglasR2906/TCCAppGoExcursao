export interface IUsuario {
  idUsuario: number;
  loginUsuario: string;
  senhaUsuario?: string;
  ativoUsuario: boolean;
  tipoUsuario: "ADMIN" | "CLIENTE" | "ORGANIZADOR";
}

export interface ILogin {
  login: string;
  senha: string;
}

export interface IUsuarioLogado {
  idUsuario: number;
  loginUsuario: string;
  tokenUsuario: string;
  tipoUsuario: string;
  nomeUsuario: string;
}

export interface IDadosCadastro {
  idDadosCadastrais: number;
  idUsuarioDadosCadastrais: number;
  nomeDadosCadastrais: string;
  documentoDadosCadastrais: string;
  dataNascimentoDadosCadastrais: string;
  cidadeDadosCadastrais: string;
  ufDadosCadastrais: string;
  logradouroDadosCadastrais: string;
  numeroDadosCadastrais: number;
  bairroDadosCadastrais: string;
  cepDadosCadastrais: string;
  telefoneDadosCadastrais: string;
  sexoDadosCadastrais: "MASCULINO" | "FEMININO" | "OUTROS";
}

export interface IDadosLogin {
  login: string;
  senha?: string;
  confirmaSenha?: string;
  tipoUsuario: "ADMIN" | "CLIENTE" | "ORGANIZADOR";
}

export interface IDadosPessoais {
  nome: string;
  documento: string;
  dataNascimento: string;
  cidade: string;
  uf: string;
  logradouro: string;
  numero: number;
  bairro: string;
  cep: string;
  telefone: string;
  sexo: "MASCULINO" | "FEMININO" | "OUTROS";
}

export type TipoUsuario = "ADMIN" | "CLIENTE" | "ORGANIZADOR";

export type SexoUsuario = "MASCULINO" | "FEMININO" | "OUTROS";
