import React from "react";

/**
 * Komponen Tombol Kustom (Primary & Secondary)
 * * Props:
 * - variant: 'primary' | 'secondary'
 * - size: 'sm' | 'md' | 'lg'
 * - rounded: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full' // <-- BARU
 * - className: ...
 * - ...props: ...
 */
export default function Button({
  variant = "primary",
  size = "md",
  rounded = "full",
  className = "",
  children,
  ...props
}) {
  // --- Base Style ---
  const baseStyle = `
    font-semibold tracking-wide shadow-lg 
    transition-all duration-300 ease-in-out 
    transform hover:scale-105 hover:shadow-xl 
    focus:outline-none focus:ring-4 focus:ring-opacity-50
  `;

  // --- Size Variants ---
  const sizeStyle = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };

  // --- Rounded Variants ---
  const roundedStyle = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };

  // --- Variant Styles
  const variantStyle = {
    primary: `
      bg-[#647DEB] text-gray-100 
      border-2 border-[#647DEB] 
      focus:ring-[#647DEB]/50
    `,
    secondary: `
      bg-white text-gray-700 
      border-2 border-[#647DEB]/50 
      hover:bg-[#647DEB]/5 hover:border-[#647DEB]
      focus:ring-[#647DEB]/50
    `,
  };

  const classes = `
    ${baseStyle}
    ${sizeStyle[size]}
    ${roundedStyle[rounded]} 
    ${variantStyle[variant]}
    ${className}
  `;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
