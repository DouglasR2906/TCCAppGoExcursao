import http from "http/http";

// Defina uma interface para o tipo de dados que você espera receber como resposta
interface ResponseData<T> {
  success: boolean;
  data: T | null;
  error: string | null;
}

// Função genérica para fazer uma requisição GET
async function useGet<T>({
  url,
  dados,
}: {
  url: string;
  dados: T;
}): Promise<ResponseData<T>> {
  try {
    const response = await http.get(url);
    // Se a requisição for bem-sucedida, retornamos os dados com sucesso
    return {
      success: true,
      data: response.data,
      error: null,
    };
  } catch (error: any) {
    if (error.response) {
      // Se a API retornar um erro, você pode tratar aqui
      return {
        success: false,
        data: null,
        error: error.response.data.error || "Erro executar post",
      };
    } else if (error.request) {
      // Se a requisição não puder ser feita, por exemplo, por falta de conexão
      return {
        success: false,
        data: null,
        error: "Não foi possível se conectar à API",
      };
    } else {
      // Erros inesperados
      return {
        success: false,
        data: null,
        error: "Erro inesperado",
      };
    }
  }
}

export default useGet;

// Exemplo de uso:
const exemploDados = { nome: "Exemplo", idade: 30 };
const urlExemplo = "https://exemplo.com/api/endpoint";

useGet({ url: urlExemplo, dados: exemploDados })
  .then((response) => {
    if (response.success) {
      console.log("Requisição bem-sucedida. Dados recebidos:", response.data);
    } else {
      console.error("Erro na requisição:", response.error);
    }
  })
  .catch((error) => {
    console.error("Erro ao fazer a requisição:", error);
  });
