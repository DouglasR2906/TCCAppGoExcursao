export interface InputDataProps {
  obrigatorio: boolean;
  label: string;
  placeholder: string;
  valorData: string;
  aoAlteradoData: (valor: string) => void;
}
