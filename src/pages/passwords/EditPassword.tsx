import { useCallback, useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getPasswordById, PasswordPayload, updatePassword } from "../../api/passwords";
import PasswordForm from "../../components/passwords/PasswordForm";
import Spinner from "../../components/ui/Spinner";
import Text from "../../components/ui/Text";
import useResource from "../../hooks/useResources";

export default function EditPassword() {
  const navigate = useNavigate();
  const { passwordId } = useParams<{ passwordId: string }>();
  const id = useMemo(() => {
    const passwordIdNumber = Number(passwordId);
    if (!passwordIdNumber) {
      return undefined;
    }

    return passwordIdNumber;
  }, [passwordId]);

  const fetcher = useCallback(() => {
    return getPasswordById(id!);
  }, [id]);

  const { data: password, error, isLoading } = useResource(fetcher);

  const onUpdate = (updated: PasswordPayload) => {
    updatePassword(password!.id, {
      username: updated.username,
      password: updated.password,
      website: updated.website
    }).then(({ id }) => {
      navigate(`/dashboard/passwords/${id}`)
    });
  }

  if (isLoading) {
    return <Spinner size={32} color="black" />
  }

  if (error) {
    return <Navigate to="/404" />
  }

  return (
    <>
      {password && (
        <div>
          <div style={{ marginBottom: 24 }}>
            <Text size="x-large">Edit your password</Text>
          </div>
          <PasswordForm
            onSubmit={onUpdate}
            submitText="Update"
            initialUsername={password.username}
            initialPassword={password.password}
            initialWebsite={password.website}
          />
        </div>
      )}
    </>
  )

}