import * as React from "react";

import { withTranslation, useTranslation } from "react-i18next";
import { Slide } from "react-reveal";

import "./pixulApp.css";

const PixulApp: React.FC = ({}) => {
  const { t } = useTranslation();

  return (
    <div className="pixul-container">
      <div className="staking-content">
        <div className="pixul-header">
          <div className="app-text">
            <h1>
              <strong>{t("home.pixul_app.title")}</strong>
            </h1>
            <p>{t("home.pixul_app.paragraph")}</p>
          </div>
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 200 200"
            xmlSpace="preserve"
          >
            <g>
              <g>
                <g>
                  <path
                    className="st0"
                    d="M107.52,86.26c-2.07-1.15-3.95-2.2-5.82-3.24c-6.83-3.81-13.66-7.62-20.5-11.42
                            c-5.3-2.94-10.6-5.89-15.91-8.8c-0.95-0.52-1.4-1.09-1.39-2.26c0.06-8.64,0.05-17.28,0.01-25.92c0-0.89,0.3-1.32,1.07-1.74
                            c5.14-2.77,10.25-5.6,15.37-8.4c3.33-1.82,6.67-3.63,10-5.46c0.36-0.2,0.64-0.21,1.01-0.01c5.09,2.81,10.18,5.61,15.27,8.4
                            c3.65,2,7.3,4,10.95,6c5.02,2.75,10.04,5.51,15.06,8.27c3.65,2,7.3,4,10.95,6c4.9,2.69,9.79,5.39,14.68,8.08
                            c0.93,0.51,1.86,1.02,2.81,1.5c0.46,0.23,0.69,0.54,0.65,1.05c-0.01,0.17,0,0.34,0,0.5c0,18.51,0,37.02,0.03,55.53
                            c0,1.02-0.36,1.54-1.24,2c-5.78,3.06-11.52,6.18-17.28,9.28c-4.08,2.2-8.18,4.37-12.26,6.57c-4.31,2.31-8.6,4.65-12.92,6.95
                            c-0.64,0.34-0.62,0.85-0.62,1.41c0,8.72-0.02,17.45,0.03,26.17c0.01,1.16-0.35,1.79-1.36,2.36c-7.8,4.36-15.57,8.78-23.35,13.18
                            c-0.05,0.03-0.1,0.05-0.15,0.08c-2.48,1.44-2.48,1.43-5,0.08c-6.13-3.29-12.26-6.58-18.39-9.87c-1.48-0.79-2.94-1.61-4.43-2.37
                            c-0.62-0.32-0.88-0.73-0.88-1.45c0.02-19.13,0.02-38.25,0.01-57.38c0-0.63,0.2-1,0.78-1.32c6.36-3.51,12.69-7.06,19.05-10.58
                            c6.01-3.33,12.03-6.64,18.04-9.97C103.65,88.45,105.49,87.4,107.52,86.26z"
                  />
                </g>
              </g>
              <g>
                <linearGradient
                  id="SVGID_1_"
                  gradientUnits="userSpaceOnUse"
                  x1="31.7682"
                  y1="116.4411"
                  x2="100.6958"
                  y2="185.3687"
                >
                  <stop offset="0" className="line0" />
                  <stop offset="0.4913" className="line1" />
                  <stop offset="1" className="line2" />
                </linearGradient>
                <path
                  className="st1"
                  d="M65.42,163.44L51.7,183.43H30.59l24.49-33.19l-25.03-32.07H51.7l15.35,19.71l13.5-19.71h21.11l-24.27,32.91
			                    l25.25,32.35H80.98L65.42,163.44z"
                />
              </g>
            </g>
          </svg>
        </div>
        <div className="banner">
          <p className="banner-name">
            {t("home.pixul_app.banner.banner_name")}
          </p>
          <p className="banner-stat">
            <span>8.96%</span>
            <span className="banner-stat-small">
              {t("home.pixul_app.banner.banner_stat")}
            </span>
          </p>
        </div>
        <div className="pixul-card-container">
          <div className="pixul-card">
            <img src="/images/pixulfavicon.png" alt="" />
            <div className="pixul-card-text">
              <span className="title">
                {t("home.pixul_app.pixul_cards.pixul_card1")}
              </span>
              <span className="balance">970,400</span>
            </div>
          </div>
          <div className="pixul-card">
            <svg
              className="cardIcon"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 200 200"
              xmlSpace="preserve"
            >
              <g>
                <g>
                  <g>
                    <path
                      className="st0"
                      d="M107.52,86.26c-2.07-1.15-3.95-2.2-5.82-3.24c-6.83-3.81-13.66-7.62-20.5-11.42
                            c-5.3-2.94-10.6-5.89-15.91-8.8c-0.95-0.52-1.4-1.09-1.39-2.26c0.06-8.64,0.05-17.28,0.01-25.92c0-0.89,0.3-1.32,1.07-1.74
                            c5.14-2.77,10.25-5.6,15.37-8.4c3.33-1.82,6.67-3.63,10-5.46c0.36-0.2,0.64-0.21,1.01-0.01c5.09,2.81,10.18,5.61,15.27,8.4
                            c3.65,2,7.3,4,10.95,6c5.02,2.75,10.04,5.51,15.06,8.27c3.65,2,7.3,4,10.95,6c4.9,2.69,9.79,5.39,14.68,8.08
                            c0.93,0.51,1.86,1.02,2.81,1.5c0.46,0.23,0.69,0.54,0.65,1.05c-0.01,0.17,0,0.34,0,0.5c0,18.51,0,37.02,0.03,55.53
                            c0,1.02-0.36,1.54-1.24,2c-5.78,3.06-11.52,6.18-17.28,9.28c-4.08,2.2-8.18,4.37-12.26,6.57c-4.31,2.31-8.6,4.65-12.92,6.95
                            c-0.64,0.34-0.62,0.85-0.62,1.41c0,8.72-0.02,17.45,0.03,26.17c0.01,1.16-0.35,1.79-1.36,2.36c-7.8,4.36-15.57,8.78-23.35,13.18
                            c-0.05,0.03-0.1,0.05-0.15,0.08c-2.48,1.44-2.48,1.43-5,0.08c-6.13-3.29-12.26-6.58-18.39-9.87c-1.48-0.79-2.94-1.61-4.43-2.37
                            c-0.62-0.32-0.88-0.73-0.88-1.45c0.02-19.13,0.02-38.25,0.01-57.38c0-0.63,0.2-1,0.78-1.32c6.36-3.51,12.69-7.06,19.05-10.58
                            c6.01-3.33,12.03-6.64,18.04-9.97C103.65,88.45,105.49,87.4,107.52,86.26z"
                    />
                  </g>
                </g>
                <g>
                  <linearGradient
                    id="SVGID_1_"
                    gradientUnits="userSpaceOnUse"
                    x1="31.7682"
                    y1="116.4411"
                    x2="100.6958"
                    y2="185.3687"
                  >
                    <stop offset="0" className="line0" />
                    <stop offset="0.4913" className="line1" />
                    <stop offset="1" className="line2" />
                  </linearGradient>
                  <path
                    className="st1"
                    d="M65.42,163.44L51.7,183.43H30.59l24.49-33.19l-25.03-32.07H51.7l15.35,19.71l13.5-19.71h21.11l-24.27,32.91
			                    l25.25,32.35H80.98L65.42,163.44z"
                  />
                </g>
              </g>
            </svg>
            <div className="pixul-card-text">
              <span className="title">
                {t("home.pixul_app.pixul_cards.pixul_card2")}
              </span>
              <span className="balance">87,000</span>
            </div>
          </div>
          <div className="pixul-card">
            <img src="/images/pixulfavicon.png" alt="" />
            <div className="pixul-card-text">
              <span className="title">
                {t("home.pixul_app.pixul_cards.pixul_card3")}
              </span>
              <span className="balance">22,005,849</span>
            </div>
          </div>
        </div>
      </div>
      <div className="pixul-stake-container">
        <div className="pixul-stake">
          <div className="pixul-stake-header">
            <div className="stake">
              <p>Stake Pixul</p>
            </div>
            <div className="stake">
              <p>Unstake Pixul</p>
            </div>
          </div>
          <div className="stake-pixul-container">
            <h2>{t("home.pixul_app.stake_pixul.title")}</h2>
            <div className="stake-pixul-balance">
              <span className="pixual-amount">0 PIXUl</span>
              <span className="pixul-balance">
                <span>Balance: </span>
                <button>Max</button>
              </span>
            </div>
          </div>
          <div className="time-frame-container">
            <div className="time-frame">
              <input type="radio" name="time" id="" />
              <label htmlFor="time">1 week</label>
            </div>
            <div className="time-frame">
              <input type="radio" name="time" id="" />
              <label htmlFor="time">1 month</label>
            </div>
            <div className="time-frame">
              <input type="radio" name="time" id="" />
              <label htmlFor="time">3 months</label>
            </div>
            <div className="time-frame">
              <input type="radio" name="time" id="" />
              <label htmlFor="time">6 months</label>
            </div>
            <div className="time-frame">
              <input type="radio" name="time" id="" />
              <label htmlFor="time">1 year</label>
            </div>
            <div className="time-frame">
              <input type="radio" name="time" id="" />
              <label htmlFor="time">2 years</label>
            </div>
            <div className="time-frame">
              <input type="radio" name="time" id="" />
              <label htmlFor="time">4 years</label>
            </div>
          </div>
          <button className="btn-wallet">Connect Wallet</button>
        </div>
        <div className="pixul-stat">
          <h1>xPIXUL Stats</h1>
          <div className="values">
            <div className="value">
              <h2>Total PIXUL Locked</h2>
              <p>-</p>
            </div>
            <div className="value">
              <h2>Total PIXUL Locked Value</h2>
              <p>-</p>
            </div>
            <div className="value">
              <h2>Average Unlock Time (Days)</h2>
              <p>-</p>
            </div>
            <div className="value">
              <h2>Average APR</h2>
              <p>-</p>
            </div>
            <div className="value">
              <h2>Next Distribution Block</h2>
              <p>-</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(PixulApp);
