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