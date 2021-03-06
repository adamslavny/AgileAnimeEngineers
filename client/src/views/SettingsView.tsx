import { useState } from "react";
import AddMod from "../AddMod";
import ListMods from "../ListMods";
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
      <h2>
        Settings
      </h2>
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
      {
        userData.isModerator ? 
        <div className="moderator-settings">
          <h2>
            Moderator Settings
          </h2>
          <table>
            <colgroup>
              <col style={{width: "200px"}}/>
              <col />
            </colgroup>
            <thead>
              <tr>
                <th>Mod List</th>
                <th>Add a mod</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th><ListMods /></th>
                <th style={{verticalAlign: "top"}}><AddMod /></th>
              </tr>
            </tbody>
          </table> 
        </div> : 
        <></>
      }
    </div>
  );
};

export default SettingsView;
