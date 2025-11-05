// Email : valide la plupart des formats standards
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mot de passe : 8+ caractères, au moins 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Nom : lettres (majuscules ou minuscules), espaces, tirets, apostrophes, accents
export const NAME_REGEX = /^[A-Za-zÀ-ÿ' -]{3,50}$/;