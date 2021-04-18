import { useState } from "react";
import { assignMod } from "./res/BackendConnection";
import { userData } from "./res/interfaces";

const AddMod = (props: { userData: userData }) => {

  const { userData } = props;

  const [inputPUID, setInputPUID] = useState("");

  return (
    <div className="add-mod">
      <form>
        <label>Username:</label><br/>
        <input
          type="text"
          placeholder="Input the PUID of the user you want to mod"
          defaultValue={inputPUID}
          onChange={ (event) => {
            setInputPUID(event.target.value);
          }}
        />
      </form>
      <button
        onClick={ () => {
          const inputPUIDNum = Number(inputPUID);
          if(isNaN(inputPUIDNum)){
            return;
          }
          assignMod(userData.UID, inputPUIDNum);
        }}
      >
        Assign New Moderator
      </button >
    </div>
  );
};

export default AddMod;