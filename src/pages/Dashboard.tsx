import { useEffect, useState, useCallback, useRef } from "react"
import { Link, useSearchParams, } from "react-router-dom";
import { getPasswords } from "../api/passwords"
import PasswordList from "../components/passwords/PasswordList";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Spinner from "../components/ui/Spinner";
import useDebouncedValue from "../hooks/useDebouncedValue";
import useResource from "../hooks/useResources";
import ErrorPage from "./errors/ErrorPage";

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get('s') || '');
  const searchQuery = useDebouncedValue(searchInput, 150);
  const welcomeScreenFlag = useRef(false);

  useEffect(() => {
    setSearchParams({ s: searchQuery })
  }, [searchQuery, setSearchParams]);

  const fetcher = useCallback(() => {
    return getPasswords({ search: searchQuery });
  }, [searchQuery]);

  const { data: passwords, error, isLoading } = useResource(fetcher);

  useEffect(() => {
    if (passwords && passwords.length) {
      welcomeScreenFlag.current = true;
    }
  }, [passwords]);

  if (isLoading) {
    return <Spinner size={32} color="black" />
  }

  if (error) {
    return <ErrorPage />
  }
  //todo fix flickering
  if (!isLoading && !passwords?.length && !searchQuery && welcomeScreenFlag.current === false) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
      }}>
        <Link to="/dashboard/passwords/new">
          <Button>Add your first password</Button>
        </Link>
      </div>
    )
  }

  return (
    <>
      {passwords && (
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start'
          }}>
            <Input
              placeholder="Search..."
              value={searchInput}
              onChange={((e) => {
                setSearchInput(e.currentTarget.value);
              })}
              style={{ marginRight: 8 }}
            />
            <Link to="/dashboard/passwords/new">
              <Button>Add new</Button>
            </Link>
          </div>
          <PasswordList passwords={passwords} />
        </div>
      )}
    </>
  )
}