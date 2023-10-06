import React from 'react'
import { useSelector } from 'react-redux';
import { motion } from "framer-motion";
import { FaChevronDown } from 'react-icons/fa6';

const UserProfileDetails = () => {
    const user = useSelector((state) => state.user?.user);
  return (
    <div className="flex items-center justify-center gap-4 relative">
      <div
        className="w-12 h-12 flex items-center justify-center rounded-md
         overflow-hidden cursor-pointer bg-emerald-500"
      >
        {user?.photoURL ? (
          <>
            <motion.img
              whileHover={{ scale: 1.2 }}
              src={user?.photoURL}
              alt={user?.displayName}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </>
        ) : (
          <p className="text-2xl text-white font-semibold capitalize">
            {user?.email[0]}
          </p>
        )}
      </div>
      <motion.div
        whileTap={{ scale: 0.9 }}
        className=" p-4 rounded-md flex items-center justify-center bg-secondary cursor-pointer"
      >
        <FaChevronDown className=" text-primaryText" />
      </motion.div>
      <motion.div
        className="bg-secondary absolute top-16 px-4 py-3 right-0 rounded-xl shadow-md z-10 flex
         flex-col items-start justify-start gap-4 min-w-[225px]"
      >
      </motion.div>
    </div>
  );
}

export default UserProfileDetails