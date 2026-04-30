"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";

export type ModalName =
  | "the-pond"
  | "cobalt-aluminium"
  | "cobalt-construction"
  | "cobalt-hub"
  | "cobalt-development"
  | "smiling-sole-reflexology";

type ArbitraryProps = Record<string, unknown>;

interface modalState {
  name: ModalName | null;
  props: ArbitraryProps;
}

interface ModalWrapperProps {
  children: ReactNode;
  onClose: () => void;
}

// This type is for what the context providers the children.
interface modalContextType {
  openModal: (name: ModalName) => void;
  closeModal: () => void;
}

interface modalProviderProps {
  children: ReactNode;
}

const ModalContext = createContext<modalContextType | undefined>(undefined);

// Wraps all of the modals and contains the closeModal func.
function ModalWrapper({ children, onClose }: ModalWrapperProps) {
  return createPortal(
    <div
      className="fixed inset-0 bg-dark-eighty flex justify-center items-center z-50 p-4 transition-opacity duration-300 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg sm:rounded-xl shadow-2xl max-w-[480px] w-full duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

function ThePondModal() {
  const { closeModal } = useModal();

  return <></>;
}

function SmilingSoleReflexologyModal() {
  const { closeModal } = useModal();

  return <></>;
}

function CobaltAluminiumModal() {
  const { closeModal } = useModal();

  return <></>;
}

function CobaltHubModal() {
  const { closeModal } = useModal();

  return <></>;
}

function CobaltDevelopmentModal() {
  const { closeModal } = useModal();

  return <></>;
}

function CobaltConstructionModal() {
  const { closeModal } = useModal();

  return <></>;
}

// Provider that wraps around app and provides the open and close modal funcs.
function ModalProvider({ children }: modalProviderProps) {
  const [modalState, setModalState] = useState<modalState>({
    name: null,
    props: {},
  });

  const openModal = (name: ModalName, props: ArbitraryProps = {}) => {
    setModalState({ name: name, props: props });
  };

  function closeModal() {
    setModalState({ name: null, props: {} });
  }

  useEffect(() => {
    if (modalState.name) {
      // Stop the body from scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Allow the body to scroll again
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }
  }, [modalState.name]);

  const modalComponents = {
    "the-pond": ThePondModal,
    "cobalt-aluminium": CobaltAluminiumModal,
    "cobalt-construction": CobaltConstructionModal,
    "cobalt-hub": CobaltHubModal,
    "cobalt-development": CobaltDevelopmentModal,
    "smiling-sole-reflexology": SmilingSoleReflexologyModal,
  };

  const ModalComponent = modalState.name
    ? modalComponents[modalState.name]
    : null;

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalState.name && ModalComponent && (
        <ModalWrapper onClose={closeModal}>
          <ModalComponent {...modalState.props} />
        </ModalWrapper>
      )}
    </ModalContext.Provider>
  );
}

// Check for if context is being used wrong.
function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined)
    throw new Error("ModalContext was used outside ModalProvider");
  return context;
}

export { ModalProvider, useModal };
