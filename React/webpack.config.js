const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require("@effortlessmotion/html-webpack-inline-source-plugin");
const FileManagerPlugin = require('filemanager-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  // optimization: {
  //   minimizer: [new TerserPlugin({ /* additional options here */ })],
  // },
  // Alterado o ponto de entrada para um arquivo TypeScript (.tsx)
  entry: "./src/index.tsx",
  devServer: {
    static: {
      directory: path.join(__dirname, "build"),
    },
    port: 3000,
  },
  module: {
    rules: [
      // Adicionada regra para arquivos TypeScript e TSX usando ts-loader
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // Regra original para JavaScript e JSX mantida, caso você misture os tipos de arquivo
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.mjs$/,
        exclude: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", 'postcss-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  watchOptions: {
    // Ignora a pasta node_modules para melhorar o desempenho
    ignored: /node_modules/,
    // Verifica por mudanças a cada segundo (1000 milissegundos)
    poll: 1000, 
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "build"),
    publicPath: '',
    // Limpa o diretório de build antes de cada compilação
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: "body",
      template: path.join(__dirname, "public", "index.html"),
      // Esta opção foi movida para o HtmlWebpackInlineSourcePlugin na v3,
      // mas o plugin que você usa (@effortlessmotion) ainda pode precisar dela.
      // Se estiver usando html-webpack-plugin v4+, considere usar `inlineSource` no plugin correto.
      inlineSource: '.(js|css)$',
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [
            { source: path.join(__dirname, "build", "index.html"), destination: path.join(__dirname, "..", "JavaSpring", "src", "main", "resources", "static", "index.html") },
          ],
        }
      }
    }),
    //new BundleAnalyzerPlugin()
  ],
  
  resolve: {
    // Garante que o Webpack resolva as extensões de TypeScript
    extensions: [".tsx", ".ts", ".jsx", ".js", "*"],
  }
};
