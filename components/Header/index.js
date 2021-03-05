import React from 'react'
import Link from 'next/link'


const Header = () => {

    return (
        <React.Fragment>
            <div className='bg-gray-200 p-4  shadow-lg'>
                <div className='container mx-auto'>
                    <Link href='/'>
                        <a><img className='mx-auto' src='/logo_palpitebox.png' alt='Logomarca' /></a>
                    </Link>
                </div>
            </div>
            <div className='bg-gray-300 p-4 shadow-md flex justify-center'>
                <div className='w-1/2 font-bold flex justify-evenly'>
                    <div>
                        <Link href='/sobre'>
                            <a className='hover:underline'>Sobre</a>
                        </Link>
                    </div>
                    <div>
                        <Link href='/contato'>
                            <a className='hover:underline'>Contato</a>
                        </Link>
                    </div>
                    <div>
                        <Link href='/pesquisa'>
                            <a className='hover:underline'>Pesquisa</a>
                        </Link>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Header