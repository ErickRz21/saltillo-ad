import { motion } from "framer-motion";

const Home = () => {
  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0, x: -500 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center min-h-screen"
    >
      <h1>Welcome to the Home Page</h1>
      <motion.h2
        className="text-indigo-600 dark:text-indigo-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        This is a simple quick start template
      </motion.h2>
      <motion.button
        className="my-5"
        id="more-info"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Get Started
      </motion.button>
    </motion.div>
  );
};

export default Home;
