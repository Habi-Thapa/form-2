import { useState } from "react";

let render = 0;

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [errors, setErrors] = useState([""]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmiting(true);
    //TODO: Subimit to server
    if (password !== confirmPassword) {
      setErrors(["password and confirom don't match"]);
      setIsSubmiting(false);
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmiting(false);
  };
  render++;
  return (
    <>
      <h1>{render / 2}</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 mt-4 items-center justify-center"
      >
        {errors.length > 0 && (
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          id="email"
          required
          placeholder="email"
          className="border px-4 py-2 rounded"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          required
          minLength={10}
          id="password"
          placeholder="Password"
          className=" border px-4 py-2 rounded"
        />
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
          className="border px-4 py-2 rounded"
        />
        <button
          disabled={isSubmiting}
          className="disabled:bg-gray-500 bg-blue-500 text-white px-4 py-2 rounded"
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Form;
