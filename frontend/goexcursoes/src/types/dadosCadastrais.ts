export interface IDadosCadastro {
  idDadosCadastrais: number;
  idUsuarioDadosCadastrais: number;
  nomeDadosCadastrais: string;
  documentoDadosCadastrais: string;
  dataNascimentoDadosCadastrais: string;
  paisDadosCadastrais: string;
  cidadeDadosCadastrais: string;
  ufDadosCadastrais: string;
  emailDadosCadastrais: string;
  telefoneDadosCadastrais: string;
  sexoDadosCadastrais: "MASCULINO" | "FEMININO" | "OUTROS";
}
