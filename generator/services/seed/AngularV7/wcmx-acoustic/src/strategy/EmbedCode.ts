export class EmbedCodeService {
    embedcode = {
        "css": {},
        "height": {},
        "showScrollBars": {},
        "allowFullScreen": {},
        "js": {},
        "html": {},
        "width": {}
    }
    EmbedCode(value, callback) {
        Object.keys(value.elements).forEach((key) => {
            // console.log('embedcode object iteration----->>>', value.elements[key], key);
            if (value.elements[key].value) {
                if (key == "css") {
                    this.embedcode.css = value.elements[key].value

                } else if (key == 'height') {
                    this.embedcode.height = value.elements[key].value

                } else if (key == 'showScrollBars') {
                    this.embedcode.showScrollBars = value.elements[key].value

                } else if (key == 'allowFullScreen') {
                    this.embedcode.allowFullScreen = value.elements[key].value

                } else if (key == 'js') {
                    this.embedcode.js = value.elements[key].value

                } else if (key == 'html') {
                    this.embedcode.html = value.elements[key].value

                } else if (key == 'width') {
                    this.embedcode.width = value.elements[key].value

                } else {
                    console.log('------new key has been added');
                }
            }
        });
        callback(this.embedcode, null);
    }
}