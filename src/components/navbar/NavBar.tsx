import { Link } from "react-router-dom"

function Navbar() {
    return (
        <>
            <div className='w-full flex justify-center py-4
            			   bg-violet-950 text-violet-200'>
            
                <div className="container flex justify-between text-lg-min8">
                    <Link to='/home' className="text-2xl font-bold">Blog Pessoal</Link>

                    <div className='flex font-medium min-w-2/5 text-xl  justify-evenly'>
                        <Link to={''}>
                        Postagens
                        </Link>

                        <Link to={''}>
                        Temas
                        </Link>

                        <Link to={''}>
                        Cadastrar tema
                        </Link>

                        <Link to={''}>
                        Perfil
                        </Link>

                        <Link to={''}>
                        Sair
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar