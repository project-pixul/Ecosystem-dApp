// let's use React.js
import React from "react";
import ReactDOM from "react-dom";

// and bootstrap
import "bootstrap";

// with our own theme
import "./index.css";
import "./i18n";

// with custom packages for the fallback loader
import { ClipLoader } from "react-spinners";
import { css } from "styled-components";

// toast notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// web3 stuff
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";

function getLibrary(provider) {
	return new Web3(provider);
}

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
	{ id: "lottery", title: "Pixul Lottery", component: HomeComponent },
];

const clipLoaderCSS = css`
	margin-left: calc(50vw - 56px);
	margin-top: calc(50vh - 56px);
	border-width: 12px;
`;

const toastConfig = {
	position: "top-right",
	autoClose: 4000,
	pauseOnFocusLoss: false,
	pauseOnHover: false,
	hideProgressBar: false,
	newestOnTop: true,
	closeOnClick: true,
	closeButton: true,
};

// and render our app into the "root" element!
ReactDOM.render(
	<Web3ReactProvider getLibrary={getLibrary}>
		<React.Suspense
			fallback={
				<ClipLoader color={"#7800ff"} css={clipLoaderCSS} size={100} />
			}
		>
			<Shell pages={pagesInNavigator} />
			<ToastContainer {...toastConfig} />
		</React.Suspense>
	</Web3ReactProvider>,
	document.getElementById("root")
);
