import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetUserDetailsQuery } from '../../action/authService';
import { setCredentials } from '../../action/authSlice';
import Cookies from 'universal-cookie';


const Header = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const cookies = new Cookies();


  const { data, isFetching } = useGetUserDetailsQuery('', {
    // perform a refetch every 15mins
    pollingInterval: 900000,
  });

  React.useEffect(() => {
    if (data) dispatch(setCredentials(data.data.user));
    cookies.set('user', JSON.stringify(data?.data?.user), { path: '/', maxAge: 86400 });
  }, [data, dispatch]);

  return (
    <header>
      {isFetching ? (
        <div>Loading...</div>
      ) : null}
    </header>
  );
}

export default Header