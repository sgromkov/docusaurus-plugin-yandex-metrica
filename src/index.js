const path = require('path');

module.exports = function (context) {
  const {siteConfig} = context;
  const {themeConfig} = siteConfig;
  const {ym} = themeConfig || {};

  if (!ym) {
    throw new Error(
      `You need to specify "ym" object in "themeConfig" with "counterID" field in it to use docusaurus-plugin-yandex-metrica.`,
    );
  }

  const {counterID} = ym;

  if (!counterID) {
    throw new Error(
      'You specified the "ym" object in "themeConfig" but the "counterID" field was missing. ' +
        'Please ensure this is not a mistake.',
    );
  }

  const isProd = process.env.NODE_ENV === 'production';

  return {
    name: 'docusaurus-plugin-yandex-metrica',

    getClientModules() {
      return isProd ? [path.resolve(__dirname, './ym')] : [];
    },

    injectHtmlTags() {
      if (!isProd) {
        return {};
      }
      return {
        // Yandex.Metrica load https://mc.yandex.ru/metrika/tag.js, so we preconnect it.
        headTags: [
          {
            tagName: 'link',
            attributes: {
              rel: 'preconnect',
              href: 'https://mc.yandex.ru',
            },
          },
          // https://yandex.ru/support/metrica/code/counter-spa-setup.html
          {
            tagName: 'script',
            innerHTML: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              ym(${counterID}, "init", {
                defer: true,
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true
              });
            `,
          },
          {
            tagName: 'noscript',
            innerHTML: `
              <div><img src="https://mc.yandex.ru/watch/${counterID}" style="position:absolute; left:-9999px;" alt="" /></div>
            `,
          },
        ],
      };
    },
  };
};
