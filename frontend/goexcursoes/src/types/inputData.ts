export interface InputDataProps {
  obrigatorio: boolean;
  label: string;
  valorData: string;
  aoAlteradoData: (valor: string) => void;
}
