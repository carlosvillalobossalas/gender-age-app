import React from 'react'
import Main from './components/Main'
import { Title } from './styles/Main'

const GenderAgeApp = () => {
    return (
        <>
            <div className="navbar navbar-light bg-primary mb-3">
                <h1 className="title">Gender and Age App</h1>
            </div>

            <Main />
        </>
    )
}

export default GenderAgeApp
