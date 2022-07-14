import React, { useState } from "react";
import PageTitle from "../components/pageTitle";

const Pesquisa = () => {
  const [form, setForm] = useState({});
  const [success, setSuccess] = useState(false);
  const [response, setResponse] = useState({});
  const notas = [0, 1, 2, 3, 4, 5];

  const handleChange = (e) => {
    const valor = e.target.value;
    const name = e.target.name;
    setForm((old) => ({
      ...old,
      [name]: valor,
    }));
  };

  const save = async () => {
    try {
      const req = await fetch("/api/post-save", {
        method: "POST",
        body: JSON.stringify(form),
      });
      const data = await req.json();
      setSuccess(true);
      setResponse(data);
    } catch (error) {}
  };

  return (
    <div className="pt-6">
      <PageTitle title="Pesquisa" />
      <h1 className="text-center font-bold my-4 text-2xl">
        Críticas e Sugestões
      </h1>
      <p className="text-center mb-8">
        O restaurante [Nomde do Restaurante] sempre buscar por melhorar o seu
        atendimento e seus produtos
      </p>
      {!success ? (
        <div className="w-1/5 mx-auto">
          <label htmlFor="" className="font-bold">
            Seu nome:
          </label>
          <input
            className="p-4 block shadow bg-blue-100 my-2 rounded"
            type="text"
            name="Nome"
            onChange={handleChange}
            valule={form.Nome}
          />
          <label htmlFor="" className="font-bold">
            Seu telefone:
          </label>
          <input
            className="p-4 block shadow bg-blue-100 my-2 rounded"
            type="tel"
            name="Whatsapp"
            onChange={handleChange}
            valule={form.Whatsapp}
          />
          <label htmlFor="" className="font-bold">
            Seu melhor e-mail:
          </label>
          <input
            className="p-4 block shadow bg-blue-100 my-2 rounded"
            type="email"
            name="Email"
            onChange={handleChange}
            valule={form.Email}
          />
          <label htmlFor="" className="font-bold">
            Deixe sua opinião ou sugestão
          </label>
          <input
            className="p-4 block shadow bg-blue-100 my-2 rounded"
            type="textarea"
            name="Sugestao"
            onChange={handleChange}
            valule={form.Sugestao}
          />
          <div className="flex py-6">
            {notas.map((item) => {
              return (
                <label className="block w-1/6 text-center">
                  {item}
                  <br />
                  <input
                    type="radio"
                    name="Nota"
                    value={item}
                    onChange={handleChange}
                  />
                </label>
              );
            })}
          </div>
          <button
            className="bg-blue-400 px-12 py-4 font-bold rounded-lg shadow-lg hover:bg-purple-500 hover:text-white hover:shadow"
            onClick={() => save()}
          >
            Salvar
          </button>
        </div>
      ) : (
        ""
      )}
      {success && (
        <div className="w-1/5 mx-auto">
          <p className="mb-6 text-center bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3">
            Obrigado por contribuir com a sua sugestão!
          </p>
          {response.isPromo && (
            <div className="text-center border p-4 mb-4">
              Seu Cupom: <br />
              <span className="font-bold text-2xl">{response.showCupom}</span>
            </div>
          )}
          {response.isPromo && (
            <div className="text-center border p-4 mb-4">
              <span className="font-bold">{response.showPromo}</span>
              <br />
              <br />
              <span className="italic text-sm">
                Tire um print/foto desse cupom e apresente ao caixa!
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Pesquisa;
