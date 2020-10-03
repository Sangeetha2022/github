import * as st from 'stringtemplate-js';

export class DynamicListService {
    dynamiclist = {
        maxItem: {},
        showLink: {},
        datesToInclude: {
            type: '',
            days: ''
        },
        listTitle: {},
        contentType: {},
        sortOrder: {
            type: '',
            value: ''
        },
        viewAllLink: {},
        html:'',
        gridclass:'',
        containerclass:''
    }
    templatePath = '../../template'

    async DynamicList(value, callback) {
        Object.keys(value.elements).forEach((key) => {
            // console.log('dynamic list object iteration----->>>',key);
            if (key == "maxItem") {
                this.dynamiclist.maxItem = value.elements[key].value

            } else if (key == 'showLink') {
                this.dynamiclist.showLink = value.elements[key].value

            } else if (key == "datesToInclude") {
                if (value.elements[key].categories[0].match(/Future/g) == 'Future') {
                    this.dynamiclist.datesToInclude.type = 'sortdate'
                    this.dynamiclist.datesToInclude.days = 'Future days';
                }
                if (value.elements[key].categories[0].match(/7/g) == '7') {
                    this.dynamiclist.datesToInclude.type = 'sortdate'
                    this.dynamiclist.datesToInclude.days = 'last 7 days';
                }
                if (value.elements[key].categories[0].match(/30/g) == '30') {
                    this.dynamiclist.datesToInclude.type = 'sortdate'
                    this.dynamiclist.datesToInclude.days = 'last 30 days';
                }

            } else if (key == 'listTitle') {
                this.dynamiclist.listTitle = value.elements[key].value

            } else if (key == 'contentType') {
                this.dynamiclist.contentType = value.elements[key]

            } else if (key == 'sortOrder') {
                let n = value.elements[key].categories[0].split('/').pop()
                this.dynamiclist.sortOrder.type = 'sort'
                this.dynamiclist.sortOrder.value = n;

            } else if (key == 'viewAllLink') {
                this.dynamiclist.viewAllLink = value.elements[key].value

            }
            else {
                console.log('------new key has been added');
            }
        })
        // console.log('-------this.dynamiclist-----', this.dynamiclist);
        this.dynamiclist.gridclass = 'col-lg-4 col-md-4 col-sm-4';
        this.dynamiclist.containerclass = 'gep-secondtag gep-mobilesecondtag';
        let htmlconstruct = await this.generatestringtemplate();
        this.dynamiclist.html = htmlconstruct;
        callback(this.dynamiclist, null);
    }

    public generatestringtemplate() {
        let generateComponent = st.loadGroup(require(this.templatePath + `/DynamicList_stg`));
        let dynamiclistHTML = generateComponent.render('DynamicList', [this.dynamiclist]);
        return dynamiclistHTML;
    }
}