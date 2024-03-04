import { _getAccessToken } from "./localStorageService";
/* //import * as crypto from 'crypto-browserify';
import { Buffer } from "buffer";
if (!window.Buffer) {
  window.Buffer = Buffer;
}


export const encrypt = (text: string) => {
  const algorithm = "aes256";
  const key = crypto
    .createHash("sha256")
    .update(String(process.env.REACT_APP_API_URL_PASSWORD))
    .digest("base64")
    .substr(0, 32);
  console.log("key", key);
  const iv = crypto
    .createHash("sha256")
    .update(String(process.env.REACT_APP_API_URL_PASSWORD))
    .digest("base64")
    .substr(0, 16);
  console.log("iv", iv);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  console.log("cipher", cipher);
  const encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");
  return encrypted;
};
 */

import crypto from "crypto-browserify";
import { Buffer } from "buffer";
const ENCRYPTION_KEY = "dr_dash_v2_omron_vitalsight_2021"; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16
window.Buffer = window.Buffer || require("buffer").Buffer;

/* export const encrypt = (text) => {
  console.log("text", typeof text, ENCRYPTION_KEY);
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  console.log("encyrpt", encrypted);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}; */

export const encrypt = (text) => {
  const algorithm = "aes256";
  const key = crypto
    .createHash("sha256")
    .update(String(process.env.REACT_APP_API_URL_INVITE_PASSWORD))
    .digest("base64")
    .substr(0, 32);
  const iv = crypto
    .createHash("sha256")
    .update(String(process.env.REACT_APP_API_URL_INVITE_PASSWORD))
    .digest("base64")
    .substr(0, 16);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  const encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");
  return encrypted;
};

export const isLogin = () => {
  if (_getAccessToken()) {
    return true;
  }
  return false;
};
