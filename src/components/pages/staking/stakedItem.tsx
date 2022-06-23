import * as React from "react";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";

import StakingRewardsABI from "../../../web3/abis/StakingRewards.json";

import { toast } from "react-toastify";

import web3 from "web3";


export type StakingInfo = {
  stakingId: number;
  amount: number;
  starttime: number;
  claimedAmount: number;
  stakingtype: number;
  claimableAmount: number;
};

export type StakedItemProps = {
  info: StakingInfo;
  getRewards?: () => Promise<any>;
  unStake?: () => Promise<any>;
};

const stakedItem = (props: StakedItemProps) => {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  
  const aprs = [0.02, 0.17, 0.68, 2.2, 4.5, 9, 21, 41];


  const stakingPeriod = [
    "No lock",
    "1 week",
    "1 month",
    "3 months",
    "6 months",
    "1 year",
    "2 years",
    "4 years",
  ];

  return (
    <div className="staked-list-item">
      <div className="staked-item-data">
        <span>{`${web3.utils
          .fromWei(props.info.amount.toString(), "ether")
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} xPIXUL`}</span>

        <span>
          {stakingPeriod[props.info.stakingtype]}
        </span>
      </div>

      <div className="staked-item-data">
        <span>
        {`${web3.utils
          .fromWei(props.info.claimableAmount.toString(), "ether")
          .toString()} xPIXUL Claimable`}
        </span>

        <span>
          {aprs[props.info.stakingtype] + '%'}
        </span>
      </div>

      <div className="staked-button-wrapper">
        <button
          onClick={() => {
            toast.promise(props.getRewards, {
              success: "Transaction successful",
              pending: "Transaction pending....",
              error: "Transaction failed",
            });
          }}
        >
          Claim Rewards
        </button>
        <button
          onClick={() => {
            toast.promise(props.unStake, {
              success: "Transaction successful",
              pending: "Transaction pending....",
              error: "Transaction failed",
            });
          }}
        >
          Unstake
        </button>
      </div>
    </div>
  );
};

export default stakedItem;
