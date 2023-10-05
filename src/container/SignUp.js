import React, { useState } from "react";
import { Logo } from "../assets";
import { UserAuthInput } from "../components";
import { FaEnvelope, FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { MdPassword } from "react-icons/md";
import { motion } from "framer-motion";
import { signInWithGithub, signInWithGoogle } from "../utils/helpers";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmaiValidationStatus, setGetEmaiValidationStatus] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="w-full">
      <div className="w-full flex flex-col items-center justify-center py-3">
        <p className="py-8 text-xl text-primaryText">Join With Us! 🤩</p>
        <div
          className="px-6 w-full md:w-auto py-4 rounded-xl bg-secondary 
         shadow-md flex flex-col items-center justify-center gap-5"
        >
          {/* email */}
          <UserAuthInput
            label="Email"
            placeholder="Email"
            isPass={false}
            key="Email"
            setStateFunction={setEmail}
            Icon={FaEnvelope}
            setGetEmaiValidationStatus={setGetEmaiValidationStatus}
          />

          {/* password */}
          <UserAuthInput
            label="Password"
            placeholder="Password"
            isPass={true}
            key="Password"
            setStateFunction={setPassword}
            Icon={MdPassword}
          />
          {/* alert section */}

          {/* login section */}
          {!isLogin ? (
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-full py-2.5 rounded-xl
               hover:bg-emerald-400 cursor-pointer bg-emerald-500"
              style={{ marginTop: "18px" }}
            >
              <p className="text-lg text-white">Sign Up</p>
            </motion.div>
          ) : (
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-full py-2.5 rounded-xl
               hover:bg-emerald-400 cursor-pointer bg-emerald-500"
              style={{ marginTop: "18px" }}
            >
              <p className="text-lg text-white">Login</p>
            </motion.div>
          )}

          {/* account text section */}
          {!isLogin ? (
            <p className="text-sm text-primaryText flex items-center justify-center gap-3">
              Already have an account !
              <span
                onClick={() => {
                  setIsLogin((prev) => !prev);
                }}
                className=" text-emerald-500 cursor-pointer"
              >
                Login Here
              </span>
            </p>
          ) : (
            <p className="text-sm text-primaryText flex items-center justify-center gap-3">
              Don't have an account !
              <span
                onClick={() => {
                  setIsLogin((prev) => !prev);
                }}
                className=" text-emerald-500 cursor-pointer"
              >
                Create Here
              </span>
            </p>
          )}

          {/* or section */}
          <div className="flex items-center justify-center gap-12">
            <div className="h-[1px] bg-TwodashColor rounded-md w-24"></div>
            <p className="text-sm text-TwodashColor">OR</p>
            <div className="h-[1px] bg-TwodashColor rounded-md w-24"></div>
          </div>

          {/* sing up with google */}
          <motion.div
            onClick={signInWithGoogle}
            className="flex items-center justify-center gap-3 bg-TwodashColor backdrop-blur-md
             w-full py-3 rounded-xl hover:bg-FourdashColor cursor-pointer"
          >
            <FcGoogle className="text-2xl" />
            <p className="text-lg text-white">Sign in with Google</p>
          </motion.div>

          {/* or section */}
          <div className="flex items-center justify-center gap-12">
            <div className="h-[1px] bg-TwodashColor rounded-md w-24"></div>
            <p className="text-sm text-TwodashColor">OR</p>
            <div className="h-[1px] bg-TwodashColor rounded-md w-24"></div>
          </div>

          {/* sign up with github */}
          <motion.div
            onClick={signInWithGithub}
            className="flex items-center justify-center gap-3 bg-TwodashColor backdrop-blur-md
             w-full py-3 rounded-xl hover:bg-FourdashColor cursor-pointer"
          >
            <FaGithub className="text-2xl" />
            <p className="text-lg text-white">Sign in with Github</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
