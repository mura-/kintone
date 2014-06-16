(function(){

    var targetElementId = '#kintai-show';
    kintone.events.on('app.record.index.show', function (event) {

        main();

    });

    /**
     *
     */
    var createKintaiShowButton = function() {
    
    };


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
        $(targetElementId).html("test");
    };

    KintaiArea.prototype.isTargetUrl = function () {
        if (targetUrl === location.pathname) {
            return true;
        }
        return false;
    }

    function main() {
        var user = kintone.getLoginUser();
        if (user.code === 'k.murahama') {
            var kintaiArea = new KintaiArea();
            kintaiArea.addArea();
        }
    }

})();
