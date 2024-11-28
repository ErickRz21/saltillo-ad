import { motion } from "framer-motion";
import useTicketData from "../hooks/useTicketData"; // Replace with your actual hook path
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowDown } from "react-icons/fa"; // Importing FontAwesome arrow icon

const Home = () => {
  const navigate = useNavigate();
  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0, y: -500 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Animation variants for the cards
  const cardVariantsLeft = {
    hidden: { opacity: 0, x: -100, rotate: 15 }, // Slide to the left
    visible: {
      opacity: 1,
      x: 0,
      rotate: -3,
      transition: { duration: 0.8, delay: 0.6, ease: "easeInOut" },
    },
  };

  const cardVariantsRight = {
    hidden: { opacity: 0, x: 100, rotate: 15 }, // Rotate to the right
    visible: {
      opacity: 1,
      x: 0,
      rotate: -3,
      transition: { duration: 0.8, delay: 0.6, ease: "easeInOut" },
    },
  };

  const { data: events, error } = useTicketData("Music"); // Replace "music" with your desired query
  const [eventCards, setEventCards] = useState<
    { image: string; title: string }[]
  >([]);

  useEffect(() => {
    if (events) {
      const mappedEvents = events
        .map((event: { images?: { url: string }[]; name: string }) => ({
          image: event.images?.[0]?.url || "/default-image.jpg", // Fallback image
          title: event.name,
        }))
        .slice(0, 8); // Limit amount of cards
      setEventCards(mappedEvents);
    }
  }, [events]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative flex flex-col items-center justify-center min-h-screen"
    >
      <>
      {/* Event Cards Layout */}
      {!error && (
        <div className="absolute w-full hidden lg:flex justify-between pointer-events-none">
        {/* Left side images */}
        <div className="flex flex-col -space-y-10">
          {eventCards.slice(0, 4).map((event, index) => (
          <motion.div
            key={index}
            className="w-52 mx-28 first:ml-0 last:ml-0"
            initial="hidden"
            animate="visible"
            variants={cardVariantsLeft}
            transition={{ delay: index * 0.3 }}
          >
            <img
            src={event.image}
            alt={event.title}
            className="w-full h-40 object-cover rounded-2xl shadow-xl"
            />
          </motion.div>
          ))}
        </div>

        {/* Right side images */}
        <div className="flex flex-col -space-y-10">
          {eventCards.slice(4).map((event, index) => (
          <motion.div
            key={index}
            className="w-52 -mx-28 first:mx-0 last:mx-0"
            initial="hidden"
            animate="visible"
            variants={cardVariantsRight}
            transition={{ delay: (index + 3) * 0.3 }}
          >
            <img
            src={event.image}
            alt={event.title}
            className="w-full h-40 object-cover rounded-2xl shadow-xl"
            />
          </motion.div>
          ))}
        </div>
        </div>
      )}

      {/* Main content */}
      <div className="z-10 text-center items-center">
        <h1>Welcome to the Home Page</h1>
        <motion.h2
        className="text-indigo-600 dark:text-indigo-400 text-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        >
        Explore Exciting Events
        </motion.h2>
        <motion.button
        id="more-info"
        className="scale-150 my-3"
        onClick={() => navigate("/category/music")}
        >
        Get Started
        </motion.button>
      </div>

      {/* Scroll Down Arrow */}
      <motion.div
        className="absolute bottom-32 lg:bottom-40 text-3xl text-indigo-600 dark:text-indigo-400"
        initial={{ opacity: 0.8 }}
        animate={{
        y: [0, -10, 0], // Move up and down
        }}
        transition={{
        delay: 1,
        duration: 1.4,
        repeat: Infinity, // Loop the animation
        repeatType: "loop",
        }}
      >
        <FaArrowDown />
      </motion.div>
      </>
    </motion.div>
  );
};

export default Home;
