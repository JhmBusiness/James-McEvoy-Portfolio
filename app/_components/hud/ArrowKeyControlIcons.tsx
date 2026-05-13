"use client";

import { useModal } from "@/app/_context/ModalContext";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

export default function ArrowKeyControlIcons() {
  const [isTopActive, setIsTopActive] = useState(false);
  const [isBottomActive, setIsBottomActive] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const { modalState } = useModal();

  useEffect(() => {
    if (isMobile || modalState.name !== null) return;

    function handleKeyboardControls(e: KeyboardEvent) {
      if (e.repeat) return;

      if (["ArrowUp", "ArrowDown"].includes(e.code)) {
        e.preventDefault();
      }

      if (e.key === "ArrowUp" || e.key === "w") {
        setIsTopActive(true);
        setTimeout(() => {
          setIsTopActive(false);
        }, 100);
      }

      if (e.key === "ArrowDown" || e.key === "s") {
        setIsBottomActive(true);
        setTimeout(() => {
          setIsBottomActive(false);
        }, 100);
      }
    }

    window.addEventListener("keydown", handleKeyboardControls);
    return () => {
      window.removeEventListener("keydown", handleKeyboardControls);
    };
  }, [isMobile, modalState.name]);

  return (
    <div className="absolute right-20 bottom-20 flex flex-col gap-4 pointer-events-auto">
      {/* Icons top */}
      <div
        id="hudTopBtn"
        className="relative hud-keyboard-icon-bg pointer-events-auto w-16 h-16 flex justify-center items-center group cursor-pointer duration-100"
      >
        <div
          className={`${isTopActive && "opacity-100"} group-hover:opacity-100 hud-btn-bg opacity-0 absolute w-16 h-16`}
        ></div>
        <span
          className={`${isTopActive && "scale-125 duration-100"} group-active:scale-125 z-10`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="35"
            viewBox="0 0 32 35"
            fill="none"
          >
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 8.72754 34.9092)"
              fill="#010101"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 11.6367 34.9092)"
              fill="#010101"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 14.5459 34.9092)"
              fill="#010101"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 17.4541 34.9092)"
              fill="#010101"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 20.3633 34.9092)"
              fill="#010101"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 20.3633 32)"
              fill="#010101"
            />
            <rect
              x="11.6367"
              y="32"
              width="2.90911"
              height="2.90911"
              transform="rotate(180 11.6367 32)"
              fill="#010101"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 20.3633 29.0908)"
              fill="#010101"
            />
            <rect
              x="11.6367"
              y="29.0908"
              width="2.90911"
              height="2.90911"
              transform="rotate(180 11.6367 29.0908)"
              fill="#010101"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 20.3633 26.1816)"
              fill="#010101"
            />
            <rect
              x="11.6367"
              y="26.1816"
              width="2.90911"
              height="2.90911"
              transform="rotate(180 11.6367 26.1816)"
              fill="#010101"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 20.3633 23.2725)"
              fill="#010101"
            />
            <rect
              x="11.6367"
              y="23.2725"
              width="2.90911"
              height="2.90911"
              transform="rotate(180 11.6367 23.2725)"
              fill="#010101"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 23.2725 23.2725)"
              fill="#010101"
            />
            <rect
              x="8.72754"
              y="23.2725"
              width="2.90911"
              height="2.90911"
              transform="rotate(180 8.72754 23.2725)"
              fill="#010101"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 26.1816 23.2725)"
              fill="#010101"
            />
            <rect
              x="5.81836"
              y="23.2725"
              width="2.90911"
              height="2.90911"
              transform="rotate(180 5.81836 23.2725)"
              fill="#010101"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 29.0908 23.2725)"
              fill="#010101"
            />
            <rect
              x="2.90918"
              y="23.2725"
              width="2.90911"
              height="2.90911"
              transform="rotate(180 2.90918 23.2725)"
              fill="#010101"
            />
            <rect
              x="2.90918"
              y="20.3633"
              width="2.90911"
              height="2.90911"
              transform="rotate(180 2.90918 20.3633)"
              fill="#010101"
            />
            <rect
              x="32"
              y="20.3633"
              width="2.90911"
              height="2.90911"
              transform="rotate(180 32 20.3633)"
              fill="#010101"
            />
            <rect
              x="2.90918"
              y="17.4551"
              width="2.90911"
              height="2.90911"
              transform="rotate(180 2.90918 17.4551)"
              fill="#010101"
            />
            <rect
              x="5.81836"
              y="14.5459"
              width="2.90911"
              height="2.90911"
              transform="rotate(180 5.81836 14.5459)"
              fill="#010101"
            />
            <rect
              x="8.72754"
              y="11.6367"
              width="2.90911"
              height="2.90911"
              transform="rotate(180 8.72754 11.6367)"
              fill="#010101"
            />
            <rect
              x="11.6367"
              y="8.72754"
              width="2.90911"
              height="2.90911"
              transform="rotate(180 11.6367 8.72754)"
              fill="#010101"
            />
            <rect
              x="14.5459"
              y="5.81836"
              width="2.90911"
              height="2.90911"
              transform="rotate(180 14.5459 5.81836)"
              fill="#010101"
            />
            <rect
              x="17.4541"
              y="2.90918"
              width="2.90911"
              height="2.90911"
              transform="rotate(180 17.4541 2.90918)"
              fill="#010101"
            />
            <rect
              x="32"
              y="17.4551"
              width="2.90911"
              height="2.90911"
              transform="rotate(180 32 17.4551)"
              fill="#010101"
            />
            <rect
              x="29.0908"
              y="14.5459"
              width="2.90911"
              height="2.90911"
              transform="rotate(180 29.0908 14.5459)"
              fill="#010101"
            />
            <rect
              x="26.1816"
              y="11.6367"
              width="2.90911"
              height="2.90911"
              transform="rotate(180 26.1816 11.6367)"
              fill="#010101"
            />
            <rect
              x="23.2725"
              y="8.72754"
              width="2.90911"
              height="2.90911"
              transform="rotate(180 23.2725 8.72754)"
              fill="#010101"
            />
            <rect
              x="20.3633"
              y="5.81836"
              width="2.90911"
              height="2.90911"
              transform="rotate(180 20.3633 5.81836)"
              fill="#010101"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 14.5459 8.72754)"
              fill="#26CEFD"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 11.6367 11.6367)"
              fill="#26CEFD"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 8.72754 14.5459)"
              fill="#26CEFD"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 5.81836 17.4551)"
              fill="#26CEFD"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 5.81836 20.3633)"
              fill="#26CEFD"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 8.72754 20.3633)"
              fill="#26CEFD"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 11.6367 20.3633)"
              fill="#26CEFD"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 14.5459 23.2725)"
              fill="#26CEFD"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 14.5459 14.5459)"
              fill="#26CEFD"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 14.5459 11.6367)"
              fill="#26CEFD"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 17.4541 14.5459)"
              fill="#26CEFD"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 11.6367 14.5459)"
              fill="#26CEFD"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 17.4541 11.6367)"
              fill="#26CEFD"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 20.3633 14.5459)"
              fill="#26CEFD"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 14.5459 26.1816)"
              fill="#26CEFD"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 14.5459 17.4551)"
              fill="#26CEFD"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 8.72754 17.4551)"
              fill="#26CEFD"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 17.4541 17.4551)"
              fill="#26CEFD"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 11.6367 17.4551)"
              fill="#26CEFD"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 20.3633 17.4551)"
              fill="#26CEFD"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 23.2725 17.4551)"
              fill="#26CEFD"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 14.5459 29.0908)"
              fill="#26CEFD"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 14.5459 20.3633)"
              fill="#26CEFD"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 17.4541 20.3633)"
              fill="#26CEFD"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 20.3633 20.3633)"
              fill="#26CEFD"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 23.2725 20.3633)"
              fill="#26CEFD"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 14.5459 32)"
              fill="#26CEFD"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 11.6367 32)"
              fill="#F5FDFF"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 11.6367 26.1816)"
              fill="#F5FDFF"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 11.6367 23.2725)"
              fill="#F5FDFF"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 2.90918 20.3633)"
              fill="#F5FDFF"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 2.90918 17.4551)"
              fill="#F5FDFF"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 5.81836 14.5459)"
              fill="#F5FDFF"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 8.72754 11.6367)"
              fill="#F5FDFF"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 11.6367 8.72754)"
              fill="#F5FDFF"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 14.5459 5.81836)"
              fill="#F5FDFF"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 11.6367 29.0908)"
              fill="#F5FDFF"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 17.4541 32)"
              fill="#029ECA"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 17.4541 29.0908)"
              fill="#029ECA"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 17.4541 26.1816)"
              fill="#029ECA"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 17.4541 23.2725)"
              fill="#029ECA"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 26.1816 20.3633)"
              fill="#029ECA"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 26.1816 17.4551)"
              fill="#029ECA"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 23.2725 14.5459)"
              fill="#029ECA"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 20.3633 11.6367)"
              fill="#029ECA"
            />
            <rect
              width="2.90911"
              height="2.90911"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 17.4541 8.72754)"
              fill="#029ECA"
            />
          </svg>
        </span>
      </div>
      {/* Icons bottom */}
      <div
        id="hudBottomBtn"
        className="relative hud-keyboard-icon-bg pointer-events-auto w-16 h-16 flex justify-center items-center group cursor-pointer duration-100"
      >
        <div
          className={`${isBottomActive && "opacity-100"} group-hover:opacity-100 hud-btn-bg opacity-0 absolute w-16 h-16`}
        ></div>
        <span
          className={`${isBottomActive && "scale-125 duration-100"} group-active:scale-125 z-10`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="35"
            viewBox="0 0 32 35"
            fill="none"
          >
            <rect x="8.72754" width="2.90909" height="2.90909" fill="#010101" />
            <rect x="11.6367" width="2.90909" height="2.90909" fill="#010101" />
            <rect x="14.5459" width="2.90909" height="2.90909" fill="#010101" />
            <rect x="17.4541" width="2.90909" height="2.90909" fill="#010101" />
            <rect x="20.3633" width="2.90909" height="2.90909" fill="#010101" />
            <rect
              x="20.3633"
              y="2.90918"
              width="2.90909"
              height="2.90909"
              fill="#010101"
            />
            <rect
              width="2.90909"
              height="2.90909"
              transform="matrix(-1 0 0 1 11.6367 2.90918)"
              fill="#010101"
            />
            <rect
              x="20.3633"
              y="5.81836"
              width="2.90909"
              height="2.90909"
              fill="#010101"
            />
            <rect
              width="2.90909"
              height="2.90909"
              transform="matrix(-1 0 0 1 11.6367 5.81836)"
              fill="#010101"
            />
            <rect
              x="20.3633"
              y="8.72754"
              width="2.90909"
              height="2.90909"
              fill="#010101"
            />
            <rect
              width="2.90909"
              height="2.90909"
              transform="matrix(-1 0 0 1 11.6367 8.72754)"
              fill="#010101"
            />
            <rect
              x="20.3633"
              y="11.6367"
              width="2.90909"
              height="2.90909"
              fill="#010101"
            />
            <rect
              width="2.90909"
              height="2.90909"
              transform="matrix(-1 0 0 1 11.6367 11.6367)"
              fill="#010101"
            />
            <rect
              x="23.2725"
              y="11.6367"
              width="2.90909"
              height="2.90909"
              fill="#010101"
            />
            <rect
              width="2.90909"
              height="2.90909"
              transform="matrix(-1 0 0 1 8.72754 11.6367)"
              fill="#010101"
            />
            <rect
              x="26.1816"
              y="11.6367"
              width="2.90909"
              height="2.90909"
              fill="#010101"
            />
            <rect
              width="2.90909"
              height="2.90909"
              transform="matrix(-1 0 0 1 5.81836 11.6367)"
              fill="#010101"
            />
            <rect
              x="29.0908"
              y="11.6367"
              width="2.90909"
              height="2.90909"
              fill="#010101"
            />
            <rect
              width="2.90909"
              height="2.90909"
              transform="matrix(-1 0 0 1 2.90918 11.6367)"
              fill="#010101"
            />
            <rect
              width="2.90909"
              height="2.90909"
              transform="matrix(-1 0 0 1 2.90918 14.5459)"
              fill="#010101"
            />
            <rect
              width="2.90909"
              height="2.90909"
              transform="matrix(-1 0 0 1 32 14.5459)"
              fill="#010101"
            />
            <rect
              width="2.90909"
              height="2.90909"
              transform="matrix(-1 0 0 1 2.90918 17.4541)"
              fill="#010101"
            />
            <rect
              width="2.90909"
              height="2.90909"
              transform="matrix(-1 0 0 1 5.81836 20.3633)"
              fill="#010101"
            />
            <rect
              width="2.90909"
              height="2.90909"
              transform="matrix(-1 0 0 1 8.72754 23.2725)"
              fill="#010101"
            />
            <rect
              width="2.90909"
              height="2.90909"
              transform="matrix(-1 0 0 1 11.6367 26.1816)"
              fill="#010101"
            />
            <rect
              width="2.90909"
              height="2.90909"
              transform="matrix(-1 0 0 1 14.5459 29.0908)"
              fill="#010101"
            />
            <rect
              width="2.90909"
              height="2.90909"
              transform="matrix(-1 0 0 1 17.4541 32)"
              fill="#010101"
            />
            <rect
              width="2.90909"
              height="2.90909"
              transform="matrix(-1 0 0 1 32 17.4541)"
              fill="#010101"
            />
            <rect
              width="2.90909"
              height="2.90909"
              transform="matrix(-1 0 0 1 29.0908 20.3633)"
              fill="#010101"
            />
            <rect
              width="2.90909"
              height="2.90909"
              transform="matrix(-1 0 0 1 26.1816 23.2725)"
              fill="#010101"
            />
            <rect
              width="2.90909"
              height="2.90909"
              transform="matrix(-1 0 0 1 23.2725 26.1816)"
              fill="#010101"
            />
            <rect
              width="2.90909"
              height="2.90909"
              transform="matrix(-1 0 0 1 20.3633 29.0908)"
              fill="#010101"
            />
            <rect
              x="14.5459"
              y="26.1816"
              width="2.90909"
              height="2.90909"
              fill="#26CEFD"
            />
            <rect
              x="11.6367"
              y="23.2725"
              width="2.90909"
              height="2.90909"
              fill="#26CEFD"
            />
            <rect
              x="8.72754"
              y="20.3633"
              width="2.90909"
              height="2.90909"
              fill="#26CEFD"
            />
            <rect
              x="5.81836"
              y="17.4541"
              width="2.90909"
              height="2.90909"
              fill="#26CEFD"
            />
            <rect
              x="5.81836"
              y="14.5459"
              width="2.90909"
              height="2.90909"
              fill="#26CEFD"
            />
            <rect
              x="8.72754"
              y="14.5459"
              width="2.90909"
              height="2.90909"
              fill="#26CEFD"
            />
            <rect
              x="11.6367"
              y="14.5459"
              width="2.90909"
              height="2.90909"
              fill="#26CEFD"
            />
            <rect
              x="14.5459"
              y="11.6367"
              width="2.90909"
              height="2.90909"
              fill="#26CEFD"
            />
            <rect
              x="14.5459"
              y="20.3633"
              width="2.90909"
              height="2.90909"
              fill="#26CEFD"
            />
            <rect
              x="14.5459"
              y="23.2725"
              width="2.90909"
              height="2.90909"
              fill="#26CEFD"
            />
            <rect
              x="17.4541"
              y="20.3633"
              width="2.90909"
              height="2.90909"
              fill="#26CEFD"
            />
            <rect
              x="11.6367"
              y="20.3633"
              width="2.90909"
              height="2.90909"
              fill="#26CEFD"
            />
            <rect
              x="17.4541"
              y="23.2725"
              width="2.90909"
              height="2.90909"
              fill="#26CEFD"
            />
            <rect
              x="20.3633"
              y="20.3633"
              width="2.90909"
              height="2.90909"
              fill="#26CEFD"
            />
            <rect
              x="14.5459"
              y="8.72754"
              width="2.90909"
              height="2.90909"
              fill="#26CEFD"
            />
            <rect
              x="14.5459"
              y="17.4541"
              width="2.90909"
              height="2.90909"
              fill="#26CEFD"
            />
            <rect
              x="8.72754"
              y="17.4541"
              width="2.90909"
              height="2.90909"
              fill="#26CEFD"
            />
            <rect
              x="17.4541"
              y="17.4541"
              width="2.90909"
              height="2.90909"
              fill="#26CEFD"
            />
            <rect
              x="11.6367"
              y="17.4541"
              width="2.90909"
              height="2.90909"
              fill="#26CEFD"
            />
            <rect
              x="20.3633"
              y="17.4541"
              width="2.90909"
              height="2.90909"
              fill="#26CEFD"
            />
            <rect
              x="23.2725"
              y="17.4541"
              width="2.90909"
              height="2.90909"
              fill="#26CEFD"
            />
            <rect
              x="14.5459"
              y="5.81836"
              width="2.90909"
              height="2.90909"
              fill="#26CEFD"
            />
            <rect
              x="14.5459"
              y="14.5459"
              width="2.90909"
              height="2.90909"
              fill="#26CEFD"
            />
            <rect
              x="17.4541"
              y="14.5459"
              width="2.90909"
              height="2.90909"
              fill="#26CEFD"
            />
            <rect
              x="20.3633"
              y="14.5459"
              width="2.90909"
              height="2.90909"
              fill="#26CEFD"
            />
            <rect
              x="23.2725"
              y="14.5459"
              width="2.90909"
              height="2.90909"
              fill="#26CEFD"
            />
            <rect
              x="14.5459"
              y="2.90918"
              width="2.90909"
              height="2.90909"
              fill="#26CEFD"
            />
            <rect
              x="11.6367"
              y="2.90918"
              width="2.90909"
              height="2.90909"
              fill="#F5FDFF"
            />
            <rect
              x="11.6367"
              y="8.72754"
              width="2.90909"
              height="2.90909"
              fill="#F5FDFF"
            />
            <rect
              x="11.6367"
              y="11.6367"
              width="2.90909"
              height="2.90909"
              fill="#F5FDFF"
            />
            <rect
              x="2.90918"
              y="14.5459"
              width="2.90909"
              height="2.90909"
              fill="#F5FDFF"
            />
            <rect
              x="2.90918"
              y="17.4541"
              width="2.90909"
              height="2.90909"
              fill="#F5FDFF"
            />
            <rect
              x="5.81836"
              y="20.3633"
              width="2.90909"
              height="2.90909"
              fill="#F5FDFF"
            />
            <rect
              x="8.72754"
              y="23.2725"
              width="2.90909"
              height="2.90909"
              fill="#F5FDFF"
            />
            <rect
              x="11.6367"
              y="26.1816"
              width="2.90909"
              height="2.90909"
              fill="#F5FDFF"
            />
            <rect
              x="14.5459"
              y="29.0908"
              width="2.90909"
              height="2.90909"
              fill="#F5FDFF"
            />
            <rect
              x="11.6367"
              y="5.81836"
              width="2.90909"
              height="2.90909"
              fill="#F5FDFF"
            />
            <rect
              x="17.4541"
              y="2.90918"
              width="2.90909"
              height="2.90909"
              fill="#029ECA"
            />
            <rect
              x="17.4541"
              y="5.81836"
              width="2.90909"
              height="2.90909"
              fill="#029ECA"
            />
            <rect
              x="17.4541"
              y="8.72754"
              width="2.90909"
              height="2.90909"
              fill="#029ECA"
            />
            <rect
              x="17.4541"
              y="11.6367"
              width="2.90909"
              height="2.90909"
              fill="#029ECA"
            />
            <rect
              x="26.1816"
              y="14.5459"
              width="2.90909"
              height="2.90909"
              fill="#029ECA"
            />
            <rect
              x="26.1816"
              y="17.4541"
              width="2.90909"
              height="2.90909"
              fill="#029ECA"
            />
            <rect
              x="23.2725"
              y="20.3633"
              width="2.90909"
              height="2.90909"
              fill="#029ECA"
            />
            <rect
              x="20.3633"
              y="23.2725"
              width="2.90909"
              height="2.90909"
              fill="#029ECA"
            />
            <rect
              x="17.4541"
              y="26.1816"
              width="2.90909"
              height="2.90909"
              fill="#029ECA"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}
