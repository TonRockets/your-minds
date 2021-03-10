import React, { useState } from 'react'
import Link from 'next/link'

const Pesquisa = () => {
    const [form, setForm] = useState({})
    
    const handleChange = (e) => {
        const valor = e.target.value
        const name = e.target.name
        setForm(old => ({
            ...old,
            [name]: valor
        }))
    }

    const salvar = async () => {
        
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
                <input className='p-4 block shadow bg-blue-100 my-2 rounded' type="text" name="Nome" onChange={handleChange} valule={form.Nome} />
                <label htmlFor="" className='font-bold'>Seu telefone:</label>
                <input className='p-4 block shadow bg-blue-100 my-2 rounded' type="tel" name="Whatsapp" onChange={handleChange} valule={form.Whatsapp} />
                <label htmlFor="" className='font-bold'>Seu melhor e-mail:</label>
                <input className='p-4 block shadow bg-blue-100 my-2 rounded' type="email" name="Email" onChange={handleChange} valule={form.Email} />
                <label htmlFor="" className='font-bold'>Deixe sua opinião ou sugestão</label>
                <input className='p-4 block shadow bg-blue-100 my-2 rounded' type="textarea" name="Sugestao" onChange={handleChange} valule={form.Sugestao} />
                <button onClick={() => salvar()}>Salvar</button>
            </div>
            <pre>
                {JSON.stringify(form, null, 2)}
            </pre>
        </div>
    )
}

export default Pesquisa