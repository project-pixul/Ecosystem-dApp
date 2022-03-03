import * as React from 'react';

import { withTranslation, useTranslation } from 'react-i18next';
import { Slide } from 'react-reveal';

import './pixulApp.css';

const PixulApp: React.FC = ({ }) => {
  const { t } = useTranslation();

  return (
    <div className="pixul-app-container">
      <Slide left>
        <img className="d-block app-img" src="" alt="pixul-app" />
      </Slide>
      <Slide right>
        <div className="app-text col-md-6">
          <h1><strong>{t('home.pixul_app.title')}</strong></h1>
          <p>{t('home.pixul_app.paragraph1')}</p>
          <p className="final-p">{t('home.pixul_app.paragraph2')}</p>
          <a href="#">
            <img className="store-badge shadow" src="images/play-store.png" alt="play-store-badge" />
          </a>
          <a href="#">
            <img className="store-badge shadow" src="images/app-store.png" alt="app-store-badge" />
          </a>
        </div>
      </Slide>
    </div>
  )
};

export default withTranslation()(PixulApp);
