import { motion } from "framer-motion"

function Inbox() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      transition={{duration: 0.2, ease:"easeOut"}}
    >
      Inbox
    </motion.div>
  )
}

export default Inbox