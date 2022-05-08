import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputField";
import Text from "../../components/ui/Text";
import { toast } from 'react-toastify';

type FormValues = {
  username: string;
  password: string;
}

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const onSubmit = handleSubmit(({ username, password }) => {
    login({ username, password })
      .catch(() => {
        toast('Username or password is invalid', {
          type: 'error'
        });
      })
  })

  if (isAuthenticated) {
    return <Navigate to="/" />
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Text size="x-large">Login</Text>
      </div>
      <form action="" onSubmit={onSubmit}>
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
        <Button type="submit">Login</Button>
      </form>
      <div style={{
        marginTop: 32,
        textAlign: 'center'
      }}>
        <Text>
          Don't have an account? <Link style={{ textDecoration: 'underline' }} to="/register">Register</Link>
        </Text>
      </div>
    </div>
  )
}