import * as React from "react";

import { withTranslation, useTranslation } from "react-i18next";
import { BaseComponent } from "../../shellInterfaces";
import { Fade, Slide } from "react-reveal";
import { pulse } from "react-animations";
import styled, { keyframes } from "styled-components";

import "./aboutComponent.css";

export type AboutProps = {};
export type AboutState = {};

const PulseAnimation = keyframes`${pulse}`;
const PulseDiv = styled.div`
  animation: infinite 8s ${PulseAnimation};
`;

const ProductsOverviewDiv = React.lazy(() => import("./productsOverview"));
const TeamDiv = React.lazy(() => import("./team"));

const aboutComponent = () => {
  const { t } = useTranslation();

  return (
    <div className="about-container">
      <div className="d-flex flex-row container" style={{ padding: "0px" }}>
        <div style={{ marginRight: "4%" }}>
          <h1>{t("about.title")}</h1>
          <p className="desc">{t("about.desc")}</p>
          <div className="staking_gov">
            <h2>{t("about.staking_gov.title")}</h2>
            <p>{t("about.staking_gov.paragraph1")}</p>
            <p>{t("about.staking_gov.paragraph2")}</p>
          </div>
          <div className="staking">
            <h2>{t("about.staking.title")}</h2>
            <p>{t("about.staking.paragraph1")}</p>
            <br />
            <p>{t("about.staking.paragraph2")}</p>
            <p>{t("about.staking.paragraph3")}</p>
            <p>{t("about.staking.paragraph4")}</p>
          </div>
          <div className="staking_eco">
            <h2>{t("about.staking_eco.title")}</h2>
            <p>{t("about.staking_eco.line1")}</p>
            <p>{t("about.staking_eco.line2")}</p>
          </div>
          <div className="receive">
            <h2>{t("about.recieving_pixul.title")}</h2>
            <ul>
              <li>{t("about.recieving_pixul.point1")}</li>
              <li>{t("about.recieving_pixul.point2")}</li>
              <li>{t("about.recieving_pixul.point3")}</li>
              <li>{t("about.recieving_pixul.point4")}</li>
              <li>{t("about.recieving_pixul.point5")}</li>
            </ul>
          </div>
          <div className="rewards">
            <h2>{t("about.protocol_rewards.title")}</h2>
            <ul>
              <li>{t("about.protocol_rewards.point1")}</li>
              <li>{t("about.protocol_rewards.point2")}</li>
              <li>{t("about.protocol_rewards.point3")}</li>
            </ul>
          </div>
          <div className="power">
            <h2>{t("about.power.title")}</h2>
            <ul>
              <li>{t("about.power.point1")}</li>
              <li>{t("about.power.point2")}</li>
              <li>{t("about.power.point3")}</li>
            </ul>
          </div>
          <div className="exchange">
            <h2>{t("about.exchange.title")}</h2>
            <p>{t("about.exchange.desc")}</p>
            <div>
              <h3>{t("about.exchange.breakdown.title")}</h3>
              <p>{t("about.exchange.breakdown.desc")}</p>
            </div>
          </div>
          <div className="farming">
            <h2>{t("about.farming.title")}</h2>
            <div>
              <h3>{t("about.farming.liquidity.title")}</h3>
              <p>{t("about.farming.liquidity.desc")}</p>
            </div>
            <div>
              <h3>{t("about.farming.earn.title")}</h3>
              <p>{t("about.farming.earn.desc")}</p>
            </div>
            <div>
              <h3>{t("about.farming.motive.title")}</h3>
              <p>{t("about.farming.motive.desc")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(aboutComponent);
