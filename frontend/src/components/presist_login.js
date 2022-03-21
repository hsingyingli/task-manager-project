import {Outlet} from 'react-router-dom';
import {useState, useEffect} from 'react';
import useAuth from '../hooks/useAuth';
import useRefreshToken from '../hooks/useRefresh';

export default function PersistLogin() {
  {
    /* HOOKS*/
  }
  const {auth} = useAuth();
  const refresh = useRefreshToken();
  const [isLoading, setIsLoading] = useState(true);
  {
    /* HOOKS*/
  }

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);


  return (
    <>
    {!isLoading ?  <Outlet/> : <p>Loading</p>}
    </>
  )
}
