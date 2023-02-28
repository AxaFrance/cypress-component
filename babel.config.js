module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                debug: false,
                targets: {
                    browsers: ['last 2 versions', 'ie > 11'],
                },
            },
        ],
        ['@babel/preset-typescript'],
    ],
};
