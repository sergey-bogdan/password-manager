export type User = {
  id: number,
  username: string,
  password: string,
}

export type UserPayload = Omit<User, 'id'>

export const register = async (user: UserPayload): Promise<User> => {
  const users: User[] = JSON.parse(localStorage.getItem('__auth') || '[]') || [];
  const exists = users.find(u => u.username === user.username);
  if (exists) {
    throw new Error('User already exists');
  }

  const newUser = {
    ...user,
    id: ~~(Math.random() * 100000),
  }

  users.push(newUser);
  localStorage.setItem('__auth', JSON.stringify(users));

  return newUser;
}

export const login = async (user: UserPayload): Promise<User> => {
  const users: User[] = JSON.parse(localStorage.getItem('__auth') || '[]');
  const found = users.find(u => {
    return u.username === user.username && u.password === user.password;
  });

  if (!found) {
    throw new Error('User not found');
  }

  localStorage.setItem('currentUser', JSON.stringify(found));
  return found;
}

export const local__getCurrentUser = (): User => {
  const user = JSON.parse(localStorage.getItem('currentUser') || 'null');

  return user;
}