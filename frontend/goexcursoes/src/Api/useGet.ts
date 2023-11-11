import http from "http/http";

// Defina uma interface para o tipo de dados que você espera receber como resposta
interface ResponseData<T, P> {
  success: boolean;
  data: T | null;
  params: P | null;
  status: number;
  error: string | null;
}

// Função genérica para fazer uma requisição GET
async function useGet<T, P extends object = any>({
  url,
  token,
  params = {} as P,
}: {
  url: string;
  token?: string;
  params?: P;
}): Promise<ResponseData<T, P>> {
  try {
    const response = await (token && params
      ? http.get(url, {
          headers: { Authorization: `Bearer ${token}` },
          params: params,
        })
      : token && !params
      ? http.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        })
      : !token && params
      ? http.get(url, {
          params: params,
        })
      : http.get(url));
    return {
      success: true,
      data: response.data,
      params: null,
      status: response.status,
      error: null,
    };

    // Se a requisição for bem-sucedida, retornamos os dados com sucesso
  } catch (error: any) {
    if (error.response) {
      // Se a API retornar um erro, você pode tratar aqui
      return {
        success: false,
        data: null,
        params: null,
        status: error.response.status,
        error: error.response.status || "Erro executar get",
      };
    } else if (error.request) {
      // Se a requisição não puder ser feita, por exemplo, por falta de conexão
      return {
        success: false,
        data: null,
        params: null,
        status: error.request.status,
        error: "Não foi possível se conectar à API",
      };
    } else {
      // Erros inesperados
      return {
        success: false,
        data: null,
        params: null,
        status: 999,
        error: "Erro inesperado",
      };
    }
  }
}

export default useGet;
