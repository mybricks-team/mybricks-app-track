const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBar = require('webpackbar')
const fs = require('fs')
const pkg = require('../../package.json')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  resolve: {
    alias: {},
  },
  devServer: {
    // static: [],
    port: 8001,
    host: 'localhost',
    hot: true,
    client: {
      logging: 'warn',
    },
    proxy: [
      {
        context: ['/api/track/publish'],
        // target: 'https://my.mybricks.world',
        target: 'http://localhost:8002',
        secure: false,
        changeOrigin: true,
      },
      // {
      //   context: ['/api/material/components/combo'],
      //   target: 'http://localhost:9002',
      //   pathRewrite: { '^/api/material/components/combo': '/api/th5/getMock' },
      //   secure: false,
      //   changeOrigin: true,
      // },
      {
        context: ['/'],
        // target: 'http://testweb.manateeai.com/',
        target: 'https://my.mybricks.world',
        // target: 'https://test.mybricks.world',
        // target: 'http://localhost:3100',
        secure: false,
        changeOrigin: true,
      },
    ]
  },
  plugins: [
    new WebpackBar(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['index'],
      templateContent: ({ htmlWebpackPlugin }) => {
        let content = fs.readFileSync(path.resolve(__dirname, '../templates/index.html'), 'utf-8')
        content = content.replace('<!-- _APP_CONFIG_ -->', `<script>const _APP_CONFIG_ = {namespace: '${pkg.name}'}</script>`)
        return content
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, '../templates/public'), to: "public" },
      ],
    })
  ]
})
