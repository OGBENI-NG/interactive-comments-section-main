import React, { useState } from "react";
import Sections from "./Components/Sections";
import Comment from "./Components/Comment";

export default function App() {
  return (
    <main className="main">
      <Sections className="main-comments" >
        <Sections  className="main-inner">
          <Comment />
        </Sections>
        
      </Sections>
      
    </main>
  );
}
