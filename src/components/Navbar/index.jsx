"use client";
import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { CloseIcon, MenuIcon } from "./MenuIcon";

function MenuItem({ name, href, select, child, ...props }) {
  const [selected, setSelected] = useState(select ? select : false);
  return (
    <motion.li
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 + child * 0.15, duration: 0.45 }}
      className={select ? "text-light-accent" : ""}
    >
      <a
        href={href}
        onMouseOver={() => {
          setSelected(true);
        }}
        onMouseLeave={() => {
          setSelected(select ? select : false);
        }}
      >
        {selected ? (
          <span className="animate-flash">{`> `}</span>
        ) : (
          <span>{`> `}</span>
        )}
        <span className={!select && selected ? "animate-flash" : ""}>
          {name}
        </span>
      </a>
    </motion.li>
  );
}
/*
<motion.li
  initial={{ opacity: 0, y: -24 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.35, duration: 0.45 }}
  className="text-light-accent"
>
  <span className="no-underline animate-flash">{">>"}</span>{" "}
  HOME
</motion.li>
*/
export default function Navbar({ pathname, gitHash = "dev" }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav className="fixed left-0 top-0 p-3 w-screen bg-off-white z-10 subpixel-antialiased">
        <div className="max-w-screen-xl m-auto flex justify-between z-50 text-2xl">
          <span className="z-50 mix-blend-difference text-off-white">
            JOHN TAN-ARISTY
          </span>

          <div className="z-50 mix-blend-difference text-off-white h-8 overflow-y-hidden flex flex-col justify-end">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.button
                  key="close"
                  className="flex gap-1.5 items-center"
                  initial={{ y: -32 }}
                  animate={{ y: 0 }}
                  exit={{ y: 32 }}
                  title="Close Menu"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <CloseIcon />
                  <span>CLOSE</span>
                </motion.button>
              ) : (
                <motion.button
                  key="open"
                  className="flex gap-1.5 items-center"
                  initial={{ y: -32 }}
                  animate={{ y: 0 }}
                  exit={{ y: 32 }}
                  title="Open Menu"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <MenuIcon />
                  <span>MENU</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.menu
                initial={{ y: "-100vh" }}
                animate={{ y: 0 }}
                exit={{ y: "-100vh" }}
                transition={{
                  type: "tween",
                  duration: 0.45,
                  ease: [0.17, 0.67, 0.83, 0.67],
                }}
                className="fixed bg-off-black right-0 top-0 w-screen min-h-screen z-10 text-off-white p-3 overflow-y-scroll"
              >
                <div class="w-full h-14"></div>
                <div className="flex max-w-screen-xl m-auto justify-between">
                  <ol className="m-auto max-w-screen-xl w-full font-medium md:text-8xl text-6xl">
                    <MenuItem name="HOME" href="/" select={pathname === '/'} child={0} />
                    <MenuItem
                      name="ABOUT"
                      href="/about"
                      select={pathname === '/about'}
                      child={1}
                    />
                    <MenuItem
                      name="MY WORK"
                      href="/work"
                      select={pathname === '/work'}
                      child={2}
                    />
                    <MenuItem
                      name="CONTACT"
                      href="/contact"
                      select={pathname === '/contact'}
                      child={3}
                    />
                  </ol>
                </div>
                <motion.footer
                  className="flex max-w-screen-xl m-auto justify-between md:mt-6 mt-3 flex-wrap"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + 5 * 0.15, duration: 0.35 }}
                >
                  <div>
                    <p>
                      Made with {`<3`} by John. Website code available at{" "}
                      <a
                        className="underline lg:inline-block hidden"
                        href="https://github.com/jpt1729/new-portfolio"
                        target="_blank"
                      >
                        github.com/jpt1729/new-portfolio
                      </a>
                      <a
                        className="underline lg:hidden inline-block"
                        href="https://github.com/jpt1729/new-portfolio"
                        target="_blank"
                      >
                        my GitHub
                      </a>
                    </p>

                    <p className="lg:block hidden">
                      Follow me on{" "}
                      <a
                        className="underline"
                        href="https://www.linkedin.com/in/john-tan-aristy/"
                      >
                        LinkedIn!
                      </a>
                    </p>
                  </div>
                  <div>
                    <span>
                      {`(c)`} John Tan-Aristy, {new Date().getFullYear()} · {gitHash}
                    </span>
                  </div>
                </motion.footer>
              </motion.menu>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
