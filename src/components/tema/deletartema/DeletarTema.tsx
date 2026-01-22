import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContextProps"
import type Tema from "../../../models/Tema"
import { buscar, deletar } from "../../../services/Service"
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta"

function DeletarTema() {

    const navigate = useNavigate()

    const [tema, setTema] = useState<Tema>({} as Tema)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>()

    async function buscarPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', 'info')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])  

    async function deletarTema() {
        setIsLoading(true)

        try {
            await deletar(`/temas/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            ToastAlerta('Tema deletado com sucesso', 'sucesso')

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }else {
                ToastAlerta('Erro ao deletar o tema.', 'erro')
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/temas")
    }
    
    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center pd-4 pt-30 text-white font-medium mb-2'>Deletar tema</h1>
            <p className='text-center font-semibold mb-8 text-gray-300'>
                Você tem certeza de que deseja apagar o tema a seguir?</p>
            <div className='flex flex-col rounded-2xl overflow-hidden justify-between bg-violet-50'>
                <header 
                    className='py-2 px-6 bg-violet-300 text-violet-900 font-bold text-2xl text-center'>
                    Tema
                </header>
                <p className='p-8 text-3xl h-full text-violet-950 font-medium'>{tema.descricao}</p>
                <div className="flex gap-3 p-2 mb-3">
                    <button 
                        className='text-white font-semibold bg-red-400 rounded-3xl
                    hover:bg-red-700 w-1/2 flex items-center justify-center'
                        onClick={retornar}>
                        Não
                    </button>
                    <button 
                        className='w-1/2 text-white font-semibold bg-violet-500 rounded-3xl
                    hover:bg-violet-900 flex items-center justify-center py-2'
                                   onClick={deletarTema}>

                        { isLoading ? 
                            <ClipLoader 
                                color="#ffffff" 
                                size={24}
                            /> : 
                            <span>Sim</span>
                        }

                    </button>
                </div>
            </div>
        </div>
    )
}
export default DeletarTema