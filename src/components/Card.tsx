import { CSSProperties, ReactNode } from "react";
import icon from "../assets/group.png";

export interface ICardProps {
  title?: string;
  desc?: string;
  children?: ReactNode;
  customeStyle?: CSSProperties;
}

export function Card({ title, desc, children, customeStyle }: ICardProps) {
  return (
    <div
      className="flex flex-col justify-start items-start rounded-lg shadow-lg p-8 space-y-8"
      style={{ width: 390, ...customeStyle }}
    >
      <img src={icon} key="icon" />
      <div className="text-start">
        <h1 key="heading" className="text-xl font-bold">
          {title}
        </h1>
        {desc && (
          <p key="desc" className="text-slate-400">
            {desc}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
