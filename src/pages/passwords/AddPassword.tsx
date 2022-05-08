import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPassword, PasswordPayload } from "../../api/passwords"
import PasswordForm from "../../components/passwords/PasswordForm"
import Text from "../../components/ui/Text";

export default function AddPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onNewPasswordHandler = (password: PasswordPayload) => {
    setIsLoading(true);

    addPassword(password).then(({ id }) => {
      navigate(`/dashboard/passwords/${id}`)
    });
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Text size="x-large">Add new password</Text>
      </div>
      <PasswordForm
        onSubmit={onNewPasswordHandler}
        isLoading={isLoading}
        submitText="Add new password"
      />
    </div>

  )
}