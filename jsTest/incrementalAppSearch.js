(function(){

    // ポータルのページを指定
    var targetPageHash = '#/portal';

    // アプリ一覧の指定
    var targetParentClass  = '.ocean-portal-listitem.ocean-portal-listitem-app';
    var targetAppClass = '.ocean-ui-dropdown';

    // 検索ボックスの指定
    var searchBox = document.createElement('input');
    searchBox.type = 'text';
    searchBox.id = 'search-box';

    // もっと見るボタンの指定
    var targetReadMoreClass = '.ocean-portal-list-readmore-text';

    // もっと見るボタンを押す
    var clickReadMore = function() {
        if(0 < $(targetParentClass + ' ' + targetReadMoreClass).size() ) {
           $(targetParentClass + ' ' + targetReadMoreClass).click();
        }
    };

    // インクリメンタルサーチ
    var startSearch = function() {
        $('#search-box').keyup(function (){
            if(!$(this).val()) {
                $('.ocean-portal-appitem div').parent().show();
            } else {
                $('.ocean-portal-appitem').hide();
                $('.ocean-portal-appitem div:contains(' + this.value + ')').parent().show();
            }
        });
    }


    function main() {
        var timerId = setInterval(function() {
            if (targetPageHash === location.hash) {

                // もっと見るボタンを押す
                clickReadMore();

                if(0 === $('#search-box').size() ) {
                    // 検索ボックス設置
                    $(targetParentClass + ' ' + targetAppClass).after(searchBox);

                    // 検索開始
                    startSearch();
                }
            }
        }, 300);
    }

    main();
})();
