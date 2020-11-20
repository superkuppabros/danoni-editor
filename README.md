# Dancing☆Onigiri エディター(CW Edition 対応)

サイト: [https://superkuppabros.github.io/danoni-editor/](https://superkuppabros.github.io/danoni-editor/)

Vue.js + TypeScript 製の [Dancing☆Onigiri](https://github.com/cwtickle/danoniplus) エディターです。  
Google Chrome にて動作を確認しています。  
必要な機能については順次実装していきます。

既知のバグについては Issue をご覧ください。
その他のバグ報告は issue, PR か Twitter(@superkuppabros)までお願いします。

## バージョン

過去のバージョンは[こちら](https://github.com/superkuppabros/danoni-editor/wiki/%E6%9B%B4%E6%96%B0%E5%B1%A5%E6%AD%B4)

### ver 2.7.5

#### 機能追加

- 23keyをデフォルトキーとして追加

### ver 2.7.4

#### バグ修正

- ノーツの入力されていないセーブデータを使用した際にエディターが表示されない不具合の修正

### ver 2.7.3

#### 変更点

- UIの一部修正
  - 入力間隔の表示
  - 起動時に自動的にフォーカスさせるように

### ver 2.7.2

#### 機能追加

- フリーズ部分にハイライトを入れる機能の追加
  - CONFIGからオフに出来ます

#### バグ修正

- ノーツを上下にずらす操作を行う際に、フリーズノーツも通常ノーツに変化してしまうバグの修正

## 使い方
- [譜面作成の流れ](https://github.com/superkuppabros/danoni-editor/wiki/%E8%AD%9C%E9%9D%A2%E4%BD%9C%E6%88%90%E3%81%AE%E6%B5%81%E3%82%8C)
- [操作早見表](https://github.com/superkuppabros/danoni-editor/wiki/%E6%93%8D%E4%BD%9C%E6%97%A9%E8%A6%8B%E8%A1%A8)

## 開発者向け

CSS フレームワーク: UIkit (https://getuikit.com/)  
Canvas 操作: Konva.js (https://konvajs.org/)

プロジェクトスタート

```
npm install
```

ローカルサーバ起動

```
npm run serve
```

ビルド

```
npm run build
```

lint

```
npm run lint
```
