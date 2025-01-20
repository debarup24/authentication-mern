import { createContext } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(false);

  const value = {
    //so that we can acess it in any other component
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
  };

  return (
    <AppContext.provider value={value}>{props.children}</AppContext.provider>
  );
};
