(function (window, $) {
'use strict';

window.RepLogApp = {
    initialize: function ($wrapper) {
        this.$wrapper = $wrapper;
        Private.initialize(this.$wrapper);

        this.$wrapper.find('.js-delete-rep-log').on('click', this.handleRepLogDelete.bind(this));

        this.$wrapper.find('.tbody tr').on('click', this.handleRowClick);

        var my_object = {cat: 'meow', dog: 'woof'};
        this.whatIsThis.call(my_object, 'my_object');
        this.whatIsThis('hello');
    },
    whatIsThis: function(greeting) {
        console.log(this, greeting);
    },
    handleRepLogDelete: function (e) {

        var $link = $(e.currentTarget);

        console.log('todo delete');
        console.dir($link.find('.fa')[0]);

        $link.addClass('text-danger');
        $link.find('.fa')
            .removeClass('fa-trash')
            .addClass('fa-spinner')
            .addClass('fa-spin');
        //e.target.className = e.target.className + ' text-danger';

        var $row = $link.closest('tr');
        var deleteUrl = $link.data('url');
        //console.dir($(this)[0].dataset); // DOM version to retrieve data-attribute
        var self = this;
        $.ajax({
            url: deleteUrl,
            method: 'DELETE',
            success: function () {
                $row.fadeOut('normal', function () {
                    $(this).remove(); // $row.remove() is equivalent
                    self.updateTotalWeightLifted();
                });
            }
        });

        e.preventDefault();
        e.stopPropagation();
    },
    handleRowClick: function () {
        console.log('tr clicked');
    },
    updateTotalWeightLifted: function () {
        this.$wrapper.find('.js-total-weight').html(
            Private.calculateTotalWeight()
        );
    }
};

/**
 * Simulates the private parts of a PHP object
 */
var Private = {
    initialize: function ($wrapper) {
        this.$wrapper = $wrapper;
    },
    calculateTotalWeight: function () {
        var totalWeight = 0;

        this.$wrapper.find('tbody tr').each(function () {
            totalWeight += $(this).data('weight');
        });

        return totalWeight;
    }
};

})(window, jQuery);