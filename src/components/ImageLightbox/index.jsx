import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageLightbox({ src, alt, caption, children }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="mt-3 cursor-zoom-in w-fit" onClick={() => setOpen(true)}>
        {children}
        {caption && <p className="text-xs opacity-40 mt-1">{caption}</p>}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setOpen(false)}
          >
            <button
              className="absolute top-7 right-8 text-white hover:text-white/50 transition-colors duration-150 leading-none select-none text-2xl"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>

            <motion.div
              className="flex flex-col items-center gap-4 px-20 py-20 w-full"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={src}
                alt={alt}
                className="max-w-full max-h-[75vh] object-contain"
              />
              {caption && (
                <p className="text-white/40 text-xs text-center tracking-wide">
                  {caption}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
