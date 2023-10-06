import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { motion } from "framer-motion";
import { FaChevronDown } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { Menus, signOutAction }  from '../utils/helpers';
import { slideUpOut } from '../animation';

const UserProfileDetails = () => {
    const user = useSelector((state) => state.user?.user);
    const [isMenu, setIsMenu] = useState(false);
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
        onClick={()=>{
            setIsMenu((prev)=>!prev);
        }}
        whileTap={{ scale: 0.9 }}
        className=" p-4 rounded-md flex items-center justify-center bg-secondary cursor-pointer"
      >
        <FaChevronDown className=" text-primaryText" />
      </motion.div>

      {isMenu && (
        <motion.div
          {...slideUpOut}
          className="bg-secondary absolute top-16 px-3 py-2 right-0 rounded-xl shadow-md z-10 flex
         flex-col items-start justify-start gap-2 min-w-[190px]"
        >
          {Menus &&
            Menus.map((menu) => (
              <Link
                to={menu.uri}
                key={menu.id}
                className="text-primaryText text-lg hover:bg-FivedashColor
               px-1 py-1 w-full rounded-md"
              >
                {menu.name}
              </Link>
            ))}
          <motion.p
            onClick={signOutAction}
            whileTap={{ scale: 0.9 }}
            className="text-primaryText text-lg hover:bg-FivedashColor px-1
           py-1 w-full rounded-md cursor-pointer"
          >
            Sign Out
          </motion.p>
        </motion.div>
      )}
    </div>
  );
}

export default UserProfileDetails