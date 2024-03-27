import React, { useState } from 'react';

// import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';
import { callMsGraph } from './AzureUserService';

/**
* Renders information about the signed-in user or a button to retrieve data about the user
*/
function ProfilePage() {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  function RequestProfileData() {
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        callMsGraph(response.accessToken)
          .then((res: React.SetStateAction<null>) => setGraphData(res));
      });
  }

  // console.log(graphData);
  if (!graphData) { RequestProfileData(); }

  return (
    <>
      <h5 className="card-title">
        {`Hi there, ${accounts[0].name?.split(' ')[0]}!`}
      </h5>
      <br />
      <div id="profile-div">
        {
          Object.values(graphData || {})
            .map((val: any) => <p>{`${val}`}</p>)
        }
      </div>
      <div id="profile-div">
        {
          Object.keys(graphData || {})
            .map((val: any) => <p>{`${val}`}</p>)
        }
      </div>
    </>
  );
}

export default ProfilePage;
