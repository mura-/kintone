(function(){


    var targetElementId = '#kintai-show';
    kintone.events.on('app.record.index.show', function (event) {

        main();

    });

    /**
     * @constructor
     */
    var KintaiArea = function() {
        /**
         * @type {number}
         * @private
         */
        this.timerId_ = 0;
    };

    /**
     * 勤怠表示のエリアを作成する。
     */
    KintaiArea.prototype.addArea = function() {
        // $(targetElementId).append(this.createAuthorizeButton());
        kintone.app.getHeaderMenuSpaceElement().appendChild(this.createAuthorizeButton());
        var myHeaderSpace = kintone.app.getHeaderSpaceElement();
        // 文字列要素
        var myListHeaderDiv = document.createElement('div');
        myListHeaderDiv.className = 'view-names';
    };

    /**
     * googleAPI認証ボタン作成
     */
    KintaiArea.prototype.createAuthorizeButton = function() {
        var authorizeButton = document.createElement('button');
        authorizeButton.id = 'authorize-button';
        authorizeButton.innerHTML = '認証する';
        // authorizeButton.style.visibility = 'hidden';
        return authorizeButton;
    };

    function main() {
        var user = kintone.getLoginUser();
        if (user.code === 'k.murahama') {
            kintaiArea = new KintaiArea();
            kintaiArea.addArea();
        }
    }

    var KintaiData = function() {
        this.kintaiDataJson;
    };

    var GApiManager = function() {
        this.clientId = '311224808431-1ishkg2dbq3m45pedn3eeju43c3v5h7l.apps.googleusercontent.com';
        this.apiKey = 'AIzaSyChnk6hoQdIKjfnq2XVJxwxUlv1KUh8kHU';
        this.scopes = ['https://www.googleapis.com/auth/plus.me','https://www.googleapis.com/auth/calendar'];

    };

    // googleApi待ち受け
    handleClientLoad = function() {
        var gApiManager = new GApiManager();
        // 予めAPI Consoleで設定したAPIキーを設定
        gapi.client.setApiKey(gApimanager.apiKey);
        // すでに認証済みかの確認をする。
        //window.setTimeout(checkAuth,1);
    }

})();
