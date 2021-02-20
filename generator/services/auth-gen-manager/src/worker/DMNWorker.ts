import { Response, response } from 'express';
import { DmnSupportWorker } from '../Supportworker/DMNSupportWorker';
import * as generate from 'nanoid/generate';
import * as dictionary from 'nanoid-dictionary';
let dmnSupportFile = new DmnSupportWorker();
export class DmnWorkerFile {

    private screenarray = [];
    private screenarr = [];


    public dmnTable(screens, generationpath, templatepath, callback) {
        console.log('------templatepath---screens---nnn->>>', screens);
        let screensjson = JSON.parse(screens);
        let menu = screensjson.body;
        console.log('-------menu---nnnnn--', menu[0].menu_option);
        if (menu.length > 0) {
            menu.forEach(element => {
                if (element.menu_option === true) {
                    console.log('---foreach--menu--nnnn--', element);
                    element.menuDetails.forEach(element2 => {
                        const screendetails = element2.screenmenu;
                        screendetails.forEach(element3 => {
                            console.log('screens----nnnn--', element3.description);
                            const screendescription = element3.name;
                            screendescription.screen.forEach(element4 => {
                                console.log('eachj descriptions are -nnnn---  ', element4);
                                var screenobj = { resources: element4, role: "User" }
                                this.screenarr.push(screenobj);
                            });
                        });
                    });
                }
            });
        }
        console.log("screenarr------------->", this.screenarr)
        this.screenarray = [];
        let listofscreens = this.ScreenName(this.screenarr);
        let saveItems = this.SaveItems(listofscreens);
        dmnSupportFile.dmnSupportWorker(saveItems, generationpath, templatepath, (response) => {
            callback(response);
        })
    }

    ScreenName(value) {
        console.log("value----------->", value);
        let menu = value;
        let output = {};
        let finaloutputarr = [];
        let lastslice = '';
        if (menu.length > 0) {
            menu.forEach(element => {
                console.log('--------screen value----', element);
                output[element.resources] = [];
                if(element.resources == 'admin' || element.resources == 'authorization' || element.resources == 'manageroles'){
                    element.role = 'Admin';
                }
                if (element.role == 'Admin') {
                    let Admin = {
                        Admin: {
                            value: true
                        },
                        Developer: {
                            value: false
                        },
                        User: {
                            value: false
                        },
                        Guest: {
                            value: false
                        }
                    }
                    output[element.resources].push(Admin);
                }
                if (element.role == 'User') {
                    let User = {
                        Admin: {
                            value: false
                        },
                        Developer: {
                            value: false
                        },
                        User: {
                            value: true
                        },
                        Guest: {
                            value: false
                        }
                    }
                    output[element.resources].push(User);
                }
                if (element.role == 'Developer') {
                    let User = {
                        Admin: {
                            value: false
                        },
                        Developer: {
                            value: true
                        },
                        User: {
                            value: false
                        },
                        Guest: {
                            value: false
                        }
                    }
                    output[element.resources].push(User);
                }
                if (element.role == 'Guest') {
                    let Guest = {
                        Admin: {
                            value: false
                        },
                        Developer: {
                            value: false
                        },
                        User: {
                            value: false
                        },
                        Guest: {
                            value: true
                        }
                    }
                    output[element.resources].push(Guest);
                }
                finaloutputarr.push(output);
                lastslice = finaloutputarr[finaloutputarr.length - 1];
            });
            return lastslice;
        }
        else {
            console.log('----else part----');
            let screensname = {
                screen: '',
                DecisionRuleId: '',
                UnaryTestsId: '',
                UnaryTests2Id: '',
                LiteralExpressionId: '',
                LiteralExpression2Id: '',
                LiteralExpression3Id: ''
            };
            screensname.screen = 'home';
            screensname.DecisionRuleId = generate(dictionary.numbers, 6);
            screensname.UnaryTestsId = generate(dictionary.numbers, 6);
            screensname.UnaryTests2Id = generate(dictionary.numbers, 6);
            screensname.LiteralExpressionId = generate(dictionary.numbers, 6);
            screensname.LiteralExpression2Id = generate(dictionary.numbers, 6);
            screensname.LiteralExpression3Id = generate(dictionary.numbers, 6);
            this.screenarray.push(screensname);
        }
        return this.screenarray;
    }

    SaveItems(dmnvalue) {
        console.log('---------value------', dmnvalue);
        Object.keys(dmnvalue).forEach((key, index) => {
            let screensname = {
                screen: '',
                outputjson: '',
                DecisionRuleId: '',
                UnaryTestsId: '',
                UnaryTests2Id: '',
                LiteralExpressionId: '',
                LiteralExpression2Id: '',
                LiteralExpression3Id: '',
                LiteralExpression4Id: ''
            };
            console.log('------key------', key);
            screensname.screen = key;
            screensname.outputjson = JSON.stringify(dmnvalue);
            screensname.DecisionRuleId = generate(dictionary.numbers, 6);
            screensname.UnaryTestsId = generate(dictionary.numbers, 6);
            screensname.UnaryTests2Id = generate(dictionary.numbers, 6);
            screensname.LiteralExpressionId = generate(dictionary.numbers, 6);
            screensname.LiteralExpression2Id = generate(dictionary.numbers, 6);
            screensname.LiteralExpression3Id = generate(dictionary.numbers, 6);
            screensname.LiteralExpression4Id = generate(dictionary.numbers, 6);
            this.screenarray.push(screensname)
        });

        console.log('----------Finaldmnobject-------', this.screenarray)
        return this.screenarray;
    }

}