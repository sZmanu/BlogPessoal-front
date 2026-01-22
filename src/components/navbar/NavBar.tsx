import { useContext, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContextProps";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {

     const navigate = useNavigate();

    const { usuario, handleLogout } = useContext(AuthContext)

    function logout() {

        handleLogout()
        ToastAlerta('O Usuário foi desconectado com sucesso!', 'info')
        navigate('/')
    }

    let component: ReactNode

    if (usuario.token !== "") {

        component = (
            <div className='w-full flex justify-center py-4
            			   bg-violet-950 text-white'>
            
                <div className="container flex justify-between text-lg mx-8 flex-wrap">
                    <Link to='/home' className="text-2xl font-bold text-violet-300">Blog Pessoal</Link>

                    <div className='flex gap-5 min-w-11 '>
                        <Link to='/postagens' className='text-violet-200 hover:text-violet-500 font-medium'>Postagens</Link>
                        <Link to='/temas' className='text-violet-200 font-medium hover:text-violet-500'>Temas</Link>
                        <Link to='/cadastrartema' className='text-violet-200 font-medium hover:text-violet-500'>Cadastrar tema</Link>
                        <Link to='/perfil' className='text-violet-200 font-medium hover:text-violet-500'>Perfil</Link>
                        <Link to='' onClick={logout} className='text-violet-200 font-medium hover:text-violet-500'>Sair</Link>
                    </div>
                </div>
            </div>
    )
}
return (
        <>
            { component }
        </>
    )
}

export default Navbar