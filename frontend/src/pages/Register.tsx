import { Link } from "react-router-dom";

import logo from "@/assets/logo.png";
import Wrapper from "@/components/Wrapper";
import RegisterForm from "@/components/form/RegisterForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Register = () => {
  return (
    <Wrapper
      title="Register"
      className="h-screen flex justify-center items-center"
    >
      <Card className="w-[450px]">
        <CardHeader>
          <div className="flex justify-center items-center gap-2 mb-2">
            <img src={logo} className="w-[50px] h-[50px] mb-2" />
            <h1 className="font-semibold text-3xl">Tasky</h1>
          </div>
          <CardTitle>Register</CardTitle>
          <CardDescription>Fill out the form to register.</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/login" className="text-xs cursor-default">
            Already have an account?{" "}
            <span className=" text-primary cursor-pointer hover:underline">
              Login
            </span>
          </Link>
        </CardFooter>
      </Card>
    </Wrapper>
  );
};

export default Register;
