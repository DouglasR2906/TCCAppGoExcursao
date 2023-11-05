import { action, makeObservable, observable } from "mobx";
import { IUsuarioLogado } from "types/usuario";
class AutenticacaoStore {
  estaAutenticado = false;
  usuario: IUsuarioLogado = {
    idUsuario: 0,
    loginUsuario: "",
    tokenUsuario: "",
    tipoUsuario: "",
    nomeUsuario: "",
  };

  constructor() {
    makeObservable(this, {
      estaAutenticado: observable,
      usuario: observable,
      login: action,
      logout: action,
    });

    const usuarioLocalStorage = localStorage.getItem("usuario");
    if (usuarioLocalStorage) {
      this.login(JSON.parse(usuarioLocalStorage));
    }
  }

  login(usuario: IUsuarioLogado) {
    this.estaAutenticado = true;
    this.usuario = usuario;
    localStorage.setItem("usuario", JSON.stringify(usuario));
  }

  logout() {
    this.estaAutenticado = false;
    this.usuario = {
      idUsuario: 0,
      loginUsuario: "",
      tokenUsuario: "",
      tipoUsuario: "",
      nomeUsuario: "",
    };

    localStorage.removeItem("usuario");
  }
}

const autenticacaoStore = new AutenticacaoStore();

export default autenticacaoStore;
