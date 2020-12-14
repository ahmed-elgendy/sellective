
(function ($) {
    // Navigation scrolls
    $(".button-collapse").sideNav();

})(jQuery);

$('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        hover: true, // Activate on hover
        belowOrigin: true, // Displays dropdown below the button
        alignment: 'right' // Displays dropdown with edge aligned to the left of button
    }
);

//  strat counter project
$.fn.jQuerySimpleCounter = function (options) {
    var settings = $.extend({
        start: 0,
        end: 100,
        easing: 'swing',
        duration: 400,
        complete: ''
    }, options);

    var thisElement = $(this);

    $({count: settings.start}).animate({count: settings.end}, {
        duration: settings.duration,
        easing: settings.easing,
        step: function () {
            var mathCount = Math.ceil(this.count);
            thisElement.text(mathCount);
        },
        complete: settings.complete
    });
};
$('#number1').jQuerySimpleCounter({end: 12, duration: 3000});
$('#number2').jQuerySimpleCounter({end: 55, duration: 3000});
$('#number3').jQuerySimpleCounter({end: 359, duration: 2000});
$('#number4').jQuerySimpleCounter({end: 246, duration: 2500});


/* AUTHOR LINK */
$('.about-me-img').hover(function () {
    $('.authorWindowWrapper').stop().fadeIn('fast').find('p').addClass('trans');
}, function () {
    $('.authorWindowWrapper').stop().fadeOut('fast').find('p').removeClass('trans');
});
//  end  counter project

const options = {
  dropdownOptions: {
    onCloseStart: () => {
      console.log("Close Start from dropdownOptions");
    },
  }
};

const optionsAlt = {
  onCloseStart: () => {
    console.log("Close Start");
  }
};

var elem = document.querySelector('select');
//var instance = M.Select.init(elem, options);

function log(){
  console.log('logging');
}





$(document).ready(function () {
    //loader
   $(".spinner-container").css("display", "none");


    var navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn'),
        allNextBtn = $('.nextBtn'),
        allNextBtn = $('.nextBtn'),
        allNextBtn = $('.nextBtn'),
        allPrevBtn = $('.prevBtn');

    allWells.hide();

    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
            $item = $(this);

        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-primary').addClass('btn-default');
            $item.addClass('btn-primary');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });

    allNextBtn.click(function(){
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;

        $(".form-group").removeClass("has-error");
        for(var i=0; i<curInputs.length; i++){
            if (!curInputs[i].validity.valid){
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }

        if (isValid)
            nextStepWizard.removeAttr('disabled').trigger('click');
    });

    allPrevBtn.click(function(){
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            prevStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().prev().children("a");

        $(".form-group").removeClass("has-error");
        prevStepWizard.removeAttr('disabled').trigger('click');
    });

    $('div.setup-panel div a.btn-primary').trigger('click');
});

















/*******************************************/
//start pagenation
var names = ['Stan','Francine','Hayley','Steve','Roger','Klaus','Jeff','Avery'];
var pointer = 0;
var current = 1;
var pages = (Math.ceil(names.length/$('.card').length));
var itemsPage = $('.card').length;

function update(index, direction){
    var id = 2;
    var lim = index+$('.card').length;
    if(direction == 'next'){
        for (var i=index;i<lim;i++){
            if(typeof names[i] !== 'undefined') {
                $('#card'+(id)+'> .front').html(names[i]);
            }else{
                $('#card'+(id)+'> .front').hide();
            }
            id++;``
        }
    }else if(direction == 'prev'){
        for (var i=index;i<lim;i++){
            if($('#card'+(id)+'> .front').css('display') == 'none'){
                $('#card'+(id)+'> .front').show();
            }
            $('#card'+(id)+'> .front').html(names[i]);
            id++;
        }
    }else{
        alert('Error on pagination');
    }
}

function flip(ptr,dir){
    setTimeout(function(){
        $('.card').addClass('flip');
        setTimeout(function(){
            update(ptr, dir);
            $('.card').removeClass('flip');
        },500);
    }, 100)
}

$('#next').on('click', function(){
    pointer += itemsPage;
    flip(pointer,'next');
    if ((current+1) >= pages){
        $('#next').addClass('disabled').prop('disabled', true);
    }
    current++;
    $('#pag').html(current+'/'+pages);
    $('#prev').removeClass('disabled').prop('disabled', false);
});

$('[id^=page]').on('click', function(){
    pointer = parseInt($(this).text());
    flip(pointer,'next');
    if (pointer >= pages){
        $('#next').addClass('disabled').prop('disabled', true);
        $('#prev').removeClass('disabled').prop('disabled', false);
    }
    if (pointer == 1){
        $('#prev').addClass('disabled').prop('disabled', true);
        $('#next').removeClass('disabled').prop('disabled', false);
    }
    current = pointer;
    $('#pag').html(current+'/'+pages);

});

$('#prev').on('click', function(){
    pointer -= itemsPage;
    flip(pointer,'prev');
    if ((current-1) == 1){
        $('#prev').addClass('disabled').prop('disabled', true);
    }
    current--;
    $('#pag').html(current+'/'+pages);
    $('#next').removeClass('disabled').prop('disabled', false);
});

$('document').ready(function(){
    update(pointer, 'next');
    $('#pag').html(current+'/'+pages);
});

//end paganation

//  strat lazy loading

document.addEventListener("DOMContentLoaded", function() {
    var lazyloadImages = document.querySelectorAll("img.lazy");
    var lazyloadThrottleTimeout;

    function lazyload () {
        if(lazyloadThrottleTimeout) {
            clearTimeout(lazyloadThrottleTimeout);
        }

        lazyloadThrottleTimeout = setTimeout(function() {
            var scrollTop = window.pageYOffset;
            lazyloadImages.forEach(function(img) {
                if(img.offsetTop < (window.innerHeight + scrollTop)) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                }
            });
            if(lazyloadImages.length == 0) {
                document.removeEventListener("scroll", lazyload);
                window.removeEventListener("resize", lazyload);
                window.removeEventListener("orientationChange", lazyload);
            }
        }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
});

// end lazy loading

$(function(){ $('.search-select').comboSelect() });


(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object' && typeof require === 'function') {
        // Browserify
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ( $, undefined ) {

    var pluginName = "comboSelect",
        dataKey = 'comboselect';
    var defaults = {
        comboClass         : 'combo-select',
        comboArrowClass    : 'combo-arrow',
        comboDropDownClass : 'combo-dropdown',
        inputClass         : 'combo-input text-input',
        disabledClass      : 'option-disabled',
        hoverClass         : 'option-hover',
        selectedClass      : 'option-selected',
        markerClass        : 'combo-marker',
        themeClass         : '',
        maxHeight          : 200,
        extendStyle        : true,
        focusInput         : true
    };

    /**
     * Utility functions
     */

    var keys = {
            ESC: 27,
            TAB: 9,
            RETURN: 13,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            ENTER: 13,
            SHIFT: 16
        },
        isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));

    /**
     * Constructor
     * @param {[Node]} element [Select element]
     * @param {[Object]} options [Option object]
     */
    function Plugin ( element, options ) {

        /* Name of the plugin */

        this._name = pluginName;

        /* Reverse lookup */

        this.el = element

        /* Element */

        this.$el = $(element)

        /* If multiple select: stop */

        if(this.$el.prop('multiple')) return;

        /* Settings */

        this.settings = $.extend( {}, defaults, options, this.$el.data() );

        /* Defaults */

        this._defaults = defaults;

        /* Options */

        this.$options = this.$el.find('option, optgroup')

        /* Initialize */

        this.init();

        /* Instances */

        $.fn[ pluginName ].instances.push(this);

    }

    $.extend(Plugin.prototype, {
        init: function () {

            /* Construct the comboselect */

            this._construct();


            /* Add event bindings */

            this._events();


        },
        _construct: function(){

            var self = this

            /**
             * Add negative TabIndex to `select`
             * Preserves previous tabindex
             */

            this.$el.data('plugin_'+ dataKey + '_tabindex', this.$el.prop('tabindex'))

            /* Add a tab index for desktop browsers */

            !isMobile && this.$el.prop("tabIndex", -1)

            /**
             * Wrap the Select
             */

            this.$container = this.$el.wrapAll('<div class="' + this.settings.comboClass + ' '+ this.settings.themeClass + '" />').parent();

            /**
             * Check if select has a width attribute
             */
            if(this.settings.extendStyle && this.$el.attr('style')){

                this.$container.attr('style', this.$el.attr("style"))

            }


            /**
             * Append dropdown arrow
             */

            this.$arrow = $('<div class="'+ this.settings.comboArrowClass+ '" />').appendTo(this.$container)


            /**
             * Append dropdown
             */

            this.$dropdown = $('<ul class="'+this.settings.comboDropDownClass+'" />').appendTo(this.$container)


            /**
             * Create dropdown options
             */

            this._build();

            /**
             * Append Input
             */

            this.$input = $('<input type="text"' + (isMobile? 'tabindex="-1"': '') + ' placeholder="'+ this.getPlaceholder() +'" class="'+ this.settings.inputClass + '">').appendTo(this.$container)

            /* Update input text */

            this._updateInput()

        },
        getPlaceholder: function(){

            var p = '';

            this.$options.filter(function(idx, opt){

                return opt.nodeName == 'OPTION'
            }).each(function(idx, e){

                if(e.value == '') p = e.innerHTML
            });

            return p
        },
        _build: function(){

            var self = this;

            var o = '', k = 0;

            this.$options.each(function(i, e){

                if(e.nodeName.toLowerCase() == 'optgroup'){

                    return o+='<li class="option-group">'+this.label+'</li>'
                }

                o+='<li class="'+(this.disabled? self.settings.disabledClass : "option-item") + ' ' +(k == self.$el.prop('selectedIndex')? self.settings.selectedClass : '')+ '" data-index="'+(k)+'" data-value="'+this.value+'">'+ (this.innerHTML) + '</li>'

                k++;
            })

            this.$dropdown.html(o)

            /**
             * Items
             */

            this.$items = this.$dropdown.children();
        },

        _events: function(){

            /* Input: focus */

            this.$container.on('focus.input', 'input', $.proxy(this._focus, this))

            /**
             * Input: mouseup
             * For input select() event to function correctly
             */
            this.$container.on('mouseup.input', 'input', function(e){
                e.preventDefault()
            })

            /* Input: blur */

            this.$container.on('blur.input', 'input', $.proxy(this._blur, this))

            /* Select: change */

            this.$el.on('change.select', $.proxy(this._change, this))

            /* Select: focus */

            this.$el.on('focus.select', $.proxy(this._focus, this))

            /* Select: blur */

            this.$el.on('blur.select', $.proxy(this._blurSelect, this))

            /* Dropdown Arrow: click */

            this.$container.on('click.arrow', '.'+this.settings.comboArrowClass , $.proxy(this._toggle, this))

            /* Dropdown: close */

            this.$container.on('comboselect:close', $.proxy(this._close, this))

            /* Dropdown: open */

            this.$container.on('comboselect:open', $.proxy(this._open, this))

            /* Dropdown: update */

            this.$container.on('comboselect:update', $.proxy(this._update, this));


            /* HTML Click */

            $('html').off('click.comboselect').on('click.comboselect', function(){

                $.each($.fn[ pluginName ].instances, function(i, plugin){

                    plugin.$container.trigger('comboselect:close')

                })
            });

            /* Stop `event:click` bubbling */

            this.$container.on('click.comboselect', function(e){
                e.stopPropagation();
            })


            /* Input: keydown */

            this.$container.on('keydown', 'input', $.proxy(this._keydown, this))

            /* Input: keyup */

            this.$container.on('keyup', 'input', $.proxy(this._keyup, this))

            /* Dropdown item: click */

            this.$container.on('click.item', '.option-item', $.proxy(this._select, this))

        },

        _keydown: function(event){



            switch(event.which){

                case keys.UP:
                    this._move('up', event)
                    break;

                case keys.DOWN:
                    this._move('down', event)
                    break;

                case keys.TAB:
                    this._enter(event)
                    break;

                case keys.RIGHT:
                    this._autofill(event);
                    break;

                case keys.ENTER:
                    this._enter(event);
                    break;

                default:
                    break;


            }

        },


        _keyup: function(event){

            switch(event.which){
                case keys.ESC:
                    this.$container.trigger('comboselect:close')
                    break;

                case keys.ENTER:
                case keys.UP:
                case keys.DOWN:
                case keys.LEFT:
                case keys.RIGHT:
                case keys.TAB:
                case keys.SHIFT:
                    break;

                default:
                    this._filter(event.target.value)
                    break;
            }
        },

        _enter: function(event){

            var item = this._getHovered()

            item.length && this._select(item);

            /* Check if it enter key */
            if(event && event.which == keys.ENTER){

                if(!item.length) {

                    /* Check if its illegal value */

                    this._blur();

                    return true;
                }

                event.preventDefault();
            }


        },
        _move: function(dir){

            var items = this._getVisible(),
                current = this._getHovered(),
                index = current.prevAll('.option-item').filter(':visible').length,
                total = items.length


            switch(dir){
                case 'up':
                    index--;
                    (index < 0) && (index = (total - 1));
                    break;

                case 'down':
                    index++;
                    (index >= total) && (index = 0);
                    break;
            }


            items
                .removeClass(this.settings.hoverClass)
                .eq(index)
                .addClass(this.settings.hoverClass)


            if(!this.opened) this.$container.trigger('comboselect:open');

            this._fixScroll()
        },

        _select: function(event){

            var item = event.currentTarget? $(event.currentTarget) : $(event);

            if(!item.length) return;

            /**
             * 1. get Index
             */

            var index = item.data('index');

            this._selectByIndex(index);

            //this.$container.trigger('comboselect:close')

            this.$input.focus();

            this.$container.trigger('comboselect:close');

        },

        _selectByIndex: function(index){

            /**
             * Set selected index and trigger change
             * @type {[type]}
             */
            if(typeof index == 'undefined'){

                index = 0

            }

            if(this.$el.prop('selectedIndex') != index){

                this.$el.prop('selectedIndex', index).trigger('change');
            }

        },

        _autofill: function(){

            var item = this._getHovered();

            if(item.length){

                var index = item.data('index')

                this._selectByIndex(index)

            }

        },


        _filter: function(search){

            var self = this,
                items = this._getAll();
            needle = $.trim(search).toLowerCase(),
                reEscape = new RegExp('(\\' + ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'].join('|\\') + ')', 'g'),
                pattern = '(' + search.replace(reEscape, '\\$1') + ')';


            /**
             * Unwrap all markers
             */

            $('.'+self.settings.markerClass, items).contents().unwrap();

            /* Search */

            if(needle){

                /* Hide Disabled and optgroups */

                this.$items.filter('.option-group, .option-disabled').hide();


                items
                    .hide()
                    .filter(function(){

                        var $this = $(this),
                            text = $.trim($this.text()).toLowerCase();

                        /* Found */
                        if(text.toString().indexOf(needle) != -1){

                            /**
                             * Wrap the selection
                             */

                            $this
                                .html(function(index, oldhtml){
                                    return oldhtml.replace(new RegExp(pattern, 'gi'), '<span class="'+self.settings.markerClass+'">$1</span>')
                                })

                            return true
                        }

                    })
                    .show()
            }else{


                this.$items.show();
            }

            /* Open the comboselect */

            this.$container.trigger('comboselect:open')


        },

        _highlight: function(){

            /*
            1. Check if there is a selected item
            2. Add hover class to it
            3. If not add hover class to first item
            */

            var visible = this._getVisible().removeClass(this.settings.hoverClass),
                $selected = visible.filter('.'+this.settings.selectedClass)

            if($selected.length){

                $selected.addClass(this.settings.hoverClass);

            }else{

                visible
                    .removeClass(this.settings.hoverClass)
                    .first()
                    .addClass(this.settings.hoverClass)
            }

        },

        _updateInput: function(){

            var selected = this.$el.prop('selectedIndex')

            if(this.$el.val()){

                text = this.$el.find('option').eq(selected).text()

                this.$input.val(text)

            }else{

                this.$input.val('')

            }

            return this._getAll()
                .removeClass(this.settings.selectedClass)
                .filter(function(){

                    return $(this).data('index') == selected
                })
                .addClass(this.settings.selectedClass)

        },
        _blurSelect: function(){

            this.$container.removeClass('combo-focus');

        },
        _focus: function(event){

            /* Toggle focus class */

            this.$container.toggleClass('combo-focus', !this.opened);

            /* If mobile: stop */

            if(isMobile) return;

            /* Open combo */

            if(!this.opened) this.$container.trigger('comboselect:open');

            /* Select the input */

            this.settings.focusInput && event && event.currentTarget && event.currentTarget.nodeName == 'INPUT' && event.currentTarget.select()
        },

        _blur: function(){

            /**
             * 1. Get hovered item
             * 2. If not check if input value == select option
             * 3. If none
             */

            var val = $.trim(this.$input.val().toLowerCase()),
                isNumber = !isNaN(val);

            var index = this.$options.filter(function(){
                return this.nodeName == 'OPTION'
            }).filter(function(){
                var _text = this.innerText || this.textContent
                if(isNumber){
                    return parseInt($.trim(_text).toLowerCase()) == val
                }

                return $.trim(_text).toLowerCase() == val

            }).prop('index')

            /* Select by Index */

            this._selectByIndex(index)

        },

        _change: function(){


            this._updateInput();

        },

        _getAll: function(){

            return this.$items.filter('.option-item')

        },
        _getVisible: function(){

            return this.$items.filter('.option-item').filter(':visible')

        },

        _getHovered: function(){

            return this._getVisible().filter('.' + this.settings.hoverClass);

        },

        _open: function(){

            var self = this

            this.$container.addClass('combo-open')

            this.opened = true

            /* Focus input field */

            this.settings.focusInput && setTimeout(function(){ !self.$input.is(':focus') && self.$input.focus(); });

            /* Highligh the items */

            this._highlight()

            /* Fix scroll */

            this._fixScroll()

            /* Close all others */


            $.each($.fn[ pluginName ].instances, function(i, plugin){

                if(plugin != self && plugin.opened) plugin.$container.trigger('comboselect:close')
            })

        },

        _toggle: function(){

            this.opened? this._close.call(this) : this._open.call(this)
        },

        _close: function(){

            this.$container.removeClass('combo-open combo-focus')

            this.$container.trigger('comboselect:closed')

            this.opened = false

            /* Show all items */

            this.$items.show();

        },
        _fixScroll: function(){

            /**
             * If dropdown is hidden
             */
            if(this.$dropdown.is(':hidden')) return;


            /**
             * Else
             */
            var item = this._getHovered();

            if(!item.length) return;

            /**
             * Scroll
             */

            var offsetTop,
                upperBound,
                lowerBound,
                heightDelta = item.outerHeight()

            offsetTop = item[0].offsetTop;

            upperBound = this.$dropdown.scrollTop();

            lowerBound = upperBound + this.settings.maxHeight - heightDelta;

            if (offsetTop < upperBound) {

                this.$dropdown.scrollTop(offsetTop);

            } else if (offsetTop > lowerBound) {

                this.$dropdown.scrollTop(offsetTop - this.settings.maxHeight + heightDelta);
            }

        },
        /**
         * Update API
         */

        _update: function(){

            this.$options = this.$el.find('option, optgroup')

            this.$dropdown.empty();

            this._build();
        },

        /**
         * Destroy API
         */

        dispose: function(){

            /* Remove combo arrow, input, dropdown */

            this.$arrow.remove()

            this.$input.remove()

            this.$dropdown.remove()

            /* Remove tabindex property */
            this.$el
                .removeAttr("tabindex")

            /* Check if there is a tabindex set before */

            if(!!this.$el.data('plugin_'+ dataKey + '_tabindex')){
                this.$el.prop('tabindex', this.$el.data('plugin_'+ dataKey + '_tabindex'))
            }

            /* Unwrap */

            this.$el.unwrap()

            /* Remove data */

            this.$el.removeData('plugin_'+dataKey)

            /* Remove tabindex data */

            this.$el.removeData('plugin_'+dataKey + '_tabindex')

            /* Remove change event on select */

            this.$el.off('change.select focus.select blur.select');

        }
    });



    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function ( options, args ) {

        this.each(function() {

            var $e = $(this),
                instance = $e.data('plugin_'+dataKey)

            if (typeof options === 'string') {

                if (instance && typeof instance[options] === 'function') {
                    instance[options](args);
                }

            }else{

                if (instance && instance.dispose) {
                    instance.dispose();
                }

                $.data( this, "plugin_" + dataKey, new Plugin( this, options ) );

            }

        });

        // chain jQuery functions
        return this;
    };

    $.fn[ pluginName ].instances = [];

}));
/************** start hid phone number**************/

var allowed_chars = ['0','1','2','3','4','5','6','7','8','9','+', 'Backspace', 'Delete','Enter'];
$(document).ready(function(){
    $("#sin").keydown(function(e){

        if (!allowed_chars.includes(e.key)) {
            alert ("Phone Numbers Only.");
            return false;
        }
    });
});
// /**********************************************/
// var instance = M.Tabs.init(el, options);
//
// // Or with jQuery
//
// $(document).ready(function(){
//     $('.tabs').tabs();
// });
//
//


/**************************************/
$(document).ready(function() {
    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.profile-pic').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }
    $(".file-upload").on('change', function(){
        readURL(this);
    });

    $(".upload-button").on('click', function() {
        $(".file-upload").click();
    });
});








/*****************************************************/




function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();







/***************/




function show(){
    document.getElementById("popup").style.display = "block";
}
function hide() {
    document.getElementById("popup").style.display = "none";

    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
}

function add() {
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;

    if (name == "" || age == "") {
        alert("Please fill all fields.")
    } else {
        document.getElementById("popup").style.display = "none";
        var newdiv = document.createElement("div");
        newdiv.className += "cont";
        newdiv.innerHTML = "Name: "+ name + "<br>Age: " + age ;
        document.getElementById("results").appendChild(newdiv);

        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
    }
}




/***************************/
$(document).ready( function () {
    $('#table_id').DataTable();
} );

/***************/



(function(window, document, undefined) {

    var factory = function($, DataTable) {
        "use strict";

        $('.search-toggle').click(function() {
            if ($('.hiddensearch').css('display') == 'none')
                $('.hiddensearch').slideDown();
            else
                $('.hiddensearch').slideUp();
        });

        /* Set the defaults for DataTables initialisation */
        $.extend(true, DataTable.defaults, {
            dom: "<'hiddensearch'f'>" +
                "tr" +
                "<'table-footer'lip'>",
            renderer: 'material'
        });

        /* Default class modification */
        $.extend(DataTable.ext.classes, {
            sWrapper: "dataTables_wrapper",
            sFilterInput: "form-control input-sm",
            sLengthSelect: "form-control input-sm"
        });

        /* Bootstrap paging button renderer */
        DataTable.ext.renderer.pageButton.material = function(settings, host, idx, buttons, page, pages) {
            var api = new DataTable.Api(settings);
            var classes = settings.oClasses;
            var lang = settings.oLanguage.oPaginate;
            var btnDisplay, btnClass, counter = 0;

            var attach = function(container, buttons) {
                var i, ien, node, button;
                var clickHandler = function(e) {
                    e.preventDefault();
                    if (!$(e.currentTarget).hasClass('disabled')) {
                        api.page(e.data.action).draw(false);
                    }
                };

                for (i = 0, ien = buttons.length; i < ien; i++) {
                    button = buttons[i];

                    if ($.isArray(button)) {
                        attach(container, button);
                    } else {
                        btnDisplay = '';
                        btnClass = '';

                        switch (button) {

                            case 'first':
                                btnDisplay = lang.sFirst;
                                btnClass = button + (page > 0 ?
                                    '' : ' disabled');
                                break;

                            case 'previous':
                                btnDisplay = '<i class="material-icons">chevron_left</i>';
                                btnClass = button + (page > 0 ?
                                    '' : ' disabled');
                                break;

                            case 'next':
                                btnDisplay = '<i class="material-icons">chevron_right</i>';
                                btnClass = button + (page < pages - 1 ?
                                    '' : ' disabled');
                                break;

                            case 'last':
                                btnDisplay = lang.sLast;
                                btnClass = button + (page < pages - 1 ?
                                    '' : ' disabled');
                                break;

                        }

                        if (btnDisplay) {
                            node = $('<li>', {
                                'class': classes.sPageButton + ' ' + btnClass,
                                'id': idx === 0 && typeof button === 'string' ?
                                    settings.sTableId + '_' + button : null
                            })
                                .append($('<a>', {
                                        'href': '#',
                                        'aria-controls': settings.sTableId,
                                        'data-dt-idx': counter,
                                        'tabindex': settings.iTabIndex
                                    })
                                        .html(btnDisplay)
                                )
                                .appendTo(container);

                            settings.oApi._fnBindAction(
                                node, {
                                    action: button
                                }, clickHandler
                            );

                            counter++;
                        }
                    }
                }
            };

            // IE9 throws an 'unknown error' if document.activeElement is used
            // inside an iframe or frame.
            var activeEl;

            try {
                // Because this approach is destroying and recreating the paging
                // elements, focus is lost on the select button which is bad for
                // accessibility. So we want to restore focus once the draw has
                // completed
                activeEl = $(document.activeElement).data('dt-idx');
            } catch (e) {}

            attach(
                $(host).empty().html('<ul class="material-pagination"/>').children('ul'),
                buttons
            );

            if (activeEl) {
                $(host).find('[data-dt-idx=' + activeEl + ']').focus();
            }
        };

        /*
         * TableTools Bootstrap compatibility
         * Required TableTools 2.1+
         */
        if (DataTable.TableTools) {
            // Set the classes that TableTools uses to something suitable for Bootstrap
            $.extend(true, DataTable.TableTools.classes, {
                "container": "DTTT btn-group",
                "buttons": {
                    "normal": "btn btn-default",
                    "disabled": "disabled"
                },
                "collection": {
                    "container": "DTTT_dropdown dropdown-menu",
                    "buttons": {
                        "normal": "",
                        "disabled": "disabled"
                    }
                },
                "print": {
                    "info": "DTTT_print_info"
                },
                "select": {
                    "row": "active"
                }
            });

            // Have the collection use a material compatible drop down
            $.extend(true, DataTable.TableTools.DEFAULTS.oTags, {
                "collection": {
                    "container": "ul",
                    "button": "li",
                    "liner": "a"
                }
            });
        }

    }; // /factory

    // Define as an AMD module if possible
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'datatables'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        factory(require('jquery'), require('datatables'));
    } else if (jQuery) {
        // Otherwise simply initialise as normal, stopping multiple evaluation
        factory(jQuery, jQuery.fn.dataTable);
    }

})(window, document);

$(document).ready(function() {
    $('#datatable').dataTable({
        "oLanguage": {
            "sStripClasses": "",
            "sSearch": "",
            "sSearchPlaceholder": "Enter Keywords Here",
            "sInfo": "_START_ -_END_ of _TOTAL_",
            "sLengthMenu": '<span>Rows per page:</span><select class="browser-default">' +
                '<option value="10">10</option>' +
                '<option value="20">20</option>' +
                '<option value="30">30</option>' +
                '<option value="40">40</option>' +
                '<option value="50">50</option>' +
                '<option value="-1">All</option>' +
                '</select></div>'
        },
        bAutoWidth: false
    });
});


/*****************************************/














function show1(){
    document.getElementById("popupp").style.display = "block";
}
function hide1() {
    document.getElementById("popupp").style.display = "none";

}




/***************************/


var data = [{
    "id": 1,
    "Name": "Kamba",
    "Phone": "30-(541)656-1685",
    "DTMF": 757
}, {
    "id": 2,
    "Name": "Feedmix",
    "Phone": "967-(362)975-4248",
    "DTMF": 198
}, {
    "id": 3,
    "Name": "Thoughtstorm",
    "Phone": "358-(619)930-2339",
    "DTMF": 252
}, {
    "id": 4,
    "Name": "Shufflebeat",
    "Phone": "86-(776)437-7364",
    "DTMF": 689
}, {
    "id": 5,
    "Name": "Reallinks",
    "Phone": "55-(689)180-3162",
    "DTMF": 173
}, {
    "id": 6,
    "Name": "Digitube",
    "Phone": "1-(504)256-2986",
    "DTMF": 799
}, {
    "id": 7,
    "Name": "Nlounge",
    "Phone": "62-(928)582-6766",
    "DTMF": 477
}, {
    "id": 8,
    "Name": "Aimbu",
    "Phone": "33-(573)429-4209",
    "DTMF": 445
}, {
    "id": 9,
    "Name": "Mydo",
    "Phone": "370-(167)136-2174",
    "DTMF": 854
}, {
    "id": 10,
    "Name": "Tagcat",
    "Phone": "46-(159)429-8509",
    "DTMF": 859
}];
$(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();

    Materialize.updateTextFields();
});
/*
Dynamic creation of table is not the best practice...
Better way to clone existing table and fill it with data.
*/
$(data).each(function(i, elem) {
    $('.table').append('<tr><td>' + elem['Name'] +
        '</td><td>' + elem['Phone'] + '</td><td>' +
        elem['DTMF'] + '</td><td>' +
        '\
    <a href="#edit=' + elem['id'] + '"data-target="modal1" class="btn-floating waves-effect waves-light orange btn modal-trigger hoverable"><i class="material-icons">edit</i>\
    </a> \
<a href="#delete=' + elem['id'] + '" class="btn-floating waves-effect waves-light red hoverable"><i class="material-icons">delete</i>\
    </a> \
                     </td></tr>')
});

$('.btn-floating.orange').on('click', function(){
    console.log('Orange');
    $('#modal1').modal('open');
    // Get all TD from the cliked Button
    var td = $(this).parents('tr').find('td:lt(3)');
    // $td.each(function(i){
    // Only the $() makes this td Object of DOM
    $('#name').val($(td[0]).text());
    $('#phone').val($(td[1]).text());
    $('#dtmf').val($(td[2]).text());
    // })
});

// Delete Button Done!!!
$('.btn-floating.red').on('click', function(){
    $(this).parents('tr').remove();
})


/*****************  show   vendor book now  ****************************************/

//init the modal
$('.modal-trigger').leanModal();

function openModal1() {
    //simulate ajax call to get the modal content
    var htmlFromServer = getHtml();

    //append the html to the modal
    $('#modal_content').html(htmlFromServer);
    //init the tabs
    //open the modal
    $('#modal1').openModal();
};
function openModal2() {
    //simulate ajax call to get the modal content
    var htmlFromServer = getHtml();

    //append the html to the modal
    $('#modal_content').html(htmlFromServer);
    //init the tabs
    //select the first tab
    //open the modal
    $('#modal1').openModal();
};

function getHtml() {
    return '<div class="col s12">' +

        '</div>' ;
};



/*****************  show   vendor book now  ****************************************/


/*****************  show   vendor book now  ****************************************/

//init the modal
$('.modal-trigger').leanModal();

function openModal111() {
    //simulate ajax call to get the modal content
    var htmlFromServer = getHtml();

    //append the html to the modal
    $('#modal_content').html(htmlFromServer);
    //init the tabs
    //open the modal
    $('#modal111').openModal();
};
function openModal2() {
    //simulate ajax call to get the modal content
    var htmlFromServer = getHtml();

    //append the html to the modal
    $('#modal_content').html(htmlFromServer);
    //init the tabs
    //select the first tab
    //open the modal
    $('#modal111').openModal();
};

function getHtml() {
    return '<div class="col s12">' +

        '</div>' ;
};



/*****************  show   vendor book now  ****************************************/





/*****************  show   vendor book now  ****************************************/

//init the modal
$('.modal-trigger').leanModal();

function openModal11() {
    //simulate ajax call to get the modal content
    var htmlFromServer = getHtml();

    //append the html to the modal
    $('#modal_contentt').html(htmlFromServer);
    //init the tabs
    //open the modal
    $('#modal11').openModal();
};

function openModal2() {
    //simulate ajax call to get the modal content
    var htmlFromServer = getHtml();

    //append the html to the modal
    $('#modal_contentt').html(htmlFromServer);
    //init the tabs
    //select the first tab
    //open the modal
    $('#modal11').openModal();
};

function getHtml() {
    return '<div class="col s12">' +

        '</div>' ;
};



/*****************  show   vendor book now  ****************************************/





/**************************************************************/



function ShowMyDiv(Obj){
    var elements = document.getElementsByTagName('div');
    for (var i = 0; i < elements.length; i++)
        if(elements[i].className==='tabcontent')
            elements[i].style.display= 'none';

    document.getElementById(Obj.rel).style.display= 'block';

    var ul_el = document.getElementById('tab_ul');
    var li_el = ul_el.getElementsByTagName('li');
    for (var i = 0; i < li_el.length; i++)
        li_el[i].className="";

    Obj.parentNode.className="selected";
}

/**********************/














