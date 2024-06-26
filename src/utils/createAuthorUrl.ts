import { User } from "@/services/userServices";

export function createAuthorUrl(user: User) {
  return `${user.firstname.toLowerCase()}_${user.lastname.toLowerCase()}_${
    user.id
  }`;
}
