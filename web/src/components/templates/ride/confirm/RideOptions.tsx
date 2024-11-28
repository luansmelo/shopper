import React from 'react'

interface RideOption {
  id: string
  name: string
  description: string
  vehicle: string
  review: { rating: number }
  value: number
}

interface RideOptionsProps {
  options: RideOption[]
  onSelectDriver: (driver: RideOption) => void
  selectedDriver: RideOption | null
}

const RideOptions: React.FC<RideOptionsProps> = ({ options, onSelectDriver, selectedDriver }) => (
  <div className="space-y-4">
    {selectedDriver ? (
      <p className="text-lg font-semibold text-gray-800">Motorista selecionado: <span className="text-blue-600">{selectedDriver.name}</span></p>
    ) : (
      <p className="text-gray-600">Escolha um motorista abaixo:</p>
    )}

    {options.map((driver) => {
      const isSelected = selectedDriver?.id === driver.id;
      return (
        <div
          key={driver.id}
          className={`shadow-lg p-6 rounded-lg mb-4 transition-all duration-300 ease-in-out transform ${isSelected ? 'bg-green-100 border-2 border-green-300' : 'bg-white'}`}
        >
          <p className="font-semibold text-xl text-gray-800">{driver.name}</p>
          <p className="text-gray-600">{driver.description}</p>
          <p className="text-gray-700 mt-2">Veículo: <span className="font-medium text-blue-600">{driver.vehicle}</span></p>
          <p className="text-gray-700">Avaliação: <span className="font-medium text-yellow-500">{driver.review.rating} estrelas</span></p>
          <p className="text-gray-700">Valor: <span className="font-medium text-green-600">R${driver.value}</span></p>

          <button
            onClick={() => onSelectDriver(driver)}
            className={`w-full py-2 rounded mt-4 ${isSelected ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400'} transition-all duration-200 ease-in-out`}
            disabled={isSelected}
          >
            {isSelected ? 'Motorista Selecionado' : 'Selecionar'}
          </button>
        </div>
      )
    })}
  </div>
)

export default RideOptions
