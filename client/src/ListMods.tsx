import { useState, useEffect } from "react";
import { getMods } from "./res/BackendConnection";
import { getUsernamesCache } from "./res/UsernameCache";

const ListMods = () => {
  const [modList, setModList] = useState<Array<string>>(["Loading..."]);

  useEffect(() => {
    getMods().then((newModList) => {
      getUsernamesCache(newModList).then((modUsernamesMap) => {
        let modUsernames: string[] = [];
        for(let key in modUsernamesMap) {
          modUsernames.push(modUsernamesMap[key]);
        }
        setModList(modUsernames);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="list-mods">
      {
        modList.map((mod, i) => {
          return (
            <p key={i}>
              {mod}
            </p>
          );
        })
      }
    </div>
  );
};

export default ListMods;
