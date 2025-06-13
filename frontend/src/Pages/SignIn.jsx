import { BottomWarning } from "../Components/BottomWarning";
import { Button } from "../Components/Button ";
import { Heading } from "../Components/Heading ";
import { InputBox } from "../Components/InputBox ";
import { SubHeading } from "../Components/SubHeading";

export const SignIn = () => {
  return (
    <div className="bg-slate-100 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-3 h-max px-4 border border-gray-500 border-solid">
          <Heading label={"Sign In"} />
          <SubHeading subLabel={"Enter your information to sign in"} />
          <InputBox placeholder={"johndoe@gmail.com"} label={"Email"} />
          <InputBox placeholder={"*******"} label={"Password"} />
          <div className="pt-4">
            <Button label={"Sign In"} />
            <BottomWarning
              label={"Don't have an account?"}
              buttonText={"Sign up"}
              to={"/signup"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
