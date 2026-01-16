import { hash, compare } from 'bcrypt';
import { randomUUID } from 'crypto';
import { getUser, getUserById, insertSession, getSession as getSessionFromDb, deleteSession as deleteSessionFromDb } from '../db/index';

const SALT_ROUNDS = 10;
const SESSION_EXPIRY_DAYS = 7;

export async function hashPassword(password: string): Promise<string> {
  return hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return compare(password, hash);
}

export function generateSessionToken(): string {
  return randomUUID();
}

export function getSessionExpiry(): string {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_EXPIRY_DAYS);
  return expiresAt.toISOString();
}

export async function createSession(userId: number): Promise<string> {
  const token = generateSessionToken();
  const expiresAt = getSessionExpiry();

  insertSession(userId, token, expiresAt);

  return token;
}

export function validateSession(token: string) {
  const session = getSessionFromDb(token);

  // Check if session exists and hasn't expired
  if (!session) {
    return null;
  }

  const expiresAt = new Date(session.expires_at);
  const now = new Date();

  if (now > expiresAt) {
    // Session has expired, delete it
    deleteSessionFromDb(token);
    return null;
  }

  return session;
}

export function deleteSession(token: string) {
  return deleteSessionFromDb(token);
}

export async function loginUser(username: string, password: string) {
  const user = getUser(username);

  if (!user) {
    return null;
  }

  const isValidPassword = await verifyPassword(password, user.password_hash);

  if (!isValidPassword) {
    return null;
  }

  const token = await createSession(user.id);

  return {
    id: user.id,
    username: user.username,
    token
  };
}

export function getUserFromSession(token: string) {
  const session = validateSession(token);

  if (!session) {
    return null;
  }

  return {
    id: session.user_id,
    username: session.username
  };
}
