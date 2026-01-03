import Usuario from "./Usuario";

export interface Postagem {
    id: string;
    titulo: string;
    conteudo: string;
    usuario: Usuario;
    idUsuario: string;
    dataCriacao: string;
    dataAtualizacao?: string;
    ativo: boolean;
}