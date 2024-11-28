import { Router } from './routes';
import { LoadScript } from '@react-google-maps/api';

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-sans">
      <LoadScript googleMapsApiKey={process.env.GOOGLE_API_KEY || ''} libraries={['places']}>
        <Router />
      </LoadScript>
    </div>
  );
}

export default App;
