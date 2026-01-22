import { Link } from 'react-router-dom'
import type Tema from '../../../models/Tema'


interface CardTemaProps{
    tema: Tema
}
function CardTema({ tema }: CardTemaProps) {
    return (
        <div className='bg-violet-50 flex flex-col rounded-2xl overflow-hidden justify-between '>
            <header className='py-2 px-6 bg-violet-300 text-violet-800 text-center font-bold text-2xl'>
                Tema
            </header>
            <p className='p-8 text-3xl h-full text-violet-950 font-medium'>{tema.descricao}</p>
            
            <div className="flex gap-3 p-2 mb-3">
                <Link to={`/editartema/${tema.id}`} 
                    className='w-1/2 text-white font-semibold bg-violet-500 rounded-3xl
                    hover:bg-violet-900 flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>

               <Link to={`/deletartema/${tema.id}`} 
                    className='text-white font-semibold bg-red-400 rounded-3xl
                    hover:bg-red-700 w-1/2 flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>

        </div>
    )
}

export default CardTema