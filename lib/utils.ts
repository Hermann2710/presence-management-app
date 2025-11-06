import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import { randomBytes } from "crypto";

// Génère un mot de passe aléatoire sécurisé de 8 caractères
export function generateSecurePassword(length = 8) {
  const charset = {
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    digits: "0123456789",
    symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
  };

  // Au moins un caractère de chaque catégorie
  let password = "";
  password += charset.lower[Math.floor(randomBytes(1)[0] / 256 * charset.lower.length)];
  password += charset.upper[Math.floor(randomBytes(1)[0] / 256 * charset.upper.length)];
  password += charset.digits[Math.floor(randomBytes(1)[0] / 256 * charset.digits.length)];
  password += charset.symbols[Math.floor(randomBytes(1)[0] / 256 * charset.symbols.length)];

  const allChars = charset.lower + charset.upper + charset.digits + charset.symbols;

  // Compléter le reste du mot de passe
  while (password.length < length) {
    const idx = Math.floor(randomBytes(1)[0] / 256 * allChars.length);
    password += allChars[idx];
  }

  // Mélanger pour que les 4 premiers caractères ne soient pas toujours fixes
  password = password.split("").sort(() => 0.5 - Math.random()).join("");

  return password;
}
