import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig'; // Adjust the import as needed
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user from Firebase Authentication
      navigate('/login'); // Redirect to the login page after logging out
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={handleLogout}>Logout</button>;
};

export default Logout;
