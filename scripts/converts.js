const fromBase64 = (value) => {
  const buffer = Buffer.from(value, "base64");
  return buffer.toString("ascii");
};

const regexBase64 = (value) => {
  let privateKey = value.replace(/\\n/gm, "\n");
  return privateKey;
};

export { fromBase64, regexBase64 };
