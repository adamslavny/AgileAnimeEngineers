import { useState } from "react";
import { updateUserData } from "../res/BackendConnection";
import { userData } from "../res/interfaces";

const SettingsView = (props: {userData: userData, setUserData: (newUserData: userData) => void}) => {

  const { userData, setUserData } = props;
  let tempUserData = userData;
  const [saveState, setSaveState] = useState(0);

  const getSaveMessage = () => {
    switch(saveState){
      case 0:
        return "No changes yet";
      case 1:
        return "Save";
      case 2:
        return "Saving...";
      case 3:
        return "Saved!";
      case 4:
        return "Save failed!"
      default:
        return "Something went wrong if you're seeing this.";
    }
  };

  return (
    <div>
      <form>
        <label>Username:</label><br/>
        <input
          type="text"
          placeholder="Please choose a username"
          defaultValue={tempUserData.username}
          onChange={ (event) => {
            tempUserData.username = event.target.value;
            setSaveState(1);
          }}
        />
      </form>
      <button
        onClick={ () => {
          if(saveState !== 0 && saveState !== 3){
            setUserData(tempUserData);
            updateUserData(userData.UID, userData).then((data) => {
              if(data.success){
                setSaveState(3);
              }
              else{
                setSaveState(4);
                console.log(data.message);
                console.log(userData.UID);
              }
            });
            setSaveState(2);
          }
        }}
      >
        {getSaveMessage()}
      </button >
    </div>
  );
};

export default SettingsView;
