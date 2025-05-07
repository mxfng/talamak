import { useLoaderData, Link } from "react-router-dom";
import { LinkItem, Config } from "@/types";
import { LinkCard } from "@/components/link-card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRef } from "react";
import { Footer } from "@/components/footer";
import { ProfileHeader } from "@/components/profile-header";

export default function ItemPage() {
  const { item, config } = useLoaderData() as {
    item: LinkItem;
    config: Config;
  };
  const scrollRef = useRef(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.main
      className="flex flex-col items-center justify-center bg-background text-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ScrollArea className="h-dvh w-full overflow-hidden" ref={scrollRef}>
        <motion.div
          className="mx-auto h-dvh flex flex-col items-between"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="p-6 w-full max-w-2xl mx-auto space-y-4">
            <motion.div className="mb-4" variants={itemVariants}>
              <Link to="/" className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <ArrowLeft className="size-8" />
                  </motion.div>
                  <ProfileHeader
                    avatar={config.avatar}
                    name={config.name}
                    bio={config.bio}
                    animated={false}
                    compact
                  />
                </div>
              </Link>
            </motion.div>
            {item.image && (
              <motion.div
                variants={itemVariants}
                className="rounded-2xl overflow-hidden max-h-[50dvh] shadow-md"
              >
                <motion.img
                  src={item.image.src}
                  alt={item.label}
                  className="w-full object-cover"
                  initial={{ filter: "blur(10px)" }}
                  animate={{ filter: "blur(0px)" }}
                  transition={{ duration: 0.8 }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </motion.div>
            )}
            <motion.h1
              className="w-full py-3 text-3xl font-semibold tracking-wide flex items-center gap-2"
              variants={itemVariants}
            >
              {item.label}
            </motion.h1>
            <motion.div className="space-y-2" variants={itemVariants}>
              {item.links.map((link, index) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.2 + index * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  }}
                >
                  <LinkCard item={link} type="link" />
                </motion.div>
              ))}
            </motion.div>
            <motion.div className="w-full flex" variants={itemVariants}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="w-full"
              >
                <Button className="w-full h-16 text-lg rounded-full" asChild>
                  <RouterLink to="/">
                    All my links
                    <ArrowRight className="size-6" />
                  </RouterLink>
                </Button>
              </motion.div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Footer />
          </motion.div>
        </motion.div>
      </ScrollArea>
    </motion.main>
  );
}
