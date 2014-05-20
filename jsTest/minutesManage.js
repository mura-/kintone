/*
 * 議事録管理アプリ用javascript
 */
(function() {
     
    "use strict";

    kintone.events.on('app.record.create.show', function (event) {
        var record = event.record;
        record['出席者']['disabled'] = false;
        return event;
    });
 
    kintone.events.on('app.record.edit.submit', function (event) {
        var record = event.record;
        record['出席者']['disabled'] = false;
        return event;
    });

})();
