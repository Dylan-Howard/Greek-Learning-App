import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from 'react';
import globalStyles from '../styles/global';
 
function Layout(props: { children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }) {
  return (
    <div className="page-layout">
      {props.children}
      <style jsx global>
        {globalStyles}
      </style>
    </div>
  );
}
 
export default Layout;