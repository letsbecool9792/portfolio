import { Twitter, Github, Linkedin, Instagram, Twitch, Youtube } from "lucide-react";
import ReturnHomeButton from "../components/ReturnHomeButton";
import ExternalLink from "../components/ExternalLink";
import { motion } from "framer-motion";

const socialLinks = [
  { href: "https://github.com/letsbecool9792", icon: <Github className="w-6 h-6 md:w-8 md:h-8" /> },
  { href: "https://twitter.com/letsbecool9792", icon: <Twitter className="w-6 h-6 md:w-8 md:h-8" /> },
  { href: "https://www.linkedin.com/in/letsbecool9792", icon: <Linkedin className="w-6 h-6 md:w-8 md:h-8" /> },
  { href: "https://www.instagram.com/letsbecool9792", icon: <Instagram className="w-6 h-6 md:w-8 md:h-8" /> },
  { href: "https://www.twitch.tv/letsbecool9792", icon: <Twitch className="w-6 h-6 md:w-8 md:h-8" /> },
  { href: "https://www.youtube.com/@letsbecool9792", icon: <Youtube className="w-6 h-6 md:w-8 md:h-8" /> },
  { href: "https://bsky.app/profile/letsbecool.bsky.social", icon: <img src="/assets/other/bsky.png" alt="Bsky" className="w-6 h-6 md:w-8 md:h-8" /> },
  { href: "https://discordapp.com/users/672367440977592350", icon: <img src="/assets/other/discord.png" alt="Discord" className="w-7 h-7 md:w-9.5 md:h-9.5" /> },
];

const platformLinks = [
  { href: "https://github.com/letsbecool9792", label: "LeetCode" },
  { href: "https://www.hackerrank.com/profile/letsbecool", label: "HackerRank" },
  { href: "https://codeforces.com/profile/letsbecool", label: "Codeforces" },
  { href: "https://devfolio.co/@letsbecool", label: "Devfolio" },
  { href: "https://stackoverflow.com/users/13383275/suparno-saha", label: "StackOverflow" },
];

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.8 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 500, damping: 30 } },
};

const Artifacts = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center p-4 md:p-8 relative"
      style={{
        backgroundImage: `
          url('/assets/background/background_clouds.svg'),
          url('/assets/background/background_color_trees.svg'),
          url('/assets/background/background_solid_grass.svg')
        `,
        backgroundRepeat: "repeat-x, repeat-x, repeat-x",
        backgroundPosition: "0 0, 0 40%, 0 100%",
        backgroundSize: "auto 33%, auto 33%, auto 100%",
        backgroundAttachment: "fixed, fixed, fixed",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        className="flex flex-col items-center mt-8 md:mt-10"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 120 }}
      >
        <motion.h1
          className="text-3xl md:text-4xl lg:text-5xl font-pixel text-center drop-shadow-lg"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 200 }}
        >
          Artifacts
        </motion.h1>
        <motion.p
          className="text-sm md:text-base lg:text-lg font-serif mt-2 text-gray-700 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Other places where I exist
        </motion.p>
      </motion.div>

      {/* Social Media Icons */}
      <motion.div
        className="flex flex-wrap justify-center gap-4 md:gap-6 mt-8 md:mt-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {socialLinks.map((link, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ scale: 1.25, rotate: [0, 8, -8, 0], transition: { duration: 0.4 } }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink href={link.href} className="transition-transform">
              {link.icon}
            </ExternalLink>
          </motion.div>
        ))}
      </motion.div>

      {/* Programming Platforms */}
      <motion.div
        className="w-full mt-12 md:mt-20 flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-wrap justify-center gap-4 max-w-lg md:max-w-2xl">
          {platformLinks.map((link, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.1, color: "#2563eb" }}
              whileTap={{ scale: 0.97 }}
            >
              <ExternalLink
                href={link.href}
                className="hover:underline text-sm md:text-base lg:text-lg font-mono text-gray-800 transition-colors"
              >
                {link.label}
              </ExternalLink>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Games Link */}
      <motion.div
        className="mt-8 md:mt-12 mb-8 md:mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7, type: "spring", stiffness: 120 }}
      >
        <motion.div
          whileHover={{ scale: 1.08, rotate: [0, 2, -2, 0], transition: { duration: 0.4, repeat: Infinity, repeatType: "reverse" } }}
          whileTap={{ scale: 0.97 }}
        >
          <ExternalLink
            href="https://letsbecool.itch.io"
            className="hover:underline text-base md:text-lg lg:text-xl font-mono text-gray-800 transition-colors"
          >
            Check out my games!
          </ExternalLink>
        </motion.div>
      </motion.div>
      <ReturnHomeButton />
    </motion.div>
  );
};

export default Artifacts;