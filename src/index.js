// let's use React.js
import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

// and bootstrap
import "bootstrap";

// with our own theme
import "./index.css";

// with custom packages for the fallback loader
import { ClipLoader } from "react-spinners";
import { css } from "styled-components";

// now all the components
import { Shell } from "./components/shell";
import LotteryComponent from "./components/pages/lottery/lotteryComponent";
import HomeComponent from "./components/pages/home/homeComponent";
import AboutComponent from "./components/pages/about/aboutComponent";
import FarmComponent from "./components/pages/farm/farmComponent";
import PixulComponent from "./components/pages/home/pixulApp";
// not in use
import FaqComponent from "./components/pages/faq/faqComponent";
import StakingComponent from "./components/pages/staking/stakingComponent";
import "./i18n";

const pagesInNavigator = [
	{ id: "home", title: "Home", component: HomeComponent },
	{ id: "about", title: "About", component: AboutComponent },
	{ id: "farm", title: "Farm", component: FarmComponent },
	{ id: "xpixul", title: "xpixul", component: PixulComponent },
	// { id: "staking", title: "Staking", component: StakingComponent },
	// { id: "faq", title: "FAQ", component: FaqComponent },
	// Ignored on nav
	// { id: "launch", title: "Launch", component: LaunchComponent },
	{ id: "lottery", title: "Pixul Lottery", component: LotteryComponent },
];

const overrideCss = css`
	margin-left: 50%;
`;

// initialize modals
Modal.setAppElement("#root");
console.log(HomeComponent);
// and render our app into the "root" element!
ReactDOM.render(
	<React.Suspense
		fallback={<ClipLoader color={"#FFFFFF"} css={overrideCss} />}
	>
		<Shell pages={pagesInNavigator} />
	</React.Suspense>,
	document.getElementById("root")
);
