module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // ✅ Remover isso também, porque está te spammando warning no SDK 54:
      // require.resolve('expo-router/babel'),

      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './', 
          },
        },
      ],
    ],
  };
};
