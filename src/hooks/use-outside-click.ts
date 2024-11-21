
import React, { useEffect } from "react";

export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>, // Typing the ref to be an HTMLDivElement
  callback: (event: MouseEvent | TouchEvent) => void // Ensuring callback receives either MouseEvent or TouchEvent
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => { // Narrowing the event types
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      callback(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]); 
};
