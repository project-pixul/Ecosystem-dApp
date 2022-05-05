import * as React from "react";
import "./farmCardComponent.css";

const FarmCardComponent = () => {
  return (
    <div className="card">
      <div className="title">
        <img
          src="https://res.cloudinary.com/rk03/image/upload/v1649085578/pixulethlogo_gmllax.png"
          alt=""
        />
        PIXUL-ETH
      </div>
      <div className="apr">
        <div>
          <span>APR:</span> <span className="rate">4.15%</span>
        </div>
        <div>
          <span>Earn:</span>
          <span>PIXUL</span>
        </div>
      </div>
      <div className="status">
        <span>PIXUL EARNED</span>
        <div className="earned">
          <span>0.000</span>
          <button>Harvest</button>
        </div>
      </div>
      <button className="connect-wallet">Connect Wallet</button>
    </div>
  );
};

export default FarmCardComponent;
