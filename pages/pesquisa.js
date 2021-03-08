import React from 'react'
import Link from 'next/link'

const Pesquisa = () => {

    const salvar = async () => {
        console.log("Botão salvar");
        const form = {
            Nome: "Wellington Test",
            Email: "test@test.com",
            Whatsapp: "21995599868"
        }
        try {
            const response = await fetch('/api/post-save', {
                method: "POST",
                body: JSON.stringify(form)
            })

            const data = await response.json()
            console.log(data);
        } catch (error) { }
    }

    return (
        <div className='pt-6'>
            <h1 className='text-center font-bold my-4 text-2xl'>Críticas e Sugestões</h1>
            <p className='text-center mb-8'>O restaurante [Nomde do Restaurante] sempre buscar por melhorar o seu atendimento e seus produtos</p>
            <div className='w-1/5 mx-auto'>
                <label htmlFor="" className='font-bold'>Seu nome:</label>
                <input className='p-4 block shadow bg-blue-100 my-2 rounded' type="text" />
                <label htmlFor="" className='font-bold'>Seu telefone:</label>
                <input className='p-4 block shadow bg-blue-100 my-2 rounded' type="tel" />
                <label htmlFor="" className='font-bold'>Seu melhor e-mail:</label>
                <input className='p-4 block shadow bg-blue-100 my-2 rounded' type="email" />
                <label htmlFor="" className='font-bold'>Deixe sua opinião ou sugestão</label>
                <input className='p-4 block shadow bg-blue-100 my-2 rounded' type="textarea" />
                <button onClick={() => salvar()}>Salvar</button>
            </div>
        </div>
    )
}

export default Pesquisa