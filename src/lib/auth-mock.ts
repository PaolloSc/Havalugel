import type { User } from "@/types/user";

const SESSION_KEY = "hava:session";
const USERS_KEY = "hava:users";

interface StoredUser extends User {
  senha: string;
}

function readUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(USERS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getSession(): User | null {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(window.localStorage.getItem(SESSION_KEY) ?? "null");
  } catch {
    return null;
  }
}

function setSession(user: User) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function register(data: Omit<User, "id"> & { senha: string }): { ok: true; user: User } | { ok: false; erro: string } {
  const users = readUsers();
  if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
    return { ok: false, erro: "Já existe uma conta com esse e-mail." };
  }
  const user: StoredUser = { id: crypto.randomUUID(), ...data };
  writeUsers([...users, user]);
  const { senha: _senha, ...publicUser } = user;
  void _senha;
  setSession(publicUser);
  return { ok: true, user: publicUser };
}

export function login(email: string, senha: string): { ok: true; user: User } | { ok: false; erro: string } {
  const users = readUsers();
  const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!found || found.senha !== senha) {
    return { ok: false, erro: "E-mail ou senha inválidos." };
  }
  const { senha: _senha, ...publicUser } = found;
  void _senha;
  setSession(publicUser);
  return { ok: true, user: publicUser };
}

export function logout() {
  window.localStorage.removeItem(SESSION_KEY);
}
