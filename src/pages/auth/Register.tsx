import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register as registerApi } from "../../api/auth";
import { useAuth } from "../../auth/useAuth";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputField";
import Text from "../../components/ui/Text";

type FormValues = {
  username: string;
  password: string;
}

export default function Register() {
  const { login, isAuthenticated } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const onSubmitHandler = handleSubmit(({ username, password }) => {
    registerApi({
      username,
      password
    }).then(user => {
      return login(user);
    }).catch(e => {
      console.error(e);
      toast('This username is already taken', {
        type: 'error'
      });
    })
  });

  if (isAuthenticated) {
    return <Navigate to="/" />
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Text size="x-large">Create new account</Text>
      </div>
      <form action="" onSubmit={onSubmitHandler}>
        <InputField<FormValues>
          id="username"
          name="username"
          placeholder="Username"
          label="Username"
          register={register}
          rules={{ required: 'Username is required' }}
          errors={errors}
        />
        <InputField<FormValues>
          id="password"
          name="password"
          placeholder="Password"
          type="password"
          label="Password"
          register={register}
          rules={{ required: 'Password is required' }}
          errors={errors}
        />
        <Button type="submit">Register</Button>
      </form>
      <div style={{
        marginTop: 32,
        textAlign: 'center'
      }}>
        <Text>
          Already have an account? <Link style={{ textDecoration: 'underline' }} to="/login">Login</Link>
        </Text>
      </div>
    </div>
  )
}