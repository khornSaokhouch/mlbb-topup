import crypto from 'crypto';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

export function verifyTelegramHash(data: TelegramUser, botToken: string): boolean {
  if (!botToken) return false;

  const { hash, ...userData } = data;
  
  // Sort and join data by newline
  const dataCheckString = Object.keys(userData)
    .sort()
    .filter((key) => userData[key as keyof typeof userData] !== undefined)
    .map((key) => `${key}=${userData[key as keyof typeof userData]}`)
    .join('\n');

  // Create secret key from bot token using SHA256
  const secretKey = crypto
    .createHash('sha256')
    .update(botToken)
    .digest();

  // Create HMAC-SHA256 hash of data_check_string using secret key
  const hmac = crypto
    .createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');

  // Compare hashes
  return hmac === hash;
}
