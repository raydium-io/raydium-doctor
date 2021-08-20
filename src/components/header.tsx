import { useTranslation } from 'react-i18next';

const Switch = () => {
  const { i18n } = useTranslation();

  return (
    <div className="flex w-20 text-center leading-8 bg-gray-700 rounded-full overflow-hidden">
      <span
        className={`${i18n.language === 'en-US' ? 'bg-primary text-black cursor-not-allowed' : 'cursor-pointer'}`}
        style={{ flex: '0.5 1 0%' }}
        onClick={() => i18n.changeLanguage('en-US')}
      >
        EN
      </span>
      <span
        className={`${i18n.language === 'zh-CN' ? 'bg-primary text-black cursor-not-allowed' : 'cursor-pointer'}`}
        style={{ flex: '0.5 1 0%' }}
        onClick={() => i18n.changeLanguage('zh-CN')}
      >
        中
      </span>
    </div>
  );
};

const Header = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="h-20 flex justify-between items-center">
        <div className="h-20 flex justify-center items-center gap-2">
          <img src="/images/logo.svg" width={32} height={32} />
          <span>Raydium Doctor</span>
        </div>
        <Switch />
      </div>
      <h1 className="font-bold text-xl mb-5 text-primary">{t('title')}</h1>
    </>
  );
};

export default Header;
