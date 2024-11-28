import React, { useState, useEffect } from 'react'
import { DotLoader } from 'react-spinners'
import Header from '../components/header/Header'
import RideEstimateForm from '../components/templates/ride/estimate/RideEstimateForm'

const Home: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center justify-center space-y-6">
            {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-transparent">
                    <DotLoader color="#1e40af" />
                </div>
            ) : (
                <>
                    <Header />
                    <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">
                        <RideEstimateForm />
                    </div>
                </>
            )}
        </div>
    )
}

export default Home
