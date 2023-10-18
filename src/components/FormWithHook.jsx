import { DevTool } from "@hookform/devtools";
import { useState } from "react";
import { useForm } from "react-hook-form";

let render = 0;

const FormWithHook = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
  };
  render++;
  return (
    <>
      <h1>{render / 2}</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-4 items-center justify-center"
        noValidate
      >
        <input
          type="email"
          id="email"
          placeholder="email"
          className="border px-4 py-2 rounded"
          {...register("email", {
            required: {
              value: true,
              message: "Enter email",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500">{`${errors.email.message}`}</p>
        )}
        <input
          type="password"
          id="password"
          placeholder="Password"
          className=" border px-4 py-2 rounded"
          {...register("password", {
            required: {
              value: true,
              message: "Enter password",
            },
            minLength: {
              value: 10,
              message: "Password must be atleast 10 character long",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500">{`${errors.password.message}`}</p>
        )}
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          className="border px-4 py-2 rounded"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Enter passowrd as above",
            },
            validate: (value) =>
              value === getValues("password") || "Password must match",
          })}
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
        )}
        <button
          disabled={isSubmitting}
          className="disabled:bg-gray-500 bg-blue-500 text-white px-4 py-2 rounded"
          type="submit"
        >
          Submit
        </button>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default FormWithHook;
