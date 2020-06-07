# Dancing☆Onigiriエディター(CW Edition対応)

サイト: [https://superkuppabros.github.io/danoni-editor/](https://superkuppabros.github.io/danoni-editor/)

Vue.js + TypeScript 製の [Dancing☆Onigiri](https://github.com/cwtickle/danoniplus) エディターです。  
Google Chromeにて動作を確認しています。  
必要な機能については順次実装していきます。  

既知のバグについてはIssueをご覧ください。
その他のバグ報告はissue, PRかTwitter(@superkuppabros)までお願いします。

## バージョン
### ver 2.1.1β
#### 変更点
- `Adjustment` -> `BlankFlame`

#### バグ修正
- 各種数値を変更した際に文字列として扱っていたものを数値として扱うようにした

### ver 2.1.0β
#### 機能追加
- 4分譜面の出力(TESTボタンから)
#### 変更点
- `FirstNumber`の入力を廃止し、`Adjustment`と`StartNumber`を導入
  - `Adjustment`: 全体の補正フレーム
  - `StartNumber`: 音楽の再生開始フレーム
  - ダンおにでの`FirstNumber`は`Adjustment`と`StartNumber`の和

### ver 2.0.0β
#### 機能追加
- 全体変速、個別変速
- ページ、行操作
#### 変更点
- ノーツ打ち込み操作キーを一部変更(5key)、代替キーの追加
- BPM・FirstNumを小数で入力可能にした
#### バグ修正
- `↓`キーでページ移動した際に正しく位置を反映させるようにした

### 以前のバージョン
<details>
<summary>更新履歴</summary>

### ver 1.1.0α
#### 機能追加
- 音楽再生機能の追加

### ver 1.0.0α
- α版公開

</details>

## 使い方
### 全体操作
  - 音楽再生・停止: `Enter`
  - 上下移動: `↑↓`、`Space`(上方向)
  - ページ移動: `←→`
  - 5ページ移動: `Shift` + `←→`
  - 入力間隔変更: `Ctrl` + 1,2,3,4,5,6,7

    <details>
    <summary>対応表</summary>

    |使用キー|入力間隔| 
    |--|--|
    |1| 4分
    |2| 8分
    |3| 16分
    |4| 12分
    |5| 24分
    |6| 32分
    |7| 48分

    </details>

### ノート操作
  - ノート打ち込み: 各種キー(代替キー)
  - フリーズノート打ち込み: `Shift` + 各種キー(代替キー)

    <details>
    <summary>対応キー・タイプ一覧表</summary>

    |タイプ|使用するキー|
    |--|--|
    |5key| J(S), K(D), I(E), L(F), G(H)|
    |7key| S, D, F, G(H), J, K, L|
    |7ikey| S(Z), D(X), F(C), J, K, I(O), L|
    |8key| S, D, F, G(H), J, K, L, ;|
    |9Akey| S, D, E(R), F, G(H), J, K, I(O), L|
    |9Bkey| A, S, D, F, G(H), J, K, L, ;|
    |9ikey| A, S, D, F, G(H), J, K, I(O), L|
    |11key| S, D, F, G(H), J, K, L, U, I, 8(9), O|
    |11Lkey| W, E, 3(4), R, S, D, F, G(H), J, K, L|
    |11Wkey| S, D, F, G(H), J, K, L, 2(1), T, Y, 0(-)|
    |11ikey| S, C(X), D, E(R), F, G(H), J, M(<), K, I(O), L|
    |12key| B, N, J, M, K, <, L, >, U, I, 8(9), O|
    |13key| A, S, D, F, G(H), J, K, L, ;, U, I, 8(9), O|
    |14key| B, N, J, M, K, <, L, >, Y(T), U, I, 8(9), O, P(@)|
    |14ikey| Z, X, C, S, D, F, G(H), J, K, L, U, I, 8(9), O|
    |15key| W, E, 3(4), R, S, D, F, G(H), J, K, L, U, I, 8(9), O|
    |16ikey| Z, X, C, A, S, D, F, G(H), J, K, L, ;, U, I, 8(9), O|
    |17key| A, Z, S, X, D, C, F, V, G(H), N, J, M, K, <, L, >, ;|

    </details>

### 速度変化コマ操作
  - 全体速度変化: `:`
  - 個別速度変化: `Shift` + `:` 

### ページ、行操作
  - ページカット: `Ctrl` + `Z`
  - ページコピー: `Ctrl` + `C`
  - ページ貼り付け: `Ctrl` + `V`
  - 行の削除: `BackSpace`
  - 行ごとのノーツ移動: `Ctrl` + `↑↓`

### その他操作
  - ページ、ラベル移動: 各種ボタン（◁, ▷）
  - 途中のBPM/StartNum変更: Labelにチェックを入れて数値を変更する
  - ダンおにデータ出力: GOボタン(クリップボードにコピーされます)
  - セーブデータ(JSON)出力: SAVEボタン(クリップボードにコピーされます)
  - 4分譜面出力: TESTボタン(クリップボードにコピーされます)

## 開発者向け

CSSフレームワーク: UIkit (https://getuikit.com/)  
Canvas操作: Konva.js (https://konvajs.org/)

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
