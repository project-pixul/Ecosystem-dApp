// let's use React.js
import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

// and bootstrap
import "bootstrap";

// with our own theme
import "./index.css";
import "./i18n";

// with custom packages for the fallback loader
import { ClipLoader } from "react-spinners";
import { css } from "styled-components";

// now all the components
import { Shell } from "./components/shell";
import HomeComponent from "./components/pages/home/homeComponent";
import AboutComponent from "./components/pages/about/aboutComponent";
import FarmComponent from "./components/pages/farm/farmComponent";
import PixulComponent from "./components/pages/staking/pixulApp";

const pagesInNavigator = [
	{ id: "home", title: "Home", component: HomeComponent },
	{ id: "about", title: "About", component: AboutComponent },
	{ id: "farm", title: "Farm", component: FarmComponent },
	{ id: "xpixul", title: "xpixul", component: PixulComponent },

	// will be replaced with onwramper widget
	// { id: "lottery", title: "Pixul Lottery", component: LotteryComponent },
];

const overrideCss = css`
	margin-left: calc(50vw - 56px);
	margin-top: calc(50vh - 56px);
	border-width: 12px;
`;

// initialize modals
Modal.setAppElement("#root");

// and render our app into the "root" element!
ReactDOM.render(
	<React.Suspense
		fallback={<ClipLoader color={"#7800ff"} css={overrideCss} size={100} />}
	>
		<Shell pages={pagesInNavigator} />
	</React.Suspense>,
	document.getElementById("root")
);
