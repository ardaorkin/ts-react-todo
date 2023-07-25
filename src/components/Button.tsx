import * as React from "react";

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export function Button({ text, ...rest }: IButtonProps) {
  return (
    <button
      {...rest}
      className='bg-general text-white rounded w-full p-1 hover:bg-generalDarker active:bg-["#06112a"] focus:outline-none focus:ring focus:generalLighter'
    >
      {text}
    </button>
  );
}
