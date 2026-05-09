import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { PUBLICKEY, SERVICEID, TEMPLATEID } from "@/app/_lib/data";

interface FormProps {
  children: React.ReactNode;
  chatBotStage: number;
  setChatBotStage: Dispatch<SetStateAction<number>>;
  setHighestChatBotStage: Dispatch<SetStateAction<number>>;
  highestChatBotStage: number;
}

type Inputs = {
  name: string;
  email: string;
  message: string;
};

export default function Form({
  children,
  chatBotStage,
  setChatBotStage,
  setHighestChatBotStage,
  highestChatBotStage,
}: FormProps) {
  const [userNameInput, setUserNameInput] = useState("");
  const [userEmailInput, setUserEmailInput] = useState("");
  const [userMessageInput, setUserMessageInput] = useState("");
  const [yesOrNoInput, setYesOrNoInput] = useState("");

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmailInput.trim());

  const nameInputWidth = Math.max(200, userNameInput.length * 14);
  const emailInputWidth = Math.max(200, userEmailInput.length * 14);
  const messageInputWidth = Math.max(200, userMessageInput.length * 14);
  const yesOrNoInputWidth = Math.max(200, yesOrNoInput.length * 14);

  gsap.registerPlugin(useGSAP);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, dirtyFields, isDirty },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await emailjs.send(
        SERVICEID,
        TEMPLATEID,
        {
          name: data.name,
          email: data.email,
          message: data.message,
        },
        PUBLICKEY,
      );
      reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
    }
  };

  const { onChange: nameOnChange, ...nameRegister } = register("name");
  const { onChange: messageOnChange, ...messageRegister } = register("message");
  const { onChange: emailOnChange, ...emailRegister } = register("email");

  function handleStageIncrease() {
    if (highestChatBotStage >= 5) {
      setChatBotStage(5);
    } else {
      setChatBotStage((prev) => prev + 1);
      setHighestChatBotStage((prev) => prev + 1);
    }
  }

  return (
    // I haven't used required as we will check if the field is dirty before the submit/next btn is clickable.
    <div className="h-full">
      {children}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-6 items-center justify-end h-full p-20 w-full"
      >
        {/* Name input */}
        {chatBotStage === 1 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="absolute mb-10 border-b border-accent max-w-full overflow-scroll"
            >
              <input
                autoFocus
                id="name"
                style={{ width: `${nameInputWidth}px` }}
                value={userNameInput}
                {...nameRegister}
                onChange={(e) => {
                  nameOnChange(e);
                  setUserNameInput(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && userNameInput.length > 0) {
                    e.preventDefault();
                    handleStageIncrease();
                  }
                }}
              />
            </motion.div>
          </>
        )}

        {chatBotStage === 1 && dirtyFields.name && userNameInput.length > 0 && (
          <p className="absolute text-grey/60 text-base w-100 pointer-events-none">
            [PRESS ENTER TO COMMIT]
          </p>
        )}

        {/* Message input */}
        {chatBotStage === 3 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="absolute mb-10 border-b border-accent max-w-full overflow-scroll"
            >
              <input
                autoFocus
                id="message"
                style={{ width: `${messageInputWidth}px` }}
                value={userMessageInput}
                {...messageRegister}
                onChange={(e) => {
                  messageOnChange(e);
                  setUserMessageInput(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && userMessageInput.length > 0) {
                    e.preventDefault();
                    handleStageIncrease();
                  }
                }}
              />
            </motion.div>
          </>
        )}

        {chatBotStage === 3 &&
          dirtyFields.message &&
          userMessageInput.length > 0 && (
            <p className="absolute text-grey/60 text-base w-100 pointer-events-none">
              [PRESS ENTER TO COMMIT]
            </p>
          )}

        {/* Email inputs */}
        {chatBotStage === 4 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.6 }}
              className="absolute mb-10 border-b border-accent max-w-full overflow-scroll"
            >
              <input
                autoFocus
                id="email"
                style={{ width: `${emailInputWidth}px` }}
                {...emailRegister}
                value={userEmailInput}
                placeholder="Email"
                onChange={(e) => {
                  setUserEmailInput(e.target.value);
                  emailOnChange(e);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && isValidEmail) {
                    e.preventDefault();
                    handleStageIncrease();
                  }
                }}
              />
            </motion.div>
          </>
        )}

        {chatBotStage === 4 && dirtyFields.email && isValidEmail && (
          <p className="absolute text-grey/60 text-base w-100 pointer-events-none">
            [PRESS ENTER TO COMMIT]
          </p>
        )}

        {chatBotStage === 4 && dirtyFields.email && !isValidEmail && (
          <p className="absolute text-grey/60 text-base w-100 pointer-events-none">
            [PRESS ENTER A VALID EMAIL]
          </p>
        )}

        {/* Y or N */}
        {chatBotStage === 5 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.6 }}
              className="absolute mb-10 border-b border-accent max-w-full overflow-scroll"
            >
              <input
                autoFocus
                id="yesOrNo"
                style={{ width: `${yesOrNoInputWidth}px` }}
                value={yesOrNoInput}
                placeholder="Y / N"
                onChange={(e) => setYesOrNoInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && userEmailInput.length > 0) {
                    e.preventDefault();
                    if (yesOrNoInput.toUpperCase() === "Y") {
                      handleSubmit(onSubmit)();
                      setChatBotStage((prev) => prev + 1);
                      setHighestChatBotStage((prev) => prev + 1);
                    } else if (yesOrNoInput.toUpperCase() === "N") {
                      setChatBotStage(10);
                      setYesOrNoInput("");
                    }
                  }
                }}
              />
            </motion.div>
          </>
        )}

        {chatBotStage === 5 &&
          yesOrNoInput.length > 0 &&
          (yesOrNoInput === "Y" ||
            yesOrNoInput === "N" ||
            yesOrNoInput === "y" ||
            yesOrNoInput === "n") && (
            <p className="absolute text-grey/60 text-base w-100 pointer-events-none">
              [PRESS ENTER TO COMMIT]
            </p>
          )}

        {/* Edit screen */}
        {chatBotStage === 10 && (
          <div className="absolute inset-0 flex flex-col mt-75 lg:mt-60 gap-4 text-left font-mono items-center justify-center max-w-4/5 mx-auto overflow-hidden">
            <p className="absolute text-center bottom-6 md:relative animate-pulse text-sm text-grey pointer-events-none">
              [&nbsp;CLICK A LINE TO EDIT&nbsp;DATA&nbsp;]
            </p>
            <button
              onClick={() => setChatBotStage(1)}
              className="hover:text-accent duration-200 cursor-pointer px-6 md:px-20 pointer-events-auto"
            >
              1. NAME: <br className="sm:hidden" />
              <span className="text-grey hidden md:inline-block">
                {userNameInput}
              </span>
              <span className="text-grey md:hidden">
                {userNameInput.length > 20
                  ? userNameInput.slice(0, 20) + "..."
                  : userNameInput}
              </span>
            </button>

            <button
              onClick={() => setChatBotStage(3)}
              className="hover:text-accent duration-200 cursor-pointer px-6 md:px-20 pointer-events-auto"
            >
              2. MESSAGE: <br className="sm:hidden" />
              <span className="text-grey hidden md:inline-block">
                {userMessageInput}
              </span>
              <span className="text-grey md:hidden">
                {userMessageInput.length > 20
                  ? userMessageInput.slice(0, 20) + "..."
                  : userMessageInput}
              </span>
            </button>

            <button
              onClick={() => setChatBotStage(4)}
              className="hover:text-accent duration-200 cursor-pointer px-6 md:px-20 pointer-events-auto"
            >
              3. CONTACT: <br className="sm:hidden" />
              <span className="text-grey hidden md:inline-block">
                {userEmailInput}
              </span>{" "}
              <span className="text-grey md:hidden">
                {userEmailInput.length > 20
                  ? userEmailInput.slice(0, 20) + "..."
                  : userEmailInput}
              </span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
