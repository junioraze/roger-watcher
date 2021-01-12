const RW = {
    panel: jQuery('#panel'),
    busca: jQuery('#busca'),
    info: {
        name: 'Dev',
        version: 'X.X.X',
    },
    util: {
        sub: () => {},
    },
    clear() {
        jQuery('.track').remove();
        this.busca.val('');
    },
};

jQuery('.add-filter .material-icons.center-align').on('click', 'a', function() {
    jQuery(this).closest('i').toggleClass('checked');
    RW.panel.toggleClass(this.className).toggleClass('filtrado', jQuery('.checked').length > 1);

});

jQuery('.clear-filter').on('click', function() {
    jQuery('.checked').removeClass('checked');
    RW.panel.removeClass();
});

jQuery('.clear-report').on('click', () => RW.clear());

jQuery('#autoscroll').on('change', function() {
    RW.autoscroll = this.checked;
});

jQuery("#search-icon").on('click', () => {
    jQuery("#search-input").toggleClass('checked');
    jQuery("#search-icon").toggleClass('checked');
});

jQuery('li.add-filter i').on('click', () => {

    var optionFilter = document.querySelector('.add-filter');
    var className;
    var filterCount;

    filterCount = location.pathname.indexOf('bowser') !== -1 ? 7 : 19;

    if (optionFilter.className.indexOf('active-filter') === -1) {
        optionFilter.setAttribute('class', 'add-filter active-filter');
        className = 'material-icons center-align not-hide';
    } else {
        optionFilter.setAttribute('class', 'add-filter');
        className = 'material-icons center-align hide';
    }

    for (var i = 3; i <= filterCount; i = i + 2) {
        optionFilter.childNodes[i].setAttribute('class', className);

    }
});


RW.busca.on('keyup', function() {
    const s = new RegExp(this.value, 'i');
    jQuery('.track:not(.history-change)').each(function() {
        const $this = jQuery(this);
        $this.toggleClass('hide', !s.test($this.find('td.value').text()));
    });
});

RW.panel.on('click', '.delete', function(e) {
    e.stopPropagation();
    jQuery(this).closest('.track').remove();
});

RW.util.sub('newhit', () => jQuery('#busca').trigger('keyup'));