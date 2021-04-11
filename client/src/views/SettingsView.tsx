import { userData } from "../res/interfaces";

const SettingsView = (props: {userData: userData, updateUserData: (newUserData: userData) => void}) => {

  const { userData, updateUserData } = props;
  let tempUserData = userData;

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
            console.log(tempUserData.username);
            
          }}
        />
      </form>
      <button
        onClick={ () => {
          updateUserData(tempUserData);
          
        }}
      >
        Save
      </button >
    </div>
  );
};

export default SettingsView;
