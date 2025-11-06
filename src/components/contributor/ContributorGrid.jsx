import React from "react";
import { motion } from "framer-motion";
import { contributorData } from "../contributor/data/contributorData";
import ContributorCard from "./ContributorCard.jsx";

export default function ContributorGrid() {
  return (
    <section className="container mx-auto ">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.1 },
          },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {contributorData.map((person, i) => (
          <motion.div key={i} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
            <ContributorCard {...person} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
