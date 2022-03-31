import * as React from 'react';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import { ShellHost } from './shellHost';
import { BaseComponent, IShellPage } from './shellInterfaces';
import {
	faMedium,
	faTelegram,
	faTwitter,
	faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import ShellNav from './shellNav';

import './shell.css';

export type ShellProps = {
	pages: IShellPage[];
};
export type ShellState = {
	currentPage: IShellPage;
};

export class Shell extends BaseComponent<ShellProps, ShellState> {
	constructor(props: ShellProps) {
		super(props);
	}

	render() {
		const pages = this.readProps().pages;
		return (
			<Router>
				<div className='main-wrapper'>
					<ShellNav pages={pages} />
					<div className='content-wrapper'>
						{/* <div className='listing-banner d-flex align-items-center shadow'>
							<FontAwesomeIcon icon={faInfoCircle} className='info-icon' />
							<h1>
								The Pixul DeFi dApp <strong>BETA</strong> is{' '}
								<strong>finally here</strong>!.
							</h1>
						</div> */}
						<Switch>
							{pages.map((page) => (
								<Route key={`${page.id}`} path={'/' + page.id}>
									<ShellHost page={page} />
								</Route>
							))}
							<Route
								exact
								path='/'
								render={() => {
									return <Redirect to='/home' />;
								}}
							/>
						</Switch>
					</div>
					<section className='footer'>
						<div className='footer-header'>
							<img src='/images/pixellogowebsitewhite.png' alt='Pixul Logo' />
							<p>
								Pixul | Developing cryto solutions for everyday business and
								personal transactions.
							</p>
							<div className='social-medias'>
								<a
									href='#'
									rel='noreferrer'
									className='btn-social'
									target='_blank'>
									<FontAwesomeIcon icon={faTwitter} />
								</a>
								<a
									href='#'
									rel='noreferrer'
									className='btn-social'
									target='_blank'>
									<FontAwesomeIcon icon={faMedium} />
								</a>
								<a
									href='#'
									rel='noreferrer'
									className='btn-social'
									target='_blank'>
									<FontAwesomeIcon icon={faGithub} />
								</a>
							</div>
						</div>
						<div className='infos'>
							<div className='info'>
								<h2>Ecosystem</h2>
								<a href=''>Marketplace</a>
								<a href=''>Staking</a>
								<a href=''>Farms</a>
								<a href=''>DEX</a>
							</div>
							<div className='info'>
								<h2>Documents</h2>
								<a href=''>Whitepaper</a>
								<a href=''>Roadmap</a>
								<a href=''>Transparency</a>
								<a href=''>Audits</a>
							</div>
							<div className='info'>
								<h2>Protocol</h2>
								<a href=''>Vote</a>
								<a href=''>xPIXUL</a>
							</div>
						</div>
					</section>
				</div>
			</Router>
		);
	}
}
