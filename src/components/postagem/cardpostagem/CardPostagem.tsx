import { Link } from 'react-router-dom'
import type Postagem from '../../../models/Postagem'

interface CardPostagensProps {
    postagem: Postagem
}

function CardPostagem({ postagem }: CardPostagensProps) {
    return (
        <div className='flex flex-col shadow-violet-300 overflow-hidden rounded-3xl justify-between bg-violet-50'>
                
            <div>
                <div className="flex w-full  bg-violet-300 py-2 px-4 items-center gap-7">
                    <img
                        src={postagem.usuario?.foto}
                        className='h-12 rounded-full'
                        alt={postagem.usuario?.nome} />
                    <h3 className='text-lg font-bold text-center uppercase'>
                        {postagem.usuario?.nome}
                    </h3>
                </div>
                <div className='p-4 '>
                    <h4 className='text-lg font-bold text-center text-violet-900 mb-4'>{postagem.titulo}</h4>
                    <p className='text-center mb-5'>{postagem.texto}</p>
                    <p className='font-medium text-violet-800 '>{postagem.tema?.descricao}</p>
                    <p className='font-medium text-gray-500'>{new Intl.DateTimeFormat("pt-BR", {
                        dateStyle: 'full',
                        timeStyle: 'medium',
                    }).format(new Date(postagem.data))}</p>
                </div>
            </div>
            <div className="flex gap-3 p-2 mb-3">
                <Link to={`/editarpostagem/${postagem.id}`} 
                    className='w-1/2 text-white font-semibold bg-violet-500 rounded-3xl
                    hover:bg-violet-900 flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>
                <Link to={`/deletarpostagem/${postagem.id}`} 
                    className='text-white font-semibold bg-red-400 rounded-3xl
                    hover:bg-red-700 w-1/2 flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>
        </div>
    )
}

export default CardPostagem