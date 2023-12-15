const DEFAULT_SCRIPT_URL = 'https://mc.yandex.ru/metrika/tag.js';
const ALTERNATIVE_CDN_SCRIPT_URL = 'https://cdn.jsdelivr.net/npm/yandex-metrica-watch/tag.js';

const generateYmParamsString = function (params) {
    const defaultYmParams = {
        defer: true,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: false,
        ecommerce: false,
        trackHash: false,
    };

    const ymParams = {};
    for (const paramName in defaultYmParams) {
        ymParams[paramName] = (paramName in params) ? params[paramName] : defaultYmParams[paramName];
    };

    const ymParamsString = Object.keys(ymParams).reduce((acc, paramName, index, paramNames) => {
        const separator = (index < paramNames.length - 1) ? ',' : '';
        const paramValue = ymParams[paramName];

        return `${acc}${paramName}:${paramValue}${separator}`;
    }, '');

    return '{' + ymParamsString + '}';
}

export default async function pluginYandexMetrika(context, options) {
    const {
        counterID,
        alternativeCdn = false,
        enableInProdOnly = true,
    } = options;

    if (!counterID) {
        throw new Error(
            `You need to specify "counterID" field in plugin options to use docusaurus-plugin-yandex-metrica.`
        );
    }

    const isProd = process.env.NODE_ENV === 'production';
    const isEnabled = (enableInProdOnly && isProd) || !enableInProdOnly;

    return {
        name: 'docusaurus-plugin-yandex-metrica',
        async contentLoaded({ actions }) {
            actions.setGlobalData(options);
        },
        getClientModules() {
            return isEnabled ? ['./events'] : [];
        },
        injectHtmlTags() {
            if (!isEnabled) {
                return {};
            }

            const ymParams = generateYmParamsString(options);

            const scriptUrl = alternativeCdn ? ALTERNATIVE_CDN_SCRIPT_URL : DEFAULT_SCRIPT_URL;

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
                            (window, document, "script", "${scriptUrl}", "ym");
                            ym(${counterID}, "init", ${ymParams});
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
