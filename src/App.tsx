import React, { useCallback } from 'react';
import { History } from 'history';

import { signInWithRedirect, signOut } from './firebase';
import FirebaseAuth from './FirebaseAuth';
import { Router } from './Router';

const Content: React.FC<{ history: History }> = ({ history }) => {
  return <Router history={history} />;
};

const App: React.FC<{ history: History }> = ({ history }) => {
  const NotSignedIn = useCallback(() => {
    return <button onClick={() => signInWithRedirect()}>signIn</button>;
  }, []);
  const Loading = useCallback(() => {
    return <div>loading now...</div>;
  }, []);

  return (
    <FirebaseAuth NotSignedIn={NotSignedIn} Loading={Loading}>
      <Content history={history} />
      <button onClick={signOut}>sign out</button>
    </FirebaseAuth>
  );
};

export default App;
