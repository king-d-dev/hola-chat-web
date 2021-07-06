import { useAuth0 } from '@auth0/auth0-react';
import './assets/styles/index.css';
import { Loading } from './components/loading';
import { ChatPage } from './pages/chat';
import { HomePage } from './pages/home';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  function renderContent() {
    return <ChatPage />;
    if (isLoading) return <Loading />;

    if (isAuthenticated) return <ChatPage />;
    else return <HomePage />;
  }

  return <div className="App">{renderContent()}</div>;
}

export default App;
