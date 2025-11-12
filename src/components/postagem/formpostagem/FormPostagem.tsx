import { useState, useContext, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import type Tema from "../../../models/Tema";


function FormPostagem() {

    const navigate = useNavigate();

const [tema, setTema] = useState<Tema>({} as Tema)

const [isLoading, setIsLoading] = useState<boolean>(false)

const { usuario, handleLogout } = useContext(AuthContext)
const token = usuario.token

const { id } = useParams<{ id: string }>()

async function buscarPorId(id: string) {
  try {
    await buscar(`/temas/${id}`, setTema, {
      headers: { Authorization: token }
    })
  } catch (error: any) {
    if (error.toString().includes('401')) {
      handleLogout()
    }
  }
}

useEffect(() => {
  if (token === '') {
    alert('Você precisa estar logado!')
    navigate('/')
  }
}, [token])

useEffect(() => {
  if (id !== undefined) {
    buscarPorId(id)
  }
}, [id])

function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
  setTema({
    ...tema,
    [e.target.name]: e.target.value
  })
}

function retornar() {
  navigate('/temas')
}

async function gerarNovoTema(e: FormEvent<HTMLFormElement>) {
  e.preventDefault()
  setIsLoading(true)

  if (id != undefined) {
    try {
      await atualizar('/temas', tema, setTema, {
        headers: { 'Authorization': token }
      })
      alert('O Tema foi atualizado com sucesso!')
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
      } else {
        alert('Erro ao atualizar o Tema.')
      }
    }
  } else {
    try {
      await cadastrar('/temas', tema, setTema, {
        headers: { 'Authorization': token }
      })
      alert('O Tema foi cadastrado com sucesso!')
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
      } else {
        alert('Erro ao cadastrar o Tema.')
      }
    }
  }

  setIsLoading(false)
  retornar()
}


  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8">Cadastrar Postagem</h1>

      <form className="flex flex-col w-1/2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Título da Postagem</label>
          <input
            type="text"
            placeholder="Título"
            name="titulo"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="texto">Texto da Postagem</label>
          <input
            type="text"
            placeholder="Texto"
            name="texto"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p>Tema da Postagem</p>
          <select name="tema" id="tema" className="border p-2 border-slate-800 rounded">
            <option value="" selected disabled>Selecione um Tema</option>

            <option>tema1</option>
            
          </select>
        </div>
        <button
          type="submit"
          disabled={bg-slate-200}
          className='rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800
            text-white font-bold w-1/2 py-2 mx-auto flex justify-center'>
          
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default FormPostagem;