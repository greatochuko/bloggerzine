import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return { hashedPassword, bcryptError: null };
  } catch (error) {
    return { hashedPassword: null, bcryptError: error };
  }
}
