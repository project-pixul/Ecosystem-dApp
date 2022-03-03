import * as React from 'react';

import { withTranslation, useTranslation } from 'react-i18next';
import { Fade } from 'react-reveal';

const ProductsOverview: React.FC = ({ }) => {
  const { t } = useTranslation();

  return (
    <div id="products-overview">
      <Fade bottom>
        <h1><strong>{t('about.products_overview.title')}</strong></h1>
        <h2>{t('about.products_overview.token.title')}</h2>
        <p>{t('about.products_overview.token.paragraph1')}</p>
        <p>{t('about.products_overview.token.paragraph2')}</p>
        <h2>{t('about.products_overview.xpixul.title')}</h2>
        <p>{t('about.products_overview.xpixul.paragraph1')}</p>
        <p>{t('about.products_overview.xpixul.paragraph2')}</p>
        <h2>{t('about.products_overview.farm.title')}</h2>
        <p>{t('about.products_overview.farm.paragraph1')}</p>
        <p>{t('about.products_overview.farm.paragraph2')}</p>
        <h2>{t('about.products_overview.staking.title')}</h2>
        <p>{t('about.products_overview.staking.paragraph1')}</p>
        <p>{t('about.products_overview.staking.paragraph2')}</p>
        <h2>{t('about.products_overview.lottery.title')}</h2>
        <p>{t('about.products_overview.lottery.paragraph1')}</p>
        <p>{t('about.products_overview.lottery.paragraph2')}</p>
        <p>{t('about.products_overview.lottery.paragraph3')}</p>
        <h2>{t('about.products_overview.app.title')}</h2>
        <p>{t('about.products_overview.app.paragraph1')}</p>
        <p>{t('about.products_overview.app.paragraph2')}</p>
      </Fade>
    </div>
  )
};

export default withTranslation()(ProductsOverview);