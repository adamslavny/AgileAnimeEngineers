import { getUsernames } from "./BackendConnection";

let usernames: { [PUID: number]: string } = {};

export const getUsernamesCache = async (PUIDs: Array<number>) => {
  let returnedUsernames: { [PUID: number]: string } = {};
  let unCachedPUIDs = Array<number>();
  
  PUIDs.forEach((PUID) => {
    if(usernames[PUID] !== undefined){
      returnedUsernames[PUID] = usernames[PUID];
    }
    else{
      unCachedPUIDs.push(PUID);
    }
  });

  if(unCachedPUIDs.length > 0){
    const newUsernames = (await getUsernames(unCachedPUIDs)).usernameMap;
    usernames = {...usernames, ...newUsernames};
    returnedUsernames = {...returnedUsernames, ...newUsernames};
  }  
  return returnedUsernames;
}