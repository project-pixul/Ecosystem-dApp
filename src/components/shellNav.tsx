import * as React from "react";

import { NavLink, useLocation } from "react-router-dom";
import { BaseComponent, IShellPage } from "./shellInterfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { TFunction, withTranslation, WithTranslation } from "react-i18next";
import { supportedLanguages, languageCodeOnly } from "../i18n";
import { GiHamburgerMenu } from "react-icons/gi";
import Collapsible from "react-collapsible";
import "./shellNav.css";
import Sidebar from "./sidebar";

const sideBarItems = [
  { title: "Home", id: "home" },
  { title: "About", id: "about" },
  { title: "Farm", id: "farm" },
  { title: "XPixul", id: "xpixul" },
  { title: "Lottery", id: "lottery" },
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
