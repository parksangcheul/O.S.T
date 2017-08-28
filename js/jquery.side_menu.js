
function SideMenu(options) {
    this.init(options);
    this.initEvent();
}

SideMenu.prototype = {
    init: function (opt) {
        this.$sideMenu = $(opt.selector.menu);
        this.$showBtn = $(opt.selector.showBtn);
        this.$hideBtn = this.$sideMenu.find('.close_btn');
        this.$list = this.$sideMenu.find('.slide_main_menu > li > a');
        this.$shadow = $(opt.selector.shadow);
        this.$subMenu = this.$sideMenu.find('.slide_sub_menu');
        this.duration = opt.duration || 400;
    },
    initEvent: function () {
        this.clickHandler()
    },
    clickHandler: function () {
        var _this = this;

        this.$showBtn.on('click', function () {
            _this.showMenu();
        });

        this.$hideBtn.on('click', function () {
            _this.hideMenu();
        });

        this.$list.on('click', function () {
            _this.toggleList($(this));
        });
    },
    showMenu: function () {
        this.$sideMenu.stop().animate({
            right: 0
        }, this.duration);
        this.$shadow.stop().fadeIn(this.duration);
    },
    hideMenu: function () {
        this.$sideMenu.stop().animate({
            right: -500
        }, this.duration);
        this.$shadow.stop().fadeOut(this.duration);
    },
    toggleList: function ($this) {
        this.$subMenu.not($this.siblings('.slide_sub_menu')).stop().slideUp(this.duration);
        $this.siblings('.slide_sub_menu').stop().slideToggle(this.duration);
    }
};