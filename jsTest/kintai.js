/*
 * サンプルカスタマイズ
 */

(function() {
     
    "use strict";

    kintone.events.on('app.record.create.show', function (event) {
        // 認証ボタンの用意
        var authorizeButton = document.createElement('button');
        authorizeButton.id = 'authorize-button';
        authorizeButton.innerHTML = '認証する';
        authorizeButton.style.visibility = 'hidden';
        
        var absenceButton = document.createElement('button');
        absenceButton.id = 'absence';
        absenceButton.innerHTML = '勤怠報告';
        absenceButton.onclick = function() {
            gapi.client.load('calendar', 'v3', function(){
            var resource = {
              'summary': '【勤怠】' + reason, // 予定のタイトル
              'start': { // 開始日・時刻
                'dateTime': startDateTime
               },
              'end': { // 終了日・時刻
                'dateTime': endDateTime
               },
              'description': detail  // 説明   
            };
           
            var request = gapi.client.calendar.events.insert({
              'calendarId': 'primary',// デフォルトカレンダー：'primary'
              'resource': resource
            });
           
            request.execute(function(resp){
              alert("登録完了");
            });
          });
        };
    
        var getEventsButton = document.createElement('button');
        getEventsButton.id = 'getevent-button';
        getEventsButton.innerHTML = '勤怠報告取得';
        getEventsButton.onclick = function() {
           getEvents();
        };
    
        // 認証ボタンの設置
        var space1 = kintone.app.record.getSpaceElement('space1');
        space1.appendChild(authorizeButton);

        var space2 = kintone.app.record.getSpaceElement('space2');
        space2.appendChild(absenceButton);

        var space3 = kintone.app.record.getSpaceElement('space3');
        space3.appendChild(getEventsButton);


        setStartDateTime(event);
        setEndDateTime(event);
        setDetail(event);

    });
 
    kintone.events.on('app.record.create.change.開始日時', function (event) {
        setStartDateTime(event);
    });

    kintone.events.on('app.record.create.change.終了日時', function (event) {
        setEndDateTime(event);
    });

    kintone.events.on('app.record.create.change.不在理由', function (event) {
        setReason(event);
    });

    kintone.events.on('app.record.create.change.備考', function (event) {
        setDetail(event);
    });
})();


function setStartDateTime(event) {
        var record = event.record;
        startDateTime = record['開始日時']['value'];
        console.dir(startDateTime);
}

function setEndDateTime(event) {
        var record = event.record;
        endDateTime  = record['終了日時']['value'];
        console.dir(endDateTime);
}

function setReason(event) {
        var record = event.record;
        reason = record['不在理由']['value'];
        console.dir(reason);
}

function setDetail(event) {
        var record = event.record;
        detail = record['備考']['value'];
        console.dir(detail);
}

var clientId = '311224808431-1ishkg2dbq3m45pedn3eeju43c3v5h7l.apps.googleusercontent.com';
var apiKey = 'AIzaSyChnk6hoQdIKjfnq2XVJxwxUlv1KUh8kHU';
var scopes = ['https://www.googleapis.com/auth/plus.me','https://www.googleapis.com/auth/calendar'];
var startDateTime;
var endDateTime;
var reason;
var detail;
var calendarEvents = [];



/**
 * @expose カレンダーリストをグローバル空間へ
 */
var calendarList = '';

function handleClientLoad() {
        // 予めAPI Consoleで設定したAPIキーを設定
        gapi.client.setApiKey(apiKey);

        // すでに認証済みかの確認をする。
        window.setTimeout(checkAuth,1);
}

function checkAuth() {
    // immediateをtrueで指定することで、未認証の場合、ただちにエラーが返り、
    // handleAuthResultが呼び出される。
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
}

function handleAuthResult(authResult) {
    var authorizeButton = document.getElementById('authorize-button');
    if (authResult && !authResult.error) {
      authorizeButton.style.visibility = 'hidden';
      makeApiCall();
    } else {
      authorizeButton.style.visibility = '';
      authorizeButton.onclick = handleAuthClick;
      handleAuthClick();
    }
}

function handleAuthClick(event) {
        // ここで、ポップアップ画面を表示して、OAuth認証を行う。
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
        return false;
}

function makeApiCall() {
        var restRequest = gapi.client.request({
            'path': '/calendar/v3/users/me/calendarList'
        });
        restRequest.execute(function(list) {

            window.calendarList = list;

            console.dir(calendarList);
        });
}

function handleAuthClick() {
    // ここで、ポップアップ画面を表示して、OAuth認証を行う。
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
    return false;
}
 
function getEvents() {
    for (var i in window.calendarList.items) {
        var cnt = 0;
        gapi.client.load('calendar', 'v3', function(){

            var request = gapi.client.calendar.events.list({  // メソッド
                'calendarId': window.calendarList.items[cnt].id,  // 取得したカレンダーID(または'primary')
                'timeMin'   : '2014-06-08T00:00:00.000+09:00',
                'timeMax'   : '2014-06-09T00:00:00.000+09:00',
                'q'         : '勤怠'
            });

        var calendarEvent = {};
        var calendarEventList = [];
            request.execute(function(resp){
                for (var j in resp.items){
                  // 予定開始日時/終了日時とイベントIDを表示
                  var a = resp.items[j];
                  console.debug('name;'+ a.creator.displayName + ' start:' + a.start.dateTime + ' end:' + a.end.dateTime + 
                    ' summary:' + a.summary + ' eventid:' + a.id);

                  calendarEvent["name"] = a.creator.displayName;
                  calendarEvent["start"] = a.start.dateTime;
                  calendarEvent["end"] = a.end.dateTime;
                  calendarEvent["summary"] = a.summary;
                  calendarEvent["discription"] = a.discription;

                  calendarEventList.push(calendarEvent);
                  calendarEvent = {};

                  console.dir(calendarEvents);

                  var space4 = kintone.app.record.getSpaceElement('space4');
                  space4.innerHTML = null;
                  space4.appendChild(createTableCalendarEventsList(calendarEventList));
                }
            });
            cnt++;
        });
    }



}

function createTableCalendarEventsList(calendarEventList) {
    var cell, row, header, table, tbody;
    table = document.createElement('table');
    table.className = 'view-table';
    header = table.createTHead();

    row = header.insertRow(0);
    cell = row.insertCell(0);
    cell.innerHTML = '名前';
    cell = row.insertCell(1);
    cell.innerHTML = '開始日時';
    cell = row.insertCell(2);
    cell.innerHTML = '終了日時';
    cell = row.insertCell(3);
    cell.innerHTML = '不在理由';
    cell = row.insertCell(4);
    cell.innerHTML = '備考';

    tbody = document.createElement('tbody');
    var cnt = 0;
    console.dir(calendarEventList);
    for (var item in calendarEventList) {
        row = tbody.insertRow(cnt); 
        cell = row.insertCell(0);
        cell.innerHTML =  calendarEventList[cnt]["name"];
        cell = row.insertCell(1);
        cell.innerHTML =  calendarEventList[cnt]["start"].slice(0,10) + " " + calendarEventList[cnt]["start"].slice(11,16);
        cell = row.insertCell(2);
        cell.innerHTML =  calendarEventList[cnt]["end"].slice(0,10) + " " + calendarEventList[cnt]["end"].slice(11,16);
        cell = row.insertCell(3);
        cell.innerHTML =  calendarEventList[cnt]["summary"];
        cell = row.insertCell(4);
        cell.innerHTML =  calendarEventList[cnt]["discription"];
        cnt++;
    }

    table.appendChild(tbody);

    return table;

}


