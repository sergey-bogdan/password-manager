import Input from "../ui/InputField";
import Button from "../ui/Button";
import { PasswordPayload } from "../../api/passwords";
import { useForm } from "react-hook-form";

type Props = {
  onSubmit: (password: PasswordPayload) => void;
  isLoading?: boolean;
  initialUsername?: string;
  initialPassword?: string;
  initialWebsite?: string;
  submitText?: string;
}

type FormValues = {
  username: string,
  password: string,
  website: string,
}

export default function PasswordForm({
  onSubmit,
  isLoading,
  initialUsername = '',
  initialPassword = '',
  initialWebsite = '',
  submitText = 'Submit',
}: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      username: initialUsername,
      password: initialPassword,
      website: initialWebsite,
    }
  });

  const onSubmitHandler = handleSubmit(onSubmit);

  return (
    <form onSubmit={onSubmitHandler}>
      <Input<FormValues>
        id={'username'}
        label="username"
        placeholder="Username"
        name="username"
        autoComplete="off"
        register={register}
        rules={{ required: 'Username is required' }}
        errors={errors}
      />
      <Input<FormValues>
        id={'password'}
        label="Password"
        placeholder="Password"
        type="password"
        name="password"
        autoComplete="off"
        register={register}
        rules={{ required: 'Password is required' }}
        errors={errors}
      />
      <Input<FormValues>
        id={'website'}
        label="Resource"
        placeholder="Resource"
        name="website"
        autoComplete="off"
        register={register}
        rules={{ required: 'Resource is required' }}
        errors={errors}
      />
      <Button
        type="submit"
        color="primary"
        isLoading={isLoading}
      >
        {submitText}
      </Button>
    </form>
  )
}