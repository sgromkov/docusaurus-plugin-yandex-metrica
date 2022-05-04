import globalData from '@generated/globalData';

const { counterID } = globalData['docusaurus-plugin-yandex-metrica'].default;

const clientModule = {
    onRouteUpdate({ location, previousLocation }) {
        if (previousLocation && location.pathname !== previousLocation.pathname) {
            window.ym(counterID, 'hit', location.pathname, {
                title: document.title,
            });
        }
    },
};

export default clientModule;
