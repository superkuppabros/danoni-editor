# Dancing☆Onigiri エディター(CW Edition 対応)

サイト: [https://superkuppabros.github.io/danoni-editor/](https://superkuppabros.github.io/danoni-editor/)

Vue.js + TypeScript 製の [Dancing☆Onigiri](https://github.com/cwtickle/danoniplus) エディターです。  
Google Chrome にて動作を確認しています。  
必要な機能については順次実装していきます。

既知のバグについては Issue をご覧ください。
その他のバグ報告は issue, PR か Twitter(@superkuppabros)までお願いします。

## バージョン

### ver 2.4.0β

#### 機能追加

- 独自のキーコンフィグを設定出来るように (テスト機能)

  - トップ画面の CONFIG ボタンから入り、ファイルを読み込ませることで設定できます
  - 設定画面の作成までの暫定処置のため、入力方式等は予告なく変更する可能性があります
    <details>
      <summary>ファイル形式</summary>

      サンプル: 11fkey

      ```JSON
        {
          "11f": {
            "id": 19,
            "num": 11,
            "keys": ["KeyS","KeyE","KeyD","KeyR","KeyF","KeyG","KeyJ","KeyI","KeyK","KeyO","KeyL"],
            "alternativeKeys": ["", "", "", "", "", "KeyH", "", "", "", "", ""],
            "noteNames": ["left_data","leftdia_data","down_data","space_data","up_data","rightdia_data","right_data","sleft_data","sdown_data","sup_data","sright_data"],
            "freezeNames": ["frzLeft_data","frzLdia_data","frzDown_data","frzSpace_data","frzUp_data","frzRdia_data","frzRight_data","sfrzLeft_data","sfrzDown_data","sfrzUp_data","sfrzRight_data"],
            "colorGroup": [0, 1, 0, 1, 0, 2, 0, 1, 0, 1, 0]
          }
        }
      ```

      親フィールド: key名  
      子フィールド:  
        - id: 適当な数字(現バージョンでは19以上を指定しておくのが無難です)  
        - num: キーの数  
        - keys: 使用キーの `KeyboardEvent.code` の一覧  
          - cf. https://developer.mozilla.org/ja/docs/Web/API/KeyboardEvent/code  
        - alternativeKeys: 代替キーの `KeyboardEvent.code` の一覧  
          - 使わない場合は空文字を入力  
        - noteNames: 出力時の矢印名  
        - freezeNames: 出力時の氷矢名  
        - colorGroup: エディタのカラーパターン(0-3までの数字で指定)  

    </details>
  

#### 変更点

- エディタ画面: `B` を下移動に割り当て
- 12/14key で `B`に割り当てていた key を`G`, `H`に変更

### ver 2.3.0β

#### 機能追加

- オプション設定画面の追加(OPTION ボタンで開きます)
  - 設定可能項目
    - 譜面番号(ここに移動)
    - 音量
    - 再生速度

### ver 2.2.1β

#### バグ修正

- データ出力時にフレーム数が昇順となるように修正

### ver 2.2.0β

#### 機能追加

- 譜面番号を付加出来るように
  - Score No.を 2 にすると、出力データに 2 が付与されます(e.g. left2_data)
- レベル計算機能の移植
  - CALC を押すと各種情報を表示します
  - ティックルさんのコードを参考に移植しています
  - cf.) https://github.com/cwtickle/danoniplus/blob/v15.1.3/js/danoni_main.js#L1400-L1594

### 以前のバージョン

<details>
<summary>更新履歴</summary>
### ver 2.1.3β

#### 機能追加

- 現在位置のフレーム・時間を表示

### ver 2.1.2β

#### 機能追加

- ページ離脱時に警告を出すようにする

### ver 2.1.1β

#### 変更点

- `Adjustment` -> `BlankFrame` に名称を変更

#### バグ修正

- 各種数値を変更した際に文字列として扱っていたものを数値として扱うようにした

### ver 2.1.0β

#### 機能追加

- 4 分譜面の出力(TEST ボタンから)

#### 変更点

- `FirstNumber`の入力を廃止し、`Adjustment`と`StartNumber`を導入
  - `Adjustment`: 全体の補正フレーム
  - `StartNumber`: 音楽の再生開始フレーム
  - **Dancing☆Onigiri での`FirstNumber`は`Adjustment`と`StartNumber`の和** となります。

### ver 2.0.0β

#### 機能追加

- 全体変速、個別変速
- ページ、行操作

#### 変更点

- ノーツ打ち込み操作キーを一部変更(5key)、代替キーの追加
- BPM・FirstNum を小数で入力可能にした

#### バグ修正

- `↓`キーでページ移動した際に正しく位置を反映させるようにした

### ver 1.1.0α

#### 機能追加

- 音楽再生機能の追加

### ver 1.0.0α

- α 版公開

</details>

## 使い方

### 全体操作

- 音楽再生・停止: `Enter`
- 上下移動: `↑↓`、`Space`(上方向)
- ページ移動: `←→`
- 5 ページ移動: `Shift` + `←→`
- 入力間隔変更: `Ctrl` + 1,2,3,4,5,6,7

  <details>
  <summary>対応表</summary>

  | 使用キー | 入力間隔 |
  | -------- | -------- |
  | 1        | 4 分     |
  | 2        | 8 分     |
  | 3        | 16 分    |
  | 4        | 12 分    |
  | 5        | 24 分    |
  | 6        | 32 分    |
  | 7        | 48 分    |

  </details>

### ノート操作

- ノート打ち込み: 各種キー(代替キー)
- フリーズノート打ち込み: `Shift` + 各種キー(代替キー)

  <details>
  <summary>対応キー・タイプ一覧表</summary>

  | タイプ | 使用するキー                                         |
  | ------ | ---------------------------------------------------- |
  | 5key   | J(S), K(D), I(E), L(F), G(H)                         |
  | 7key   | S, D, F, G(H), J, K, L                               |
  | 7ikey  | S(Z), D(X), F(C), J, K, I(O), L                      |
  | 8key   | S, D, F, G(H), J, K, L, ;                            |
  | 9Akey  | S, D, E(R), F, G(H), J, K, I(O), L                   |
  | 9Bkey  | A, S, D, F, G(H), J, K, L, ;                         |
  | 9ikey  | A, S, D, F, G(H), J, K, I(O), L                      |
  | 11key  | S, D, F, G(H), J, K, L, U, I, 8(9), O                |
  | 11Lkey | W, E, 3(4), R, S, D, F, G(H), J, K, L                |
  | 11Wkey | S, D, F, G(H), J, K, L, 2(1), T, Y, 0(-)             |
  | 11ikey | S, C(X), D, E(R), F, G(H), J, M(<), K, I(O), L       |
  | 12key  | G(H), N, J, M, K, <, L, >, U, I, 8(9), O             |
  | 13key  | A, S, D, F, G(H), J, K, L, ;, U, I, 8(9), O          |
  | 14key  | G(H), N, J, M, K, <, L, >, Y(T), U, I, 8(9), O, P(@) |
  | 14ikey | Z, X, C, S, D, F, G(H), J, K, L, U, I, 8(9), O       |
  | 15key  | W, E, 3(4), R, S, D, F, G(H), J, K, L, U, I, 8(9), O |
  | 16ikey | Z, X, C, A, S, D, F, G(H), J, K, L, ;, U, I, 8(9), O |
  | 17key  | A, Z, S, X, D, C, F, V, G(H), N, J, M, K, <, L, >, ; |

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
- 途中の BPM/StartNum 変更: Label にチェックを入れて数値を変更する
- ダンおにデータ出力: GO ボタン(クリップボードにコピーされます)
- セーブデータ(JSON)出力: SAVE ボタン(クリップボードにコピーされます)
- 4 分譜面出力: TEST ボタン(クリップボードにコピーされます)
- 譜面情報表示: CALC ボタン
- オプション画面(音量設定、譜面番号設定): OPTIONボタン

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
