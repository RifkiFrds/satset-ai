import React from "react";
import clsx from "clsx";

const StripesBackground = ({
  className,
  position = "full",
  width = "w-full",
  height = "h-full",
  opacity = "opacity-30",
}) => {
  const positionStyles = {
    right: "absolute top-0 right-0",
    left: "absolute top-0 left-0",
    top: "absolute top-0 left-0 w-full h-32",
    bottom: "absolute bottom-0 left-0 w-full h-32",
    full: "absolute inset-0",
  };

  return (
    <div
      className={clsx(
        "pointer-events-none z-10",
        "bg-[repeating-linear-gradient(45deg,var(--stripe-color)_0px,var(--stripe-color)_1px,transparent_1px,transparent_6px)]",
        positionStyles[position],
        width,
        height,
        opacity,
        className
      )}
    />
  );
};

export default StripesBackground;
