let slotmachineEvent = {
    slotmachinesRun: (prizeCfg, animationCfg) => {
        prizeCfg = prizeCfg || {};
        var element = getEl(prizeCfg.id);
        var index = getIdx(prizeCfg.index);
        var count = parseInt(prizeCfg.count);
        if (element.length != index.length || !$.isNumeric(count) || count <= 0) {
            return;
        }
        var endTime = 0;
        var length = element.length;
        $.each(element, function (i, el) {
            var idx = index[i];
            var height = el.height();
            var total = height * count;
            var offset = (count - idx) * height;
            if (offset >= total) {
                offset -= total;
            }
            var lastOffset = el.prop('lastOffset') || 0;
            var suffix = el.prop('suffix') || 0;
            el.prop('suffix', suffix + 1);
            var cfg = clone(animationCfg || {});
            var recover = cfg.recover;
            lastOffset = recover ? 0 : lastOffset;
            cfg.lastOffset = lastOffset;
            el.prop('lastOffset', offset);
            cfg.offset = offset;
            cfg.suffix = '_' + el.attr('id') + '_' + suffix;
            cfg.total = total;
            setSlotmachinesAnimationConfig(cfg);
            endTime = cfg.endTime + i * cfg.between;
            setTimeout(function () {
                el.addClass(cfg.name);
            }, i * cfg.between);
        });
        setTimeout(function () {
            if ($.isFunction(prizeCfg.callback)) {
                prizeCfg.callback();
            }
        }, endTime);

    }
    

    


};




//common function
function getStyle(name) {
    var styles = document.styleSheets;
    var length = styles.length;
    var find = false;
    for (var i = length - 1; i >= 0; i--) {
        var style = styles[i];
        if (style.title == name) {
            find = true;
            return style;
        }
    }
    if (!find) {
        style = document.createElement('style');
        style.setAttribute('title', name);
        style.setAttribute('type', 'text/css');
        $('head').append(style);
    }
    return styles[styles.length - 1];
}
function addRule(style, name, animationCss, keyframesCss) {
    style.addRule('.' + name, animationCss);
    style.addRule('@-webkit-keyframes ' + name, keyframesCss);
}
function clone(obj) {
    var result = {};
    for (var prop in obj) {
        result[prop] = obj[prop];
    }
    return result;
}

//slotmachine
function setSlotmachinesAnimationConfig(config) {
    var name = 'h5_slotmachines';
    var style = getStyle(name);
    name += config.suffix;
    var duration = config.duration || '5s';
    var timingFunction = config.timingFunction || 'ease-in-out';
    var delay = config.delay || 0;
    var last = config.last || 500;
    var offset = config.offset;
    var lastOffset = config.lastOffset;
    var count = config.count || 10;
    var animationCss = '-webkit-animation-name:' + name + ';'
        + '-webkit-animation-duration:' + duration + ';'
        + '-webkit-animation-timing-function:' + timingFunction + ';'
        + '-webkit-animation-delay:' + delay + ';'
        + '-webkit-animation-iteration-count: 1;'
        + '-webkit-animation-fill-mode: forwards;';
    var keyframesCss = '0% {background-position-y:' + lastOffset + 'px} '
        + '100% {background-position-y:' + (config.total * count + offset) + 'px}';
    addRule(style, name, animationCss, keyframesCss);
    
    config.name = name;
    config.between = config.between || 500;
    config.endTime = parseInt(duration) * 1000 + last;
}
function getEl(idArray) {
    idArray = $.isArray(idArray) ? idArray : [idArray];
    var length = idArray.length;
    var els = [];
    for (var i = 0; i < length; i++) {
        var element = $('#' + idArray[i]);
        if (element.length > 0) {
            els.push(element);
        }
    }
    return els;
}
function getIdx(idxArray) {
    if ($.isNumeric(idxArray)) {
        idxArray = idxArray + '';
    }
    if (!$.isArray(idxArray)) {
        idxArray = idxArray.split('');
    }
    var length = idxArray.length;
    var idx = [];
    for (var i = 0; i < length; i++) {
        var value = parseInt(idxArray[i]);
        idx.push(value);
    }
    return idx;
}

module.exports = slotmachineEvent;
