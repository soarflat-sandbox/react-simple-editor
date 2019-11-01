import React, { useCallback, useContext } from 'react';

import { FirebaseContext, signInWithRedirect, signOut } from './firebase';
import FirebaseAuth from './components/FirebaseAuth';

const Content: React.FC = () => {
  const { userId, userName } = useContext(FirebaseContext);

  return (
    <div>
      {userName} ({userId}) is signedIn
    </div>
  );
};

const App: React.FC = () => {
  const NotSignedIn = useCallback(() => {
    return <button onClick={() => signInWithRedirect()}>signIn</button>;
  }, []);
  const Loading = useCallback(() => {
    return <div>loading now...</div>;
  }, []);

  return (
    <FirebaseAuth NotSignedIn={NotSignedIn} Loading={Loading}>
      <Content />
      <button onClick={signOut}>sign out</button>
    </FirebaseAuth>
  );
};

export default App;
