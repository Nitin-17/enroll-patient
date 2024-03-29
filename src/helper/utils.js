import { _getAccessToken } from "./localStorageService";
import { useDispatch, useSelector } from "react-redux";
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

export const phoneRegex = /^[(]?\d{3}[)]?[(\s)?.-]\d{3}[\s.-]\d{4}$/g;
export const phoneNumberFormatter = (input) => {
  if (typeof input !== "string") return input;

  input = input.replace(/^\+1|^(\+91)?/, ""); // Remove country codes
  input = input.replace(/[^\d]/g, ""); // Strip non-numeric characters
  input = input.substring(0, 10); // Limit to 10 digits

  if (input.length < 4) return input;
  return `(${input.substring(0, 3)})-${input.substring(3, 6)}${
    input.length < 7 ? "" : `-${input.substring(6, 10)}`
  }`;
};

export const isLogin = () => {
  if (_getAccessToken()) {
    return true;
  }
  return false;
};

export const phoneRegExp = /^[(]?\d{3}[)]?[(\s)?.-]\d{3}[\s.-]\d{4}$/g;
export const autoFormatPhoneNumber = (input) => {
  if (typeof input !== "string") return input;

  // Remove country code prefixes
  input = input.replace(/^\+1|^\+91/g, "");

  // Strip all characters except digits
  input = input.replace(/[^\d]/g, "");

  // Trim to 10 characters
  input = input.substring(0, 10);

  // Add formatting based on length
  const size = input.length;
  if (size === 0) {
    // No changes needed
  } else if (size < 4) {
    input = `(${input}`;
  } else if (size < 7) {
    input = `(${input.substring(0, 3)})-${input.substring(3, 6)}`;
  } else {
    input = `(${input.substring(0, 3)})-${input.substring(
      3,
      6
    )}-${input.substring(6, 10)}`;
  }

  return input;
};

export const formatDate = (dateString) => {
  const dateObject = new Date(dateString);
  return dateObject.toUTCString();
};

/* ICD Codes */

export const showIcdCodes = (params, dispatch, initialIcdCodes) => {
  console.log("intial-----------------------------", params, initialIcdCodes);
  if (
    initialIcdCodes &&
    initialIcdCodes[0]?.length > 0 &&
    params &&
    params?.group
  ) {
    const filteredResults = initialIcdCodes[0].filter(
      (item) => item.group === params.group
    );

    const result =
      filteredResults.length > 0
        ? filteredResults.map((item) => item.codes)
        : [];

    console.log("iffffffffff", result);

    return result;
  } else if (params && params.search) {
    console.log(":::::::::::");
    const matchingCodes = initialIcdCodes[0].flatMap((item) =>
      item.codes.filter(
        (code) =>
          code.description.includes(params.search) ||
          item.group.includes(params.search)
      )
    );
    //console.log("rrrrrrrrrrr", matchingCodes);
    return matchingCodes;
  }
};

/* Debounce funtion for ICD */
export const debounce = (func, wait) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/* Sort Location List */
export const sortDataList = (data, name) => {
  return data.sort((a, b) =>
    a[`${name}`]?.toLowerCase() > b[`${name}`]?.toLowerCase()
      ? 1
      : b[`${name}`]?.toLowerCase() > a[`${name}`]?.toLowerCase()
      ? -1
      : 0
  );
};
