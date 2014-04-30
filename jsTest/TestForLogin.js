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
        var apiPath = '/k/v1/records';
        var httpMethod = 'GET';
        var appId = 75;
        var query = {query : 'user_id = ' + enterUserId};
        var apiParam = {app : appId, query : query}


        kintone.api(apiPath, httpMethod, {app : 75}, function(resp) {

            alert(resp);
        });
        

    });

})();
