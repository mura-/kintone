/*
 * サンプルカスタマイズ
 */
(function() {
     
    "use strict";
    // レコード一覧の表示時にフィールド値の条件に応じて、文字色、フィールドの背景色を変更する
    kintone.events.on('app.record.index.show', function (event) {
 
        var elStatus = kintone.app.getFieldElements('会議種別');
 
        for (var i = 0; i < elStatus.length; i++) {
            var record = event.records[i];  
 
            if (record['会議種別']['value'] == "PAGMTG") {
                elStatus[i].style.color = 'red';
                elStatus[i].style.backgroundColor = 'cornsilk';
            }
 
        }
 
    });
 
})();
