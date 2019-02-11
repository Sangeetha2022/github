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
    name: 'வடிவமைப்பு',
    open: !1,
    buildProps: ['flex-align-items', 'flex-align-items-v', 'flex-item-behaviour', 'flex-item-h-align', 'flex-multiline',
        'flex-order', 'width', 'flex-width', 'height', 'max-width', 'min-height', 'margin', 'padding'],
    properties: [{
        id: 'flex-align-items',
        type: 'select',
        name: 'கிடைமட்ட சீரமை',
        property: 'justify-content',
        options: [{
            value: 'flex-start',
            name: 'இடது'
        }, {
            value: 'center',
            name: 'மையம்'
        }, {
            value: 'flex-end',
            name: 'வலது'
        }, {
            value: 'space-between',
            name: 'எழுத்துகளிடையே இடைவெளி'
        }, {
            value: 'space-around',
            name: 'இடைவெளி சுற்றி'
        }, {
            value: 'space-evenly',
            name: 'இடைவெளி சமமாக'
        }],
        toRequire: 1
    }, {
        id: 'flex-align-items-v',
        type: 'select',
        name: 'செங்குத்து சீரமை',
        property: 'align-items',
        options: [{
            value: 'stretch',
            name: 'நீட்சி'
        }, {
            value: 'flex-start',
            name: 'மேல்'
        }, {
            value: 'center',
            name: 'மையம்'
        }, {
            value: 'flex-end',
            name: 'அடி'
        }],
        toRequire: 1
    }, {
        id: 'flex-item-behaviour',
        type: 'radio',
        name: 'ஒழுக்கம்',
        property: 'flex',
        defaults: '1 1 100%',
        options: [{
            value: '1 1 100%',
            name: 'பெற்றோர் நிரப்ப'
        }, {
            value: '0 1 auto',
            name: 'பொருத்தம் உள்ளடக்கத்தை'
        }],
        toRequire: 1
    }, {
        id: 'flex-item-h-align',
        type: 'radio',
        name: 'செங்குத்து சீரமை',
        property: 'align-self',
        defaults: 'stretch',
        options: [{
            value: 'stretch',
            name: 'நீட்சி'
        }, {
            value: 'flex-start',
            name: 'மேல்'
        }, {
            value: 'center',
            name: 'மையம்'
        }, {
            value: 'flex-end',
            name: 'அடி'
        }],
        toRequire: 1
    }, {
        id: 'flex-multiline',
        type: 'radio',
        name: 'பலவரி அனுமதி',
        property: 'flex-wrap',
        defaults: 'nowrap',
        options: [{
            value: 'nowrap',
            name: 'இல்லை'
        }, {
            value: 'wrap',
            name: 'ஆம்'
        }],
        toRequire: 1,
        full: 1
    }, {
        id: 'flex-order',
        type: 'integer',
        name: 'வரிசை',
        property: 'order',
        defaults: 1,
        toRequire: 1,
        full: 1
    }, {
        property: 'width',
        name: 'அகலம்',
        units: ['px', '%', 'vw', 'vh']
    }, {
        id: 'flex-width',
        type: 'integer',
        name: 'அகலம்',
        units: ['px', '%'],
        property: 'flex-basis',
        toRequire: 1
    }, {
        property: 'height',
        name: 'உயரம்',
        units: ['px', '%', 'vw', 'vh']
    }, {
        property: 'max-width',
        name: 'அதிகபட்ச அகலம் ',
        units: ['px', '%', 'vw', 'vh']
    }, {
        property: 'min-height',
        name: 'குறைந்த உயரம்',
        units: ['px', '%', 'vw', 'vh']
    }, {
        property: 'margin',
        name: 'மார்ஜின்',
        properties: [{
            name: 'மேல்',
            property: 'margin-top'
        }, {
            name: 'இடது',
            property: 'margin-left'
        }, {
            name: 'வலது',
            property: 'margin-right'
        }, {
            name: 'அடி',
            property: 'margin-bottom'
        }]
    }, {
        property: 'padding',
        name: 'பேட்டிங்',
        properties: [{
            name: 'மேல்',
            property: 'padding-top'
        }, {
            name: 'வலது',
            property: 'padding-right'
        }, {
            name: 'அடி',
            property: 'padding-bottom'
        }, {
            name: 'இடது',
            property: 'padding-left'
        }]
    }]
}, {
    open: !1,
    name: 'அச்சுக்கலை',
    buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-transform',
        'text-align', 'text-decoration', 'font-style'],
    properties: [{
        name: 'எழுத்துரு',
        property: 'font-family',
        options: [{
            value: 'Arial, Helvetica, sans-serif',
            name: 'ஏரியல்'
        }, {
            value: 'Arial Black, Gadget, sans-serif',
            name: 'தூரிகை ஸ்கிரிப்ட் எம் டி'
        }, {
            value: 'Comic Sans MS, cursive, sans-serif',
            name: 'காமிக் சான்ஸ் எம் எஸ்'
        }, {
            value: 'Courier New, Courier, monospace',
            name: 'கூரியர் புதிய'
        }, {
            value: 'Georgia, serif',
            name: 'ஜோர்ஜியா'
        }, {
            value: 'Helvetica, serif',
            name: 'ஹெல்வெடிகா'
        }, {
            value: 'Impact, Charcoal, sans-serif',
            name: 'தாக்கம்'
        }, {
            value: 'Lucida Sans Unicode, Lucida Grande, sans-serif',
            name: 'லூசிடா சான்ஸ் யுனிகோட்'
        }, {
            value: 'Tahoma, Geneva, sans-serif',
            name: 'தஹோமா'
        }, {
            value: 'Times New Roman, Times, serif',
            name: 'டைம்ஸ் நியூ ரோமன்'
        }, {
            value: 'Trebuchet MS, Helvetica, sans-serif',
            name: 'டிரபுசெட் எம் எஸ்'
        }, {
            value: 'Verdana, Geneva, sans-serif',
            name: 'வெர்டனா'
        }]
    }, {
        name: 'எடை',
        property: 'font-weight',
        options: [{
            value: '100',
            name: 'மெல்லிய'
        }, {
            value: '200',
            name: 'எக்ஸ்ட்ரா ஒளி'
        }, {
            value: '300',
            name: 'ஒளி'
        }, {
            value: '400',
            name: 'இயல்பு'
        }, {
            value: '500',
            name: 'நடுத்தர'
        }, {
            value: '600',
            name: 'அரை போல்ட்'
        }, {
            value: '700',
            name: 'போல்ட்'
        }, {
            value: '800',
            name: 'எக்ஸ்ட்ரா போல்ட்'
        }, {
            value: '900',
            name: 'அல்ட்ரா-போல்ட்'
        }]
    }, {
        name: 'எழுத்துரு நிறம்',
        property: 'color'
    }, {
        property: 'font-size',
        name: 'எழுத்துரு அளவு'
    }, {
        property: 'letter-spacing',
        name: 'கடிதம் இடைவெளி'
    }, {
        property: 'line-height',
        name: 'வரி உயரம்'
    }, {
        name: 'உரை மாற்றும்',
        property: 'text-transform',
        type: 'select',
        defaults: 'none',
        options: [{
            value: 'none',
            name: 'ஏதுமில்லை'
        }, {
            value: 'capitalize',
            name: 'பேரெழுத்தாக்கும்'
        }, {
            value: 'uppercase',
            name: 'பெரெழுத்து'
        }, {
            value: 'lowercase',
            name: 'சிற்றெழுத்து'
        }]
    }, {
        name: 'உரை சீரமை',
        property: 'text-align',
        type: 'radio',
        defaults: 'left',
        list: [{
            value: 'left',
            name: 'இடது',
            className: 'fa fa-align-left'
        }, {
            value: 'center',
            name: 'மையம்',
            className: 'fa fa-align-center'
        }, {
            value: 'right',
            name: 'வலது',
            className: 'fa fa-align-right'
        }, {
            value: 'justify',
            name: 'ஓரச்சீரமை',
            className: 'fa fa-align-justify'
        }]
    }, {
        property: 'text-decoration',
        name: 'உரை அலங்காரம்',
        type: 'radio',
        defaults: 'none',
        list: [{
            value: 'none',
            name: 'ஏதுமில்லை',
            className: 'fa fa-times'
        }, {
            value: 'underline',
            name: 'அடிக்கோடு',
            className: 'fa fa-underline'
        }, {
            value: 'line-through',
            name: 'அரைகோட்டில் நெறியை',
            className: 'fa fa-strikethrough'
        }]
    }, {
        property: 'font-style',
        name: 'எழுத்துரு வகை',
        type: 'radio',
        defaults: 'normal',
        list: [{
            value: 'normal',
            name: 'இயல்பு',
            className: 'fa fa-font'
        }, {
            value: 'italic',
            name: 'சாய்ந்த எழுத்துரு',
            className: 'fa fa-italic'
        }]
    }]
}, {
    name: 'எல்லை',
    open: !1,
    buildProps: ['border', 'border-radius'],
    properties: [{
        property: 'border',
        name: 'எல்லை',
        properties: [{
            name: 'அகலம்',
            property: 'border-width',
            defaults: '0'
        }, {
            name: 'அமைப்பு',
            property: 'border-style',
            options: [{
                value: 'none',
                name: 'ஏதுமில்லை'
            }, {
                value: 'solid',
                name: 'திட'
            }, {
                value: 'dotted',
                name: 'புள்ளிவைத்து'
            }, {
                value: 'dashed',
                name: 'கோடிட்ட'
            }, {
                value: 'double',
                name: 'இரட்டை'
            }, {
                value: 'groove',
                name: 'பள்ளம்'
            }, {
                value: 'ridge',
                name: 'ரிட்ஜ்'
            }, {
                value: 'inset',
                name: 'இடைச்செருகல்'
            }, {
                value: 'outset',
                name: 'தொடக்கத்திலேயே'
            }]
        }, {
            name: 'எல்லை வண்ணம்',
            property: 'border-color'
        }]
    }, {
        property: 'border-radius',
        name: 'எல்லை ஆரம்',
        properties: [{
            name: 'மேல்',
            property: 'border-top-left-radius'
        }, {
            name: 'வலது',
            property: 'border-top-right-radius'
        }, {
            name: 'அடி',
            property: 'border-bottom-left-radius'
        }, {
            name: 'இடது',
            property: 'border-bottom-right-radius'
        }]
    }]
}, {
    name: 'நிழல்',
    open: !1,
    buildProps: ['box-shadow', 'text-shadow'],
    properties: [{
        property: 'box-shadow',
        name: 'பெட்டி நிழல்',
        properties: [{
            name: 'ஆஃப்செட் X',
            property: 'box-shadow-h'
        }, {
            name: 'ஆஃப்செட் Y',
            property: 'box-shadow-v'
        }, {
            name: 'தெளிவின்மை',
            property: 'box-shadow-blur'
        }, {
            name: 'பரவல்',
            property: 'box-shadow-spread'
        }, {
            name: 'வண்ணத்தை நிரப்பு',
            property: 'box-shadow-color'
        }, {
            name: 'நிழல் வகை',
            property: 'box-shadow-type',
            defaults: '',
            options: [{
                value: '',
                name: 'வெளியே'
            }, {
                value: 'inset',
                name: 'உள்ளே'
            }]
        }]
    }, {
        property: 'text-shadow',
        name: 'உரை நிழல்',
        properties: [{
            name: 'ஆஃப்செட் X',
            property: 'text-shadow-h'
        }, {
            name: 'ஆஃப்செட் Y',
            property: 'text-shadow-v'
        }, {
            name: 'தெளிவின்மை',
            property: 'text-shadow-blur'
        }, {
            name: 'வண்ணத்தை நிரப்பு',
            property: 'text-shadow-color',
            defaults: '#000000'
        }]
    }]
}, {
    name: 'பின்னணி',
    open: !1,
    buildProps: ['background-color', 'background'],
    properties: [{
        property: 'background-color',
        defaults: 'ஏதுமில்லை',
        name: 'வண்ணத்தை நிரப்பு'
    }, {
        property: 'background',
        name: 'பின்னணி',
        properties: [{
            name: 'படம்',
            property: 'background-image'
        }, {
            name: 'மீண்டும் மீண்டும்',
            property: 'background-repeat'
        }, {
            name: 'நிலை',
            property: 'background-position'
        }, {
            name: 'இணைப்பு',
            property: 'background-attachment'
        }, {
            name: 'அளவு',
            property: 'background-size'
        }]
    }]
}, {
    name: 'கூடுதல்',
    open: !1,
    buildProps: ['opacity', 'transition'],
    properties: [{
        name: 'தன்மை',
        type: 'slider',
        property: 'opacity',
        defaults: 1,
        step: .01,
        max: 1,
        min: 0
    }, {
        property: 'transition',
        name: 'மாற்றம்',
        properties: [{
            name: 'சொத்து',
            property: 'transition-property',
            options: [{
                value: 'all',
                name: 'அனைத்தும்'
            }, {
                value: 'width',
                name: 'அகலம்'
            }, {
                value: 'height',
                name: 'உயரம்'
            }, {
                value: 'background-color',
                name: 'பின்னணி நிறம்'
            }, {
                value: 'transform',
                name: 'மாற்றும்'
            }, {
                value: 'border',
                name: 'எல்லை'
            }, {
                value: 'box-shadow',
                name: 'பெட்டி நிழல்'
            }, {
                value: 'text-shadow',
                name: 'உரை நிழல்'
            }, {
                value: 'opacity',
                name: 'தன்மை'
            }, {
                value: 'color',
                name: 'நிறம்'
            }]
        }, {
            name: 'காலம்',
            property: 'transition-duration'
        }, {
            name: 'தளர்த்துவது',
            property: 'transition-timing-function',
            defaults: 'ease',
            options: [{
                value: 'linear',
                name: 'நேரியல்'
            }, {
                value: 'ease',
                name: 'எளிதாக்க'
            }, {
                value: 'ease-in',
                name: 'எளிதாக்க-ல்'
            }, {
                value: 'ease-out',
                name: 'எளிதாக்க-அவுட்'
            }, {
                value: 'ease-in-out',
                name: 'எளிதாக்க-ல்-அவுட்'
            }]
        }]
    }]
}];

// stylemanager names in spanish languages
export const styleManagerSpanish = [{
    name: 'Diseño',
    open: !1,
    buildProps: ['flex-align-items', 'flex-align-items-v', 'flex-item-behaviour', 'flex-item-h-align', 'flex-multiline',
        'flex-order', 'width', 'flex-width', 'height', 'max-width', 'min-height', 'margin', 'padding'],
    properties: [{
        id: 'flex-align-items',
        type: 'select',
        name: 'Alineación horizontal',
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
        name: 'Alineación vertical',
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
        name: 'Alineación vertical',
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
        name: 'Permitir multilínea',
        property: 'flex-wrap',
        defaults: 'nowrap',
        options: [{
            value: 'nowrap',
            name: 'No'
        }, {
            value: 'wrap',
            name: 'Sí'
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
        name: 'Anchura máxima',
        units: ['px', '%', 'vw', 'vh']
    }, {
        property: 'min-height',
        name: 'Altura mínima',
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
    name: 'Tipografía',
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
            name: 'Helvética'
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
        name: 'Tamaño de fuente'
    }, {
        property: 'letter-spacing',
        name: 'Espaciado de letras'
    }, {
        property: 'line-height',
        name: 'Altura de la línea'
    }, {
        name: 'Transformación de texto',
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
            name: 'Mayúsculas'
        }, {
            value: 'lowercase',
            name: 'Minúscula'
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
            name: 'Línea de paso',
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
            name: 'Itálico',
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
                name: 'sólido'
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
            name: 'Posición',
            property: 'background-position'
        }, {
            name: 'Adjunto archivo',
            property: 'background-attachment'
        }, {
            name: 'tamaño',
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
            name: 'Duración',
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
