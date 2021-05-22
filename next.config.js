const withPlugins = require("next-compose-plugins");

const { nextI18NextRewrites } = require("next-i18next/rewrites");

const localeSubpaths = {
    tr: "tr",
    en: "en",
};

const config = {
    rewrites: async () => nextI18NextRewrites(localeSubpaths),
    publicRuntimeConfig: {
        localeSubpaths,
    },
};

module.exports = withPlugins([], config);
