
document.addEventListener('init', function(event){
    var page = event.target;

    if(page.id === 'button.html'){
        var elem_btn = document.getElementById('button');

        elem_btn.addEventListener('click', function(){
            ons.notification.alert('ボタンを押しました！');  
        });
    }
    else if(page.id === 'list.html'){
        js_list.init(page);
    }
    else if(page.id === 'sqltest.html'){
        js_sqltest.init(page);
    }
});

// アプリ起動時に一度のみ実行
document.addEventListener('deviceready', function(event) {
    createTable();
});

// 各ページの初期表示
document.addEventListener('init', function(event) {
    // ... そのまま残しておく
});

/**
 * テーブルを作成します。
 */
var db = null;  // DBコネクション保持用

function createTable() {

    // DBコネクションを取得
    db = window.sqlitePlugin.openDatabase({
        name     : 'todolist.db',
        location : 'default',
    });
    var sql = {
            create_table :
                  "CREATE TABLE IF NOT EXISTS todo ( "
                + "    id          INTEGER PRIMARY KEY,"    // ID
                + "    valid       TEXT    NOT NULL,"       // 有効フラグ
                + "    title       TEXT    NOT NULL,"       // タイトル
                + "    date        TEXT    NOT NULL"        // 登録日時
                + ")",

            drop_table :
                "DROP TABLE IF EXISTS todo",
        }
    
    // SQL実行
    db.transaction(function(tx) {
        // 実行部分
        tx.executeSql(sql.create_table);

    }, function(error) {
        // SQL処理エラー発生時の処理
        console.log('テーブル初期化失敗 : ' + error.message);

    }, function() {
        // SQL処理成功時
        console.log('テーブル初期化成功');
        console.log(db);
    });
}