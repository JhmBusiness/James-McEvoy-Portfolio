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
}: FormProps) {
  const [userNameInput, setUserNameInput] = useState("");
  const [userEmailInput, setUserEmailInput] = useState("");
  const [userMessageInput, setUserMessageInput] = useState("");
  const [yesOrNoInput, setYesOrNoInput] = useState("");

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

  useEffect(() => {
    // Lock scroll if the loading is still happening OR if the user has started typing
    if (isDirty) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
      // Optional: add touch-action none for mobile stubbornness
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.height = "unset";
      document.body.style.touchAction = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.height = "unset";
      document.body.style.touchAction = "unset";
    };
  }, [isDirty]);

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
                    setChatBotStage((prev) => prev + 1);
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
                    setChatBotStage((prev) => prev + 1);
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
                placeholder="Email / Phone"
                onChange={(e) => {
                  setUserEmailInput(e.target.value);
                  emailOnChange(e);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && userEmailInput.length > 0) {
                    e.preventDefault();
                    setChatBotStage((prev) => prev + 1);
                  }
                }}
              />
            </motion.div>
          </>
        )}

        {chatBotStage === 4 &&
          dirtyFields.email &&
          userEmailInput.length > 0 && (
            <p className="absolute text-grey/60 text-base w-100 pointer-events-none">
              [PRESS ENTER TO COMMIT]
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
                    } else if (yesOrNoInput.toUpperCase() === "N") {
                      setChatBotStage(10);
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
          <div className="absolute inset-0 flex flex-col mt-50 gap-4 text-left font-mono items-center justify-center max-w-4/5 mx-auto overflow-hidden">
            <p className="animate-pulse text-sm text-grey pointer-events-none">
              [ CLICK A LINE TO EDIT DATA ]
            </p>
            <button
              onClick={() => setChatBotStage(1)}
              className="hover:text-accent duration-200 cursor-pointer px-20"
            >
              1. NAME: <span className="text-grey">{userNameInput}</span>
            </button>

            <button
              onClick={() => setChatBotStage(3)}
              className="hover:text-accent duration-200 cursor-pointer px-20"
            >
              2. MESSAGE: <span className="text-grey">{userMessageInput}</span>
            </button>

            <button
              onClick={() => setChatBotStage(4)}
              className="hover:text-accent duration-200 cursor-pointer px-20"
            >
              3. CONTACT: <span className="text-grey">{userEmailInput}</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
