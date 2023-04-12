import { useDispatch, useSelector } from 'react-redux';
import { registerUser, loginUser } from '../action/authAction';

const useFetch = (url) => {
  const { role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleGoogleSignup = async (response) => {
    dispatch(registerUser({ credential: response.credential, role }));
  };

  const handleGoogleLogin = async (response) => {
    dispatch(loginUser({ credential: response.credential }));
  };

  const handleProfile = async (response) => {

  }
  return { handleGoogleSignup, handleGoogleLogin, handleProfile };
};

export default useFetch;