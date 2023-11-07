import http from "http/http";

// Defina uma interface para o tipo de dados que você espera receber como resposta
interface ResponseData<T> {
  success: boolean;
  data: T | null;
  status: number;
  error: string | null;
}

// Função genérica para fazer uma requisição POST
async function usePost<T>({
  url,
  dados,
  token,
}: {
  url: string;
  dados: T;
  token?: string;
}): Promise<ResponseData<T>> {
  try {
    const response = await (token
      ? http.post(url, dados, { headers: { Authorization: `Bearer ${token}` } })
      : http.post(url, dados));
    // Se a requisição for bem-sucedida, retornamos os dados com sucesso
    return {
      success: true,
      data: response.data,
      status: response.status,
      error: null,
    };
  } catch (error: any) {
    if (error.response) {
      // Se a API retornar um erro, você pode tratar aqui
      return {
        success: false,
        data: null,
        status: error.response.status,
        error: error.response.data.error || "Erro executar post",
      };
    } else if (error.request) {
      // Se a requisição não puder ser feita, por exemplo, por falta de conexão
      return {
        success: false,
        data: null,
        status: error.request.status,
        error: "Não foi possível se conectar à API",
      };
    } else {
      // Erros inesperados
      return {
        success: false,
        data: null,
        status: 999,
        error: "Erro inesperado",
      };
    }
  }
}

export default usePost;
