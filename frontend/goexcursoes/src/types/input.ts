export interface InputProps {
  obrigatorio: boolean;
  label: string;
  placeholder: string;
  valor: string;
  aoAlterado: (valor: string) => void;
}
