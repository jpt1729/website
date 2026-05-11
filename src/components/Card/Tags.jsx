"use client";
import { useState } from "react";

import { motion } from "framer-motion";

const MapIcon = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M15 21L9 18.9L4.35 20.7C4.01667 20.8333 3.70833 20.7958 3.425 20.5875C3.14167 20.3792 3 20.1 3 19.75V5.75C3 5.53333 3.0625 5.34167 3.1875 5.175C3.3125 5.00833 3.48333 4.88333 3.7 4.8L9 3L15 5.1L19.65 3.3C19.9833 3.16667 20.2917 3.20417 20.575 3.4125C20.8583 3.62083 21 3.9 21 4.25V18.25C21 18.4667 20.9375 18.6583 20.8125 18.825C20.6875 18.9917 20.5167 19.1167 20.3 19.2L15 21ZM14 18.55V6.85L10 5.45V17.15L14 18.55ZM16 18.55L19 17.55V5.7L16 6.85V18.55ZM5 18.3L8 17.15V5.45L5 6.45V18.3Z"
        fill="black"
      ></path>
    </svg>
  );
};
const EyeIcon = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M16.1 13.3L14.65 11.85C14.8 11.0667 14.575 10.3333 13.975 9.64999C13.375 8.96665 12.6 8.69999 11.65 8.84999L10.2 7.39999C10.4833 7.26665 10.7708 7.16665 11.0625 7.09999C11.3542 7.03332 11.6667 6.99999 12 6.99999C13.25 6.99999 14.3125 7.43749 15.1875 8.31249C16.0625 9.18749 16.5 10.25 16.5 11.5C16.5 11.8333 16.4667 12.1458 16.4 12.4375C16.3333 12.7292 16.2333 13.0167 16.1 13.3ZM19.3 16.45L17.85 15.05C18.4833 14.5667 19.0458 14.0375 19.5375 13.4625C20.0292 12.8875 20.45 12.2333 20.8 11.5C19.9667 9.81666 18.7708 8.47915 17.2125 7.48749C15.6542 6.49582 13.9167 5.99999 12 5.99999C11.5167 5.99999 11.0417 6.03332 10.575 6.09999C10.1083 6.16665 9.65 6.26665 9.2 6.39999L7.65 4.84999C8.33333 4.56665 9.03333 4.35415 9.75 4.21249C10.4667 4.07082 11.2167 3.99999 12 3.99999C14.5167 3.99999 16.7583 4.69582 18.725 6.08749C20.6917 7.47915 22.1167 9.28332 23 11.5C22.6167 12.4833 22.1125 13.3958 21.4875 14.2375C20.8625 15.0792 20.1333 15.8167 19.3 16.45ZM19.8 22.6L15.6 18.45C15.0167 18.6333 14.4292 18.7708 13.8375 18.8625C13.2458 18.9542 12.6333 19 12 19C9.48333 19 7.24167 18.3042 5.275 16.9125C3.30833 15.5208 1.88333 13.7167 1 11.5C1.35 10.6167 1.79167 9.79582 2.325 9.03749C2.85833 8.27915 3.46667 7.59999 4.15 6.99999L1.4 4.19999L2.8 2.79999L21.2 21.2L19.8 22.6ZM5.55 8.39999C5.06667 8.83332 4.625 9.30832 4.225 9.82499C3.825 10.3417 3.48333 10.9 3.2 11.5C4.03333 13.1833 5.22917 14.5208 6.7875 15.5125C8.34583 16.5042 10.0833 17 12 17C12.3333 17 12.6583 16.9792 12.975 16.9375C13.2917 16.8958 13.6167 16.85 13.95 16.8L13.05 15.85C12.8667 15.9 12.6917 15.9375 12.525 15.9625C12.3583 15.9875 12.1833 16 12 16C10.75 16 9.6875 15.5625 8.8125 14.6875C7.9375 13.8125 7.5 12.75 7.5 11.5C7.5 11.3167 7.5125 11.1417 7.5375 10.975C7.5625 10.8083 7.6 10.6333 7.65 10.45L5.55 8.39999Z"
        fill="black"
      ></path>
    </svg>
  );
};
const Corners = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      {...props}
    >
      <g clipPath="url(#clip0_9_28)">
        <path d="M12 0H0V12C0 5.3724 5.3724 0 12 0Z" fill="#FDFDFD"></path>
      </g>
      <defs>
        <clipPath id="clip0_9_28">
          <rect width="12" height="12" fill="#FDFDFD"></rect>
        </clipPath>
      </defs>
    </svg>
  );
};

const animation = {
  transition: { duration: 0.35, type: "tween", ease: "linear" },
};

export default function Tags({}) {
  const [hidden, setHidden] = useState(false);
  return (
    <div className="overflow-hidden relative w-full h-full">
      <div className="absolute top-0 left-0">
        <motion.div
          className="bg-off-white text-base p-4 rounded-br-xl w-[22ch]"
          animate={
            hidden
              ? {
                  y: -104,
                }
              : {
                  y: 0,
                }
          }
          transition={{...animation.transition, duration: animation.transition.duration}}
        >
          <p>Photo I took right outside Boston's "cop slide."</p>
          <Corners className="absolute -bottom-3 left-0" />
        </motion.div>
        <motion.div
          initial={{
            y: -104
          }}
          animate={
            hidden
              ? {
                  y: -24-104,
                }
              : {
                  y: -104,
                }
          }
          transition={{
            ...animation.transition,
            duration: animation.transition.duration * 24/104,
            delay: animation.transition.duration * 80/104,
          }}
        >
          <Corners className="absolute -right-3 top-0" />
        </motion.div>
      </div>
      <div className="absolute left-0 bottom-0">
        <motion.button
          className="bg-off-white rounded-tr-xl p-3 aspect-square h-12"
          title="Hide UI"
          animate={
            hidden
              ? {
                  y: 48,
                }
              : {
                  y: 0,
                }
          }
          transition={animation.transition}
          onClick={() => {
            setHidden(true);
          }}
        >
          <Corners className="absolute -top-3 left-0 -rotate-90" />
          <EyeIcon />
        </motion.button>
        <motion.div
          animate={
            hidden
              ? {
                  y: 24,
                }
              : {
                  y: 0,
                }
          }
          className=""
          transition={{
            ...animation.transition,
            duration: animation.transition.duration / 2,
            delay: animation.transition.duration / 2,
          }}
        >
          <Corners className="-rotate-90 absolute -right-3 bottom-0" />
        </motion.div>
      </div>
      <div className="absolute right-0 bottom-0">
        <motion.a
          className="bg-off-white py-[10px] px-3 subpixel-antialiased flex gap-3 rounded-tl-xl"
          animate={
            hidden
              ? {
                  y: 48,
                }
              : {
                  y: 0,
                }
          }
          transition={animation.transition}
          title='Image Location'
          href='https://maps.app.goo.gl/69Mv57yg9L7QKKL49'
          target="_blank"
        > 
          <MapIcon />
          <p className="underline">Boston, MA</p>
          <Corners className="absolute -top-3 right-0 rotate-180" />
        </motion.a>
        <motion.div
          animate={
            hidden
              ? {
                  y: 24,
                }
              : {
                  y: 0,
                }
          }
          transition={{
            ...animation.transition,
            duration: animation.transition.duration / 2,
            delay: animation.transition.duration / 2,
          }}
        >
          <Corners className="absolute -left-3 bottom-0 rotate-180" />
        </motion.div>
      </div>
    </div>
  );
}
