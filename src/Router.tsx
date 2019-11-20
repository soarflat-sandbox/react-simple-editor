import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  useCallback
} from 'react';
import { History } from 'history';
import { isUuid } from 'uuidv4';

import Index from './pages/Index';
import Edit from './pages/Edit';

const RouterContext = React.createContext<History | null>(null);

// 現時点の URL のパスを取得するカスタムフック
const useCurrentPath = (history: History) => {
  // パス名を保持する State
  const [pathname, setPathname] = useState(history.location.pathname);

  useEffect(() => {
    // URL の変更を検知して State を更新する
    const unlisten = history.listen(location => {
      setPathname(location.pathname);
    });
    return unlisten;
  }, [history]);

  return pathname;
};

// パス名を元にルーティングを行う（コンポーネントを返す）カスタムフック
const useEditorRouting = (pathname: string) => {
  const content = useMemo(() => {
    if (pathname === '/') {
      return <Index />;
    } else if (isUuid(pathname.slice(1))) {
      return <Edit textId={pathname.slice(1)} />;
    } else {
      return <div>404 not found</div>;
    }
  }, [pathname]);

  return content;
};

type RouterProps = { history: History };

export const Router: React.FC<RouterProps> = ({ history }) => {
  const pathname = useCurrentPath(history);
  const content = useEditorRouting(pathname);

  return (
    <RouterContext.Provider value={history}>{content}</RouterContext.Provider>
  );
};

type LinkProps = { href: string; as?: string };

export const Link: React.FC<LinkProps> = ({ href, as = 'a', children }) => {
  const history = useContext(RouterContext);
  const onClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.preventDefault();
      history!.push(href);
    },
    [history, href]
  );

  return React.createElement(as, { onClick, href }, children);
};
