import type Tema from "./Tema";
import type Usuario from "./Usuario";

//as interfaces sao os primeiros que precisam ser feitos, serve para estrutura e typar os dados que seroa enviados para o back
export default interface Postagem{
    id: number;
    titulo: string;
    texto: string;
    data: string;
    tema: Tema | null;
    usuario: Usuario | null;
}