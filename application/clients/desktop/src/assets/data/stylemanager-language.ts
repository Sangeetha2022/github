// all languages name and field


// stylemanager names in english languages
export const styleManagerEnglish = [{
    name: 'Layout',
    open: !1,
    buildProps: ['flex-align-items', 'flex-align-items-v', 'flex-item-behaviour', 'flex-item-h-align', 'flex-multiline',
        'flex-order', 'width', 'flex-width', 'height', 'max-width', 'min-height', 'margin', 'padding'],
    properties: [{
        id: 'flex-align-items',
        type: 'select',
        name: 'Horizontal Align',
        property: 'justify-content',
        options: [{
            value: 'flex-start',
            name: 'Left'
        }, {
            value: 'center',
            name: 'Center'
        }, {
            value: 'flex-end',
            name: 'Right'
        }, {
            value: 'space-between',
            name: 'Space between'
        }, {
            value: 'space-around',
            name: 'Space around'
        }, {
            value: 'space-evenly',
            name: 'Space evenly'
        }],
        toRequire: 1
    }, {
        id: 'flex-align-items-v',
        type: 'select',
        name: 'Vertical Align',
        property: 'align-items',
        options: [{
            value: 'stretch',
            name: 'Stretch'
        }, {
            value: 'flex-start',
            name: 'Top'
        }, {
            value: 'center',
            name: 'Center'
        }, {
            value: 'flex-end',
            name: 'Bottom'
        }],
        toRequire: 1
    }, {
        id: 'flex-item-behaviour',
        type: 'radio',
        name: 'Behaviour',
        property: 'flex',
        defaults: '1 1 100%',
        options: [{
            value: '1 1 100%',
            name: 'Fill parent'
        }, {
            value: '0 1 auto',
            name: 'Fit content'
        }],
        toRequire: 1
    }, {
        id: 'flex-item-h-align',
        type: 'radio',
        name: 'Vertical Align',
        property: 'align-self',
        defaults: 'stretch',
        options: [{
            value: 'stretch',
            name: 'Stretch'
        }, {
            value: 'flex-start',
            name: 'Top'
        }, {
            value: 'center',
            name: 'Center'
        }, {
            value: 'flex-end',
            name: 'Bottom'
        }],
        toRequire: 1
    }, {
        id: 'flex-multiline',
        type: 'radio',
        name: 'Allow multiline',
        property: 'flex-wrap',
        defaults: 'nowrap',
        options: [{
            value: 'nowrap',
            name: 'No'
        }, {
            value: 'wrap',
            name: 'Yes'
        }],
        toRequire: 1,
        full: 1
    }, {
        id: 'flex-order',
        type: 'integer',
        name: 'Order',
        property: 'order',
        defaults: 1,
        toRequire: 1,
        full: 1
    }, {
        property: 'width',
        name: 'Width',
        units: ['px', '%', 'vw', 'vh']
    }, {
        id: 'flex-width',
        type: 'integer',
        name: 'Width',
        units: ['px', '%'],
        property: 'flex-basis',
        toRequire: 1
    }, {
        property: 'height',
        name: 'Height',
        units: ['px', '%', 'vw', 'vh']
    }, {
        property: 'max-width',
        name: 'Max Width',
        units: ['px', '%', 'vw', 'vh']
    }, {
        property: 'min-height',
        name: 'Min Height',
        units: ['px', '%', 'vw', 'vh']
    }, {
        property: 'margin',
        name: 'Margin',
        properties: [{
            name: 'Top',
            property: 'margin-top'
        }, {
            name: 'Left',
            property: 'margin-left'
        }, {
            name: 'Right',
            property: 'margin-right'
        }, {
            name: 'Bottom',
            property: 'margin-bottom'
        }]
    }, {
        property: 'padding',
        name: 'Padding',
        properties: [{
            name: 'Top',
            property: 'padding-top'
        }, {
            name: 'Right',
            property: 'padding-right'
        }, {
            name: 'Bottom',
            property: 'padding-bottom'
        }, {
            name: 'Left',
            property: 'padding-left'
        }]
    }]
}, {
    open: !1,
    name: 'Typography',
    buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-transform',
        'text-align', 'text-decoration', 'font-style'],
    properties: [{
        name: 'Font',
        property: 'font-family',
        options: [{
            value: 'Arial, Helvetica, sans-serif',
            name: 'Arial'
        }, {
            value: 'Arial Black, Gadget, sans-serif',
            name: 'Brush Script MT'
        }, {
            value: 'Comic Sans MS, cursive, sans-serif',
            name: 'Comic Sans MS'
        }, {
            value: 'Courier New, Courier, monospace',
            name: 'Courier New'
        }, {
            value: 'Georgia, serif',
            name: 'Georgia'
        }, {
            value: 'Helvetica, serif',
            name: 'Helvetica'
        }, {
            value: 'Impact, Charcoal, sans-serif',
            name: 'Impact'
        }, {
            value: 'Lucida Sans Unicode, Lucida Grande, sans-serif',
            name: 'Lucida Sans Unicode'
        }, {
            value: 'Tahoma, Geneva, sans-serif',
            name: 'Tahoma'
        }, {
            value: 'Times New Roman, Times, serif',
            name: 'Times New Roman'
        }, {
            value: 'Trebuchet MS, Helvetica, sans-serif',
            name: 'Trebuchet MS'
        }, {
            value: 'Verdana, Geneva, sans-serif',
            name: 'Verdana'
        }]
    }, {
        name: 'Weight',
        property: 'font-weight',
        options: [{
            value: '100',
            name: 'Thin'
        }, {
            value: '200',
            name: 'Extra-Light'
        }, {
            value: '300',
            name: 'Light'
        }, {
            value: '400',
            name: 'Normal'
        }, {
            value: '500',
            name: 'Medium'
        }, {
            value: '600',
            name: 'Semi-Bold'
        }, {
            value: '700',
            name: 'Bold'
        }, {
            value: '800',
            name: 'Extra-Bold'
        }, {
            value: '900',
            name: 'Ultra-Bold'
        }]
    }, {
        name: 'Font color',
        property: 'color'
    }, {
        property: 'font-size',
        name: 'Font Size'
    }, {
        property: 'letter-spacing',
        name: 'Letter Spacing'
    }, {
        property: 'line-height',
        name: 'Line Height'
    }, {
        name: 'Text Transform',
        property: 'text-transform',
        type: 'select',
        defaults: 'none',
        options: [{
            value: 'none',
            name: 'None'
        }, {
            value: 'capitalize',
            name: 'Capitalize'
        }, {
            value: 'uppercase',
            name: 'Uppercase'
        }, {
            value: 'lowercase',
            name: 'Lowercase'
        }]
    }, {
        name: 'Text Align',
        property: 'text-align',
        type: 'radio',
        defaults: 'left',
        list: [{
            value: 'left',
            name: 'Left',
            className: 'fa fa-align-left'
        }, {
            value: 'center',
            name: 'Center',
            className: 'fa fa-align-center'
        }, {
            value: 'right',
            name: 'Right',
            className: 'fa fa-align-right'
        }, {
            value: 'justify',
            name: 'Justify',
            className: 'fa fa-align-justify'
        }]
    }, {
        property: 'text-decoration',
        name: 'Text Decoration',
        type: 'radio',
        defaults: 'none',
        list: [{
            value: 'none',
            name: 'None',
            className: 'fa fa-times'
        }, {
            value: 'underline',
            name: 'underline',
            className: 'fa fa-underline'
        }, {
            value: 'line-through',
            name: 'Line-through',
            className: 'fa fa-strikethrough'
        }]
    }, {
        property: 'font-style',
        name: 'Font Style',
        type: 'radio',
        defaults: 'normal',
        list: [{
            value: 'normal',
            name: 'Normal',
            className: 'fa fa-font'
        }, {
            value: 'italic',
            name: 'Italic',
            className: 'fa fa-italic'
        }]
    }]
}, {
    name: 'Border',
    open: !1,
    buildProps: ['border', 'border-radius'],
    properties: [{
        property: 'border',
        name: 'Border',
        properties: [{
            name: 'Width',
            property: 'border-width',
            defaults: '0'
        }, {
            name: 'Style',
            property: 'border-style',
            options: [{
                value: 'none',
                name: 'None'
            }, {
                value: 'solid',
                name: 'Solid'
            }, {
                value: 'dotted',
                name: 'Dotted'
            }, {
                value: 'dashed',
                name: 'Dashed'
            }, {
                value: 'double',
                name: 'Double'
            }, {
                value: 'groove',
                name: 'Groove'
            }, {
                value: 'ridge',
                name: 'Ridge'
            }, {
                value: 'inset',
                name: 'Inset'
            }, {
                value: 'outset',
                name: 'Outset'
            }]
        }, {
            name: 'Fill Color',
            property: 'border-color'
        }]
    }, {
        property: 'border-radius',
        name: 'Border Radius',
        properties: [{
            name: 'Top',
            property: 'border-top-left-radius'
        }, {
            name: 'Right',
            property: 'border-top-right-radius'
        }, {
            name: 'Bottom',
            property: 'border-bottom-left-radius'
        }, {
            name: 'Left',
            property: 'border-bottom-right-radius'
        }]
    }]
}, {
    name: 'Shadow',
    open: !1,
    buildProps: ['box-shadow', 'text-shadow'],
    properties: [{
        property: 'box-shadow',
        name: 'Box Shadow',
        properties: [{
            name: 'Offset X',
            property: 'box-shadow-h'
        }, {
            name: 'Offset Y',
            property: 'box-shadow-v'
        }, {
            name: 'Blur',
            property: 'box-shadow-blur'
        }, {
            name: 'Spread',
            property: 'box-shadow-spread'
        }, {
            name: 'Fill Color',
            property: 'box-shadow-color'
        }, {
            name: 'Shadow Type',
            property: 'box-shadow-type',
            defaults: '',
            options: [{
                value: '',
                name: 'Outside'
            }, {
                value: 'inset',
                name: 'Inside'
            }]
        }]
    }, {
        property: 'text-shadow',
        name: 'Text Shadow',
        properties: [{
            name: 'Offset X',
            property: 'text-shadow-h'
        }, {
            name: 'Offset Y',
            property: 'text-shadow-v'
        }, {
            name: 'Blur',
            property: 'text-shadow-blur'
        }, {
            name: 'Fill Color',
            property: 'text-shadow-color',
            defaults: '#000000'
        }]
    }]
}, {
    name: 'Background',
    open: !1,
    buildProps: ['background-color', 'background'],
    properties: [{
        property: 'background-color',
        name: 'Fill Color'
    }, {
        property: 'background',
        name: 'Background',
        properties: [{
            name: 'Image',
            property: 'background-image'
        }, {
            name: 'Repeat',
            property: 'background-repeat'
        }, {
            name: 'Position',
            property: 'background-position'
        }, {
            name: 'Attachment',
            property: 'background-attachment'
        }, {
            name: 'Size',
            property: 'background-size'
        }]
    }]
}, {
    name: 'Extra',
    open: !1,
    buildProps: ['opacity', 'transition'],
    properties: [{
        name: 'Opacity',
        type: 'slider',
        property: 'opacity',
        defaults: 1,
        step: .01,
        max: 1,
        min: 0
    }, {
        property: 'transition',
        properties: [{
            name: 'Property',
            property: 'transition-property',
            options: [{
                value: 'all',
                name: 'All'
            }, {
                value: 'width',
                name: 'Width'
            }, {
                value: 'height',
                name: 'Height'
            }, {
                value: 'background-color',
                name: 'Background color'
            }, {
                value: 'transform',
                name: 'Transform'
            }, {
                value: 'border',
                name: 'Border'
            }, {
                value: 'box-shadow',
                name: 'Box shadow'
            }, {
                value: 'text-shadow',
                name: 'Text shadow'
            }, {
                value: 'opacity',
                name: 'Opacity'
            }, {
                value: 'color',
                name: 'Color'
            }]
        }, {
            name: 'Duration',
            property: 'transition-duration'
        }, {
            name: 'Easing',
            property: 'transition-timing-function',
            defaults: 'ease',
            options: [{
                value: 'linear',
                name: 'linear'
            }, {
                value: 'ease',
                name: 'ease'
            }, {
                value: 'ease-in',
                name: 'ease in'
            }, {
                value: 'ease-out',
                name: 'ease out'
            }, {
                value: 'ease-in-out',
                name: 'ease in out'
            }]
        }]
    }]
}];

// stylemanager names in tamil languages
export const styleManagerTamil = [{
    name: '??????????????????????????????',
    open: !1,
    buildProps: ['flex-align-items', 'flex-align-items-v', 'flex-item-behaviour', 'flex-item-h-align', 'flex-multiline',
        'flex-order', 'width', 'flex-width', 'height', 'max-width', 'min-height', 'margin', 'padding'],
    properties: [{
        id: 'flex-align-items',
        type: 'select',
        name: '???????????????????????? ???????????????',
        property: 'justify-content',
        options: [{
            value: 'flex-start',
            name: '????????????'
        }, {
            value: 'center',
            name: '???????????????'
        }, {
            value: 'flex-end',
            name: '????????????'
        }, {
            value: 'space-between',
            name: '?????????????????????????????????????????? ?????????????????????'
        }, {
            value: 'space-around',
            name: '????????????????????? ??????????????????'
        }, {
            value: 'space-evenly',
            name: '????????????????????? ???????????????'
        }],
        toRequire: 1
    }, {
        id: 'flex-align-items-v',
        type: 'select',
        name: '?????????????????????????????? ???????????????',
        property: 'align-items',
        options: [{
            value: 'stretch',
            name: '??????????????????'
        }, {
            value: 'flex-start',
            name: '????????????'
        }, {
            value: 'center',
            name: '???????????????'
        }, {
            value: 'flex-end',
            name: '?????????'
        }],
        toRequire: 1
    }, {
        id: 'flex-item-behaviour',
        type: 'radio',
        name: '????????????????????????',
        property: 'flex',
        defaults: '1 1 100%',
        options: [{
            value: '1 1 100%',
            name: '??????????????????????????? ??????????????????'
        }, {
            value: '0 1 auto',
            name: '?????????????????????????????? ????????????????????????????????????'
        }],
        toRequire: 1
    }, {
        id: 'flex-item-h-align',
        type: 'radio',
        name: '?????????????????????????????? ???????????????',
        property: 'align-self',
        defaults: 'stretch',
        options: [{
            value: 'stretch',
            name: '??????????????????'
        }, {
            value: 'flex-start',
            name: '????????????'
        }, {
            value: 'center',
            name: '???????????????'
        }, {
            value: 'flex-end',
            name: '?????????'
        }],
        toRequire: 1
    }, {
        id: 'flex-multiline',
        type: 'radio',
        name: '??????????????? ??????????????????',
        property: 'flex-wrap',
        defaults: 'nowrap',
        options: [{
            value: 'nowrap',
            name: '???????????????'
        }, {
            value: 'wrap',
            name: '?????????'
        }],
        toRequire: 1,
        full: 1
    }, {
        id: 'flex-order',
        type: 'integer',
        name: '???????????????',
        property: 'order',
        defaults: 1,
        toRequire: 1,
        full: 1
    }, {
        property: 'width',
        name: '???????????????',
        units: ['px', '%', 'vw', 'vh']
    }, {
        id: 'flex-width',
        type: 'integer',
        name: '???????????????',
        units: ['px', '%'],
        property: 'flex-basis',
        toRequire: 1
    }, {
        property: 'height',
        name: '???????????????',
        units: ['px', '%', 'vw', 'vh']
    }, {
        property: 'max-width',
        name: '???????????????????????? ??????????????? ',
        units: ['px', '%', 'vw', 'vh']
    }, {
        property: 'min-height',
        name: '????????????????????? ???????????????',
        units: ['px', '%', 'vw', 'vh']
    }, {
        property: 'margin',
        name: '????????????????????????',
        properties: [{
            name: '????????????',
            property: 'margin-top'
        }, {
            name: '????????????',
            property: 'margin-left'
        }, {
            name: '????????????',
            property: 'margin-right'
        }, {
            name: '?????????',
            property: 'margin-bottom'
        }]
    }, {
        property: 'padding',
        name: '????????????????????????',
        properties: [{
            name: '????????????',
            property: 'padding-top'
        }, {
            name: '????????????',
            property: 'padding-right'
        }, {
            name: '?????????',
            property: 'padding-bottom'
        }, {
            name: '????????????',
            property: 'padding-left'
        }]
    }]
}, {
    open: !1,
    name: '??????????????????????????????',
    buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-transform',
        'text-align', 'text-decoration', 'font-style'],
    properties: [{
        name: '???????????????????????????',
        property: 'font-family',
        options: [{
            value: 'Arial, Helvetica, sans-serif',
            name: '??????????????????'
        }, {
            value: 'Arial Black, Gadget, sans-serif',
            name: '?????????????????? ?????????????????????????????? ????????? ??????'
        }, {
            value: 'Comic Sans MS, cursive, sans-serif',
            name: '?????????????????? ?????????????????? ????????? ?????????'
        }, {
            value: 'Courier New, Courier, monospace',
            name: '????????????????????? ???????????????'
        }, {
            value: 'Georgia, serif',
            name: '???????????????????????????'
        }, {
            value: 'Helvetica, serif',
            name: '??????????????????????????????'
        }, {
            value: 'Impact, Charcoal, sans-serif',
            name: '?????????????????????'
        }, {
            value: 'Lucida Sans Unicode, Lucida Grande, sans-serif',
            name: '?????????????????? ?????????????????? ????????????????????????'
        }, {
            value: 'Tahoma, Geneva, sans-serif',
            name: '??????????????????'
        }, {
            value: 'Times New Roman, Times, serif',
            name: '?????????????????? ???????????? ??????????????????'
        }, {
            value: 'Trebuchet MS, Helvetica, sans-serif',
            name: '??????????????????????????? ????????? ?????????'
        }, {
            value: 'Verdana, Geneva, sans-serif',
            name: '?????????????????????'
        }]
    }, {
        name: '?????????',
        property: 'font-weight',
        options: [{
            value: '100',
            name: '?????????????????????'
        }, {
            value: '200',
            name: '??????????????????????????? ?????????'
        }, {
            value: '300',
            name: '?????????'
        }, {
            value: '400',
            name: '??????????????????'
        }, {
            value: '500',
            name: '?????????????????????'
        }, {
            value: '600',
            name: '????????? ?????????????????????'
        }, {
            value: '700',
            name: '?????????????????????'
        }, {
            value: '800',
            name: '??????????????????????????? ?????????????????????'
        }, {
            value: '900',
            name: '?????????????????????-?????????????????????'
        }]
    }, {
        name: '??????????????????????????? ???????????????',
        property: 'color'
    }, {
        property: 'font-size',
        name: '??????????????????????????? ????????????'
    }, {
        property: 'letter-spacing',
        name: '?????????????????? ?????????????????????'
    }, {
        property: 'line-height',
        name: '????????? ???????????????'
    }, {
        name: '????????? ????????????????????????',
        property: 'text-transform',
        type: 'select',
        defaults: 'none',
        options: [{
            value: 'none',
            name: '???????????????????????????'
        }, {
            value: 'capitalize',
            name: '????????????????????????????????????????????????'
        }, {
            value: 'uppercase',
            name: '??????????????????????????????'
        }, {
            value: 'lowercase',
            name: '????????????????????????????????????'
        }]
    }, {
        name: '????????? ???????????????',
        property: 'text-align',
        type: 'radio',
        defaults: 'left',
        list: [{
            value: 'left',
            name: '????????????',
            className: 'fa fa-align-left'
        }, {
            value: 'center',
            name: '???????????????',
            className: 'fa fa-align-center'
        }, {
            value: 'right',
            name: '????????????',
            className: 'fa fa-align-right'
        }, {
            value: 'justify',
            name: '???????????????????????????',
            className: 'fa fa-align-justify'
        }]
    }, {
        property: 'text-decoration',
        name: '????????? ???????????????????????????',
        type: 'radio',
        defaults: 'none',
        list: [{
            value: 'none',
            name: '???????????????????????????',
            className: 'fa fa-times'
        }, {
            value: 'underline',
            name: '???????????????????????????',
            className: 'fa fa-underline'
        }, {
            value: 'line-through',
            name: '????????????????????????????????? ??????????????????',
            className: 'fa fa-strikethrough'
        }]
    }, {
        property: 'font-style',
        name: '??????????????????????????? ?????????',
        type: 'radio',
        defaults: 'normal',
        list: [{
            value: 'normal',
            name: '??????????????????',
            className: 'fa fa-font'
        }, {
            value: 'italic',
            name: '????????????????????? ???????????????????????????',
            className: 'fa fa-italic'
        }]
    }]
}, {
    name: '???????????????',
    open: !1,
    buildProps: ['border', 'border-radius'],
    properties: [{
        property: 'border',
        name: '???????????????',
        properties: [{
            name: '???????????????',
            property: 'border-width',
            defaults: '0'
        }, {
            name: '?????????????????????',
            property: 'border-style',
            options: [{
                value: 'none',
                name: '???????????????????????????'
            }, {
                value: 'solid',
                name: '?????????'
            }, {
                value: 'dotted',
                name: '????????????????????????????????????'
            }, {
                value: 'dashed',
                name: '????????????????????????'
            }, {
                value: 'double',
                name: '??????????????????'
            }, {
                value: 'groove',
                name: '??????????????????'
            }, {
                value: 'ridge',
                name: '??????????????????'
            }, {
                value: 'inset',
                name: '????????????????????????????????????'
            }, {
                value: 'outset',
                name: '?????????????????????????????????????????????'
            }]
        }, {
            name: '??????????????? ??????????????????',
            property: 'border-color'
        }]
    }, {
        property: 'border-radius',
        name: '??????????????? ????????????',
        properties: [{
            name: '????????????',
            property: 'border-top-left-radius'
        }, {
            name: '????????????',
            property: 'border-top-right-radius'
        }, {
            name: '?????????',
            property: 'border-bottom-left-radius'
        }, {
            name: '????????????',
            property: 'border-bottom-right-radius'
        }]
    }]
}, {
    name: '???????????????',
    open: !1,
    buildProps: ['box-shadow', 'text-shadow'],
    properties: [{
        property: 'box-shadow',
        name: '?????????????????? ???????????????',
        properties: [{
            name: '???????????????????????? X',
            property: 'box-shadow-h'
        }, {
            name: '???????????????????????? Y',
            property: 'box-shadow-v'
        }, {
            name: '??????????????????????????????',
            property: 'box-shadow-blur'
        }, {
            name: '???????????????',
            property: 'box-shadow-spread'
        }, {
            name: '???????????????????????? ?????????????????????',
            property: 'box-shadow-color'
        }, {
            name: '??????????????? ?????????',
            property: 'box-shadow-type',
            defaults: '',
            options: [{
                value: '',
                name: '??????????????????'
            }, {
                value: 'inset',
                name: '???????????????'
            }]
        }]
    }, {
        property: 'text-shadow',
        name: '????????? ???????????????',
        properties: [{
            name: '???????????????????????? X',
            property: 'text-shadow-h'
        }, {
            name: '???????????????????????? Y',
            property: 'text-shadow-v'
        }, {
            name: '??????????????????????????????',
            property: 'text-shadow-blur'
        }, {
            name: '???????????????????????? ?????????????????????',
            property: 'text-shadow-color',
            defaults: '#000000'
        }]
    }]
}, {
    name: '?????????????????????',
    open: !1,
    buildProps: ['background-color', 'background'],
    properties: [{
        property: 'background-color',
        defaults: '???????????????????????????',
        name: '???????????????????????? ?????????????????????'
    }, {
        property: 'background',
        name: '?????????????????????',
        properties: [{
            name: '????????????',
            property: 'background-image'
        }, {
            name: '???????????????????????? ????????????????????????',
            property: 'background-repeat'
        }, {
            name: '????????????',
            property: 'background-position'
        }, {
            name: '?????????????????????',
            property: 'background-attachment'
        }, {
            name: '????????????',
            property: 'background-size'
        }]
    }]
}, {
    name: '?????????????????????',
    open: !1,
    buildProps: ['opacity', 'transition'],
    properties: [{
        name: '???????????????',
        type: 'slider',
        property: 'opacity',
        defaults: 1,
        step: .01,
        max: 1,
        min: 0
    }, {
        property: 'transition',
        name: '?????????????????????',
        properties: [{
            name: '?????????????????????',
            property: 'transition-property',
            options: [{
                value: 'all',
                name: '???????????????????????????'
            }, {
                value: 'width',
                name: '???????????????'
            }, {
                value: 'height',
                name: '???????????????'
            }, {
                value: 'background-color',
                name: '????????????????????? ???????????????'
            }, {
                value: 'transform',
                name: '????????????????????????'
            }, {
                value: 'border',
                name: '???????????????'
            }, {
                value: 'box-shadow',
                name: '?????????????????? ???????????????'
            }, {
                value: 'text-shadow',
                name: '????????? ???????????????'
            }, {
                value: 'opacity',
                name: '???????????????'
            }, {
                value: 'color',
                name: '???????????????'
            }]
        }, {
            name: '???????????????',
            property: 'transition-duration'
        }, {
            name: '?????????????????????????????????',
            property: 'transition-timing-function',
            defaults: 'ease',
            options: [{
                value: 'linear',
                name: '?????????????????????'
            }, {
                value: 'ease',
                name: '????????????????????????'
            }, {
                value: 'ease-in',
                name: '????????????????????????-??????'
            }, {
                value: 'ease-out',
                name: '????????????????????????-???????????????'
            }, {
                value: 'ease-in-out',
                name: '????????????????????????-??????-???????????????'
            }]
        }]
    }]
}];

// stylemanager names in spanish languages
export const styleManagerSpanish = [{
    name: 'Dise??o',
    open: !1,
    buildProps: ['flex-align-items', 'flex-align-items-v', 'flex-item-behaviour', 'flex-item-h-align', 'flex-multiline',
        'flex-order', 'width', 'flex-width', 'height', 'max-width', 'min-height', 'margin', 'padding'],
    properties: [{
        id: 'flex-align-items',
        type: 'select',
        name: 'Alineaci??n horizontal',
        property: 'justify-content',
        options: [{
            value: 'flex-start',
            name: 'Izquierda'
        }, {
            value: 'center',
            name: 'Centrar'
        }, {
            value: 'flex-end',
            name: 'Derecha'
        }, {
            value: 'space-between',
            name: 'Espacio entre'
        }, {
            value: 'space-around',
            name: 'Espacio alrededor'
        }, {
            value: 'space-evenly',
            name: 'Espacio uniformemente'
        }],
        toRequire: 1
    }, {
        id: 'flex-align-items-v',
        type: 'select',
        name: 'Alineaci??n vertical',
        property: 'align-items',
        options: [{
            value: 'stretch',
            name: 'Tramo'
        }, {
            value: 'flex-start',
            name: 'Parte superior'
        }, {
            value: 'center',
            name: 'Centrar'
        }, {
            value: 'flex-end',
            name: 'Fondo'
        }],
        toRequire: 1
    }, {
        id: 'flex-item-behaviour',
        type: 'radio',
        name: 'Comportamiento',
        property: 'flex',
        defaults: '1 1 100%',
        options: [{
            value: '1 1 100%',
            name: 'Llenar los padres'
        }, {
            value: '0 1 auto',
            name: 'Contenido adecuado'
        }],
        toRequire: 1
    }, {
        id: 'flex-item-h-align',
        type: 'radio',
        name: 'Alineaci??n vertical',
        property: 'align-self',
        defaults: 'stretch',
        options: [{
            value: 'stretch',
            name: 'Tramo'
        }, {
            value: 'flex-start',
            name: 'Parte superior'
        }, {
            value: 'center',
            name: 'Centrar'
        }, {
            value: 'flex-end',
            name: 'Fondo'
        }],
        toRequire: 1
    }, {
        id: 'flex-multiline',
        type: 'radio',
        name: 'Permitir multil??nea',
        property: 'flex-wrap',
        defaults: 'nowrap',
        options: [{
            value: 'nowrap',
            name: 'No'
        }, {
            value: 'wrap',
            name: 'S??'
        }],
        toRequire: 1,
        full: 1
    }, {
        id: 'flex-order',
        type: 'integer',
        name: 'Orden',
        property: 'order',
        defaults: 1,
        toRequire: 1,
        full: 1
    }, {
        property: 'width',
        name: 'Anchura',
        units: ['px', '%', 'vw', 'vh']
    }, {
        id: 'flex-width',
        type: 'integer',
        name: 'Anchura',
        units: ['px', '%'],
        property: 'flex-basis',
        toRequire: 1
    }, {
        property: 'height',
        name: 'Altura',
        units: ['px', '%', 'vw', 'vh']
    }, {
        property: 'max-width',
        name: 'Anchura m??xima',
        units: ['px', '%', 'vw', 'vh']
    }, {
        property: 'min-height',
        name: 'Altura m??nima',
        units: ['px', '%', 'vw', 'vh']
    }, {
        property: 'margin',
        name: 'Margen',
        properties: [{
            name: 'Parte superior',
            property: 'margin-top'
        }, {
            name: 'Izquierda',
            property: 'margin-left'
        }, {
            name: 'Derecha',
            property: 'margin-right'
        }, {
            name: 'Fondo',
            property: 'margin-bottom'
        }]
    }, {
        property: 'padding',
        name: 'Relleno',
        properties: [{
            name: 'Parte superior',
            property: 'padding-top'
        }, {
            name: 'Derecha',
            property: 'padding-right'
        }, {
            name: 'Fondo',
            property: 'padding-bottom'
        }, {
            name: 'Izquierda',
            property: 'padding-left'
        }]
    }]
}, {
    open: !1,
    name: 'Tipograf??a',
    buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-transform',
        'text-align', 'text-decoration', 'font-style'],
    properties: [{
        name: 'Fuente',
        property: 'font-family',
        options: [{
            value: 'Arial, Helvetica, sans-serif',
            name: 'Arial'
        }, {
            value: 'Arial Black, Gadget, sans-serif',
            name: 'Brush Script MT'
        }, {
            value: 'Comic Sans MS, cursive, sans-serif',
            name: 'Comic Sans MS'
        }, {
            value: 'Courier New, Courier, monospace',
            name: 'Nuevo mensajero'
        }, {
            value: 'Georgia, serif',
            name: 'Georgia'
        }, {
            value: 'Helvetica, serif',
            name: 'Helv??tica'
        }, {
            value: 'Impact, Charcoal, sans-serif',
            name: 'Impacto'
        }, {
            value: 'Lucida Sans Unicode, Lucida Grande, sans-serif',
            name: 'Lucida Sans Unicode'
        }, {
            value: 'Tahoma, Geneva, sans-serif',
            name: 'Tahoma'
        }, {
            value: 'Times New Roman, Times, serif',
            name: 'Times New Roman'
        }, {
            value: 'Trebuchet MS, Helvetica, sans-serif',
            name: 'Trebuchet MS'
        }, {
            value: 'Verdana, Geneva, sans-serif',
            name: 'Verdana'
        }]
    }, {
        name: 'Peso',
        property: 'font-weight',
        options: [{
            value: '100',
            name: 'Delgado'
        }, {
            value: '200',
            name: 'Extra ligero'
        }, {
            value: '300',
            name: 'Ligero'
        }, {
            value: '400',
            name: 'Normal'
        }, {
            value: '500',
            name: 'Medio'
        }, {
            value: '600',
            name: 'Semi-negrita'
        }, {
            value: '700',
            name: 'Negrita'
        }, {
            value: '800',
            name: 'negrita extra'
        }, {
            value: '900',
            name: 'ultra negrita'
        }]
    }, {
        name: 'Color de fuente',
        property: 'color'
    }, {
        property: 'font-size',
        name: 'Tama??o de fuente'
    }, {
        property: 'letter-spacing',
        name: 'Espaciado de letras'
    }, {
        property: 'line-height',
        name: 'Altura de la l??nea'
    }, {
        name: 'Transformaci??n de texto',
        property: 'text-transform',
        type: 'select',
        defaults: 'none',
        options: [{
            value: 'none',
            name: 'Ninguna'
        }, {
            value: 'capitalize',
            name: 'Capitalizar'
        }, {
            value: 'uppercase',
            name: 'May??sculas'
        }, {
            value: 'lowercase',
            name: 'Min??scula'
        }]
    }, {
        name: 'Texto alineado',
        property: 'text-align',
        type: 'radio',
        defaults: 'left',
        list: [{
            value: 'left',
            name: 'Izquierda',
            className: 'fa fa-align-left'
        }, {
            value: 'center',
            name: 'Centrar',
            className: 'fa fa-align-center'
        }, {
            value: 'right',
            name: 'Derecha',
            className: 'fa fa-align-right'
        }, {
            value: 'justify',
            name: 'Justificar',
            className: 'fa fa-align-justify'
        }]
    }, {
        property: 'text-decoration',
        name: 'Decoracion de texto',
        type: 'radio',
        defaults: 'none',
        list: [{
            value: 'none',
            name: 'Ninguna',
            className: 'fa fa-times'
        }, {
            value: 'underline',
            name: 'subrayar',
            className: 'fa fa-underline'
        }, {
            value: 'line-through',
            name: 'L??nea de paso',
            className: 'fa fa-strikethrough'
        }]
    }, {
        property: 'font-style',
        name: 'Estilo de fuente',
        type: 'radio',
        defaults: 'normal',
        list: [{
            value: 'normal',
            name: 'Normal',
            className: 'fa fa-font'
        }, {
            value: 'italic',
            name: 'It??lico',
            className: 'fa fa-italic'
        }]
    }]
}, {
    name: 'Frontera',
    open: !1,
    buildProps: ['border', 'border-radius'],
    properties: [{
        property: 'border',
        name: 'Frontera',
        properties: [{
            name: 'Anchura',
            property: 'border-width',
            defaults: '0'
        }, {
            name: 'Estilo',
            property: 'border-style',
            options: [{
                value: 'none',
                name: 'ninguna'
            }, {
                value: 'solid',
                name: 's??lido'
            }, {
                value: 'dotted',
                name: 'punteado'
            }, {
                value: 'dashed',
                name: 'precipitado'
            }, {
                value: 'double',
                name: 'doble'
            }, {
                value: 'groove',
                name: 'ranura'
            }, {
                value: 'ridge',
                name: 'cresta'
            }, {
                value: 'inset',
                name: 'recuadro'
            }, {
                value: 'outset',
                name: 'comienzo'
            }]
        }, {
            name: 'Color de relleno',
            property: 'border-color'
        }]
    }, {
        property: 'border-radius',
        name: 'Radio de la frontera',
        properties: [{
            name: 'Parte superior',
            property: 'border-top-left-radius'
        }, {
            name: 'Derecha',
            property: 'border-top-right-radius'
        }, {
            name: 'Fondo',
            property: 'border-bottom-left-radius'
        }, {
            name: 'Izquierda',
            property: 'border-bottom-right-radius'
        }]
    }]
}, {
    name: 'Sombra',
    open: !1,
    buildProps: ['box-shadow', 'text-shadow'],
    properties: [{
        property: 'box-shadow',
        name: 'Sombra de la caja',
        properties: [{
            name: 'desplazamiento X',
            property: 'box-shadow-h'
        }, {
            name: 'desplazamiento Y',
            property: 'box-shadow-v'
        }, {
            name: 'Difuminar',
            property: 'box-shadow-blur'
        }, {
            name: 'untado',
            property: 'box-shadow-spread'
        }, {
            name: 'Color de relleno',
            property: 'box-shadow-color'
        }, {
            name: 'Tipo de sombra',
            property: 'box-shadow-type',
            defaults: '',
            options: [{
                value: '',
                name: 'Fuera de'
            }, {
                value: 'inset',
                name: 'Dentro'
            }]
        }]
    }, {
        property: 'text-shadow',
        name: 'Sombra de texto',
        properties: [{
            name: 'desplazamiento x',
            property: 'text-shadow-h'
        }, {
            name: 'desplazamiento y',
            property: 'text-shadow-v'
        }, {
            name: 'Difuminar',
            property: 'text-shadow-blur'
        }, {
            name: 'Color de relleno',
            property: 'text-shadow-color',
            defaults: '#000000'
        }]
    }]
}, {
    name: 'Fondo',
    open: !1,
    buildProps: ['background-color', 'background'],
    properties: [{
        property: 'background-color',
        name: 'Color de relleno'
    }, {
        property: 'background',
        name: 'Fondo',
        properties: [{
            name: 'Imagen',
            property: 'background-image'
        }, {
            name: 'Repetir',
            property: 'background-repeat'
        }, {
            name: 'Posici??n',
            property: 'background-position'
        }, {
            name: 'Adjunto archivo',
            property: 'background-attachment'
        }, {
            name: 'tama??o',
            property: 'background-size'
        }]
    }]
}, {
    name: 'Extra',
    open: !1,
    buildProps: ['opacity', 'transition'],
    properties: [{
        name: 'Opacidad',
        type: 'slider',
        property: 'opacity',
        defaults: 1,
        step: .01,
        max: 1,
        min: 0
    }, {
        property: 'transition',
        properties: [{
            name: 'Propiedad',
            property: 'transition-property',
            options: [{
                value: 'all',
                name: 'Todos'
            }, {
                value: 'width',
                name: 'Anchura'
            }, {
                value: 'height',
                name: 'Altura'
            }, {
                value: 'background-color',
                name: 'Color de fondo'
            }, {
                value: 'transform',
                name: 'Transformar'
            }, {
                value: 'border',
                name: 'Frontera'
            }, {
                value: 'box-shadow',
                name: 'Sombra de la caja'
            }, {
                value: 'text-shadow',
                name: 'Sombra de texto'
            }, {
                value: 'opacity',
                name: 'Opacidad'
            }, {
                value: 'color',
                name: 'Color'
            }]
        }, {
            name: 'Duraci??n',
            property: 'transition-duration'
        }, {
            name: 'Facilitando',
            property: 'transition-timing-function',
            defaults: 'ease',
            options: [{
                value: 'linear',
                name: 'lineal'
            }, {
                value: 'ease',
                name: 'facilitar'
            }, {
                value: 'ease-in',
                name: 'facilidad en'
            }, {
                value: 'ease-out',
                name: 'Facilitarse'
            }, {
                value: 'ease-in-out',
                name: 'facilidad de entrada'
            }]
        }]
    }]
}];
