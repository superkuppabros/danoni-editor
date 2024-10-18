# Dancing☆Onigiri エディター(CW Edition 対応)

サイト: [https://superkuppabros.github.io/danoni-editor/](https://superkuppabros.github.io/danoni-editor/)

Vue.js + TypeScript 製の [Dancing☆Onigiri](https://github.com/cwtickle/danoniplus) エディターです。  
Google Chrome にて動作を確認しています。  
必要な機能については順次実装していきます。

既知のバグについては Issue をご覧ください。
その他のバグ報告は issue, PR か Twitter(@superkuppabros)までお願いします。

## バージョン

過去のバージョンは[こちら](https://github.com/superkuppabros/danoni-editor/wiki/%E6%9B%B4%E6%96%B0%E5%B1%A5%E6%AD%B4)

### ver 4.0.0

#### 機能追加・改善
- クリック・タップモードの導入 #116
  - Configおよびエディター画面のショートカットで切り替え可能
    - 詳細は https://github.com/superkuppabros/danoni-editor/pull/116#issue-2420768451
  - 現在の状態はエディター画面右上の[Key][Click][Wheel0]で確認可能

- ページのブロック数をラベルごとに設定できるように #124
  - es_pageBlockNumber を譜面フッターに追加
    - 譜面復元時に設定しない場合、古い譜面はすべて8として扱う
  - ConfigのPageBlockNum設定は削除

- 譜面データ名のprefix設定を実装、データ復元条件の緩和 #115
  - 譜面データ名の前に任意の文字列を先頭に付加する機能をオプションに追加
    - Prefixに「a」を設定すると「aleft_data」「afrzLeft_data」
    - 譜面データに `es_scorePrefix` を出力
  - 譜面フッターの一部を省略してもデータの復元が可能に

- カスタム定義のダウンロード・差分アップロードに対応 #117
  - 一部の定義キーだけアップロードしても反映されるように
  - 変更時は現在の定義状態がアップロード時にメッセージとして出力されます

- 最後のorderGroupを記憶する #120
  - 表示レーンの切り替え時に、最後のレーン表示が次のデフォルトの読み込みとして維持されるように

#### バグ修正
- KeyboardEvent.codeが空の場合にノーツが入力されないように #123
  - 右シフト押下時に一部の環境でフリーズが入力されてしまう問題への対応

### ver 3.3.0

#### 機能改善
- 同一キーで表示レーンをショートカットで切替できるように ( thanks: @cwtickle )
  - `Ctrl` + `Q` で切替可能
  - 標準搭載は5key(3種)と11W(2種)
  - カスタムキー定義で直接指定も可能: https://github.com/superkuppabros/danoni-editor/pull/113#issue-2406538684
- テンキーで入力間隔の変更ができるように

#### バグ修正
- Start Numberが絶対値の大きい負の値のとき音楽再生がエラーになる問題の修正 ( thanks: @suzme )
- エディタ定義が入っていない状態でセーブデータを読み込むとエディタが落ちる問題の修正
- ページカットを連打した場合にエディター画面が消滅する問題の修正

### ver 3.2.0

#### 機能改善
- 17keyを青が上になるように
- ページごとの拍子数を変更出来るように
- 四分譜面のパターンを設定できるように
- オンラインセーブ時の挙動改善

#### バグ修正
- 音楽の再生速度を変更するたびに再生が始まってしまう問題の修正 ( thanks: @suzme )
- 5key以外で空の譜面のセーブデータをロードした時に譜面データが壊れる問題の修正

#### その他
- 使用しているライブラリのアップデート
  - これにより意図しないバグが含まれる可能性があるため、発見したらご報告いただけると助かります。

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
