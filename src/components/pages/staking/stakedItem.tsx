import * as React from "react";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";

import StakingRewardsABI from "../../../web3/abis/StakingRewards.json";

import web3 from "web3";

export type StakingInfo = {
  stakingId: number;
  amount: number;
  starttime: number;
  claimedCount: number;
  stakingtype: number;
};

export type StakedItemProps = {
  info: StakingInfo;
  getRewards?: (stakingId: number) => void;
  unStake?: (stakingId: number) => void;
};

const stakedItem = (props: StakedItemProps) => {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  
  const stakingPeriod = ['No lock', '1 week', '1 month', '3 months', '6 month', '1 year', '2 year', '4 year'];

  return (
    <div className="staked-list-item">
      <div className="staked-item-data">
        <span>{`${web3.utils.fromWei(props.info.amount.toString(), 'ether')
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} xPIXUL`}</span>
        
        <span>{stakingPeriod[props.info.stakingtype]}</span>
      </div>

      <div className="staked-button-wrapper">
        <button onClick={() => props.getRewards(props.info.stakingId)}>Claim Rewards</button>
        <button onClick={() => props.unStake(props.info.stakingId)}>Unstake</button>
      </div>
    </div>
  );
};

export default stakedItem;
