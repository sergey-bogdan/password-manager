import { useCallback, useMemo } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { deletePassword, getPasswordById } from "../../api/passwords";
import PasswordInfo from "../../components/passwords/PasswordInfo";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import useResource from "../../hooks/useResources";

export default function ViewPassword() {
  const navigate = useNavigate();
  const { passwordId } = useParams<{ passwordId: string }>();
  const id = useMemo(() => {
    const passwordIdNumber = Number(passwordId);
    if (!passwordIdNumber) {
      return null;
    }

    return passwordIdNumber;
  }, [passwordId]);

  const onDelete = () => {
    deletePassword(id!).then(() => {
      toast('Password has been deleted', {
        type: 'warning',
      });
      navigate('/dashboard/passwords');
    });
  }

  const fetcher = useCallback(() => {
    return getPasswordById(id!)
  }, [id]);

  const { data: password, error, isLoading } = useResource(fetcher);

  if (isLoading) {
    return <Spinner size={32} color="black" />
  }

  if (error) {
    return <Navigate to="/404" />
  }

  return (
    <div>
      {password && (
        <div>
          <div style={{ textAlign: 'right' }}>
            <Link to={`/dashboard/passwords/edit/${password.id}`}>
              <Button style={{
                marginRight: 4
              }} size="small" color="secondary">Edit</Button>
            </Link>
            <Button size="small" color="secondary" onClick={onDelete}>Delete</Button>
          </div>
          <PasswordInfo
            id={password.id}
            username={password.username}
            password={password.password}
            website={password.website}
            createdAt={password.createdAt}
            updatedAt={password.updatedAt}
          />
        </div>
      )}
    </div>
  )
}