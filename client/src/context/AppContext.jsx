import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import runChat from "../utils/gemini";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  // here in AppContextProvider - we can declare any state variable or functions and we can access it in any component

  // for API hit, we have to send cookies also, for that we have to make "withCredentials = true" for the api request :
  axios.defaults.withCredentials = true;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(false);
  //const [input, setInput] = useState("");
  // const [recentPrompt, setRecentPrompt] = useState("");
  //const [prevPrompts, setPrevPrompts] = useState([]); // not required
  // const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [resultData, setResultData] = useState("");

  // Check Authentication
  const getAuthState = async () => {
    // we call this 'getAuthState' function when ever the page got rendered, therefore use - 'useEffect' hook

    try {
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth");

      if (data.success) {
        setIsLoggedin(true);
        getUserData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Create a func, that will get the user data
  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data");

      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // we call this 'getAuthState' function when ever the page got rendered,   therefore use - 'useEffect' hook
  useEffect(() => {
    getAuthState();
  }, []);

  const onSent = async (prompt) => {
    //setResultData("");
    //setLoading(true);
    //setShowResult(true);

    // prompt.preventDefault();

    // const emailPrompt =
    //   `Act as an expert email writer. Format your responses with proper spacing and paragraphs. Include appropriate salutations and closings. Separate paragraphs with line breaks. Do not include any HTML tags - just focus on the content structure with proper spacing and line breaks and Write a professional email with the following instructions: ` +
    //   input;

    // setRecentPrompt(prompt);
    await runChat(prompt);
    // const response = await runChat(emailPromt);
    // let responseArray = response.split("**");
    // let newResponse = "";
    // for (let i = 0; i < responseArray.length; i++) {
    //   if (i == 0 || i % 2 !== 1) {
    //     newResponse += responseArray[i];
    //   } else {
    //     newResponse += "<b>" + responseArray[i] + "</b>";
    //   }
    // }

    // let newResponse2 = newResponse.split("*").join("</br>");

    // let newResponseArray = newResponse2.split(" ");
    // for (let i = 0; i < newResponseArray.length; i++) {
    //   const nextWord = newResponseArray[i];
    //   delayPara(i, nextWord + " ");
    // }
    // setLoading(false);
    // setInput("");
    // setResultData(response);
  };

  onSent("what is reactnative expo?");

  const value = {
    //here we will pass all variables and Func, so that we can acess it in any other component
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
    //onSent,
    //setRecentPrompt,
    // recentPrompt,
    // showResult,
    // loading,
    // resultData,
    // input,
    // setInput,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
