import { createContext, type ReactNode, useState } from "react"
import type UsuarioLogin from "../models/UsuarioLogin"
import { login } from "../services/Service"
import { ToastAlerta } from "../utils/ToastAlerta"


interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}
// o contexto ele armazena estados que podem ser acessadas por todos os componentes, porem precisa ser coisas gerais, como por exemplo, o token que precisa ser usado em toda a aplicação
//construção do contexto
export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {

    // aqui esta sendo armazenado os dados do usuario logado
    // é preciso sempre inicializar
    const [usuario, setUsuario] = useState<UsuarioLogin>({ // o tipo usuario login esta sendo associado a interface criada na model, é necessario colocar todos os atributos dela
    // depois que o user fior logado todos os dados serão preeenchidos
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: ""
    })

    const [isLoading, setIsLoading] = useState(false)

    async function handleLogin(usuarioLogin: UsuarioLogin) {
        setIsLoading(true)
        try {
            //aqui esta sendo chamado a func login que foi criada na service, e esta sendo passaod os dados
            await login(`/usuarios/logar`, usuarioLogin, setUsuario)
            ToastAlerta("Usuário foi autenticado com sucesso!", "sucesso")
        } catch (error) {
            ToastAlerta("Os dados do Usuário estão inconsistentes!", "erro")
        }
        setIsLoading(false)
    }

    //quando o usuario deslogar o estado muda, e fica vazio e zerado
    function handleLogout() {
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        })
    }

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}