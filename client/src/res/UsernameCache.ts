import { getUsernames } from "./BackendConnection";

let usernames: { [PUID: number]: string } = {};
let currentRequests: { [PUID: number]: Promise<void> } = {};

export const getUsernamesCache = async (PUIDs: Array<number>) => {
  let returnedUsernames: { [PUID: number]: string } = {};
  let unCachedPUIDs = Array<number>();

  PUIDs = Array.from(new Set(PUIDs))
  
  PUIDs.forEach((PUID) => {
    if(usernames[PUID] !== undefined){
      returnedUsernames[PUID] = usernames[PUID];
    }
    else{
      unCachedPUIDs.push(PUID);
    }
  });

  let promsToAwait = Array<Promise<void>>();
  let unRequestedPUIDs = Array<number>();
  unCachedPUIDs.forEach((PUID) => {
    if(currentRequests[PUID] !== undefined){
      promsToAwait.push(currentRequests[PUID].then(() => {
        returnedUsernames[PUID] = usernames[PUID];
      }));
    }
    else{
      unRequestedPUIDs.push(PUID);
    }
  });

  if(unRequestedPUIDs.length > 0){
    const usernamesPromise = getUsernames(unRequestedPUIDs).then(data => data.usernameMap)
      .then((newUsernames) => {
        usernames = {...usernames, ...newUsernames};
        returnedUsernames = {...returnedUsernames, ...newUsernames};
      });
      unRequestedPUIDs.forEach((PUID) => {
      currentRequests[PUID] = usernamesPromise.then(() => {
        delete currentRequests[PUID];
      });
    });
    promsToAwait.push(usernamesPromise);
  }
  await Promise.all(promsToAwait);  
  return returnedUsernames;
}