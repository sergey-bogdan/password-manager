import { Password } from '../../api/passwords';
import Text from '../ui/Text';
import { Link } from 'react-router-dom';

import styles from './PasswordList.module.scss';

interface Props {
  passwords: Password[],
}

export default function PasswordList({
  passwords
}: Props) {

  return (
    <div>
      {passwords.length ? passwords.map(password => (
        <Link key={password.id} to={`/dashboard/passwords/${password.id}`}>
          <div className={styles.Item}>
            <div className={styles.dl}>
              <span className={styles.dt}>Resource</span>
              <span className={styles.dd}>{password.website}</span>
            </div>
            <div className={styles.dl}>
              <span className={styles.dt}>Username</span>
              <span className={styles.dd}>{password.username}</span>
            </div>
          </div>
        </Link>
      )) : (
        <div style={{
          textAlign: 'center',
          marginTop: 32
        }}>No results found</div>
      )}
    </div>
  )
}