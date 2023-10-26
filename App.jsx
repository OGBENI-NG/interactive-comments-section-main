import React, { useState } from "react";
import Sections from "./Components/Sections";
import Comment from "./Components/Comment";

export default function App() {
  return (
    <div className="main">
      <div className="main-comments" >
        <Sections  className="main-inner">
          <Comment />
        </Sections>
        
      </div>
      
    </div>
  );
}
