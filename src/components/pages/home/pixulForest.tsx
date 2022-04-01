import * as React from "react";

import { BaseComponent } from "../../shellInterfaces";
import {
  withTranslation,
  WithTranslation,
  TFunction,
  Trans,
} from "react-i18next";
import { fadeIn } from "react-animations";
import styled, { keyframes } from "styled-components";
import AnimatedNumber from "animated-number-react";

import "./pixulForest.css";

export type PixulForestProps = {};
export type PixulForestState = {
  treeAge?: number;
  exit?: boolean;
  treeAmount?: number;
  carbonOffset?: number;
};

const FadeInAnimation = keyframes`${fadeIn}`;
const FadeInDiv = styled.div`
  animation: ease-in 0.4s ${FadeInAnimation};
`;

class PixulForest extends BaseComponent<
  PixulForestProps & WithTranslation,
  PixulForestState
> {
  private readonly plantDate: Date = new Date("02/28/2022");
  private _timeout = null;

  constructor(props: PixulForestProps & WithTranslation) {
    super(props);
    this.state = {
      treeAge: 0,
      treeAmount: 0,
      carbonOffset: 0,
    };
  }

  componentDidMount() {
    console.log("mount");
    this.tick();
  }

  componentWillUnmount() {
    if (!!this._timeout) {
      clearTimeout(this._timeout);
      this._timeout = null;
    }

    this.setState({ exit: true });
  }

  async tick() {
    const self = this;
    const state = this.readState();

    if (state.exit) {
      return;
    }

    const timeDelta = new Date().getTime() - this.plantDate.getTime();
    const dayDelta = Math.floor(timeDelta / (1000 * 3600 * 24));

    this.setState({
      treeAge: dayDelta,
    });

    fetch(
      "https://api.perseusoft.tech/pixuladmin/pixulservices/crypto/info/0xf9a3fda781c94942760860fc731c24301c83830a"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            treeAmount: result.plantedTree.trees,
            carbonOffset: result.plantedTree.carbonOffset,
          });
        },
        (err) => {
          console.error("Error fetching data from ecologi API", err);
        }
      );

    this._timeout = setTimeout(async () => await self.tick.call(self), 60000);
  }

  handleChange = ({ target: { treeAge, treeAmount, carbonOffset } }) => {
    this.setState({
      treeAge,
      treeAmount,
      carbonOffset,
    });
  };

  render() {
    const t: TFunction<"translation"> = this.readProps().t;

    return (
      <FadeInDiv>
        <div className="shadow d-flex flex-row align-self-center flex-wrap gradient-card primary pixul-forest"></div>
      </FadeInDiv>
    );
  }
}

export default withTranslation()(PixulForest);
