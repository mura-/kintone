/*
 * 端末管理アプリ
 */
(function() {
     
    "use strict";
    kintone.events.on('app.record.index.show', function (event) {
        if (document.getElementById ('my_index_button') != null) {
                return;
            }
             
            var myIndexButton = document.createElement('button');
            myIndexButton.id = 'my_index_button';
            myIndexButton.innerHTML = 'アプリDLのQRコードを表示';


            var qrImgEl = document.createElement("img");
            qrImgEl.id = 'qrImg';
            qrImgEl.setAttribute("src", "https://lexues.cybozu.com/k/api/record/download.do/-/mobile_apk_qr.gif?field=10213&id=182&app=88&record=2&revision=1&hash=f842417ba97a02e2ce9392c06024eba53ff4a7f1&detectType=true&row=1031&.gif");
              

            // ボタンクリック時の処理
            myIndexButton.onclick = function() {
                var myHeaderSpace = kintone.app.getHeaderSpaceElement();
                // 文字列要素
                var myListHeaderDiv = document.createElement('div');
                myListHeaderDiv.appendChild(qrImgEl);
                  
                // メニューの下側の空白部分に文字列を表示
                myHeaderSpace.innerHTML = null; // ← 増殖を防ぐため一旦明示的にnullをセット
                myHeaderSpace.appendChild(myListHeaderDiv);
            }
              
        kintone.app.getHeaderMenuSpaceElement().appendChild(myIndexButton);
    });
})();
