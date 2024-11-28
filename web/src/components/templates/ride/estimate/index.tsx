import React from 'react';
import RideEstimateForm from './RideEstimateForm';

const RideEstimate: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">
            <RideEstimateForm />
        </div>
    );
};

export default RideEstimate;
