# Dancing☆Onigiri エディター(CW Edition 対応)

サイト: [https://superkuppabros.github.io/danoni-editor/](https://superkuppabros.github.io/danoni-editor/)

Vue.js + TypeScript 製の [Dancing☆Onigiri](https://github.com/cwtickle/danoniplus) エディターです。  
Google Chrome にて動作を確認しています。  
必要な機能については順次実装していきます。

既知のバグについては Issue をご覧ください。
その他のバグ報告は issue, PR か Twitter(@superkuppabros)までお願いします。

## バージョン

過去のバージョンは[こちら](https://github.com/superkuppabros/danoni-editor/wiki/%E6%9B%B4%E6%96%B0%E5%B1%A5%E6%AD%B4)

### ver 2.7.2

#### 機能追加

- フリーズ部分にハイライトを入れる機能の追加
  - CONFIGからオフに出来ます

#### バグ修正

- ノーツを上下にずらす操作を行う際に、フリーズノーツも通常ノーツに変化してしまうバグの修正

### ver 2.7.1

#### 変更点

- エディター下部に入力キーを表示
- 譜面情報表示時に3つ以上の同時押しの位置を表示

#### バグ修正

- 17keyの最も右のキーが入力できなかった問題の修正
- 難易度計算が正しく行われていなかった問題の修正

### ver 2.7.0

#### 機能追加

- ページ挿入・削除機能の追加
  - それぞれ `Shift` + `Ctrl` + `V`、`Shift` + `Ctrl` + `X` で操作できます

#### 変更点

- UIの一部変更
  - エディタ画面からトップ画面に戻るための×ボタンの追加

- セーブデータ形式の変更
  - `keyNum` フィールドを持たせないよう変更
  - 以前のバージョンで作成されたデータも引き続き使用できますが、再出力しても `keyNum` フィールドは消滅しません

#### バグ修正

- StartNum等の変更後、現在のフレーム数が正しく表示されない問題の修正

### ver 2.6.0β

#### 機能追加

- 譜面を出力した際にセーブデータが一時保存される機能を追加
  - REVIVAL ボタンで最終保存時のデータが反映されます

#### 変更点

- セーブファイルにキー種が保存されるように
  - トップページで読み込ませた際、選んだキー種より、セーブファイルに書かれているキー種が優先されるようになっています
  - 2.5.0以前のセーブデータも読み込めますが、その際はキー種も目的のものに合わせる必要があります

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
