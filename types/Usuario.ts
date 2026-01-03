import TipoUsuario from "./TipoUsuario";

interface Usuario {
    id: string;
    nome: string;
    email: string;
    idTipo: TipoUsuario;
}

export default Usuario;