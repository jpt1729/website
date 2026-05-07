import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function VideoLightbox({ videoId, caption }) {
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
        <div className="relative w-fit">
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt={caption || "Video thumbnail"}
            className="md:w-48 w-24 shadow-sm opacity-80 hover:opacity-50 transition-opacity duration-200"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg className="w-5 h-5 text-white drop-shadow" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
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
              className="flex flex-col items-center gap-4 px-4 py-20"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                className="h-[75vh] aspect-[9/16]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
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
