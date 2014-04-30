/*
 * サンプルカスタマイズ
 */
(function() {
     
    "use strict";
    // レコード一覧の表示時にフィールド値の条件に応じて、文字色、フィールドの背景色を変更する
    kintone.events.on('app.record.index.show', function (event) {
//        var eluserId = kintone.app.getFieldElements('user_id');
//        var elUserPw = kintone.app.getFieldElements('user_pw');
//        var elUrgent = kintone.app.getFieldElements('Urgent');

        alert("aaa");

        var enterUserId = 'hogehoge';
        var enterUserPw = 'foobar';
        var apiPath = '/k/v1/records.json';
        var httpMethod = 'GET';
        var query = {query : 'user_id = ' + enterUserId};


        kintone.api(apiPath, httpMethod, query, function(resp) {

            alert(resp);
        });
        

    });

})();
