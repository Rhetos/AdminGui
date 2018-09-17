/* Add here all your JS customizations */

/*
	Modal with CSS animation
*/
(function ($) {
    $.fn.showMagnificPopup = function () {
        $.magnificPopup.open({
            items: {
                    src: this
                },
            type: 'inline',
            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: 'auto',
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-zoom-in',
            modal: true
        });
        return this;
    };
})(jQuery);

(function ($) {
    $.fn.hideMagnificPopup = function () {
        $(this).magnificPopup('close');
    };
})(jQuery);