/*
 * サンプルカスタマイズ
 */
(function() {
     
    "use strict";
    // レコード一覧の表示時にフィールド値の条件に応じて、文字色、フィールドの背景色を変更する
//    kintone.events.on('app.record.index.show', function (event) {
// 
//        var elStatus = kintone.app.getFieldElements('会議名');
//        var elUrgent = kintone.app.getFieldElements('Urgent');
//        
// 
//        for (var i = 0; i < elStatus.length; i++) {
//            var record = event.records[i];  
// 
//            if (record['会議名']['value'] == "PAGMTG") {
//                elStatus[i].style.color = 'red';
//                elStatus[i].style.backgroundColor = 'cornsilk';
//            }
// 
//        }
// 
//    });


//    kineone.events.on('app.record.create.show', function (event) {
//        var record = event.record;
//        record['出席者']['disabled'] = false;
//        record['会議名']['disabled'] = true;
//        return event;
//        alert("saasa");
//    });
    kintone.events.on('app.record.index.show', function (event) {
        window.alert('レコード一覧イベント');
    });
 
    kintone.events.on('app.record.detail.show', function (event) {
        window.alert('レコード表示イベント');
    });
 
    kintone.events.on('app.record.create.show', function (event) {
        var record = event.record;
        record['出席者']['disabled'] = false;
        record['会議名']['disabled'] = true;
        return event;
        window.alert('レコード追加イベント');
    });
 
    kintone.events.on('app.record.edit.submit', function (event) {
        window.alert('レコード編集イベント');
    });
 
    kintone.events.on('app.report.show', function (event) {
        window.alert('グラフ表示イベント');
    });
 
})();
