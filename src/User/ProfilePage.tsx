import React, { useEffect, useState } from 'react';

// import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';
import { callMsGraph, fetchUser } from './AzureUserService';

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

  useEffect(() => {
    console.log(graphData);
    // @ts-ignore
    if (graphData && graphData.id) {
      // @ts-ignore
      const { id } = graphData;
      fetchUser(id)
        .then((usr) => console.log(`Current User: ${usr}`));
    }
  }, [graphData]);

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
            .filter((val: any) => !!val)
            .map((val: any) => <p key={`val-${val}`}>{`${val}`}</p>)
        }
      </div>
      <div id="profile-div">
        {
          Object.keys(graphData || {})
            .map((val: any) => <p key={`key-${val}`}>{`${val}`}</p>)
        }
      </div>
    </>
  );
}

export default ProfilePage;
