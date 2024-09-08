import { UserType } from "@/services/userServices";

export function createAuthorUrl(user: UserType) {
  return `/authors/${user.firstname.toLowerCase()}-${user.lastname.toLowerCase()}_${
    user.id
  }`;
}
