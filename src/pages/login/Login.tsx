import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type UsuarioLogin from "../../models/UsuarioLogin";
import { AuthContext } from "../../contexts/AuthContextProps";

function Login() {

    //para navegação manipulada
    const navigate = useNavigate();

    // aqui eu estou pegando as inforamações que ficaram armazenadas no context
    const { usuario, handleLogin, isLoading } = useContext(AuthContext)

    // ele que recebe os dados do login, vindo do form
    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        //quer dizer que possui todos os campos do usuario login, nao precisa inicializar novamente
        {} as UsuarioLogin
    )

    // efeitos colaterais, verifica o usuario(context), se tiver o token, ou seja, se a pessoa estiver logada, o usuario ira para a home
    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/home')
        }
    }, [usuario])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        })
    }

    function login(e: FormEvent<HTMLFormElement>) {
        //evita um carregamento da pagina
        e.preventDefault()
        //é a função que ta no context, ela vai enviar as requisiçoes para o back
        handleLogin(usuarioLogin)
    }

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
                <div className="bg-violet-50 rounded-br-4xl rounded-tr-4xl w-full min-h-screen flex justify-center ">
                <form className="flex justify-center items-center flex-col w-7/10 gap-6" 
                    onSubmit={login}>

                    <div className="flex flex-col w-full items-center">
                    <h2 className="text-violet-900 text-5xl ">Login</h2>
                    <h3 className="mt-5 text-neutral-500 font-medium">Entre com seu email e senha para acessar a sua conta</h3>
                    <div className="flex flex-col w-full">
                        <label htmlFor="usuario" className="ml-3 mt-4">Usuário</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Usuario"
                            className="border-2 border-violet-950 rounded-4xl p-2 pl-3 focus:outline-violet-700 bg-violet-50"
                            value = {usuarioLogin.usuario}
                            //toda vez que que algo é digitado no form, o onChange captura, cada letra digitada
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="senha" className="ml-3 mt-4">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            className="border-2 border-violet-950 rounded-4xl p-2 pl-3  focus:outline-violet-700 bg-violet-50"
                            value = {usuarioLogin.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <button 
                        type='submit' 
                        className="rounded-3xl  bg-violet-300 flex justify-center
                                   hover:bg-violet-950 text-violet-950 hover:text-violet-100 w-1/2 py-2 mt-6 shadow-xl">
                        { isLoading ? 
                            <ClipLoader 
                                color="#ffffff" 
                                size={24}
                            /> : 
                            <span>Entrar</span>
                        }
                    </button>
                        </div>
                    
                   <p className="mt-7">
                        Ainda não tem uma conta?{' '}
                        {/* para navegação direta */}
                        <Link to="/cadastro" className="text-violet-800 hover:underline">
                            Cadastre-se
                        </Link>
                    </p>
                </form>
                </div>
                <div className="w-full h-screen bg-violet-950 hidden lg:flex justify-center items-center">
                    <div className="bg-[url(./assets/login3-semFundo.png)] bg-no-repeat w-4/5 min-h-3/5 bg-cover bg-center">
                    </div>
                    </div>


               
            </div>
        </>
    );
}


export default Login;