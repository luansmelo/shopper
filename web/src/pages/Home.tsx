import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl text-center font-semibold text-blue-600 mb-8">Bem-vindo ao Sistema de Viagens</h1>

            <div className="space-y-4">
                <Link to="/solicitacao-viagem">
                    <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700">
                        Solicitar Nova Viagem
                    </button>
                </Link>
                <Link to="/opcoes-viagem">
                    <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-700">
                        Ver Opções de Viagem
                    </button>
                </Link>
                <Link to="/historico-viagens">
                    <button className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-700">
                        Ver Histórico de Viagens
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Home
