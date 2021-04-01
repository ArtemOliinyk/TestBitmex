module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "https://testnet.bitmex.com",
                changeOrigin: true,
                secure: false
            }
        }
    },

    transpileDependencies: [
      'vuetify'
    ]
};
