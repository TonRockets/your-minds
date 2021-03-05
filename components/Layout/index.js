import React from 'react'
import Footer from '../Footer'
import Header from '../Header'

const Layout = ({ children }) => {

    return (
        <div>
            <div className='border border-pink-500'>
                <Header />
            </div>
            <div>
                {children}
            </div>
            <div className='border border-pink-500'>
                <Footer className=''/>
            </div>
        </div>
    )
}

export default Layout