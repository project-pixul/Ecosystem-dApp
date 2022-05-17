import * as React from "react";

import { NavLink } from "react-router-dom";
import { IShellPage } from "./shellInterfaces";
import { NavHashLink } from "react-router-hash-link";
import { withTranslation, useTranslation } from "react-i18next";

import { GiHamburgerMenu } from "react-icons/gi";

import { useWeb3React } from "@web3-react/core";
import { injected } from "../web3/Connector";

import "./shellNav.css";
import Sidebar from "./sidebar";
import { Docs, Farm, Pixul, Stake, XpixulMobile } from "./pages/home/svgs";

import { connect, disconnect } from "../web3/connect";

const sideBarItems = [
  { title: "Home", id: "home", url: "https://pixul.io" },
  {
    title: "Marketplace",
    id: "market",
    url: "https://marketplace.pixul.io/home",
  },
  { title: "POS System", id: "pos", url: "#" },
  {
    title: "Documents",
    id: "documents",
    url: "https://www.pixul.io/documents",
  },
  {
    title: "Audits",
    id: "audits",
    url: "https://github.com/solidproof/projects/blob/main/Pixul/SmartContract_Audit_Solidproof_PixulToken.pdf",
  },
  {
    title: "Github",
    id: "github",
    url: "https://github.com/project-pixul/Pixul-Ecosystem",
  },
  { title: "Discord", id: "discord", url: "https://discord.gg/NBeJaQh7RF" },
  { title: "Twitter", id: "twitter", url: "https://twitter.com/Pixul_" },
  { title: "Telegram", id: "telegram", url: "https://t.me/pixulchat" },
];

export type ShellNavProps = {
  pages: IShellPage[];
};

const ShellNav = (props: ShellNavProps) => {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  const collapseRef = React.createRef<any>();
  const [isSideBarOpen, setSideBarOpen] = React.useState<Boolean>(false);
  const { t } = useTranslation();

  const toggleMenu = (e: any) => {
    if (window.innerWidth < 990) collapseRef.current.click();
  };

  const toggleSideBar = () => {
    setSideBarOpen((prevState) => {
      return !prevState;
    });
  };

  const connectWallet = async () => {
    await activate(injected);
  };

  const disconnectWallet = async () => {
    deactivate();
    localStorage.setItem("walletAddr", "");
  };

  React.useEffect(() => {
    let temp = localStorage.getItem("walletAddr");
    if (temp) {
      connectWallet();
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("walletAddr", account);
  }, [account]);

  const pages1 = props.pages.slice(0, 2);
  const pages2 = props.pages.slice(2, 7);

  const menuItemName = {
    home: t("nav.home"),
    about: t("nav.about"),
    farm: t("nav.farm"),
    xpixul: t("nav.xpixul"),
    lottery: t("nav.lottery"),
  };

  const mobileNavIcons = {
    home: <Pixul />,
    about: <Stake />,
    farm: <Farm />,
    xpixul: <XpixulMobile />,
    lottery: <Docs />,
  };

  const mobileNavExtraItems = {
    staking: (
      <NavHashLink to={`xpixul#staking`} activeClassName="active">
        <div className="mobile-nav-item">
          {mobileNavIcons["about"]}
          <span>STAKING</span>
        </div>
      </NavHashLink>
    ),
    documents: (
      <a href="https://www.pixul.io/documents" target="_br">
        <div className="mobile-nav-item">
          {mobileNavIcons["lottery"]}
          <span>DOCS</span>
        </div>
      </a>
    ),
    migrate: (
      <NavHashLink to={`xpixul#migrate`} activeClassName="active">
        <div className="mobile-nav-item">
          {mobileNavIcons["xpixul"]}
          <span>xPIXUL</span>
        </div>
      </NavHashLink>
    ),
  };

  return (
    <>
      <div className="navigation-wrapper">
        <div className="logo-wrapper">
          <a href="/home">
            <img
              src="https://res.cloudinary.com/rk03/image/upload/v1652517209/pixellogowebsitewhite_pwoj9r.png"
              className="img-logo"
              alt="Pixul"
            />
          </a>
          <GiHamburgerMenu className="menu-toggler" onClick={toggleSideBar} />
        </div>
        <nav id="mainNav">
          <div className="navbar-nav">
            {pages1.map((page) => {
              const classes = ["nav-item", page.id];
              const menuName = menuItemName[`${page.id}`];
              return (
                <li key={`${page.id}`}>
                  <NavLink
                    to={page.id}
                    activeClassName="active"
                    className={classes.join(" ")}
                    onClick={toggleMenu}
                  >
                    {menuName}
                  </NavLink>
                </li>
              );
            })}

            {pages2.map((page) => {
              const classes = ["nav-item", page.id];
              const menuName = menuItemName[`${page.id}`];
              if (page.id === "lottery") return "";

              return (
                <li key={`${page.id}`}>
                  <NavLink
                    to={page.id}
                    activeClassName="active"
                    className={classes.join(" ")}
                    onClick={toggleMenu}
                  >
                    {menuName}
                  </NavLink>
                </li>
              );
            })}
            <div className="connect-wallet">
              {account ? (
                <>
                  <img
                    src="https://res.cloudinary.com/rk03/image/upload/v1650441472/ethereum-2296075-1912034_jtsmzt.png"
                    alt="wallet"
                  />
                  <span onClick={() => disconnectWallet()}>{account}</span>
                </>
              ) : (
                <span onClick={() => connectWallet()}>Connect Wallet</span>
              )}
            </div>
          </div>
        </nav>
      </div>

      <nav id="mobileNav">
        {props.pages.map((page) => {
          const menuName = (menuItemName as any)[`${page.id}`];
          if (page.id === "about") {
            return mobileNavExtraItems.staking;
          } else if (page.id === "lottery") {
            return mobileNavExtraItems.documents;
          } else if (page.id === "xpixul") {
            return mobileNavExtraItems.migrate;
          }
          return (
            <NavHashLink
              to={`${page.id}`}
              activeClassName="active"
              onClick={() => window.scrollTo(0, 0)}
            >
              <div className="mobile-nav-item">
                {mobileNavIcons[`${page.id}`]}
                <span>{menuName.toUpperCase()}</span>
              </div>
            </NavHashLink>
          );
        })}
      </nav>
      {isSideBarOpen && (
        <Sidebar sidebarItems={sideBarItems} toggleMenu={toggleSideBar} />
      )}
    </>
  );
};

export default withTranslation()(ShellNav);
