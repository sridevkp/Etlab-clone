import { motion } from "framer-motion"

function Results() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      transition={{duration: 0.2, ease:"easeOut"}}
    >
      Results
    </motion.div>
  )
}

export default Results