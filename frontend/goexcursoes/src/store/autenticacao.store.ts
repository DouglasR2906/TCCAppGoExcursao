import { action, makeObservable, observable } from "mobx";

interface IUsuarioLogado {
  idUsuario: number;
  loginUsuario: string;
  tokenUsuario: string;
  tipoUsuario: string;
}

class AutenticacaoStore {
  estaAutenticado = false;
  usuario: IUsuarioLogado = {
    idUsuario: 0,
    loginUsuario: "",
    tokenUsuario: "",
    tipoUsuario: "",
  };

  constructor() {
    makeObservable(this, {
      estaAutenticado: observable,
      usuario: observable,
      login: action,
      logout: action,
    });
  }

  login(usuario: IUsuarioLogado) {
    this.estaAutenticado = true;
    this.usuario = usuario;
  }

  logout() {
    this.estaAutenticado = false;
    this.usuario = {
      idUsuario: 0,
      loginUsuario: "",
      tokenUsuario: "",
      tipoUsuario: "",
    };
  }
}

const autenticacaoStore = new AutenticacaoStore();

export default autenticacaoStore;
