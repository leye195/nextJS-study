import { readFileSync, writeFileSync } from "fs";
import { StoredUserType } from "types/user";

const getUserList = () => {
  const userBuffer = readFileSync("data/user.json");
  const usersString = userBuffer.toString();

  if (!usersString) {
    return [];
  }

  const users: StoredUserType[] = JSON.parse(usersString);
  return users;
};

const exist = ({ email }: { email: string }) => {
  const users = getUserList();

  return users.some((user) => user.email === email);
};

const write = async (users: StoredUserType[]) => {
  writeFileSync("data/user.json", JSON.stringify(users));
};

const find = ({ email, id }: { email?: string; id?: number }) => {
  const users = getUserList();
  return users.find((user) => user.email === email || user.id === id);
};

export default { getUserList, exist, write, find };
