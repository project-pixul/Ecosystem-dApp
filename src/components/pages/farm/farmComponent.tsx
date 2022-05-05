import * as React from "react";
import * as numeral from "numeral";

import { ShellErrorHandler } from "../../shellInterfaces";
import { Wallet } from "../../wallet";
import { PixulFarm } from "../../contracts/pixulfarm";
import { withTranslation, useTranslation } from "react-i18next";
import { Tooltip, OverlayTrigger, Container, Row, Col } from "react-bootstrap";
import AnimatedNumber from "animated-number-react";
import { BiSearchAlt2 } from "react-icons/bi";
import { FaEthereum, FaChevronDown } from "react-icons/fa";
import "./farmComponent.css";
import { farmsList } from "../../listOfFarms";
import FarmCardComponent from "./farmCardComponent";
import FarmModalComponent from "./farmModalComponent";

export type FarmProps = {};
export type FarmState = {
  farm?;
  wallet?: Wallet;
  looping?: boolean;
  apr?;
  address?: string;
  balance?: number;
  lpBalance?: number;
  stakedLp?: number;
  amount?: number;
  rewards?: number;
  ctValue?;
  pending?: boolean;
  tvl?: number;
  toggler?: boolean;
  showModal?: boolean;
};

const FarmComponent = () => {
  // constructor(props: FarmProps & WithTranslation) {
  //   super(props);

  //   this.connectWallet = this.connectWallet.bind(this);
  //   this.disconnectWallet = this.disconnectWallet.bind(this);

  // }

  const [toggle, setToggleState] = React.useState<boolean>(true);

  const [showModal, setModalState] = React.useState<boolean>(false);

  const { t } = useTranslation();

  // handleError(error) {
  //   ShellErrorHandler.handle(error);
  // }

  // async connectWallet() {
  //   try {
  //     this.updateState({ pending: true });
  //     var tvl = 0;
  //     const wallet = new Wallet();
  //     const result = await wallet.connect();

  //     if (!result) {
  //       throw "The wallet connection was cancelled.";
  //     }

  //     var farm = {};
  //     farm[0] = new PixulFarm(wallet, 0);
  //     // await farm[0].finishSetup();

  //     const poolLength = await farm[0].contract.methods.poolLength().call();
  //     var i = 1;
  //     while (i < poolLength) {
  //       farm[i] = new PixulFarm(wallet, i);
  //       i += 1;
  //     }

  //     this.updateState({ farm: farm, wallet: wallet, looping: true, tvl: tvl });
  //     await this.updateOnce(false);
  //     this.updateState({ pending: false });
  //     this.loop().then();
  //   } catch (e) {
  //     this.updateState({ pending: false });
  //     this.handleError(e);
  //   }
  // }

  // getLpBalance(pid: number): number {
  //   const farmInfo = (this.readState().farm || {})[pid];
  //   if (farmInfo == undefined) {
  //     return 0;
  //   } else {
  //     return farmInfo.lpBalance || 0;
  //   }
  // }

  // getStakedBalance(pid: number): number {
  //   const farmInfo = (this.readState().farm || {})[pid];
  //   if (farmInfo == undefined) {
  //     return 0;
  //   } else {
  //     return farmInfo.stakedLp || 0;
  //   }
  // }

  // getRewards(pid: number): number {
  //   const farmInfo = (this.readState().farm || {})[pid];
  //   if (farmInfo == undefined) {
  //     return 0;
  //   } else {
  //     return farmInfo.rewards || 0;
  //   }
  // }

  // getApr(pid: number): number {
  //   const farmInfo = (this.readState().farm || {})[pid];
  //   if (farmInfo == undefined) {
  //     return 0;
  //   } else {
  //     return farmInfo.apr || 0;
  //   }
  // }

  // getTVL(pid: number): number {
  //   const farmInfo = (this.readState().farm || {})[pid];
  //   if (farmInfo == undefined) {
  //     return 0;
  //   } else {
  //     return farmInfo.tvl || 0;
  //   }
  // }

  // getUsdAvbl(pid: number): number {
  //   const farmInfo = (this.readState().farm || {})[pid];
  //   if (farmInfo == undefined) {
  //     return 0;
  //   } else {
  //     return farmInfo.usdavailable || 0;
  //   }
  // }

  // getUsdStaked(pid: number): number {
  //   const farmInfo = (this.readState().farm || {})[pid];
  //   if (farmInfo == undefined) {
  //     return 0;
  //   } else {
  //     return farmInfo.usdstaked || 0;
  //   }
  // }

  // getUsdRewards(pid: number): number {
  //   const farmInfo = (this.readState().farm || {})[pid];
  //   if (farmInfo == undefined) {
  //     return 0;
  //   } else {
  //     return farmInfo.usdrewards || 0;
  //   }
  // }

  // getAmounts(pid: number) {
  //   var amounts = {};
  //   amounts["apr"] = this.getApr(pid);
  //   amounts["lpBalance"] = this.getLpBalance(pid);
  //   amounts["stakedLp"] = this.getStakedBalance(pid);
  //   amounts["rewards"] = this.getRewards(pid);
  //   amounts["tvl"] = this.getTVL(pid);
  //   amounts["usdavailable"] = this.getUsdAvbl(pid);
  //   amounts["usdstaked"] = this.getUsdStaked(pid);
  //   amounts["usdrewards"] = this.getUsdRewards(pid);
  //   return amounts;
  // }

  // async disconnectWallet() {
  //   try {
  //     this.updateState({ pending: true });
  //     const result = await this.state.wallet.disconnect();
  //     if (result) {
  //       throw "The wallet connection was cancelled.";
  //     }

  //     this.updateState({
  //       farm: null,
  //       wallet: null,
  //       address: null,
  //       looping: false,
  //       pending: false,
  //     });
  //   } catch (e) {
  //     this.updateState({ pending: false });
  //     this.handleError(e);
  //   }
  // }

  // async componentDidMount() {

  //   if ((window.ethereum || {}).selectedAddress) {
  //     this.connectWallet();
  //   }
  // }

  // componentWillUnmount() {

  //   this.updateState({ farm: null, looping: false });
  // }

  React.useEffect(() => {
    document.querySelector(".main-wrapper").className =
      "main-wrapper farm-page";
    return () => {
      document.querySelector(".main-wrapper").className = "main-wrapper";
    };
  });

  // private async loop(): Promise<void> {
  //   const self = this;
  //   const cont = await self.updateOnce.call(self);

  //   if (cont) {
  //     setTimeout(async () => await self.loop.call(self), 10000);
  //   }
  // }

  // private async updateOnce(resetCt?: boolean): Promise<boolean> {
  //   const farm = this.readState().farm;
  //   const poolLength = await farm[0].contract.methods.poolLength().call();
  //   if (!!farm) {
  //     try {
  //       var i = 0;
  //       while (i < poolLength) {
  //         farm[i].refresh();
  //         i += 1;
  //       }
  //       await farm[poolLength - 1].refresh();
  //       if (!this.readState().looping) {
  //         return false;
  //       }
  //       this.updateState({
  //         address: farm[0].wallet.currentAddress,
  //       });

  //       if (resetCt) {
  //         this.updateState({
  //           address: "",
  //         });
  //       }
  //     } catch (e) {
  //       console.warn("Unable to update farm status", e);
  //     }
  //   } else {
  //     return false;
  //   }

  //   return true;
  // }

  // async depositLP(pid: number): Promise<void> {
  //   try {
  //     const state = this.readState();
  //     this.updateState({ pending: true });

  //     if (state.ctValue[pid] >= 0) {
  //       await state.farm[pid].deposit(state.ctValue[pid]);
  //     } else {
  //       throw "Can't deposit a negative amount.";
  //     }

  //     this.updateState({ pending: false });
  //     this.updateOnce(false).then();
  //   } catch (e) {
  //     this.updateState({ pending: false });
  //     this.handleError(e);
  //   }
  // }

  // async withdrawLP(pid: number): Promise<void> {
  //   try {
  //     const state = this.readState();
  //     this.updateState({ pending: true });

  //     if (state.ctValue[pid] >= 0) {
  //       await state.farm[pid].withdraw(state.ctValue[pid]);
  //     } else {
  //       throw "Can't withdraw a negative amount.";
  //     }

  //     this.updateState({ pending: false });
  //     this.updateOnce(false).then();
  //   } catch (e) {
  //     this.updateState({ pending: false });
  //     this.handleError(e);
  //   }
  // }

  // async claimPixul(pid: number): Promise<void> {
  //   try {
  //     const state = this.readState();
  //     this.updateState({ pending: true });
  //     await state.farm[pid].claim();

  //     this.updateState({ pending: false });
  //     this.updateOnce(false).then();
  //   } catch (e) {
  //     this.updateState({ pending: false });
  //     this.handleError(e);
  //   }
  // }

  // stakingValueChanged = (event) => {
  //   var _ctValue = this.readState().ctValue || {};

  //   _ctValue[event.target.id] = event.target.value;

  //   console.log(this.state);

  //   this.updateState({
  //     ctValue: _ctValue,
  //   });
  // };

  // renderTooltip = (props) => {
  //   return (
  //     <Tooltip id="harvest-tooltip" {...props}>
  //       Claim Rewards
  //     </Tooltip>
  //   );
  // };

  // FarmCard({ logo, pairName, fees, liquidityPool, enableGlow, pid }) {
  //   const ctValue = (this.readState().ctValue || {})[pid];
  //   const amounts = this.getAmounts(pid);
  //   const apr = amounts["apr"];
  //   const lpBalance = amounts["lpBalance"];
  //   const stakedLp = amounts["stakedLp"];
  //   const rewards = amounts["rewards"];
  //   const tvl = amounts["tvl"];
  //   const usdavailable = amounts["usdavailable"];
  //   const usdstaked = amounts["usdstaked"];
  //   const usdrewards = amounts["usdrewards"];

  //   return (
  //     <div className={`farm-card ${enableGlow ? "glow-div" : ""}`}>
  //       <div className="gradient-card shadow dark">
  //         <div className="farm-card-body d-flex justify-content-between">
  //           <div>
  //             <div className="d-flex justify-content-between pair-header">
  //               <img className="lp-pair-icon" src={logo} alt="bnb-pixul-pair" />
  //               <div>
  //                 <h1 className="text-right">{pairName} LP</h1>
  //                 <h2 className="text-right">{fees}</h2>
  //               </div>
  //             </div>
  //             <hr />
  //             <div className="d-flex justify-content-between apr">
  //               <h2>APR: </h2>
  //               <h2>
  //                 <AnimatedNumber
  //                   value={numeral(apr || 0).format("0.00")}
  //                   duration="1000"
  //                   formatValue={(value) =>
  //                     `${Number(parseFloat(value).toFixed(2)).toLocaleString(
  //                       "en",
  //                       { minimumFractionDigits: 2 }
  //                     )}%`
  //                   }
  //                 >
  //                   {apr || 0}
  //                 </AnimatedNumber>
  //               </h2>
  //             </div>
  //             {/*
  // 		<div className="d-flex justify-content-between tvl">
  // 		  <h2>TVL: </h2>
  // 		  <h2>
  //               <AnimatedNumber
  //                 value={numeral(tvl || 0).format('0.00')}
  //                 duration="1000"
  //                 formatValue={value => `${Number(parseFloat(value).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 })}$`}
  //               >
  //                 {apr || 0}
  //               </AnimatedNumber>
  // 		  </h2>
  // 		</div>
  // 		*/}
  //             <div className="d-flex justify-content-between pool">
  //               <h2>Liquidity Pool: </h2>
  //               <h2>
  //                 <u>{liquidityPool}</u>
  //               </h2>
  //             </div>
  //             <h3>Available {pairName} LP</h3>
  //             <AnimatedNumber
  //               value={numeral(lpBalance || 0).format("0.000000")}
  //               duration="1000"
  //               formatValue={(value) =>
  //                 `${Number(parseFloat(value).toFixed(6)).toLocaleString("en", {
  //                   minimumFractionDigits: 6,
  //                 })}`
  //               }
  //             >
  //               {lpBalance || 0}
  //             </AnimatedNumber>
  //             <AnimatedNumber
  //               value={numeral(usdavailable || 0).format("0.00")}
  //               formatValue={(value) =>
  //                 ` (= ${Number(parseFloat(value).toFixed(2)).toLocaleString(
  //                   "en",
  //                   { minimumFractionDigits: 2 }
  //                 )}$)`
  //               }
  //             >
  //               {" "}
  //               (= {usdavailable || 0}$)
  //             </AnimatedNumber>
  //             <div className="rewards-block d-flex justify-content-between">
  //               <div>
  //                 <h3>Pending Rewards</h3>
  //                 <AnimatedNumber
  //                   value={numeral(rewards || 0).format("0.00")}
  //                   duration="1000"
  //                   formatValue={(value) =>
  //                     `${Number(parseFloat(value).toFixed(2)).toLocaleString(
  //                       "en",
  //                       { minimumFractionDigits: 2 }
  //                     )} Pixul`
  //                   }
  //                 >
  //                   {rewards || 0}
  //                 </AnimatedNumber>
  //                 <AnimatedNumber
  //                   value={numeral(usdrewards || 0).format("0.00")}
  //                   formatValue={(value) =>
  //                     ` (= ${Number(
  //                       parseFloat(value).toFixed(2)
  //                     ).toLocaleString("en", { minimumFractionDigits: 2 })}$`
  //                   }
  //                 >
  //                   {" "}
  //                   (= {usdrewards || 0}$)
  //                 </AnimatedNumber>
  //                 )
  //               </div>
  //               <div className="d-flex align-items-center">
  //                 <OverlayTrigger
  //                   placement="bottom-start"
  //                   overlay={this.renderTooltip}
  //                 >
  //                   <button
  //                     aria-label="harvest button"
  //                     className="btn btn-harvest stake-claim shadow"
  //                     disabled={rewards <= 0 || rewards == null}
  //                     type="button"
  //                     onClick={async () => this.claimPixul(pid)}
  //                   >
  //                     <img
  //                       src="images/harvest-icon.svg"
  //                       alt="harvest button icon"
  //                     />
  //                   </button>
  //                 </OverlayTrigger>
  //               </div>
  //             </div>
  //             <div className="staked-lp-info">
  //               <h3>{pairName} LP Staked</h3>
  //               <AnimatedNumber
  //                 value={numeral(stakedLp || 0).format("0.000000")}
  //                 duration="1000"
  //                 formatValue={(value) =>
  //                   `${Number(parseFloat(value).toFixed(6)).toLocaleString(
  //                     "en",
  //                     { minimumFractionDigits: 6 }
  //                   )} LP`
  //                 }
  //               >
  //                 {stakedLp || 0}
  //               </AnimatedNumber>
  //               <AnimatedNumber
  //                 value={numeral(usdstaked || 0).format("0.00")}
  //                 duration="1000"
  //                 formatValue={(value) =>
  //                   ` (= ${Number(parseFloat(value).toFixed(2)).toLocaleString(
  //                     "en",
  //                     { minimumFractionDigits: 2 }
  //                   )}$)`
  //                 }
  //               >
  //                 ({usdstaked || 0}$)
  //               </AnimatedNumber>
  //             </div>
  //           </div>
  //           <hr />
  //           <div>
  //             <div className="d-flex">
  //               <input
  //                 className="lp-input"
  //                 type="number"
  //                 id={pid}
  //                 onChange={(event) => this.stakingValueChanged(event)}
  //                 value={ctValue || 0}
  //               />
  //             </div>
  //             <div className="wd-buttons d-flex justify-content-between">
  //               <button
  //                 className="btn btn-complementary btn-small link-dark align-self-center stake-claim"
  //                 disabled={stakedLp <= 0 || stakedLp == null}
  //                 type="button"
  //                 onClick={async () => this.withdrawLP(pid)}
  //               >
  //                 Withdraw LP
  //               </button>
  //               <button
  //                 className="btn btn-primary btn-small link-dark align-self-center stake-claim right"
  //                 disabled={lpBalance <= 0 || lpBalance == null}
  //                 type="button"
  //                 onClick={async () => this.depositLP(pid)}
  //               >
  //                 Deposit LP
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  const toggleButtonState = () => {
    setToggleState((prevState) => !prevState);
  };

  const toggleModalState = () => {
    setModalState((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      <div
        className="farm-wrapper"
        style={{ overflow: showModal ? "hidden" : "unset" }}
      >
        <div className="farm-content">
          <div className="farm-header">
            <h1>Farms</h1>
            <div className="input-wrapper">
              <BiSearchAlt2 size={20} />
              <input type="text" placeholder="Search Pair or Token" />
            </div>
          </div>
          <div className="farm-buttons">
            <div className="primary-buttons">
              <button className="toggled">All Farms</button>
              <button>Standard</button>
              <button>Boosted</button>
            </div>
            <div className="toggler">
              <div
                className={toggle ? "toggled-left" : ""}
                onClick={toggleButtonState}
              >
                Live
              </div>
              <div
                className={!toggle ? "toggled-right" : ""}
                onClick={toggleButtonState}
              >
                Finished
              </div>
            </div>
          </div>
          <div className="farm-farms">
            <div className="status">
              <div className="promoted">Promoted Farm</div>
              <span className="name">
                <img
                  src="https://res.cloudinary.com/rk03/image/upload/v1649085578/pixulethlogo_gmllax.png"
                  alt=""
                />
                PIXUL-ETH LP
              </span>
              <span className="price">
                Liquidity: <span>$20,034,974</span>
              </span>
              <div className="apr">
                <span>4.15%</span>
                <span>Average APR</span>
              </div>
            </div>
            <div className="harvest" onClick={toggleModalState}>
              <span>
                Farm <br />
                or <br /> Harvest
              </span>
              <FaChevronDown />
            </div>
          </div>
        </div>
        <div className="farm-cards">
          <FarmCardComponent />
        </div>
      </div>
      {showModal ? <FarmModalComponent setModalState={toggleModalState} /> : ""}
    </React.Fragment>
  );
};

export default withTranslation()(FarmComponent);
