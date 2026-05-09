"use client";

import { chatBotScript, loadingScreenData } from "@/app/_lib/data";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrambleTextPlugin, TextPlugin } from "gsap/all";
import { useEffect, useRef, useState } from "react";
import Form from "./Form";
import { useMediaQuery } from "usehooks-ts";

export default function Terminal() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loadBarPercent, setLoadBarPercent] = useState(0);
  const [loadingStageComplete, setLoadingStageComplete] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [chatBotStage, setChatBotStage] = useState(0);
  const isMobile = useMediaQuery("(max-width: 640px)");

  // Handles scrollProgress
  useEffect(() => {
    const handleScroll = () => {
      // Calculate how far we've scrolled (0 to 1)
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Lock user scroll while loading animation plays
  useEffect(() => {
    const unlockScroll = () => {
      document.body.style.overflow = "unset";
      document.body.style.height = "unset";
    };

    if (!loadingStageComplete && isPlaying) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      unlockScroll();
    }

    return unlockScroll;
  }, [loadingStageComplete, isPlaying]);

  gsap.registerPlugin(useGSAP, TextPlugin, ScrambleTextPlugin);
  const loadingScreen = useRef(null);
  const loadingBar = useRef(null);
  const textRef = useRef(null);
  const chatBotRef = useRef(null);
  const terminalRef = useRef(null);

  // Loading animations
  useGSAP(
    () => {
      // Only run if the progress is 1 AND the element exists
      if (scrollProgress === 1 && loadingScreen.current) {
        const tl = gsap.timeline();

        // Ensure loadbar always starts from 0.
        setLoadBarPercent(0);

        // Initial flicker
        tl.to(loadingScreen.current, {
          delay: 0.8,
          opacity: 1,
          duration: 0.05,
          onStart: () => setIsPlaying(true),
        })
          .to(loadingScreen.current, { opacity: 0, duration: 0.05 })
          .to(loadingScreen.current, { opacity: 0.7, duration: 0.1 })
          .to(loadingScreen.current, { opacity: 0.1, duration: 0.4 })
          .to(loadingScreen.current, { opacity: 1, duration: 0.05 })
          .to(loadingScreen.current, { opacity: 0.3, duration: 0.05 })
          .to(loadingScreen.current, {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          });

        // Loadingbar animation
        tl.set(loadingBar.current, { width: 0 })
          // Connect to station
          .to(loadingBar.current, {
            delay: 0.8,
            duration: 0.4,
            width: "20%",
            ease: "cubic-bezier(0.6, 0, 0.4, 1)",
            onUpdate: function () {
              const currentPercent = Math.round(this.progress() * 20);
              setLoadBarPercent(currentPercent);
            },
          })
          // Connection established
          .to(textRef.current, {
            duration: 0.8,
            text: loadingScreenData[1].label,
            ease: "none",
          })
          // ui_layer
          .to(textRef.current, {
            delay: 0.2,
            duration: 0.8,
            text: loadingScreenData[2].label,
            ease: "none",
          })
          .to(
            loadingBar.current,
            {
              duration: 1.4,
              width: "65%",
              ease: "cubic-bezier(0.65, 0, 0.35, 1)",
              onUpdate: function () {
                const currentPercent = 20 + Math.round(this.progress() * 30);
                setLoadBarPercent(currentPercent);
              },
            },
            "-=0.2",
          )
          // chat_bot
          .to(textRef.current, {
            duration: 0.8,
            text: loadingScreenData[3].label,
            ease: "none",
          })
          .to(loadingBar.current, {
            duration: 1.4,
            width: isMobile ? "98.5%" : "99%",
            ease: "cubic-bezier(0.33, 1, 0.68, 1)",
            onUpdate: function () {
              const currentPercent = 65 + Math.round(this.progress() * 35);
              setLoadBarPercent(currentPercent);
            },
          })
          // system_ready
          .to(textRef.current, {
            duration: 0.8,
            text: loadingScreenData[4].label,
            ease: "none",
          })
          .to(loadingScreen.current, {
            delay: 0.4,
            scaleY: 0,
            duration: 0.4,
            ease: "cubic-bezier(0.65, 0, 0.35, 1)",
            onComplete: () => setLoadingStageComplete(true),
          });
        return () => {
          tl.kill();
        };
      }
    },
    { scope: loadingScreen, dependencies: [scrollProgress] },
  );

  // Chatbot animations
  useGSAP(
    () => {
      if (loadingStageComplete && chatBotRef.current) {
        const currentContent = chatBotScript[chatBotStage];
        const tl = gsap.timeline();

        // Opening line of Oh you're not...
        if (currentContent) {
          if (chatBotStage === 0) {
            tl.to(chatBotRef.current, {
              delay: 1,
              duration: 1.6,
              text: chatBotScript[0].label,
              ease: "none",
            })
              .to(chatBotRef.current, {
                delay: 2,
                duration: 1.6,
                text: chatBotScript[1].label,
                ease: "none",
              })
              // What's your name
              .to(chatBotRef.current, {
                delay: 1,
                duration: 1.2,
                text: chatBotScript[2].label,
                ease: "none",
                onComplete: () => setChatBotStage(1),
              });
          }

          // Stuck on What's your name
          if (chatBotStage === 1) {
            tl.to(chatBotRef.current, {
              delay: 1,
              duration: 1.2,
              text: chatBotScript[2].label,
              ease: "none",
            });
          }

          // Beginning of hello, I am bot
          if (chatBotStage === 2) {
            tl.to(chatBotRef.current, {
              delay: 1,
              duration: 1.6,
              text: chatBotScript[3].label,
              ease: "none",
            })
              .to(chatBotRef.current, {
                delay: 1.6,
                duration: 1.6,
                text: chatBotScript[4].label,
                ease: "none",
              })
              .to(chatBotRef.current, {
                delay: 1.6,
                duration: 1.6,
                text: chatBotScript[5].label,
                ease: "none",
                onComplete: () => {
                  setChatBotStage(3);
                },
              });
          }
          // Stuck on what's your message
          if (chatBotStage === 3) {
            tl.to(chatBotRef.current, {
              delay: 1,
              duration: 1.6,
              text: chatBotScript[5].label,
              ease: "none",
            });
          }
          // How can contact?
          if (chatBotStage === 4) {
            tl.to(chatBotRef.current, {
              delay: 1,
              duration: 1.6,
              text: chatBotScript[6].label,
              ease: "none",
            });
          }

          // Would you like to send message?
          if (chatBotStage === 5) {
            tl.to(chatBotRef.current, {
              delay: 1,
              duration: 1.6,
              text: chatBotScript[7].label,
              ease: "none",
            });
          }

          // Sending message
          if (chatBotStage === 6) {
            tl.to(chatBotRef.current, {
              delay: 1,
              duration: 1.6,
              text: chatBotScript[8].label,
              ease: "none",
            }).to(chatBotRef.current, {
              delay: 1,
              duration: 0.8,
              text: chatBotScript[9].label,
              ease: "none",
            });
          }

          // N text
          if (chatBotStage === 10) {
            tl.to(chatBotRef.current, {
              duration: 1.6,
              text: chatBotScript[10].label,
              ease: "none",
            });
          }
        }
        return () => {
          tl.kill();
        };
      }
    },
    {
      scope: terminalRef,
      dependencies: [loadingStageComplete, scrollProgress, chatBotStage],
    },
  );

  return (
    <>
      <AnimatePresence>
        {scrollProgress === 1 && (
          <motion.section
            ref={terminalRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="fixed inset-0 flex justify-center items-center z-10 w-4/5 h-4/5 text-center m-auto pointer-events-none"
          >
            {loadingStageComplete === false && (
              <div ref={loadingScreen}>
                <h4>J-MCE.BOT</h4>
                <div className="relative w-60 sm:w-100 h-8 border border-accent mt-3 mb-1">
                  <div
                    ref={loadingBar}
                    className="w-0 h-[calc(100%-4px)] p-px bg-accent mt-0.5 ml-0.5"
                  ></div>
                </div>
                <div className="flex justify-between items-center">
                  <p ref={textRef} className="text-xs sm:text-sm">
                    {loadingScreenData[0].label}
                  </p>
                  <p className="text-xs sm:text-sm">{loadBarPercent}%</p>
                </div>
              </div>
            )}
            {loadingStageComplete === true && (
              <Form
                chatBotStage={chatBotStage}
                setChatBotStage={setChatBotStage}
              >
                <h4
                  className="absolute inset-0 flex justify-center items-center px-6 sm:px-10 lg:px-20"
                  ref={chatBotRef}
                ></h4>
              </Form>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
