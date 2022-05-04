import * as React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ShellHost from "./shellHost";
import { BaseComponent, IShellPage } from "./shellInterfaces";
import {
  faMedium,
  faTwitter,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShellNav from "./shellNav";

import "./shell.css";

export type ShellProps = {
  pages: IShellPage[];
};
export type ShellState = {
  currentPage: IShellPage;
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
            <img src="/images/pixellogowebsitewhite.png" alt="Pixul Logo" />
            <p>
              Pixul | Developing cryto solutions for everyday business and
              personal transactions.
            </p>
            <div className="social-medias">
              <a
                href="#"
                rel="noreferrer"
                className="btn-social"
                target="_blank"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                href="#"
                rel="noreferrer"
                className="btn-social"
                target="_blank"
              >
                <FontAwesomeIcon icon={faMedium} />
              </a>
              <a
                href="#"
                rel="noreferrer"
                className="btn-social"
                target="_blank"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
          </div>
          <div className="infos">
            <div className="info">
              <h2>Ecosystem</h2>
              <a href="">Marketplace</a>
              <a href="">Staking</a>
              <a href="">Farms</a>
              <a href="">DEX</a>
            </div>
            <div className="info">
              <h2>Documents</h2>
              <a href="">Whitepaper</a>
              <a href="">Roadmap</a>
              <a href="">Transparency</a>
              <a href="">Audits</a>
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
