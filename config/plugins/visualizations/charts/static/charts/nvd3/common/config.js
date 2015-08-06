define(['plugin/charts/forms/default', 'plugin/plugins/nvd3/nv.d3'], function(config_default) {
return $.extend(true, {}, config_default, {
    title       : '',
    category    : '',
    library     : 'NVD3',
    tag         : 'svg',
    keywords    : 'small',
    columns     : {
        tooltip : {
            title       : 'Data point labels',
            is_text     : true,
            is_numeric  : true,
            is_auto     : true
        }
    }
});

});