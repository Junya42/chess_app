import { useForm } from "react-hook-form";
import { FormControl, Input, Button } from "@chakra-ui/react";
import { ApiSignup } from "../../Api/userAPI";

export default function SignupForm() {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(ApiSignup)}>
      <FormControl>
        <Input
          mt={4}
          id="email"
          type="email"
          isInvalid={errors.email ? true : false}
          focusBorderColor={
            errors.email ? "crimson" : "rgba(66, 153, 225, 0.6)"
          }
          errorBorderColor="crimson"
          placeholder={
            errors.email ? `${errors.email.message}` : "E-mail Address"
          }
          {...register("email", {
            required: "E-mail Address required",
          })}
        />
        <Input
          mt={4}
          id="username"
          isInvalid={errors.username ? true : false}
          focusBorderColor={
            errors.username ? "crimson" : "rgba(66, 153, 225, 0.6)"
          }
          errorBorderColor="crimson"
          placeholder={
            errors.username ? `${errors.username.message}` : "Username"
          }
          {...register("username", {
            required: "Username required",
            minLength: { value: 3, message: "Minimum length should be 3" },
            maxLength: { value: 11, message: "Maximum length is 11" },
          })}
        />
        <Input
          mt={4}
          id="password"
          type="password"
          isInvalid={errors.password ? true : false}
          focusBorderColor={
            errors.password ? "crimson" : "rgba(66, 153, 225, 0.6)"
          }
          errorBorderColor="crimson"
          placeholder={
            errors.password ? `${errors.password.message}` : "********"
          }
          {...register("password", {
            required: "Password required",
            minLength: { value: 4, message: "Minimum length should be 4" },
          })}
        />
      </FormControl>
      <div className="flex w-96 mt-8 justify-center">
        <Button
          width="60%"
          colorScheme="purple"
          isLoading={isSubmitting}
          type="submit"
          onClick={() => {
            const inputs = [
              {
                type: "manual",
                name: "email",
                message: "email error",
              },
              {
                type: "manual",
                name: "username",
                message: "Username error",
              },
              {
                type: "manual",
                name: "password",
                message: "password error",
              },
            ];

            inputs.forEach(({ name, type, message }) => {
              setError(name, { type, message });
            });
          }}
        >
          SIGN UP
        </Button>
      </div>
    </form>
  );
}
