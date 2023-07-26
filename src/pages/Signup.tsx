import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { IRequestData } from "../types";
import { Card } from "../components/Card";
const fields = [
  { name: "name", placeholder: "Name" },
  { name: "last_name", placeholder: "Last Name" },
  { name: "username", placeholder: "User name", type: "username" },
  { name: "email", placeholder: "Email", type: "email" },
  { name: "password", placeholder: "Password", type: "password" },
];

interface ISignupProps {
  onSignup: (data: IRequestData) => void;
}

export function Signup({ onSignup }: ISignupProps) {
  const [requestData, setRequestData] = useState<IRequestData>({});

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    setRequestData({ ...requestData, [name]: value });
  };

  return (
    <Card
      title="Welcome!"
      desc="Sign up to start using Simpledo today."
      customeStyle={{ height: 600 }}
    >
      {fields.map((fieldProps) => (
        <Input key={fieldProps.name} {...fieldProps} onChange={handleChange} />
      ))}
      <Link className="underline text-sm" key="login-link" to="/login">
        Do have an account? Sign in.
      </Link>
      <Button
        key="button"
        text="Sign Up"
        onClick={() => onSignup(requestData)}
      />
    </Card>
  );
}
