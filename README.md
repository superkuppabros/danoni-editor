# Dancing☆Onigiri エディター(CW Edition 対応)

サイト: [https://superkuppabros.github.io/danoni-editor/](https://superkuppabros.github.io/danoni-editor/)

Vue.js + TypeScript 製の [Dancing☆Onigiri](https://github.com/cwtickle/danoniplus) エディターです。  
Google Chrome にて動作を確認しています。  
必要な機能については順次実装していきます。

既知のバグについては Issue をご覧ください。
その他のバグ報告は issue, PR か Twitter(@superkuppabros)までお願いします。

## バージョン

過去のバージョンは[こちら](https://github.com/superkuppabros/danoni-editor/wiki/%E6%9B%B4%E6%96%B0%E5%B1%A5%E6%AD%B4)

### ver 2.8.1

#### 機能改善

- 今までCtrlと同時に押す必要があったショートカットのうち、入力に不要なキーはCtrlなしでも同等の機能を使えるように

### ver 2.8.0

#### 機能追加

- 出力する譜面データに独自のフッターを追加
  - セーブデータを紛失した場合でも、譜面データをセーブファイルとして用いることでおおよその復元を可能にした
  - 一部のノーツの位置が変わる可能性があるため、完全に復元するためには引き続きセーブデータを使用する必要があります

    <details>
    <summary>フッターの仕様</summary>

    |フッター名|内容|サンプル|
    |-|-|-|
    |es_keyKind|キー種|7i|
    |es_blankFrame|BlankFrame|200|
    |es_label|Labelのリスト|1,3|
    |es_startNumber|StartNumberのリスト|350,800|
    |es_bpm|BPMのリスト|140,180|
    |es_scoreNumber|譜面番号|2|

    </details>

- 試験的に[Cross Walker](https://cw7.sakura.ne.jp/index.html)のエディタで生成された譜面データから復元可能に
  - 試験的なため、復元出来ないデータがあるかもしれません
  - Issueに上げてもらえると対応出来る可能性があります



### ver 2.7.5

#### 機能追加

- 23keyをデフォルトキーとして追加

### ver 2.7.4

#### バグ修正

- ノーツの入力されていないセーブデータを使用した際にエディターが表示されない不具合の修正

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
