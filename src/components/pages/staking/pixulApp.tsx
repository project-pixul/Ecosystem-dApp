import * as React from "react";

import { withTranslation, useTranslation } from "react-i18next";

import { BiDownArrow, BiInfoCircle } from "react-icons/bi";

import { useWeb3React, Web3ReactProvider } from "@web3-react/core";

import web3 from "web3";

import { injected } from "../../../web3/Connector";
import TokenMigratorABI from "../../../web3/abis/TokenMigrator.json";
import PixulTokenABI from "../../../web3/abis/Pixul.json";
import xPixulTokenABI from "../../../web3/abis/xPixul.json";

import "./pixulApp.css";
import PixulConvert from "./pixulConvert";
import useOnClickOutside from "../../../hooks/useOnClickOutSide";

const PixulApp = () => {
  const { t } = useTranslation();
  const [migrateState, setMigrateState] = React.useState(true);
  const [stakingState, setStakingState] = React.useState(true);
  const [showInfo, setInfoState] = React.useState(false);
  const migrateRef = React.useRef<HTMLDivElement>();
  const infoRef = React.useRef<HTMLDivElement>();
  const pixulInputRef = React.useRef<HTMLInputElement>();

  const [pixulBalance, setPixulBalance] = React.useState<number>(0);
  const [xPixulBalance, setXPixulBalance] = React.useState<number>(0);
  const [claimableTokens, setClaimableTokens] = React.useState<number>(0);

  const [toInputValue, setToInputValue] = React.useState<number>(0);
  const [fromInputValue, setFromInputValue] = React.useState<number>(0);
  const [stakingInputValue, setStakingInputValue] = React.useState<number>(0);
  const [stakeTiming, setStakeTiming] = React.useState<number>(0);

  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  useOnClickOutside(infoRef, setInfoState, "info");

  const connectWallet = async () => {
    await activate(injected);
  };

  const migrate = async () => {
    console.log(234);
    const migratorContract = new library.eth.Contract(
      TokenMigratorABI,
      "0xa08733b1ab4CF224fFBD1c3Bf43EEeaA3200cb2A"
    );

    const pixulTokenContract = new library.eth.Contract(
      PixulTokenABI,
      "0x46b055324ba9389543DD54432D03e6B37CeAAf69"
    );

    const xPixulTokenContract = new library.eth.Contract(
      xPixulTokenABI,
      "0x5C059Bcfd4312376f4AE0f0e331e3371029239cD"
    );

    if (migrateState) {
      console.log(345);
      await xPixulTokenContract.methods
        .approve(
          "0xa08733b1ab4CF224fFBD1c3Bf43EEeaA3200cb2A",
          web3.utils.toWei(fromInputValue.toString(), "ether")
        )
        .send({ from: account });

      await migratorContract.methods
        .migrateFromStakingToReward(
          web3.utils.toWei(fromInputValue.toString(), "ether")
        )
        .send({ from: account });
    } else {
      console.log(456);
      await pixulTokenContract.methods
        .approve(
          "0xa08733b1ab4CF224fFBD1c3Bf43EEeaA3200cb2A",
          web3.utils.toWei(fromInputValue.toString(), "ether")
        )
        .send({ from: account });

      await migratorContract.methods
        .migrateFromRewardToStaking(
          web3.utils.toWei(fromInputValue.toString(), "ether")
        )
        .send({ from: account });
    }
  };

  //changing all the states
  const toggleMigrate = (): void => {
    setMigrateState((prevState): boolean => {
      return !prevState;
    });
    setFromInputValue(0);
  };

  const toggleInfo = (): void => {
    setInfoState((prevState): boolean => {
      return !prevState;
    });
  };

  const toggleStaking = () => {
    setStakingState((prevState) => {
      return !prevState;
    });
  };

  //changing background image
  React.useEffect(() => {
    document.querySelector(".main-wrapper").className = "main-wrapper xpixul";
    return () => {
      document.querySelector(".main-wrapper").className = "main-wrapper";
    };
  }, []);

  React.useEffect(() => {
    console.log(123);
    async function updateAppState() {
      const pixulTokenContract = new library.eth.Contract(
        PixulTokenABI,
        "0x46b055324ba9389543DD54432D03e6B37CeAAf69"
      );

      const pixul_balance = await pixulTokenContract.methods
        .balanceOf(account)
        .call({ from: account });

      const xPixulTokenContract = new library.eth.Contract(
        xPixulTokenABI,
        "0x5C059Bcfd4312376f4AE0f0e331e3371029239cD"
      );

      const xpixul_balance = await xPixulTokenContract.methods
        .balanceOf(account)
        .call({ from: account });
      console.log(web3.utils.fromWei(pixul_balance, "ether"));
      console.log(web3.utils.fromWei(xpixul_balance));

      setPixulBalance(parseInt(web3.utils.fromWei(pixul_balance, "ether")));
      setXPixulBalance(parseInt(web3.utils.fromWei(xpixul_balance)));
    }
    if (account) updateAppState();
  }, [account]);

  const stakeTimingChangeHandler = ({ target }) => {
    if (target.nodeName === "INPUT") {
      setStakeTiming(target.value);
    }
  };

  const stakingAmountChangeHandler = ({ target }) => {
    setStakingInputValue(target.value);

    //changing input size based on the count of digits
    if (target.value.length === 0) {
      return (target.style.width = "1.6ch");
    }
    target.style.width = `${target.value.length + 0.6}ch`;
  };

  const setStakingFieldToMax = () => {
    setStakingInputValue(xPixulBalance);

    //changing the input size
    if (xPixulBalance.toString().length === 0) {
      return (pixulInputRef.current.style.width = "1.6ch");
    }
    pixulInputRef.current.style.width = `${
      xPixulBalance.toString().length + 0.6
    }ch`;
  };

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
            <img
              src="https://res.cloudinary.com/rk03/image/upload/v1652517551/pixulfavicon_dptdpm.png"
              alt=""
            />
            <div className="pixul-card-text">
              <span className="title">
                {t("home.pixul_app.pixul_cards.pixul_card1")}
              </span>
              <span className="balance">970,400</span>
            </div>
          </div>
          <div className="pixul-card">
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
            <div className="pixul-card-text">
              <span className="title">
                {t("home.pixul_app.pixul_cards.pixul_card2")}
              </span>
              <span className="balance">87,000</span>
            </div>
          </div>
          <div className="pixul-card">
            <img
              src="https://res.cloudinary.com/rk03/image/upload/v1652517551/pixulfavicon_dptdpm.png"
              alt=""
            />
            <div className="pixul-card-text">
              <span className="title">
                {t("home.pixul_app.pixul_cards.pixul_card3")}
              </span>
              <span className="balance">22,005,849</span>
            </div>
          </div>
          <div className="pixul-card">
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
            <div className="pixul-card-text">
              <span className="title">Total xPIXUL Locked</span>
              <span className="balance">10,005,849</span>
            </div>
          </div>
        </div>
      </div>
      <span className="pixul-conv-title">Migrate PIXUL for xPIXUL</span>
      <div className="pixul-conv-container">
        <div className="pixul-migrate" ref={migrateRef}>
          <BiInfoCircle className="info" onClick={toggleInfo} />
          <div className="switcher" onClick={toggleMigrate}>
            <div
              className="to-pixul"
              style={{ backgroundColor: migrateState ? "#1e1e28" : "#272634" }}
            >
              Migrate to PIXUL
            </div>
            <div
              className="to-xpixul"
              style={{ backgroundColor: !migrateState ? "#1e1e28" : "#272634" }}
            >
              Migrate to xPIXUL
            </div>
          </div>
          <PixulConvert
            tokenBalance={!migrateState ? pixulBalance : xPixulBalance}
            key="from"
            convertType={true}
            convertToken={!migrateState}
            inputValue={fromInputValue}
            setInputValue={setFromInputValue}
          />
          <BiDownArrow
            style={{
              alignSelf: "center",
              marginTop: "1em",
              marginBottom: "1em",
              fill: "gray",
            }}
            size={20}
          />
          <PixulConvert
            tokenBalance={migrateState ? pixulBalance : xPixulBalance}
            key="to"
            convertType={false}
            convertToken={migrateState}
            inputValue={fromInputValue}
            setInputValue={setFromInputValue}
          />
          {account ? (
            <button className="connect-wallet" onClick={migrate}>
              Migrate
            </button>
          ) : (
            <button className="connect-wallet" onClick={connectWallet}>
              Connect Wallet
            </button>
          )}
        </div>
        <div
          className="instructions"
          style={{
            visibility:
              window.innerWidth < 1030
                ? showInfo
                  ? "visible"
                  : "hidden"
                : "visible",
            top: "25px",
            left: `${
              showInfo
                ? migrateRef.current.clientWidth -
                  (infoRef.current.clientWidth + 25)
                : 0
            }px`,
            backgroundColor: showInfo ? "#232329" : "",
          }}
          ref={infoRef}
        >
          <h4>Instructions</h4>
          {migrateState ? (
            <>
              <p>Step 1: Connect your wallet </p>
              <p>
                Step 2: Choose the amount of xPIXUL tokens you want to unstake
              </p>
              <p>Step 3: Migrate your xPIXUL to PIXUL on our migration swap </p>
            </>
          ) : (
            <>
              <p>Step 1: Connect your wallet </p>
              <p>Step 2: Migrate your xPIXUL to PIXUL on our migration swap</p>
              <p>
                Step 3: Choose the amount of xPIXUL tokens you want to stake{" "}
              </p>
              <p>Step 4: Choose your locking duration</p>
              <p>
                Step 5: Click the staking button and authorize the transactions{" "}
              </p>
            </>
          )}
        </div>
      </div>

      <span className="pixul-stake-title">Stake Your xPIXUL</span>
      <div className="pixul-stake-container">
        <div className="pixul-stake">
          <div className="pixul-stake-header" onClick={toggleStaking}>
            <div className={`stake ${stakingState ? "active" : ""}`}>
              <p>Stake xPIXUL</p>
            </div>
            <div className={`stake ${stakingState ? "" : "active"}`}>
              <p>Unstake xPIXUL</p>
            </div>
          </div>
          <div className="stake-pixul-container">
            <h2>Stake xPIXUL</h2>
            <div className="stake-pixul-balance">
              <div
                style={{ display: "flex", gap: "0.1em", alignItems: "center" }}
              >
                <input
                  className="pixual-amount"
                  placeholder="0"
                  ref={pixulInputRef}
                  onChange={stakingAmountChangeHandler}
                  value={stakingInputValue}
                  size={1}
                  type="number"
                ></input>
                <span>&nbsp;xPIXUL</span>
              </div>
              <span className="pixul-balance">
                <span>
                  Balance:&nbsp;
                  <span>
                    {`${xPixulBalance
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} xPIXUL`}
                  </span>
                </span>
                <button onClick={setStakingFieldToMax}>Max</button>
              </span>
            </div>
          </div>
          <div
            className="time-frame-container"
            onClick={stakeTimingChangeHandler}
          >
            <div className="time-frame">
              <input type="radio" name="time" value="0" defaultChecked />
              <label htmlFor="time">No Lock</label>
            </div>
            <div className="time-frame">
              <input type="radio" name="time" value="7" />
              <label htmlFor="time">1 week</label>
            </div>
            <div className="time-frame">
              <input type="radio" name="time" value="30" />
              <label htmlFor="time">1 month</label>
            </div>
            <div className="time-frame">
              <input type="radio" name="time" value="90" />
              <label htmlFor="time">3 months</label>
            </div>
            <div className="time-frame">
              <input type="radio" name="time" value="180" />
              <label htmlFor="time">6 months</label>
            </div>
            <div className="time-frame">
              <input type="radio" name="time" value="365" />
              <label htmlFor="time">1 year</label>
            </div>
            <div className="time-frame">
              <input type="radio" name="time" value="730" />
              <label htmlFor="time">2 years</label>
            </div>
            <div className="time-frame">
              <input type="radio" name="time" value="1461" />
              <label htmlFor="time">4 years</label>
            </div>
          </div>
          {account ? (
            <button className="connect-wallet">Stake</button>
          ) : (
            <button className="connect-wallet" onClick={connectWallet}>
              Connect Wallet
            </button>
          )}
          <div className="claim-tokens">
            <div>
              Total Claimable Tokens
              <span>{`${claimableTokens
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} XPIXUL`}</span>
            </div>
            <button className={claimableTokens > 0 ? "active" : ""}>
              Claim Tokens
            </button>
          </div>
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
