import { local__getCurrentUser, User } from "./auth";

const sleep = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));

export interface Password {
  id: number;
  userId: User['id'];
  username: string;
  password: string;
  website: string;
  createdAt: Date;
  updatedAt: Date;
}

const TIMEOUT = 250;

export type PasswordId = number | string;

export type PasswordPayload = Pick<Password, 'username' | 'password' | 'website'>

const getStorageJsonValue = (key: string, defaultValue: string = '') => {
  try {
    const data = JSON.parse(localStorage.getItem(key) || defaultValue, ((k, v) => {
      if (k === 'createdAt' || k === 'updatedAt') {
        return new Date(v);
      }

      return v;
    }));
    return data;
  } catch (e) {
    console.error(e);
    return JSON.parse(defaultValue);
  }
}

export const addPassword = async (payload: PasswordPayload): Promise<Password> => {
  await sleep(TIMEOUT);

  const password: Password = {
    id: ~~(Math.random() * 100_000),
    userId: local__getCurrentUser().id,
    username: payload.username,
    password: payload.password,
    website: payload.website,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const data: Password[] = getStorageJsonValue('__data', '[]');
  data.push(password);
  localStorage.setItem('__data', JSON.stringify(data));

  return password;
}

export const updatePassword = async (passwordId: PasswordId, payload: Partial<PasswordPayload>): Promise<Password> => {
  const data: Password[] = await getPasswords();
  let p = null;
  const updated = data.map(password => {
    if (password.id === passwordId) {
      password = {
        ...password,
        ...payload,
        updatedAt: new Date(),
      }
      p = password;
    }

    return password;
  });

  localStorage.setItem('__data', JSON.stringify(updated));

  if (!p) {
    throw new Error('404');
  }

  return p;
}

export const deletePassword = async (passwordId: PasswordId) => {
  const data: Password[] = await getPasswords();
  const updated = data.filter(password => password.id !== passwordId);

  localStorage.setItem('__data', JSON.stringify(updated));
}

type QueryParams = {
  search?: string,
}

export const getPasswords = async (params?: QueryParams) => {
  await sleep(TIMEOUT);

  const data: Password[] = getStorageJsonValue('__data', '[]');

  const user = local__getCurrentUser();

  return data
    .filter(p => {
      return p.userId === user.id
    })
    .filter(password => {
      if (!params?.search) {
        return true;
      }

      const search = params.search.toLowerCase();

      return password.username.toLowerCase().includes(search)
        || password.website.toLowerCase().includes(search)
    }).sort((a, b) => {
      return b.createdAt.getTime() - a.createdAt.getTime();
    })
}

export const getPasswordById = async (id: PasswordId): Promise<Password> => {
  await sleep(TIMEOUT);

  const passwords = await getPasswords()
  const p = passwords.find(p => p.id === id);
  if (!p) {
    throw new Error('404');
  }

  return p;
}
