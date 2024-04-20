import { motion } from "framer-motion"

function Fee() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      transition={{duration: 0.2, ease:"easeOut"}}
    >
      Fee
    </motion.div>
  )
}

export default Fee