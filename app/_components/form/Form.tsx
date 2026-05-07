import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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
  const yesOrNoInputWidth = Math.max(200, userMessageInput.length * 14);

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
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    setChatBotStage(7);
    reset();
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

  function handleAbort() {
    reset();
    console.log("resetting");
    setChatBotStage(999);
  }

  return (
    // I haven't used required as we will check if the field is dirty before the submit/next btn is clickable.
    <div className="h-full">
      {children}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 pointer-events-auto items-center justify-end h-full p-20 w-full"
      >
        {/* Name input */}
        {chatBotStage === 1 && (
          <>
            <input
              autoFocus
              id="name"
              style={{ width: `${nameInputWidth}px` }}
              className="absolute mb-10 border-b border-accent"
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
            <input
              autoFocus
              id="message"
              style={{ width: `${messageInputWidth}px` }}
              className="absolute mb-10 border-b border-accent"
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
            <input
              autoFocus
              id="email"
              style={{ width: `${emailInputWidth}px` }}
              className="absolute mb-10 px-4 border-b border-accent"
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
          </>
        )}

        {chatBotStage === 4 &&
          dirtyFields.email &&
          userEmailInput.length > 0 && (
            <p className="absolute text-grey/60 text-base w-100 pointer-events-none">
              [PRESS ENTER TO COMMIT]
            </p>
          )}

        {chatBotStage === 5 && (
          <>
            <input
              autoFocus
              id="yesOrNo"
              style={{ width: `${yesOrNoInputWidth}px` }}
              className="absolute mb-10 px-4 border-b border-accent"
              value={yesOrNoInput}
              placeholder="Y / N"
              onChange={(e) => setYesOrNoInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && userEmailInput.length > 0) {
                  e.preventDefault();
                  if (yesOrNoInput.toUpperCase() === "Y") {
                    handleSubmit(onSubmit)();
                    setChatBotStage((prev) => prev + 1);
                  } else {
                    handleAbort();
                  }
                }
              }}
            />
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
      </form>
    </div>
  );
}
