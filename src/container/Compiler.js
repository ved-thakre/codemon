import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { motion} from 'framer-motion'
import { Dark, Light, Logo } from "../assets";
import { Link } from "react-router-dom";
import { LanguagesDropdown, Loader } from "../components";
import { languageOptions } from "../constants/languageOptions";
import axios from "axios";

const cplusplus = `// Write code below 

#include <iostream>
using namespace std;
         
int main(){
         
   cout << "Hello World" << endl;
      
   return 0;
} `;

const Compiler = () => {
  const [code, setCode] = useState(cplusplus);
  const [changeMode, setChangeMode] = useState("dark");
  const [language, setLanguage] = useState(languageOptions[0]);
  const [sliderValue, setsliderValue] = useState(15);
  const [processing, setProcessing] = useState();  
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(null);

  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  const handleCodeChange = (newCode) => {
   setCode(newCode);
  };

  const handleCompile = async () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      source_code: btoa(code),
      stdin: btoa(input),
    };
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "3d1647050bmsh8e8e4442e00eb39p1e9a18jsn380a3b280ae8",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: formData,
    };
    console.log(options)
    try {
      const response = await axios.request(options);
      const token = response.data.token;
      console.log(response.data);
      checkStatus(token);
    } catch (error) {
      setProcessing(false);
      console.error(error);
    }
  };
 
  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Key": "3d1647050bmsh8e8e4442e00eb39p1e9a18jsn380a3b280ae8",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutput(response.data);
        // showSuccessToast(`Compiled Successfully!`);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      // showErrorToast();
    }
  };

  const getOutput = () => {
    let statusId = output?.status?.id;
    if (statusId === 6) {
      return atob(output?.compile_output);
    } else if (statusId === 3) {
      return atob(output.stdout) || ""; // Ensure it's a string or an empty string
    } else if (statusId === 5) {
      return "Time Limit Exceeded";
    } else {
      return atob(output?.stderr);
    }
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-start justify-start overflow-hidden">
        {/* header section */}
        <header className="w-full flex items-center gap-6 pr-12 pl-8 py-4 relative">
          <Link to={"/home/projects"}>
            <img className="w-32 h-auto object-contain" src={Logo} alt="Logo" />
          </Link>
          <div className="">
            <LanguagesDropdown onSelectChange={onSelectChange} />
          </div>
          <div className="-mt-1">
            <label
              htmlFor="default-range"
              class="inline-block mb-2 pt-2 pr-2 text-lg font-thin text-gray-900 dark:text-white"
            >
              <b>Fs</b>
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
              class="w-12 h-2 ml-1  bg-gray-200 accent-emerald-500 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            ></input>
          </div>
          {changeMode === "dark" ? (
            <motion.img
              whileTap={{ scale: 1.2 }}
              onClick={() => setChangeMode("light")}
              src={Light}
              alt="Light"
              className="w-10 absolute top-5 left-2/3 cursor-pointer"
            />
          ) : (
            <motion.img
              whileTap={{ scale: 1.2 }}
              onClick={() => setChangeMode("dark")}
              src={Dark}
              alt="Light"
              className="w-8 mt-1 ml-1 absolute top-5 left-2/3 cursor-pointer"
            />
          )}
        </header>
        {/* Compiler */}
        <div
          className={` ${
            window.innerWidth <= 425
              ? "flex flex-col"
              : "grid grid-cols-10 w-full"
          }`}
        >
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
                height="80vh"
                language={language?.value || "cpp"}
                theme={changeMode === "dark" ? "vs-dark" : "light"}
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
              onClick={handleCompile}
              className={`rounded-sm text-sm text-black ${
                processing ? "pl-6 pr-6" : "px-5"
              } py-2 mt-4 bg-emerald-400`}
            >
              {processing ? <Loader /> : "Run"}
            </motion.button>
          </div>
          <div className="col-span-3" style={{ marginLeft: "6%" }}>
            <div className="w-full h-fit rounded-md">
              <textarea
                name="input"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                placeholder="Custom input"
                style={{
                  resize: "none",
                  color: "white",
                  padding: "9px",
                  width: "95%",
                  height: "220px",
                  borderRadius: "5px",
                  backgroundColor:
                    changeMode === "dark" ? "#1e1e1e" : "#FFFFFE",
                }}
              />
            </div>
            <div className="w-full h-fit mt-2">
              <p className="text-white m-1">Output</p>
              <textarea
                name="output"
                value={output ? getOutput() : ""}
                style={{
                  resize: "none",
                  color:
                    output && output?.status?.id !== 3
                      ? " rgb(239 68 68)"
                      : "#6A9956",
                  width: "95%",
                  padding: "9px",
                  height: "220px",
                  borderRadius: "5px",
                  backgroundColor:
                    changeMode === "dark" ? "#1e1e1e" : "#FFFFFE",
                }}
              />
            </div>
            {output && (
              <div className="metrics-container mt-4 flex flex-col space-y-5">
                <p className="text-sm text-white">
                  Status :
                  <span
                    className={`font-semibold px-2 py-1 mx-2 ${
                      output?.status?.id !== 3
                        ? "text-red-500"
                        : "text-green-500"
                    } rounded-md  bg-gray-100`}
                  >
                    {output?.status?.description}
                  </span>
                </p>
                <p className="text-sm text-white">
                  Memory :
                  <span
                    className={`font-semibold ${
                      output?.memory ? "px-2 py-1" : ""
                    } mx-2 text-black rounded-md bg-gray-100`}
                  >
                    {output?.memory}
                  </span>
                </p>
                <p className="text-sm text-white">
                  Time :
                  <span
                    className={`font-semibold ${
                      output?.time ? "px-2 py-1" : ""
                    } mx-2 text-black rounded-md bg-gray-100`}
                  >
                    {output?.time}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Compiler; //#FFFFFE
