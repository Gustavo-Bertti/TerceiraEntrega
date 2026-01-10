import api from "@/config/api/api";

export async function listarUsuarios(idTipo: number) {
  const response = await api.get("/usuario", {
    params: {
      page: 1,
      limit: 50,
      idTipo,
    },
  });

  return response.data;
}

export async function criarUsuario(dados: {
  nome: string;
  email: string;
  senha: string;
  idTipo: number;
}) {
  const response = await api.post("/usuario", dados);
  return response.data;
}

export async function atualizarUsuario(
  id: string,
  dados: {
    nome: string;
    email: string;
    idTipo: number;
  }
) {
  const response = await api.put(`/usuario/${id}`, dados);
  return response.data;
}

export async function deletarUsuario(id: string) {
  await api.delete(`/usuario/${id}`);
}
