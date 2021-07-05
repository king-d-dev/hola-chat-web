import { useAuth0 } from '@auth0/auth0-react';

function HomePage() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="home flex items-center justify-center bg-gray-100 h-screen m-auto">
      <div className=" rounded-lg w-2/4 text-center flex flex-col items-center">
        <h3 className="">
          Welcome to hola chat, feel at home 🏡 and hit the button below when you ready to join the
          conversation. 🥳
        </h3>

        <button
          onClick={() => loginWithRedirect()}
          className="mt-3 bg-gray-800 text-white px-6 py-2 rounded-sm"
        >
          login
        </button>
      </div>
    </div>
  );
}

export { HomePage };
