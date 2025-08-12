
"use client";

import { motion } from "framer-motion";
import { User, UserCheck, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="flex items-center gap-4 mb-12"
        variants={cardVariants}
      >
        <Zap className="w-14 h-14 text-primary animate-pulse" style={{ filter: 'drop-shadow(0 0 8px hsl(var(--primary)))' }}/>
        <h1 className="text-5xl font-bold tracking-wider">Rent N Run</h1>
      </motion.div>

      <motion.div
        className="flex flex-col md:flex-row gap-8 w-full max-w-4xl"
        variants={containerVariants}
      >
        {/* Admin Card */}
        <motion.div
          className="group flex-1 cursor-pointer"
          variants={cardVariants}
          onClick={() => router.push('/login/admin')}
        >
          <div className="relative p-8 h-full rounded-2xl bg-white/10 backdrop-blur-md shadow-xl border border-white/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 p-4 rounded-full bg-indigo-500/20">
                 <UserCheck className="w-12 h-12 text-indigo-300" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Admin Login</h2>
              <p className="text-gray-300 mb-6">
                Access the management dashboard to oversee rentals, products, and users.
              </p>
              <button className="w-full py-3 mt-auto font-semibold rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Proceed as Admin
              </button>
            </div>
          </div>
        </motion.div>

        {/* Customer Card */}
         <motion.div
          className="group flex-1 cursor-pointer"
          variants={cardVariants}
          onClick={() => router.push('/signup')}
        >
          <div className="relative p-8 h-full rounded-2xl bg-white/10 backdrop-blur-md shadow-xl border border-white/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 p-4 rounded-full bg-green-500/20">
                 <User className="w-12 h-12 text-green-300" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Customer Login</h2>
              <p className="text-gray-300 mb-6">
                Access your account to browse products, manage your rentals, and view order history.
              </p>
              <button className="w-full py-3 mt-auto font-semibold rounded-lg bg-gradient-to-r from-green-500 to-teal-600 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Login or Sign Up
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;
