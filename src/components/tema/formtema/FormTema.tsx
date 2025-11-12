import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { useContext, useEffect, useState } from "react";
import type Tema from "../../../models/Tema";

function FormTema() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [tema, setTema] = useState<Tema>({ id: 0, descricao: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado!");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function buscarPorId(id: string) {
    setIsLoading(true);
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (id !== undefined) {
      await atualizar(`/temas`, tema, setTema, {
        headers: { Authorization: token },
      });
      alert("Tema atualizado com sucesso!");
    } else {
      await cadastrar(`/temas`, tema, setTema, {
        headers: { Authorization: token },
      });
      alert("Tema cadastrado com sucesso!");
    }
    navigate("/temas");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTema({ ...tema, [e.target.name]: e.target.value });
  }

  return (
    <div className="container mx-auto my-8">
      {isLoading ? (
        <div className="flex justify-center">
          <ClipLoader color="#312e81" size={48} />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-center">
            {id !== undefined ? "Editar Tema" : "Cadastrar Tema"}
          </h2>
          <input
            type="text"
            name="descricao"
            value={tema.descricao}
            onChange={handleChange}
            placeholder="Descrição do tema"
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-indigo-700 text-white py-2 rounded hover:bg-indigo-800 transition"
          >
            {id !== undefined ? "Atualizar" : "Cadastrar"}
          </button>
        </form>
      )}
    </div>
  );
}

export default FormTema;
