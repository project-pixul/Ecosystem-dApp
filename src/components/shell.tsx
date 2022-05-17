import * as React from "react";

import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import ShellHost from "./shellHost";
import { IShellPage } from "./shellInterfaces";

import { MdEmail } from "react-icons/md";
import { BsTwitter, BsGithub, BsTelegram } from "react-icons/bs";

import ShellNav from "./shellNav";

import "./shell.css";

export type ShellProps = {
  pages: IShellPage[];
};

export const Shell = (props: ShellProps) => {
  return (
    <Router>
      <div className="main-wrapper">
        <ShellNav pages={props.pages} />
        <div className="content-wrapper">
          <Switch>
            {props.pages.map((page) => (
              <Route key={`${page.id}`} path={"/" + page.id}>
                <ShellHost page={page} />
              </Route>
            ))}
            <Route
              exact
              path="/"
              render={() => {
                return <Redirect to="/home" />;
              }}
            />
          </Switch>
        </div>
        <section className="footer">
          <div className="footer-header">
            <img
              src="https://res.cloudinary.com/rk03/image/upload/v1652517209/pixellogowebsitewhite_pwoj9r.png"
              alt="Pixul Logo"
            />
            <p>
              We believe the adoption of cryptocurrency worldwide is inevitable.
              At Pixul, we aim to develop multi-chain applications and
              technology that focus on utilizing crypto as a means of service
              and needs for everyday use.
            </p>
            <div className="social-medias">
              <a
                href="https://twitter.com/Pixul_"
                rel="noreferrer"
                className="btn-social"
                target="_blank"
              >
                <BsTwitter size={18} />
              </a>
              <a
                href="mailto:info@pixul.io"
                rel="noreferrer"
                className="btn-social"
                target="_blank"
              >
                <MdEmail size={20} />
              </a>
              <a
                href="https://github.com/project-pixul/Pixul-Ecosystem"
                rel="noreferrer"
                className="btn-social"
                target="_blank"
              >
                <BsGithub size={18} />
              </a>
              <a
                href="https://t.me/pixulchat"
                rel="noreferrer"
                className="btn-social"
                target="_blank"
              >
                <BsTelegram size={18} />
              </a>
            </div>
          </div>
          <div className="infos">
            <div className="info">
              <h2>Ecosystem</h2>
              <a href="https://marketplace.pixul.io/home" target="_blank">
                Marketplace
              </a>
              <NavHashLink to="xpixul#staking">Staking</NavHashLink>
              <NavHashLink to="/farm#">Farms</NavHashLink>
              <a href="https://www.pixul.io/" target="_blank">
                DEX
              </a>
            </div>
            <div className="info">
              <h2>Documents</h2>
              <a
                href="https://www.pixul.io/_files/ugd/31aeaa_211f1a6c68774e909ec9d35d07db2d6f.pdf"
                target="_blank"
              >
                Whitepaper
              </a>
              <a href="https://www.pixul.io/roadmap" target="_blank">
                Roadmap
              </a>
              <a href="https://www.pixul.io/transparency" target="_blank">
                Transparency
              </a>
              <a
                href="https://github.com/solidproof/projects/blob/main/Pixul/SmartContract_Audit_Solidproof_PixulToken.pdf"
                target="_blank"
              >
                Audits
              </a>
            </div>
            <div className="info">
              <h2>Protocol</h2>
              <a href="">Vote</a>
              <a href="">xPIXUL</a>
            </div>
          </div>
        </section>
      </div>
    </Router>
  );
};
