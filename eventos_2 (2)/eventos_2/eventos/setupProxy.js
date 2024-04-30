const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
	app.use(
		"/api",
		createProxyMiddleware({
			target: "https://eventos-api-phi.vercel.app",
			changeOrigin: true,
		}),
	);
};
