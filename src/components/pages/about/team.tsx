import * as React from 'react';

import { withTranslation, useTranslation } from 'react-i18next';
import { Fade } from 'react-reveal';

const Team: React.FC = ({ }) => {
	const { t } = useTranslation();

	return (
		<div className="container" id="team-members">
			<Fade bottom>
				<div id="team-header">
					<h1><strong>{t('about.team.title')}</strong></h1>
				</div>
				<div className="row">
					<div className="col-md-6 d-flex flex-column item">
						<img className="photo" src="images/team/blank.png" alt="pixul-team-founder" />
						<a href="#" rel="noreferrer" target="_blank">
							<h2 className="name">{t('about.team.founder.name')}</h2>
						</a>
						<p className="title">{t('about.team.founder.title')}</p>
						<p className="description">{t('about.team.founder.desc1')}</p>
						<p className="description">{t('about.team.founder.desc2')}</p>
						<p className="description">{t('about.team.founder.desc3')}</p>
						<p className="description">{t('about.team.founder.desc4')}</p>
						<p className="description">{t('about.team.founder.desc5')}<br /><br /></p>
					</div>
					<div className="col-md-6 d-flex flex-column item">
						<img className="photo" src="images/team/blank.png" alt="pixul-team-vp-marketing" />
						<a href="#" rel="noreferrer" target="_blank">
							<h2 className="name">{t('about.team.vp_marketing.name')}</h2>
						</a>
						<p className="title">{t('about.team.vp_marketing.title')}</p>
						<p className="description">{t('about.team.vp_marketing.desc1')}</p>
						<p className="description">{t('about.team.vp_marketing.desc2')}</p>
						<p className="description">{t('about.team.vp_marketing.desc3')}</p>
						<p className="description">{t('about.team.vp_marketing.desc4')}</p>
						<p className="description">{t('about.team.vp_marketing.desc5')}<br /></p>
					</div>
				</div>
			</Fade>
			<Fade bottom>
				<div className="row">
					<div className="col-md-12 d-flex flex-column item">
						<img className="photo" src="images/team/blank.png" alt="pixul-team-vp-security" />
						<a href="#" rel="noreferrer" target="_blank">
							<h2 className="name">{t('about.team.vp_security.name')}</h2>
						</a>
						<p className="title">{t('about.team.vp_security.title')}</p>
					</div>
				</div>
			</Fade>
			<Fade left>
				<div className="row">
					<div className="col-md-4 d-flex flex-column item"><img className="photo" src="images/team/blank.png" alt="pixul-team-social-media-manager" />
						<a href="#" rel="noreferrer" target="_blank">
							<h2 className="name">{t('about.team.social_media_manager.name')}</h2>
						</a>
						<p className="title">{t('about.team.social_media_manager.title')}</p>
					</div>
					<div className="col-md-4 d-flex flex-column item">
						<img className="photo" src="images/team/blank.png" alt="pixul-team-content-manager" />
						<a href="#" rel="noreferrer" target="_blank">
							<h2 className="name">{t('about.team.content_manager.name')}</h2>
						</a>
						<p className="title">{t('about.team.content_manager.title')}</p>
					</div>
					<div className="col-md-4 d-flex flex-column item">
						<img className="photo" src="images/team/blank.png" alt="pixul-team-graphics-designer" />
						<a href="#" rel="noreferrer" target="_blank">
							<h2 className="name">{t('about.team.graphics_designer.name')}</h2>
						</a>
						<p className="title">{t('about.team.graphics_designer.title')}</p>
					</div>
				</div>
			</Fade>
			<Fade right>
				<div className="row">
					<div className="col-md-6 d-flex flex-column item"><img className="photo blank" src="images/team/blank.png" alt="pixul-team-blank" />
						<h2 className="name">{t('about.team.software_developer1.name')}</h2>
						<p className="title">{t('about.team.software_developer1.title')}</p>
					</div>
					<div className="col-md-6 d-flex flex-column item"><img className="photo blank" src="images/team/blank.png" alt="pixul-team-blank" />
						<h2 className="name">{t('about.team.software_developer2.name')}</h2>
						<p className="title">{t('about.team.software_developer2.title')}</p>
					</div>
				</div>
			</Fade>
		</div>
	)
};

export default withTranslation()(Team);