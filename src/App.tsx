import './assets/styles/index.css';
import { Loading } from './components/loading';
import { AuthPage } from './pages/auth';
import { ChatPage } from './pages/chat';
import { HomePage } from './pages/home';

function App() {
  const isLoggedIn = null;

  function renderContent() {
    if (isLoggedIn) return <ChatPage />;
    else if (isLoggedIn === false) return <AuthPage />;
    else if (isLoggedIn === undefined) return <Loading />;
    else return <HomePage />;
  }

  return <div className="App">{renderContent()}</div>;
}

export default App;
