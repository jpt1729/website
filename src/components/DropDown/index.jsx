import { useState } from "react";
import { motion } from "framer-motion";

export default function DropDown({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2 px-5 py-1 text-left rounded-xl"
      >
        <motion.span
          className="text-off-black text-base leading-none select-none"
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {">"}
        </motion.span>
        <span className="text-base text-off-black hover:underline decoration-light-accent transition-colors decoration-2">
          {title}
        </span>
      </button>

      <motion.div
        initial={{ height: 0 }}
        animate={{ height: open ? "auto" : 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        className="overflow-hidden"
      >
        <div className="px-5 py-1 ml-5">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
