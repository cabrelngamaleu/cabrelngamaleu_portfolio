import React from 'react'
import SidenavTitle from './SidenavTitle';

const Sidenav = () => {
  return (
    <div className="px-7 py-4">
      <SidenavTitle title="M" subTitle="enu" />
      <ul>
        <li className="sidenavLi">Blog</li>
        <li className="sidenavLi">Portfolio</li>
      </ul>
      <SidenavTitle title="P" subTitle="rojects" />
      <ul>
        <li className="sidenavLi">Développement Web</li>
        <li className="sidenavLi">E-commerce</li>
        <li className="sidenavLi">Chatting Applications</li>
        <li className="sidenavLi">Portfolio Websites</li>
        <li className="sidenavLi">Backend Setup</li>
        <li className="sidenavLi">Amazone Clone</li>
      </ul>
      <SidenavTitle title="R" subTitle="each Me" />
      <ul>
        <li className="sidenavLi">+237 695669921</li>
        <li className="sidenavLi">ncabrel@yahoo.fr</li>
      </ul>
    </div>
  );
}

export default Sidenav