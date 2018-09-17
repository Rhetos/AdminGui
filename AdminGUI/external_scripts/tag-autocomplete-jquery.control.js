$.widget("ui.autocomplete", $.ui.autocomplete, {
    options: $.extend({}, this.options, {
        multiselect: false
    }),
    _create: function () {
        this._super();

        var self = this,
            o = self.options;

        if (o.multiselect) {
            self.selectedItems = {};

            self.tagContainer = $(self.element).parent("tag-autocompleter");
            self.placeholderText = '';
            if ($(self.element).attr('placeholder')) self.placeholderText = $(self.element).attr('placeholder');
            self.inputSize = Math.max(1, self.placeholderText.length);
            self.container = $("<div></div>").addClass("ui-autocomplete-multiselect " + (o.iconClass !== '' ? ' input-group-icon' : ''));
            self.tagContainer.append(self.container.append(self.tagContainer.children('*')).bind("click.autocomplete", function () {
                self.element.focus();
            }));
            var kc = $.ui.keyCode;
            $(self.container).on('keydown', 'input', $.proxy(function (event) {
                var $input = $(event.target);

                if ($(self.element).attr('disabled')) {
                    self.$input.attr('disabled', 'disabled');
                    return;
                }

                // Remove item
                if (($input.val() === "") && (event.keyCode == kc.BACKSPACE)) {
                    var prev = self.element.prev();
                    var removeItem = self.selectedItems[prev.data('value')];
                    delete self.selectedItems[prev.data('value')];
                    if (o.remove) o.remove(event, removeItem);
                    prev.remove();
                }

                // Reset internal input's size
                var size = Math.max(1, self.placeholderText.length);
                if (size < $input.val().length) size = $input.val().length;
                $input.attr('size', Math.max(self.inputSize, size));

            }, self));

            // ui-autocomplete-multiselect on focus
            $(self.tagContainer).on('focus', 'div', $.proxy(function (event) {
                var $input = $(event.target);
                $(self.container).addClass('ui-autocomplete-multiselect-active');
                self.search($input.val());
            }, self));
            // ui-autocomplete-multiselect on blur
            $(self.tagContainer).on('blur', 'div', $.proxy(function (event) {
                $(self.container).removeClass('ui-autocomplete-multiselect-active');
                self._value("");
            }, self));

            // implement method select
            var select = o.select;
            o.select = function (e, ui) {
                if (!self.selectedItems[ui.item.id]) {
                    self.addTag(ui.item);
                    self._value("");
                    if (select) select(e, ui);
                }
                return false;
            }
        }
        return this;
    },
    addTag: function(data) {
        var self = this,
            o = self.options;
        if (o.multiselect) {

            var $span = $("<span data-value='" + data.id + "'></span>")
                    .addClass("tag " + o.tagClass)
                    .text(data.value)
                    .append($("<span data-role='remove'></span>").click(function (event) {
                        var item = $(this).parent();
                        var removeItem = self.selectedItems[item.data('value')];
                        delete self.selectedItems[item.data('value')];
                        if (o.remove) o.remove(event, removeItem);
                        item.remove();
                    })).insertBefore(self.element);
            self.selectedItems[data.id] = data;
        }
        return this;
    },
    clear: function ($event) {
        var self = this,
            o = self.options;

        $.each(self.selectedItems, function (idx, item) {
            var removeItem = self.selectedItems[item.id];
            var $labels = $('.tag[data-value="' + item.id + '"]');
            if (o.remove) o.remove($event, removeItem);
            $labels.remove();
        });
        self.selectedItems = {};
    }
});

(function ($) {
    $.fn.hasAttribute = function (attribute) {
        var attr = $(this).attr(attribute);
        // For some browsers, `attr` is undefined; for others, `attr` is false. Check for both.
        if (typeof attr !== typeof undefined && attr !== false) {
            // Element has this attribute
            return true;
        }
        return false;
    };
})(jQuery);

// Warn if overriding existing method
if (Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;
    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l = this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", { enumerable: false });


// Warn if overriding existing method
if (Array.prototype.remove)
    console.warn("Overriding existing Array.prototype.remove. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.remove = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "remove", { enumerable: false });