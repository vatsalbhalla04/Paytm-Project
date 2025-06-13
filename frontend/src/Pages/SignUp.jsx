import { BottomWarning } from "../Components/BottomWarning"
import { Button } from "../Components/Button "
import { Heading } from "../Components/Heading "
import { InputBox } from "../Components/InputBox "
import { SubHeading } from "../Components/SubHeading"

export const SignUp = () => {
  return (
    <div className="bg-slate-100 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-80 text-center p-3 h-max px-4 border border-gray-600">
            <Heading label={"Sign Up"}/>
            <SubHeading subLabel={"Enter your information to create an account"}/>
            <InputBox placeholder={"John"} label={"First Name"}/>
            <InputBox placeholder={"Doe"} label={"Last Name"}/>
            <InputBox placeholder={"johndoe@gmail.com"} label={"Email"}/>
            <InputBox placeholder={"*******"} label={"Password"}/>
            <div className="pt-4">
              <Button label={"Sign Up"}/>
              <BottomWarning label={"Already have an account?"} buttonText={"Sign In"} to={"/signin"}/>
            </div>
          </div>
        </div>
    </div>
  )
}
