import { User } from "@/services/userServices";

export function createAuthorUrl(user: User) {
  return `/authors/${user.firstname.toLowerCase()}-${user.lastname.toLowerCase()}_${
    user.id
  }`;
}
