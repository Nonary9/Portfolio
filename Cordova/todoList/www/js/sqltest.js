var js_sqltest = {init : function(page) {
    // DBコネクションを取得
    db = window.sqlitePlugin.openDatabase({
        name     : 'todolist.db',
        location : 'default',
    })
    console.log(db);
    //SQL
    var sql = {
      // ...
      select : "SELECT * FROM test",
  }
  
  //... (CREATE TABLE, INSERTの処理の部分はそのまま残しておいてください)
  
  // SQL(SELECT)を実行
  db.transaction(function(tx) {
      tx.executeSql(sql.select, [], function(tx, result) {    // SELECT文発行
          console.log(result.rows.length);                    // 取得できた行数をログに出力
          for (var i = 0; i < result.rows.length; i++) {      // 取得できた行数分ループ
              console.log(result.rows.item(i));               // n行目のデータをログに出力
          }
      })
  })
    //SQL fim
  },
}