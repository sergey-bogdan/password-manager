import Text from "./Text";

import styles from './Header.module.scss';
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import Button from "./Button";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <div className={styles.Header}>
      <Link to={'/'}>
        <Text size="small">Password Manager</Text>
      </Link>
      {user && (
        <div style={{ marginLeft: 'auto' }}>
          <Button onClick={logout} color="secondary">Log out</Button>
        </div>
      )}
    </div>
  )
}