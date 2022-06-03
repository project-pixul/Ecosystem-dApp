import * as React from "react";

export type StakedItemProps = {
  stakedAmount: number;
  stakedTime: String;
};

const stakedItem = (props: StakedItemProps) => {
  return (
    <div className="staked-list-item">
      <div className="staked-item-data">
        <span>{`${props.stakedAmount
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} xPIXUL`}</span>
        <span>{props.stakedTime}</span>
      </div>

      <div className="staked-button-wrapper">
        <button>Claim Rewards</button>
        <button>Unstake</button>
      </div>
    </div>
  );
};

export default stakedItem;
