import ListaPostagens from "../../components/postagem/listapostagens/ListaPostagens"
import ModalPostagem from "../../components/postagem/modalpostagem/ModalPostagem"

function Home() {
  return (
    <>
      {}
      <div className="bg-gradient-to-r from-blue-900 to-sky-500 flex justify-center">
        <div className='container grid grid-cols-2 text-white'>
          <div className="flex flex-col gap-4 items-center justify-center py-4">
            <h2 className='text-5xl font-bold'>
              Seja Bem Vinde!
            </h2>
            <p className='text-xl'>
              Cachorros são os melhores amigos do homem!
            </p>

            <div className="flex justify-around gap-4">
              <ModalPostagem />

              <div className='rounded text-white
                     border-white border-solid border-2 py-2 px-4 cursor-pointer hover:bg-white hover:text-blue-900 transition duration-300'>
                Nova Postagem
              </div>
            </div>
          </div>

          <div className="flex justify-center ">
            <img
              src="https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Imagem Página Home"
              className='w-full max-w-lg rounded-xl shadow-2xl my-4'
            />
          </div>
        </div>
      </div>
      <ListaPostagens />
    </>
  )
}

export default Home