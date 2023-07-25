import * as React from "react";
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className='border-b-2 w-full focus:border-general focus:ring-0 focus:outline-none'
    />
  );
}
