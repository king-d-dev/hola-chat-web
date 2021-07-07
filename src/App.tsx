import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import './assets/styles/index.css';
import { Loading } from './components/loading';
import { ChatPage } from './pages/chat';
import { HomePage } from './pages/home';
import { useAccessToken } from './stores/access-token';

function App() {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const { setAccessToken } = useAccessToken();

  useEffect(() => {
    async function retrieveAccessToken() {
      if (!isAuthenticated) return;
      const token = await getAccessTokenSilently();
      // setAccessToken(token);
      window.localStorage.setItem('access-token', token);
    }
    retrieveAccessToken();

    // return () => window.localStorage.removeItem('access-token');
  }, [getAccessTokenSilently, setAccessToken, isAuthenticated]);

  function renderContent() {
    if (isLoading) return <Loading />;

    if (isAuthenticated) return <ChatPage />;
    else return <HomePage />;
  }

  return <div className="App">{renderContent()}</div>;
}

export default App;
