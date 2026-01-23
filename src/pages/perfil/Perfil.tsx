import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import perfil2 from "../../assets/perfil2.jpg"; 
import { AuthContext } from "../../contexts/AuthContextProps"
import { ToastAlerta } from "../../utils/ToastAlerta"

function Perfil() {
	const navigate = useNavigate()

	const { usuario } = useContext(AuthContext)

	useEffect(() => {
		if (usuario.token === "") {
			ToastAlerta("Você precisa estar logado", 'info')
			navigate("/")
		}
	}, [usuario.token])

	return (
		<div className="flex justify-center mx-4 pt-20">
			<div className="container mx-auto my-4 rounded-2xl overflow-hidden">
				<img
					className="w-full h-72 object-cover border-b-8 border-white"
					src={perfil2}
					alt="Capa do Perfil"
				/>

				<img
					className="rounded-full w-56 mx-auto mt-[-8rem] border-8 border-white relative z-10"
					src={usuario.foto}
					alt={`Foto de perfil de ${usuario.nome}`}
				/>

				<div
					className="relative mt-[-6rem] h-72 flex flex-col 
                    bg-violet-900 text-white text-2xl items-center justify-center"
				>
					<p><span className="text-violet-300 font-medium">Nome:</span> {usuario.nome} </p>
					<p><span className="text-violet-300 font-medium">Email:</span> {usuario.usuario}</p>
				</div>
			</div>
		</div>
	)
}

export default Perfil
