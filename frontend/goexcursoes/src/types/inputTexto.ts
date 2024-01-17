export interface InputTextoProps {
  icone: string;
  obrigatorio: boolean;
  label: string;
  placeholder: string;
  valor: string;
  aoAlterado: (valor: string) => void;
}
