const useEncryptor = (encryptedLength = 30) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const extraChars = ".,!@#$%^&*()-_=+[]{}|;:'\"<>/\\ 0123456789?^№";
  const charCount = characters.length;
  const extraCount = extraChars.length;
  const lengthMap = characters;

  const encryptChar = (char) => {
    let charIndex = characters.indexOf(char);
    if (charIndex !== -1) {
      const randOffset = Math.floor(Math.random() * (charCount - 1)) + 1;
      return (
        characters[(charIndex + randOffset) % charCount] +
        characters[randOffset]
      );
    }

    charIndex = extraChars.indexOf(char);
    if (charIndex !== -1) {
      return (
        characters[charIndex % charCount] +
        characters[(charIndex / charCount) | 0]
      );
    }

    return "";
  };

  const encryptId = (id) => {
    let lengthCode =
      lengthMap[id.length % charCount] +
      lengthMap[Math.floor(id.length / charCount) % charCount];
    let encrypted = lengthCode;

    for (let char of id) {
      const encryptedChar = encryptChar(char);
      if (encryptedChar) {
        encrypted += encryptedChar;
      }
    }

    while (encrypted.length < encryptedLength) {
      encrypted += characters[Math.floor(Math.random() * charCount)];
    }

    return encrypted;
  };

  const decryptId = (encryptedId) => {
    const originalLength =
      lengthMap.indexOf(encryptedId[0]) +
      lengthMap.indexOf(encryptedId[1]) * charCount;
    let decrypted = "";
    let index = 2;

    for (let i = 0; i < originalLength; i++) {
      if (index + 1 >= encryptedId.length) break;
      let charIndex = characters.indexOf(encryptedId[index]);
      let randOffset = characters.indexOf(encryptedId[index + 1]);
      if (charIndex === -1 || randOffset === -1) {
        decrypted += "";
      } else {
        let originalChar =
          characters[(charIndex - randOffset + charCount) % charCount];
        let extraCharIndex =
          characters.indexOf(originalChar) + randOffset * charCount;
        decrypted += extraChars[extraCharIndex] || originalChar;
      }
      index += 2;
    }
    return decrypted;
  };

  return { encryptId, decryptId };
};

export { useEncryptor };
