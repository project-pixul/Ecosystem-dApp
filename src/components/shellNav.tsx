import * as React from "react";

import { NavLink, useLocation } from "react-router-dom";
import { BaseComponent, IShellPage } from "./shellInterfaces";
import { NavHashLink } from "react-router-hash-link";
import { TFunction, withTranslation, WithTranslation } from "react-i18next";
import { supportedLanguages, languageCodeOnly } from "../i18n";

import { GiHamburgerMenu } from "react-icons/gi";
import Collapsible from "react-collapsible";
import "./shellNav.css";
import Sidebar from "./sidebar";
import {
  Docs,
  Farm,
  Pixul,
  Stake,
  Xpixul,
  XpixulMobile,
} from "./pages/home/svgs";

const sideBarItems = [
  { title: "Home", id: "home" },
  { title: "Marketplace", id: "about" },
  { title: "POS System", id: "farm" },
  { title: "Documents", id: "farm" },
  { title: "Audits", id: "xpixul" },
  { title: "Github", id: "lottery" },
  { title: "Discord", id: "lottery" },
  { title: "Twitter", id: "lottery" },
  { title: "Telegram", id: "lottery" },
];

export type ShellNavProps = {
  pages: IShellPage[];
};
export type ShellNavState = {
  isSideBarOpen: boolean;
};

class ShellNav extends BaseComponent<
  ShellNavProps & WithTranslation,
  ShellNavState
> {
  private collapseRef = React.createRef<any>();

  constructor(props: ShellNavProps & WithTranslation) {
    super(props);
    this.state = {
      isSideBarOpen: false,
    };
    this.toggleSideBar = this.toggleSideBar.bind(this);
  }

  toggleMenu = (e: any) => {
    if (window.innerWidth < 990) this.collapseRef.current.click();
  };

  toggleSideBar() {
    this.setState((prevState) => ({
      isSideBarOpen: !prevState.isSideBarOpen,
    }));
  }

  render() {
    const pages = this.readProps().pages || [];
    const t: TFunction<"translation"> = this.readProps().t;
    const i18n = this.readProps().i18n;

    const pages1 = pages.slice(0, 2);
    const pages2 = pages.slice(2, 7);

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
                src="/images/pixellogowebsitewhite.png"
                className="img-logo"
                alt="Pixul"
              />
            </a>
            <GiHamburgerMenu
              className="menu-toggler"
              onClick={this.toggleSideBar}
            />
          </div>
          <nav id="mainNav">
            <ul className="navbar-nav">
              {pages1.map((page) => {
                const classes = ["nav-item", page.id];
                const menuMap = {
                  home: t("nav.home"),
                  about: t("nav.about"),
                };
                const menuName = (menuMap as any)[`${page.id}`];
                return (
                  <li key={`${page.id}`}>
                    <NavLink
                      to={page.id}
                      activeClassName="active"
                      className={classes.join(" ")}
                      onClick={this.toggleMenu}
                    >
                      {menuName}
                    </NavLink>
                  </li>
                );
              })}

              {pages2.map((page) => {
                const classes = ["nav-item", page.id];
                const menuMap = {
                  farm: t("nav.farm"),
                  xpixul: t("nav.xpixul"),
                  lottery: t("nav.lottery"),
                };
                const menuName = (menuMap as any)[`${page.id}`];
                return (
                  <li key={`${page.id}`}>
                    <NavLink
                      to={page.id}
                      activeClassName="active"
                      className={classes.join(" ")}
                      onClick={this.toggleMenu}
                    >
                      {menuName}
                    </NavLink>
                  </li>
                );
              })}
              <div className="connect-wallet">
                <img
                  src="https://res.cloudinary.com/rk03/image/upload/v1650441472/ethereum-2296075-1912034_jtsmzt.png"
                  alt="wallet"
                />
                <span>0x68d1aB423743E53945dcB4c182E385045817108A</span>
              </div>
            </ul>
          </nav>
        </div>

        <nav id="mobileNav">
          {pages.map((page) => {
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
        {this.state.isSideBarOpen && (
          <Sidebar
            sidebarItems={sideBarItems}
            toggleMenu={this.toggleSideBar}
          />
        )}
      </>
    );
  }
}

export default withTranslation()(ShellNav);
