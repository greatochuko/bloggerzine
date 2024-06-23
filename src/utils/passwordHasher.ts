import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return { hashedPassword, bcryptError: null };
  } catch (error) {
    return { hashedPassword: null, bcryptError: error };
  }
}

export async function comparePassword(
  password: string,
  encryptedPassword: string
) {
  try {
    const isSame = await bcrypt.compare(password, encryptedPassword);
    if (isSame) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}
