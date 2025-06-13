import axios from "axios";
import { useState } from "react";
import { BottomWarning } from "../Components/BottomWarning";
import { Button } from "../Components/Button ";
import { Heading } from "../Components/Heading ";
import { InputBox } from "../Components/InputBox ";
import { SubHeading } from "../Components/SubHeading";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");
  const URL_STRING = import.meta.env.VITE_API_URL;

  const nagivate = useNavigate();

  return (
    <div className="bg-slate-100 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-3 h-max px-4 border border-gray-600">
          <Heading label={"Sign Up"} />
          <SubHeading
            subLabel={"Enter your information to create an account"}
          />
          <InputBox
            placeholder={"John"}
            label={"First Name"}
            onChange={(e) => {
              setfirstName(e.target.value);
            }}
          />
          <InputBox
            placeholder={"Doe"}
            label={"Last Name"}
            onChange={(e) => {
              setlastName(e.target.value);
            }}
          />
          <InputBox
            placeholder={"johndoe@gmail.com"}
            label={"Email"}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <InputBox
            placeholder={"Enter the Username"}
            label={"Username"}
            onChange={(e) => {
              setusername(e.target.value);
            }}
          />
          <InputBox
            placeholder={"*******"}
            label={"Password"}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <div className="pt-4">
            <Button
              label={"Sign Up"}
              onClick={async () => {
                try {
                  const res = await axios.post(
                    `${URL_STRING}api/v1/user/signup`,
                    {
                      first_name: firstName,
                      last_name: lastName,
                      email,
                      password,
                      username,
                    }
                  );
                  toast.success(res.data.message);
                  nagivate("/signin");
                } catch (error) {
                  toast.error(error);
                }
              }}
            />
            <BottomWarning
              label={"Already have an account?"}
              buttonText={"Sign In"}
              to={"/signin"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
