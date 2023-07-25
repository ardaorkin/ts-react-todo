import { ChangeEvent, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { IRequestData } from "../types";
import { Card } from "../components/Card";

const fields = [
  { name: "email", placeholder: "Email", type: "email" },
  { name: "password", placeholder: "Password", type: "password" },
];

interface ILoginProps {
  onLogin: (data: IRequestData) => void;
}

export function Login({ onLogin }: ILoginProps) {
  const [requestData, setRequestData] = useState<IRequestData>({});

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    setRequestData({ ...requestData, [name]: value });
  };

  return (
    <Card
      title="Welcome back!"
      desc="Login to continue"
      customeStyle={{ height: 471 }}
    >
      {fields.map((fieldProps) => (
        <Input key={fieldProps.name} {...fieldProps} onChange={handleChange} />
      ))}
      <a className="underline text-sm" key="link" href="/signup">
        Don't have an account? Sign up.
      </a>
      <Button key="button" text="Login" onClick={() => onLogin(requestData)} />
    </Card>
  );
}
