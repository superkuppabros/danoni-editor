# Dancing☆Onigiri エディター(CW Edition 対応)

サイト: [https://superkuppabros.github.io/danoni-editor/](https://superkuppabros.github.io/danoni-editor/)

Vue.js + TypeScript 製の [Dancing☆Onigiri](https://github.com/cwtickle/danoniplus) エディターです。  
Google Chrome にて動作を確認しています。  
必要な機能については順次実装していきます。

既知のバグについては Issue をご覧ください。
その他のバグ報告は issue, PR か Twitter(@superkuppabros)までお願いします。

## バージョン

過去のバージョンは[こちら](https://github.com/superkuppabros/danoni-editor/wiki/%E6%9B%B4%E6%96%B0%E5%B1%A5%E6%AD%B4)

### ver 3.1.8

#### バグ修正
- 音楽の再生速度を変更するたびに再生が始まってしまう問題の修正 ( thanks: @suzme )
- 5key以外で空の譜面のセーブデータをロードした時に譜面データが壊れる問題の修正

#### 機能改善
- オンラインセーブ時の挙動改善

### ver 3.1.7

#### バグ修正
- 音楽再生周りの不具合解消 ( thanks: @suzme )

### ver 3.1.6

#### 機能改善
- ボリュームと再生速度を即時反映する ( thanks: @suzme )

#### バグ修正
- ページ端での同時押し入力時に不正な場所にノートが置かれてしまう場合がある不具合の修正 ( thanks: @suzme )
- ページ送りが二重になることがある問題の修正

### ver 3.1.5

#### バグ修正
- 速度変化コマの表示が1から変化しなかった問題の修正

### ver 3.1.4

#### 機能改善
- Web Audio APIの利用
  - 楽曲再生時のズレが軽減
  - 低速再生が滑らかに
    - 代わりにピッチが速度に依存する(低くなる)
- 譜面データからの復元時の補正の改善
  - 操作できないノーツに置かれる問題の修正
  - 16分系統に寄せた補正が実行される

### ver 3.1.3

#### 機能改善

- 起動画面の改善 ( thanks: @suzme )
  - Ctrl + Vで譜面データを入れられるように
  - js, htmlファイルを譜面データとして受け付けるように
- undo(元に戻す)の挙動を改善
- その他細かい挙動等の改善、修正

### ver 3.1.2

#### バグ修正

- ページ終端で同時押し入力できないことがある問題の修正 ( thanks: @suzme )

### ver 3.1.1

#### 機能改善

- 同時にキー入力した場合に同行に配置されるように ( thanks: @suzme )
  - CONFIGの`simultaneous threshold`で許容ms範囲を変更できます(-1で無効)

### ver 3.1.0

#### 機能改善

- オンラインセーブ・ロード時のパスの履歴を保存するように
- 音量設定をローカルに保存して引き継ぐように
- エディタの方向を下向きにしている際のB・Spaceキーの挙動を変更

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
