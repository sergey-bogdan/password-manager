import { useState } from "react";
import { toast } from "react-toastify";
import { Password } from "../../api/passwords";
import copy from "../../util/copyToClipboard";
import Text from "../ui/Text";

export default function PasswordViewer({
  id,
  username,
  password,
  website,
  createdAt,
  updatedAt
}: Omit<Password, 'userId'>) {
  const [showPassword, setShowPassword] = useState(false);
  const hasBeenUpdated = createdAt.getTime() !== updatedAt.getTime();

  const onCopyClick = () => {
    copy(password)
      .then(() => {
        toast('Copied to clipboard', {
          type: 'success'
        })
      })
      .catch((e) => {
        toast('Could not copy to clipboard', {
          type: 'error'
        })
        console.error(e);
      })
  }

  return (
    <div>
      <div style={{
        marginBottom: 24,
        textTransform: 'uppercase',
      }}>
        <Text size="x-large">{website}</Text>
        <div>
          <Text size="button">{hasBeenUpdated ? (
            updatedAt.toLocaleString()
          ) : createdAt.toLocaleString()}</Text>
        </div>
      </div>
      <div>
        <div style={{
          marginBottom: 16,
        }}>
          <div><Text>Username</Text></div>
          <div>
            <Text size="medium">{username}</Text>
          </div>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <div>
            <Text>Password</Text>
            <div>
              <Text size="medium">{showPassword ? password : '**************'}</Text>
            </div>
          </div>

          <div>
            <button onClick={() => setShowPassword(!showPassword)}>
              <svg
                width={24} height={24}
                focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="VisibilityRoundedIcon"><path d="M12 4C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></svg>
            </button>
            <button onClick={onCopyClick}>
              <svg
                width={24} height={24}
                focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ContentCopyRoundedIcon"><path d="M15 20H5V7c0-.55-.45-1-1-1s-1 .45-1 1v13c0 1.1.9 2 2 2h10c.55 0 1-.45 1-1s-.45-1-1-1zm5-4V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2zm-2 0H9V4h9v12z"></path></svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}