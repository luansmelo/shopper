import { Router } from './routes';
import { LoadScript } from '@react-google-maps/api';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-sans">
      <LoadScript googleMapsApiKey={process.env.GOOGLE_API_KEY || ''} libraries={['places']}>
        <Router />
      </LoadScript>
      <ToastContainer />
    </div>
  );
}

export default App;
