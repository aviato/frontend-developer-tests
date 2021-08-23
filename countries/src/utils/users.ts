import User from "../types/User";

export function sortUsersByRegistrationDate(users: User[]) {
  return users.sort((a, b) => {
    const dateA = new Date(a.registered.date);
    const dateB = new Date(b.registered.date);
    return dateB.getTime() - dateA.getTime();
  });
}
