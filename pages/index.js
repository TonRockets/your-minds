import React from 'react'
import Link from 'next/link'
import useSwr from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Index = () => {
    const { data, error } = useSwr('/api/get-promo', fetcher)
    return (
        <div className='h-screen my-10'>
            <p className='mt-12 text-center'>Deixe sua opinião sobre o Restaurande [Nome-RESTAURANTE]</p>
            <div className='text-center my-12'>
                <Link href='/pesquisa'>
                    <a className='bg-blue-400 px-6 py-4 font-bold 
                    rounded-lg shadow-lg hover:bg-purple-500 
                    hover:text-white hover:shadow'>
                        Dar Opinião
                </a>
                </Link>
            </div>
            {!data && <p>Carregando...</p>}
            {data && data.mostrarCupom &&
                <p className='mt-12 text-center'>
                    {data.mensagem}
            </p>
            }
        </div>
    )
}

export default Index