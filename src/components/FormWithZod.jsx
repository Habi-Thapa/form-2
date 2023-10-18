import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
let render = 0;

const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(10, "password must be at least 10 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password must match",
    path: ["confirmPassword"],
  });

const FormWithZod = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

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
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500">{`${errors.email.message}`}</p>
        )}
        <input
          type="password"
          id="password"
          placeholder="Password"
          className=" border px-4 py-2 rounded"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500">{`${errors.password.message}`}</p>
        )}
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          className="border px-4 py-2 rounded"
          {...register("confirmPassword")}
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

export default FormWithZod;
