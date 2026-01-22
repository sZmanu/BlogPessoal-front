import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContextProps"
import type Postagem from "../../../models/Postagem"
import { buscar, deletar } from "../../../services/Service"
import { ClipLoader } from "react-spinners"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function DeletarPostagem() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
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

    async function deletarPostagem() {
        setIsLoading(true)

        try {
            await deletar(`/postagens/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

             ToastAlerta('Postagem apagada com sucesso', 'sucesso')

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }else {
                ToastAlerta('Erro ao deletar a postagem.', 'erro')
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/postagens")
    }
    
    return (
        <div className="w-full bg-violet-950 flex">
        <div className='container w-1/3 mx-auto mt-30'>
            <h1 className='text-4xl text-center font-medium text-white'>Deletar Postagem</h1>

            <p className='text-center font-semibold text-gray-300 mb-8'>
                Você tem certeza de que deseja apagar a postagem a seguir?
            </p>

            <div className='flex flex-col rounded-2xl overflow-hidden justify-between bg-violet-50'>
                <header 
                    className='py-2 text-center px-6 bg-violet-300 text-violet-800 font-bold text-2xl'>
                    Postagem
                </header>
                <div className="p-4">
                    <p className='text-lg font-bold text-center text-violet-900 mb-4 h-full'>{postagem.titulo}</p>
                    <p>{postagem.texto}</p>
                </div>
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
                        onClick={deletarPostagem}>

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
        </div>
    )
}

export default DeletarPostagem