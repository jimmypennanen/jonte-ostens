import { compare } from 'bcrypt';
import { randomUUID } from 'crypto';
import { f as getSession, h as getUser, i as deleteSession$1, j as insertSession } from './index_lH4WeDz9.mjs';

const SESSION_EXPIRY_DAYS = 7;
async function verifyPassword(password, hash2) {
  return compare(password, hash2);
}
function generateSessionToken() {
  return randomUUID();
}
function getSessionExpiry() {
  const expiresAt = /* @__PURE__ */ new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_EXPIRY_DAYS);
  return expiresAt.toISOString();
}
async function createSession(userId) {
  const token = generateSessionToken();
  const expiresAt = getSessionExpiry();
  insertSession(userId, token, expiresAt);
  return token;
}
function validateSession(token) {
  return getSession(token);
}
function deleteSession(token) {
  return deleteSession$1(token);
}
async function loginUser(username, password) {
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

export { deleteSession as d, loginUser as l, validateSession as v };
