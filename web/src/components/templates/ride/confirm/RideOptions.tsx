import React from 'react';

interface RideOption {
  id: string;
  name: string;
  description: string;
  vehicle: string;
  review: { rating: number };
  value: number;
}

interface RideOptionsProps {
  options: RideOption[];
  onSelectDriver: (driver: RideOption) => void;
  selectedDriver: RideOption | null;
}

const RideOptions: React.FC<RideOptionsProps> = ({ options, onSelectDriver, selectedDriver }) => (
  <div className="space-y-4">
    {selectedDriver ? (
      <div className="bg-green-100 p-4 rounded-lg">
        <p>Motorista selecionado: {selectedDriver.name}</p>
      </div>
    ) : (
      <p>Escolha um motorista abaixo:</p>
    )}

    {options.map((driver) => (
      <div key={driver.id} className="bg-white shadow-md p-4 rounded-lg mb-4">
        <p><strong>{driver.name}</strong></p>
        <p>{driver.description}</p>
        <p>Veículo: {driver.vehicle}</p>
        <p>Avaliação: {driver.review.rating} estrelas</p>
        <p>Valor: R${driver.value}</p>

        <button
          onClick={() => onSelectDriver(driver)}
          className="w-full bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-700"
        >
          Selecionar
        </button>
      </div>
    ))}
  </div>
);

export default RideOptions;
