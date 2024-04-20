import { motion } from "framer-motion"

function Leaves() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      transition={{duration: 0.2, ease:"easeOut"}}
    >
      Leaves
    </motion.div>
  )
}

export default Leaves 