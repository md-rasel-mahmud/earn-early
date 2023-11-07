import { Outlet } from "react-router-dom";
import Navbar from "./components/utils/Navbar";
import { useEffect } from "react";
import useAuthObserver from "./hooks/useAuthObserver";

function App() {
  const [unsubscribe, auth] = useAuthObserver();

  //Auth observer
  useEffect(() => {
    unsubscribe();
    return () => unsubscribe();
  }, [auth]);
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
