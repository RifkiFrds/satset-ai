import React from "react";
import { motion } from "framer-motion";
import { contributorData } from "../contributor/data/contributorData";
import ContributorCard from "./ContributorCard.jsx";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, duration: 0.5, ease: "easeOut" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function ContributorGrid() {
  return (
    <section className="container mx-auto px-4">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {contributorData.map((person, i) => (
          <motion.div key={i} variants={itemVariants}>
            <ContributorCard {...person} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
