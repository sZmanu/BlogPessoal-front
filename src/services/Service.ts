import axios from "axios";

const api = axios.create({
    baseURL: 'https://blogpessoal-2upb.onrender.com'
})

//as services fazem a comunicação com o back, enviando as requisições e trazendo as respostas
export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    //a url é o caminho especifico para fazer a requisiçao, neste caso: usuarios/cadastrar
    const resposta = await api.post(url, dados) // envias via post a url e os dados para o back e armazena isso na resposta
    setDados(resposta.data) //envia para a função os dados recebido
}

export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

export const buscar = async (url: string, setDados: Function, header: Object) => {
    const resposta = await api.get(url, header)
    setDados(resposta.data)
}

export const cadastrar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.post(url, dados, header)
    setDados(resposta.data)
}

export const atualizar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.put(url, dados, header)
    setDados(resposta.data)
}

export const deletar = async (url: string, header: Object) => {
    await api.delete(url, header)
}