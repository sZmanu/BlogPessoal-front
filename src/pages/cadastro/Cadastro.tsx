import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Cadastro() {

  const navigate = useNavigate()
  
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const[confirmarSenha, setConfirmarSenha] = useState<string>("")

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })
  
  useEffect(() => {
    if (usuario.id !== 0){
      retornar()
    }
  }, [usuario])

  function retornar(){
    navigate('/')
  }


  function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
    setUsuario({
      ...usuario, //desestrutura o objeto
      [e.target.name]: e.target.value //pega o atributo e atualiza
    })

  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>){
    setConfirmarSenha(e.target.value)
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>){
    e.preventDefault()

    if(confirmarSenha === usuario.senha && usuario.senha.length >= 8){

      setIsLoading(true)

      try{
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
        ToastAlerta('Usuário cadastrado com sucesso!', 'sucesso')
      }catch(error){
        ToastAlerta('Erro ao cadastrar o usuário!', 'erro')
      }
    }else{
      ToastAlerta('Dados do usuário inconsistentes! Verifique as informações do cadastro.', 'erro')
      setUsuario({...usuario, senha: ''})
      setConfirmarSenha('')
    }

    setIsLoading(false)
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen 
            place-items-center font-bold">
        <div className="w-full h-screen bg-violet-950 hidden lg:flex justify-center items-center">
                    <div className="bg-[url(./assets/login3-semFundo.png)] bg-no-repeat w-4/5 min-h-3/5 bg-cover bg-center">
                    </div>
                    </div>
        <div className="bg-violet-50 w-full min-h-screen flex justify-center ">
        <form className='flex justify-center items-center flex-col w-2/3 gap-3' 
              onSubmit={cadastrarNovoUsuario}>

          <h2 className='text-violet-900 text-5xl'>Cadastrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="nome" className="ml-3 mt-4">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="border-2 border-violet-950 rounded-4xl p-2 pl-3 focus:outline-violet-700"
              value = {usuario.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario" className="ml-3 mt-1">Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              className="border-2 border-violet-950 rounded-4xl p-2 pl-3 focus:outline-violet-700"
              value = {usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="foto" className="ml-3 mt-1">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
              className="border-2 border-violet-950 rounded-4xl p-2 pl-3 focus:outline-violet-700"
              value = {usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha" className="ml-3 mt-1">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="border-2 border-violet-950 rounded-4xl p-2 pl-3 focus:outline-violet-700"
              value = {usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha" className="ml-3 mt-1">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="border-2 border-violet-950 rounded-4xl p-2 pl-3 focus:outline-violet-700 bg-violet-50"
              value={confirmarSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
            />
          </div>
          <div className="flex justify-around w-full gap-8 mt-5">
            <button 
                type='reset'
                className='rounded-4xl text-white bg-violet-800 hover:bg-violet-950 w-1/2 py-2 shadow-xl'
                onClick={retornar}
             >
                Cancelar
            </button>
            <button 
                type='submit'
                className='rounded-4xl text-violet-900 bg-violet-300
                           hover:bg-violet-950 hover:text-white w-1/2 py-2 shadow-xl
                           flex justify-center' 
                >
                { isLoading ? 
                  <ClipLoader 
                    color="#ffffff" 
                    size={24}
                  /> : 
                  <span>Cadastrar</span>
                }
            </button>
          </div>
        </form>
        </div>
      </div>
    </>
  )
}

export default Cadastro