import * as React from "react";

import { BaseComponent } from "../../shellInterfaces";
import { TreasuryWalletAddress } from "../../contracts/pixul";
import { PixulStatistics } from "../../contracts/statistics";
import {
  withTranslation,
  WithTranslation,
  TFunction,
  useTranslation,
} from "react-i18next";
import { Slide } from "react-reveal";

import { Dex, Farm, Xpixul, Stake } from "./svgs";
import "./homeComponent.css";

// export type HomeProps = {};
// export type HomeState = {
//   exit?: boolean;
//   treasuryBalance?: number;
// };

// const RoadmapDiv = React.lazy(() => import("./roadmap"));
// const PixulAppDiv = React.lazy(() => import("./pixulApp"));
// const PixulForestDiv = React.lazy(() => import("./pixulForest"));
// const TokenStatisticsDiv = React.lazy(() => import("./tokenStatistics"));

const HomeComponent = () => {
  let _statistics: PixulStatistics;

  let _timeout = null;

  const [treasuryBalance, setTreasuryBalance] = React.useState<Number>(0);
  const [exit, setExit] = React.useState<Boolean>(false);
  _statistics = new PixulStatistics();

  const { t } = useTranslation();

  const tick = async () => {
    if (exit) {
      return;
    }
    await _statistics.refresh();
    setTreasuryBalance(_statistics.treasuryWalletBalance);

    _timeout = setTimeout(async () => await tick(), 60000);
  };

  React.useEffect(() => {
    tick();
    return () => {
      if (!!_timeout) {
        clearTimeout(_timeout);
        _timeout = null;
      }

      setExit(true);
    };
  }, []);

  //wasn't really sure if its needed or not
  // handleChange = ({ target: { treasuryBalance } }) => {
  //   this.setState({
  //     treasuryBalance,
  //   });
  // };

  // return(
  //   const state = this.readState();
  //   const t: TFunction<"translation"> = this.readProps().t;

  return (
    <div className="home-container">
      <div className="container">
        <section className="main flex-column d-flex justify-content-center align-items-center">
          <div className="flex-column d-flex justify-content-center firstSection align-items-center">
            <img
              src="https://res.cloudinary.com/rk03/image/upload/v1651852307/pixullogo_r7bycd.png"
              alt=""
            />
            <h1 className="d-flex justify-content-center align-items-center">
              <strong className="title-white">{t("home.subtitle1")}</strong>
              <br />
            </h1>
            <p className="paragraph1">{t("home.paragraph1")}</p>
            <div className="learn hero-buttons d-flex justify-content-center align-items-center">
              <Slide left>
                <a
                  className="shadow btn btn-lg"
                  role="button"
                  // href='/whitepaper.pdf'
                  target="_blank"
                >
                  {t("home.learn")}
                </a>
              </Slide>
            </div>
          </div>

          <div className="stat-container">
            <p className="stats">
              <span>$0.015</span>
              <span className="statname">{t("home.stat1")}</span>
            </p>
            <p className="stats">
              <span>$50m</span>
              <span className="statname">{t("home.stat2")}</span>
            </p>
            <p className="stats">
              <span>$100m</span>
              <span className="statname">{t("home.stat3")}</span>
            </p>
            <p className="stats">
              <span>204</span>
              <span className="statname">{t("home.stat4")}</span>
            </p>
          </div>

          <div className="explore">
            <span>{t("home.explore.explore_header")}</span>
            <div className="exploreCards d-flex flex-column align-items-center">
              <div className="exploreCard">
                <Stake />
                <div className="content">
                  <div className="contentBody">
                    <h2>{t("home.explore.stake_header")}</h2>
                    <p>{t("home.explore.stake_paragraph")}</p>
                  </div>
                  <a href="/xpixul" className="btn">
                    {t("home.explore.stake_button")}
                  </a>
                </div>
              </div>

              <div className="exploreCard">
                <Farm />
                <div className="content">
                  <div className="contentBody">
                    <h2>{t("home.explore.farm_header")}</h2>
                    <p>{t("home.explore.farm_paragraph")}</p>
                  </div>
                  <a href="/farm" className="btn">
                    {t("home.explore.farm_button")}
                  </a>
                </div>
              </div>

              <div className="exploreCard">
                <Xpixul />
                <div className="content">
                  <div className="contentBody">
                    <h2>{t("home.explore.xpixul_header")}</h2>
                    <p>{t("home.explore.xpixul_paragraph")}</p>
                  </div>
                  <a href="#" className="btn">
                    {t("home.explore.xpixul_button")}
                  </a>
                </div>
              </div>

              <div className="exploreCard ">
                <Dex />
                <div className="content">
                  <div className="contentBody">
                    <h2>{t("home.explore.dex_header")}</h2>
                    <p>{t("home.explore.dex_paragraph")}</p>
                  </div>
                  <a href="#" className="btn">
                    {t("home.explore.dex_button")}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="social">
            <span>{t("home.social.social_header")}</span>
            <div className="socialCards">
              <div className="socialCard">
                <svg
                  className="socialIcon"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 500 500"
                  xmlSpace="preserve"
                >
                  <g id="_x32_4Kame.tif">
                    <g>
                      <g>
                        <path
                          className="st0"
                          d="M201.78,125.3c4.02,0,8.04,0,12.06,0c5.15,4.41,5.67,11.42,9.55,17.46c21.63-3.29,43.43-3.21,65.63-0.02
				c2.67-6.44,4.42-12.82,9.21-17.45c4.02,0,8.04,0,12.06,0c4.3,1.12,8.54,2.51,12.9,3.32c41.17,7.63,69.31,28.82,81.13,70.96
				c7.08,25.26,13.42,50.71,20.5,75.96c0,20.03,0,40.07,0,60.1c-18.26,20.41-41.19,32.75-67.67,39.03
				c-26.78,6.36-26.73,6.4-43.35-15.9c-2.02-2.71-3.34-6.27-8.2-7.56c-33.21,7.71-67.51,6.68-101.69-0.08
				c-4.06,5.5-8.29,9.95-11.01,15.17c-5.55,10.65-14.38,13.29-25.11,11.23c-23.34-4.47-45.49-11.92-64.57-26.76
				C89.77,340.32,82.37,328,84.14,309.75c4.51-46.61,15.23-91.46,33.65-134.56c7.1-16.62,19.44-27.21,35.43-34.84
				C168.74,132.95,185.63,130.42,201.78,125.3z M176.33,362.45c4.47-4.94,9.38-9.16,10.3-16.27c-13.71-5.61-27.15-11.1-39.05-19.63
				c-4.75-3.41-9.51-7.24-5.39-13.38c3.81-5.67,8.48-2.22,13.03,0.37c67.03,38.19,134.17,38.34,201.23,0.11
				c4.56-2.6,9.16-5.98,13.21-0.68c4.77,6.25-0.6,9.96-5.06,13.34c-11.94,9.05-26.1,14.05-40.58,20.75
				c5.45,7.49,7.25,17.5,18.81,15.16c23.34-4.74,45.55-12.07,62.91-29.62c4.39-4.44,7.24-8.97,6.77-15.76
				c-3.32-48.27-13.26-94.97-34.14-138.83c-10.03-21.06-47.02-37.58-72.24-32.7c20.12,8.35,41.49,11.65,56.4,27.48
				c-5.55,14.04-12.89,6.7-19.49,3.51c-56.29-27.17-112.87-27.18-170.01-2.5c-6.68,2.89-15.49,14.88-21.23,2.73
				c-4.87-10.3,8.71-12.72,15.55-16.1c12.04-5.96,24.92-10.23,40.83-16.55c-42.52-0.88-69.21,16.73-82.47,51.76
				c-11.89,31.43-20.34,63.66-23.76,97.19c-3.8,37.24,2.34,47.45,38.16,61.09C151.79,358.33,163.55,362.53,176.33,362.45z"
                        />
                        <path
                          className="st0"
                          d="M337.83,267.87c-0.31,20.23-15.67,36.81-33.82,36.53c-18.54-0.29-33.72-18.16-33.08-38.95
				c0.62-20.18,16.28-36.21,34.76-35.6C323.89,230.46,338.14,247.32,337.83,267.87z M301.96,245.45
				c-10.91,1.44-15.59,9.8-15.74,21.57c-0.17,12.62,7.25,21.23,18.01,21.4c11.24,0.18,18.99-9.15,18.57-22.37
				C322.4,253.5,314.77,245.13,301.96,245.45z"
                        />
                        <path
                          className="st0"
                          d="M173.88,267.06c0-20.3,14.85-36.98,33.13-37.21c18.34-0.22,33.74,16.21,34.08,36.35c0.35,20.72-15.35,38.34-33.96,38.11
				C189.07,304.09,173.88,287.07,173.88,267.06z M189.46,263.89c0.06,16.37,6.93,24.55,17.87,24.6c10.7,0.05,18.38-8.64,18.58-21.02
				c0.21-13.11-7.85-22.79-19.03-21.98C193.6,246.45,189.74,255.55,189.46,263.89z"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
                <div className="content">
                  <h2>Discord</h2>
                  <a href="#" className="btn">
                    Join Discord
                  </a>
                </div>
              </div>

              <div className="socialCard">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 308.431 218.379"
                  className="socialIcon telegram"
                >
                  <g id="YyENtX.tif" transform="translate(-98.34 -142.144)">
                    <g id="Group_2" data-name="Group 2">
                      <g id="Group_1" data-name="Group 1">
                        <path
                          id="Path_1"
                          className="st0"
                          data-name="Path 1"
                          d="M396.786,142.144c9.852,5.535,11.774,14.028,8.541,24.09-10.062,31.322-21.612,62.09-34.414,92.394a112.239,112.239,0,0,0-5.452,16.22c-5.992,23.8-17.461,45.553-25.274,68.7-6.347,18.81-20.559,21.976-36.5,9.545-16.007-12.483-31.962-25.088-47.207-38.476-7.353-6.457-13.3-4.807-19.31.332A137.215,137.215,0,0,1,210.9,332.6c-14,7.239-20.843,2.5-25.506-12.5-5.415-17.421-6.9-34.964-7.321-52.849-.192-8.093-4.432-12.191-11.949-14.8-18.833-6.528-37.38-13.879-56.13-20.655-6.094-2.2-11.937-4.8-11.639-12.182.285-7.07,5.666-10.46,12.063-12q55.168-13.257,110.36-26.419,81.885-19.545,163.78-39.051Zm-289.63,79.492c25.265,9.128,48.837,17.811,72.584,25.985,2.607.9,6.425-.643,9.326-1.885,14.219-6.084,28.29-12.513,42.464-18.7q53.144-23.211,106.364-46.245c3.09-1.334,7.309-4.478,9.8-.125,2.426,4.231-2.012,6.518-4.924,8.483q-23.244,15.678-46.664,31.092c-25.054,16.554-50.144,33.052-78.524,51.752,3.888,1.815,6.182,2.277,7.614,3.645,26.8,25.6,56.716,47.489,84.9,71.433,9.059,7.7,14.895,5.976,19.733-5.252,13.68-31.747,25.713-64.135,36.6-96.945,1.542-4.646,3.9-8.9,5.766-13.321,9.336-22.088,15.438-45.368,24.309-67.7,4.3-10.814-1.008-14.85-12.76-12.235-6.755,1.5-13.544,2.861-20.279,4.448q-119.469,28.155-238.916,56.4C119.108,213.755,113.222,214.327,107.156,221.636Zm88.119,99.712c2.193-12.327,3.313-21.254,5.433-29.936,3.389-13.881,7.91-26.014,22.315-34.171,22.665-12.833,43.594-28.745,65.258-43.353-31.786,11.743-62.631,25.2-93.432,38.76-3.694,1.626-7.737,3.335-6.95,8.707C190.668,280.262,189.995,299.587,195.275,321.348Zm44.4-19.767c-6.9-6.178-12.783-11.719-18.981-16.879-3.171-2.639-6.434-3.635-7.8,2.2a235.739,235.739,0,0,0-5.875,36.7C219.782,318.281,229.476,310.66,239.679,301.581Z"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
                <div className="content">
                  <h2>Telegram</h2>
                  <a href="#" className="btn">
                    Join Telegram
                  </a>
                </div>
              </div>

              <div className="socialCard">
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  className="socialIcon"
                  viewBox="0 0 500 500"
                  xmlSpace="preserve"
                >
                  <g id="OWXIek.tif">
                    <g>
                      <g>
                        <path
                          className="st0"
                          d="M101.12,220.21c15.62-27.94,32.92-33.99,61.33-20.85c5.16,2.38,9.22,2.5,14.18,0c16.95-8.56,34.95-13.95,53.88-15.61
                            c6.7-0.59,9.18-3.45,10.68-9.89c8.94-38.53,34.39-56.2,74.55-51.84c5.62,0.61,9.68-1.78,14.3-3.59
                            c15.43-6.05,30.94-2.48,41.33,9.38c10.31,11.78,12.16,29.21,4.48,42.28c-8.38,14.27-23.47,20.97-40.06,17.41
                            c-3.49-0.75-6.88-2.49-9.97-4.34c-2.34-1.4-4.27-3.77-2.76-6.9c1.43-2.96,4.13-3.17,7.05-2.68c4.95,0.83,9.92,2.26,14.88,2.23
                            c14.4-0.07,23.03-8.93,23.31-23.19c0.28-14.47-9.21-24.75-23.25-25.2c-13.29-0.43-24.06,8.99-25.25,22.1
                            c-0.08,0.91,0.09,1.87-0.11,2.74c-1.18,5.07,4.71,14.52-4.65,14.22c-8.4-0.27-7.79-9.98-7.4-16.69
                            c1.04-18.05-2.27-20.67-20.15-14.79c-15.8,5.19-26.88,15.49-32.65,31.14c-3.6,9.76-1.04,16.49,10.33,17.06
                            c21.91,1.12,42.53,6.82,61.99,16.7c5.32,2.7,9.37,1.32,14.07-1.33c12.28-6.94,25.01-8.22,38.22-2.16
                            c24.6,11.28,30.24,40.68,10.27,58.73c-6.93,6.26-10.23,12.34-9.28,21.23c0.24,2.26,0.32,4.65-0.12,6.86
                            c-1.34,6.77,0.18,17.86-9.07,17.08c-9.41-0.8-3.42-10.63-2.89-16.07c2.49-25.68-7.4-45.54-27.06-61.26
                            c-48.21-38.52-131.48-38.47-180,0.1c-34.7,27.59-36.83,68.97-5.33,100.15c16.94,16.77,37.81,26.31,60.67,30.35
                            c53.53,9.47,102.54,1.83,140.66-41.56c2.81-3.2,6.06-6.92,10.29-3.31c4.34,3.71,0.59,7.66-1.76,10.82
                            c-20.74,27.84-50.38,40.11-83.06,46.97c-3.57,0.75-7.13,1.55-10.69,2.33c-13.79,0-27.57,0-41.36,0
                            c-21.5-4.41-42.87-9.25-61.87-20.98c-28.47-17.58-48.01-40.62-46.57-76.4c0.19-4.69-0.24-9.24-4.72-12.09
                            c-7.65-4.86-11.44-12.86-16.43-19.89C101.12,233.05,101.12,226.63,101.12,220.21z M113.01,230.59
                            c-0.24,4.76,1.99,9.67,5.79,13.91c3.62,4.05,7.52,5.98,10.63-0.34c5.58-11.34,13.91-20.35,23.22-28.63
                            c4.11-3.66,4.26-6.25-1.41-8.95C134.87,198.81,113.04,211.73,113.01,230.59z M389.76,229.67c0.05-16.02-17.67-28.67-34.26-24.39
                            c-7.99,2.06-11.98,5.03-3.43,12.15c8.14,6.78,15.18,14.78,20.02,24.25c5.35,10.46,9.81,6.91,14.37-0.28
                            C388.69,237.87,389.96,233.95,389.76,229.67z"
                        />
                        <path
                          className="st0"
                          d="M250.92,328.32c-19.38-0.92-37.58-5.1-54.09-15.03c-3.69-2.22-9.21-4.95-5.54-10.51c3.03-4.59,7.54-1.45,11.06,0.46
                            c30.49,16.49,61.4,16.58,92.77,2.69c4.02-1.78,9.12-5.25,11.83,0.9c2.61,5.9-3.32,7.79-7.15,9.77
                            C284.41,324.52,267.81,327.61,250.92,328.32z"
                        />
                        <path
                          className="st0"
                          d="M297.24,233.74c12.01-0.43,24.03,11.12,24.35,23.39c0.32,12.24-11,24-23.33,24.24c-12.88,0.25-23.67-10.19-24.01-23.22
                            C273.9,245.18,284.25,234.21,297.24,233.74z M297.04,245.99c-6.9,1.16-10.75,5.13-10.45,12.1c0.31,7.08,4.61,10.84,11.6,10.74
                            c6.95-0.1,11.43-3.89,11.26-11C309.27,250.26,304.47,246.53,297.04,245.99z"
                        />
                        <path
                          className="st0"
                          d="M228.5,257.89c-0.07,12.92-10.76,23.5-23.73,23.49c-12.2-0.01-23.71-11.64-23.68-23.92
                            c0.02-12.2,11.88-23.93,23.99-23.74C217.69,233.92,228.56,245.14,228.5,257.89z M216.38,256.68
                            c-0.97-5.93-4.18-10.72-11.36-10.48c-7.49,0.25-11.96,4.78-11.68,12.34c0.27,7.11,4.99,10.52,11.93,10.28
                            C212.4,268.56,215.82,264.29,216.38,256.68z"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
                <div className="content">
                  <h2>Reddit</h2>
                  <a href="#" className="btn">
                    Join Reddit
                  </a>
                </div>
              </div>

              <div className="socialCard">
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  className="socialIcon"
                  viewBox="0 0 500 500"
                  xmlSpace="preserve"
                >
                  <g id="seyZXW.tif">
                    <g>
                      <g>
                        <path
                          className="st0"
                          d="M234.65,385.14c-20.47,0-40.94,0-61.4,0c-23.09-5.62-45.58-12.76-65.76-25.8c-10.02-6.47-12.9-15.97-9.5-26.62
                            c3.4-10.65,12.38-14.62,23.11-13.99c6.03,0.35,11.97,1.33,17.96-0.34c3.96-1.11,6.22-3.28,2.94-6.73
                            c-14-14.71-16.67-34.9-25.04-52.27c-16.75-34.76-12.72-71.91-2.53-107.4c6.49-22.62,25.08-24.61,41.39-7.04
                            c15.1,16.27,32.61,28.85,53.29,36.99c16.9,6.65,17.63,6.34,24.55-9.87c17.77-41.62,62.49-60.68,102.36-42.15
                            c12.61,5.86,22.67,6.81,35.21,0.52c14.83-7.44,28.07-0.07,31.37,16.2c1.26,6.21,2.87,11.59,7.9,15.6c0,5.57,0,11.15,0,16.72
                            c-12.35,16.19-28.54,29.21-30.03,52.74c-1.96,31.13-15.57,58.74-33.95,83.88C318.58,353.78,280.22,375.23,234.65,385.14z
                            M374,154.43c-17.34,10.95-30.65,5.7-46.21-2.48c-34.23-18-74.16,7.28-75.87,45.94c-0.72,16.21-1.9,17.53-17.94,14.91
                            c-31.52-5.15-59.06-18.74-82.97-39.91c-4.67-4.13-8.78-13.68-14.43-10.93c-7.05,3.43-6.12,13.68-6.64,21.45
                            c-0.21,3.15,0.95,6.38,1.42,9.58c2.03,13.87,10.74,24.15,19.8,34.72c-2.2,0.89-3.38,1.55-4.64,1.85
                            c-5.26,1.23-11.95-6.24-15.21-0.22c-3.01,5.57,1.69,12.43,4.5,18.2c5.27,10.81,13.92,18.33,24.46,23.94
                            c2.96,1.58,7.58,1.59,7.62,6.64c-17.88,6.12-18.36,9.52-3.58,23.06c6.68,6.11,14.62,9.68,23.07,12.51
                            c3.23,1.09,8.57,0.11,8.74,5.09c0.14,4.07-4.31,5.72-7.44,7.49c-4.83,2.75-9.87,5.16-14.91,7.5
                            c-14.34,6.66-29.94,7.83-46.97,9.16c2.62,1.96,3.58,2.97,4.76,3.54c91.68,43.91,204.46-0.79,225.14-111.83
                            c3.66-19.64,1.96-40.85,21.47-54.04c0.22-0.15-0.42-1.56-0.75-2.66c-5.24-1.85-10.61,4.01-16.23-0.02
                            C362.98,169.68,373.99,167.06,374,154.43z"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
                <div className="content">
                  <h2>Twitter</h2>
                  <a href="" className="btn">
                    Join Twitter
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default withTranslation()(HomeComponent);
