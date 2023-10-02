// MyContextProvider.js
import React, { createContext, useState } from 'react';

const MyContext = createContext();

export default function MyContextProvider({ children }) {
  const [toggle, setToggle] = useState(false);

  function handleToggle() {
    setToggle((prev) => !prev);
  }

  return (
    <MyContext.Provider value={{ toggle, handleToggle}}>
      {children}
    </MyContext.Provider>
  );
}

export { MyContext } 