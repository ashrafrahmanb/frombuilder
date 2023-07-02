import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
import CountDown from "../components/CountDown";

export default function Verification() {
  const { setCurrentUser, setUserToken } = useStateContext();
  const [otp_code, setOtpCode] = useState("");
  const [error, setError] = useState({ __html: "" });
  const startTime = new Date();
  startTime.setMinutes(startTime.getMinutes() + 3);
  const queryParameters = new URLSearchParams(window.location.search);
  const email = queryParameters.get("email");

  const onSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: "" });

    axiosClient
      .post("/otp_verified", {
        email,
        otp_code,
      })
      .then(({ data }) => {
        setCurrentUser(data.user);
        setUserToken(data.token);
      })
      .catch((error) => {
        if (error.response) {
          const finalErrors = Object.values(error.response.data.errors).reduce(
            (accum, next) => [...accum, ...next],
            []
          );
          setError({ __html: finalErrors.join("<br>") });
        }
        console.error(error);
      });
  };

  return (
    <>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Account Activation
      </h2>
      {error.__html && (
        <div
          className="bg-red-500 rounded py-2 px-3 text-white"
          dangerouslySetInnerHTML={error}
        ></div>
      )}

      <form
        onSubmit={onSubmit}
        className="mt-8 space-y-6"
        action="#"
        method="POST"
      >
        <input type="hidden" name="email" defaultValue="true" />
        <div className="-space-y-px rounded-md shadow-sm">
          <CountDown startTime={startTime} />
        </div>
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label htmlFor="otp_code" className="sr-only">
              OTP Code
            </label>
            <input
              id="otp_code"
              name="otp_code"
              type="text"
              required
              value={otp_code}
              onChange={(ev) => setOtpCode(ev.target.value)}
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter OTP Code"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            Verify
          </button>
        </div>
      </form>
    </>
  );
}
