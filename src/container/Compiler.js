import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { motion} from 'framer-motion'
import { Logo } from "../assets";
import { Link } from "react-router-dom";
import { LanguagesDropdown } from "../components";
import { languageOptions } from "../constants/languageOptions";

const cplusplus = `// Write code below 

#include <iostream>
using namespace std;
         
int main(){
         
   cout << "Hello World" << endl;
      
   return 0;
} `;

const Compiler = () => {
  const [code, setCode] = useState(cplusplus);
  const [language, setLanguage] = useState(languageOptions[0]);
  const [sliderValue, setsliderValue] = useState(15);

  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  const handleCodeChange = (newCode) => {
   setCode(newCode);
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-start justify-start overflow-hidden">
        {/* header section */}
        <header className="w-full flex items-center gap-6 pr-12 pl-8 py-4 ">
          <Link to={"/home/projects"}>
            <img className="w-32 h-auto object-contain" src={Logo} alt="Logo" />
          </Link>
          <div className="">
            <LanguagesDropdown onSelectChange={onSelectChange} />
          </div>
          <div className="-mt-1">
            <label
              for="default-range"
              class="inline-block mb-2 pt-2 pr-2 text-lg font-thin text-gray-900 dark:text-white"
            >
              Font Size
            </label>
            <input
              id="default-range"
              type="range"
              value={sliderValue}
              onChange={(e) => {
                setsliderValue(e.target.value);
              }}
              min={1}
              max={35}
              class="w-24 h-2 ml-1  bg-gray-200 accent-emerald-500 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            ></input>
          </div>
        </header>
        {/* Compiler */}
        <div className="grid grid-cols-10 w-full">
          <div
            className="col-span-7 h-full ml-5"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              flexDirection: "column",
            }}
          >
            {/* Wrap the Editor component in a div with rounded-md */}
            <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
              <Editor
                height="77vh"
                language={language?.value || "cpp"}
                theme="vs-dark"
                value={code}
                onChange={handleCodeChange}
                options={{
                  fontSize: sliderValue,
                }}
                defaultValue="// some comment"
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="rounded-sm text-sm text-black px-5 py-2 mt-4 bg-emerald-400"
            >
              Run
            </motion.button>
          </div>
          <div className="col-span-3" style={{ marginLeft: "6%" }}>
            <div className="w-full h-fit rounded-md">
              <textarea
                name="input"
                id=""
                placeholder="Enter input"
                style={{
                  resize: "none",
                  color: "grey",
                  padding: "9px",
                  width: "95%",
                  height: "220px",
                  borderRadius: "5px",
                  backgroundColor: "#1e1e1e",
                }}
              />
            </div>
            <div className="w-full h-fit mt-5">
              <textarea
                name="output"
                style={{
                  resize: "none",
                  color: "#6A9956",
                  width: "95%",
                  padding: "9px",
                  height: "220px",
                  borderRadius: "5px",
                  backgroundColor: "#1e1e1e",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Compiler;
