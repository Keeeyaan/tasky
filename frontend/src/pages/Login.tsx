import { Link } from "react-router-dom";

import LoginForm from "@/components/form/LoginForm";
import logo from "@/assets/logo.png";
import Wrapper from "@/components/Wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Login = () => {
  return (
    <Wrapper
      title="Login"
      className="h-screen flex justify-center items-center"
    >
      <Card className="w-[400px]">
        <CardHeader>
          <div className="flex justify-center items-center gap-2 mb-2">
            <img src={logo} className="w-[50px] h-[50px] mb-2" />
            <h1 className="font-semibold text-3xl">Tasky</h1>
          </div>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your email and password to login.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/register" className="text-xs cursor-default">
            Don't have an account yet?{" "}
            <span className=" text-primary hover:underline cursor-pointer">
              Register
            </span>
          </Link>
        </CardFooter>
      </Card>
    </Wrapper>
  );
};

export default Login;
