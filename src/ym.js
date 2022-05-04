import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import siteConfig from '@generated/docusaurus.config';

export default (function () {
  if (!ExecutionEnvironment.canUseDOM) {
    return null;
  }

  const {
    themeConfig: {
      customFields: {
          ym: {counterID},
        },
      }
    } = siteConfig;

  return {
    onRouteUpdate({location}) {
      window.ym(counterID, 'hit', location.pathname, {
        title: document.title,
      });
    },
  };
})();
