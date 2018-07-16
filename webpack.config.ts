import { CheckerPlugin } from 'awesome-typescript-loader';
import * as HtmlPlugin from 'html-webpack-plugin';
import * as path from 'path';
import { PORT } from 'src/config';
import * as webpack from 'webpack';
import { Configuration } from 'webpack-dev-server';

function Root(...paths: string[]) {
	return path.join(__dirname, ...paths);
}

export const PublicPath = '/';

export const loaders: webpack.Rule[] = [
	{
		test: /.tsx?$/,
		use: ['awesome-typescript-loader'],
		exclude: ['node_modules'],
	},
];

const Base: webpack.Configuration = {
	mode: 'none',
	context: __dirname,

	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx'],
		modules: ['node_modules', 'src'],
	},

	externals: {},

	devtool: 'source-map',

	plugins: [
		new CheckerPlugin(),

		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
			},
		}),
	],

	stats: {
		assets: true,
		chunks: true,
	},
};

export const Client: webpack.Configuration & { devServer: Configuration } = {
	...Base,

	target: 'web',
	name: 'client',

	entry: {
		client: [
			Root('src/client'),
		],
	},

	output: {
		path: Root('dist'),
		publicPath: PublicPath,
		filename: '[name].[hash:8].js',
		chunkFilename: '[name].chunk.[hash:8].js',
	},

	module: {
		rules: [
			...loaders,
		],
	},

	devServer: {
		contentBase: Root('build'),
		compress: true,
		port: PORT,
		hot: true,
		inline: true,
		historyApiFallback: true,
		publicPath: '/',
		host: '0.0.0.0',
		disableHostCheck: true,
	},

	plugins: [
		...Base.plugins || [],

		new webpack.NoEmitOnErrorsPlugin(),

		new webpack.HashedModuleIdsPlugin(),
		new webpack.NamedChunksPlugin(chunk => chunk.name || 'faceless-chunk'),

		new HtmlPlugin({
			filename: 'index.html',
			template: Root('src/index.html'),
		}),

		new webpack.HotModuleReplacementPlugin(),
	],
};

export default [Client];
