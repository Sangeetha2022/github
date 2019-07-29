import { Response, response } from 'express';
import { DmnSupportWorker } from '../Supportworker/DMNSupportWorker';
import * as generate from 'nanoid/generate';
import * as dictionary from 'nanoid-dictionary';
let dmnSupportFile = new DmnSupportWorker();
export class DmnWorkerFile {

    private screenarray = [];

    public dmnTable(screens, generationpath, templatepath, callback) {
        console.log('------templatepath----->>>', screens);
        this.screenarray = [];
        let listofscreens = this.ScreenName(screens);
        dmnSupportFile.dmnSupportWorker(listofscreens, generationpath, templatepath, (response) => {
            callback(response);
        })
    }

    ScreenName(value) {
        let screens = JSON.parse(value);
        let menu = screens.body;
        console.log('-------menu----- ', menu[0].menu_option);
        if (menu.length > 0) {
            menu.forEach(element => {
                if (element.menu_option === true) {
                    console.log('---foreach--menu----', element);
                    element.menuDetails.forEach(element2 => {
                        const screendetails = element2.screenmenu;
                        screendetails.forEach(element3 => {
                            console.log('screens------', element3.description);
                            const screendescription = element3.name;
                            screendescription.screen.forEach(element4 => {
                                console.log('eachj descriptions are ----  ', element4);
                                // element4.forEach(element5 => {
                                    let screensname = {
                                        screen: '',
                                        DecisionRuleId: '',
                                        UnaryTestsId: '',
                                        UnaryTests2Id: '',
                                        LiteralExpressionId: '',
                                        LiteralExpression2Id: '',
                                        LiteralExpression3Id: ''
                                    };
                                    console.log('-------screen----', element4);
                                    screensname.screen = element4;
                                    screensname.DecisionRuleId = generate(dictionary.numbers, 6);
                                    screensname.UnaryTestsId = generate(dictionary.numbers, 6);
                                    screensname.UnaryTests2Id = generate(dictionary.numbers, 6);
                                    screensname.LiteralExpressionId = generate(dictionary.numbers, 6);
                                    screensname.LiteralExpression2Id = generate(dictionary.numbers, 6);
                                    screensname.LiteralExpression3Id = generate(dictionary.numbers, 6);
                                    console.log('------screen----', screensname);
                                    this.screenarray.push(screensname);
                                // });
                                // screensname.push(element4);
                                // console.log('-------finalvalue-----',this.screenarray);
                                return this.screenarray;
                            });
                        });
                    });
                } else {
                    console.log('------else foreach----', element);
                }
            });
        } else {
            console.log('----else part----');
            // screensname = ['home'];
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
        console.log('--------screename-----', this.screenarray);
        return this.screenarray;
    }


}