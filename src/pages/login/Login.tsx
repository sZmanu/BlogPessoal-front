import { Link } from "react-router-dom";

function Login() {

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold ">
                <form className="flex justify-center items-center flex-col w-1/2 gap-4" >
                    <h2 className="text-violet-950 text-5xl ">Login</h2>
                    <div className="flex flex-col w-full">
                        <label htmlFor="usuario" className="px-3">Usuário</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Usuario"
                            className="border-2 border-violet-950 rounded-3xl p-2 px-3"

                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="senha" className="px-3">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            className="border-2 border-violet-950 rounded-3xl p-2 px-3"

                        />
                    </div>
                    <button 
                        type='submit' 
                        className="rounded-2xl bg-violet-300 text-violet-950 text-xl flex justify-center
                                   hover:bg-indigo-900  w-1/2 py-2 hover:text-violet-200">
                        <span>Entrar</span>
                    </button>

                    <hr className="border-slate-800 w-full" />

                   <p>
                        Ainda não tem uma conta?{' '}
                        <Link to="/cadastro" className="text-indigo-800 hover:underline">
                            Cadastre-se
                        </Link>
                    </p>
                </form>
                 <div className="bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] lg:block hidden bg-no-repeat 
                            w-full min-h-screen bg-cover bg-center"
                ></div>
            </div>
        </>
    );
}

export default Login;