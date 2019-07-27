import { Response, response } from 'express';
import { DmnSupportWorker } from '../Supportworker/DMNSupportWorker';
import * as shortid from 'shortid';
let dmnSupportFile = new DmnSupportWorker();
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
export class DmnWorkerFile {

    private screenarray = [];

    public dmnTable(screens, generationpath, templatepath, callback) {
        console.log('------templatepath----->>>', screens);
        let listofscreens = this.ScreenName(screens);
        dmnSupportFile.dmnSupportWorker(listofscreens, generationpath, templatepath, (response) => {
            callback(response);
        })
    }

    ScreenName(value) {
        let screens = JSON.parse(value);
        let menu = screens.body;
        console.log('-------menu-----', menu[0].menu_option);
        if (menu.length > 0) {
            menu.forEach(element => {
                if (element.menu_option === true) {
                    console.log('---foreach--menu----', element);
                    element.menuDetails.forEach(element2 => {
                        const screendetails = element2.screenmenu;
                        screendetails.forEach(element3 => {
                            // console.log('screens------',element3.description);
                            const screendescription = element3.name;
                            screendescription.screen.forEach(element4 => {
                                element4.forEach(element5 => {
                                    let screensname = {
                                        screen: '',
                                        DecisionRuleId: '',
                                        UnaryTestsId: '',
                                        UnaryTests2Id: '',
                                        LiteralExpressionId: '',
                                        LiteralExpression2Id:'',
                                        LiteralExpression3Id:''
                                    };
                                    console.log('-------screen----', element5);
                                    screensname.screen = element5;
                                    screensname.DecisionRuleId = shortid.generate();
                                    screensname.UnaryTestsId = shortid.generate();
                                    screensname.UnaryTests2Id = shortid.generate();
                                    screensname.LiteralExpressionId = shortid.generate();
                                    screensname.LiteralExpression2Id = shortid.generate();
                                    screensname.LiteralExpression3Id = shortid.generate();
                                    console.log('------screen----', screensname);
                                    this.screenarray.push(screensname);
                                });
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
                LiteralExpression2Id:'',
                LiteralExpression3Id:''
            };
            screensname.screen = 'home';
            screensname.DecisionRuleId = shortid.generate();
            screensname.UnaryTestsId = shortid.generate();
            screensname.UnaryTests2Id = shortid.generate();
            screensname.LiteralExpressionId = shortid.generate();
            screensname.LiteralExpression2Id = shortid.generate();
            screensname.LiteralExpression3Id = shortid.generate();
            this.screenarray.push(screensname);
        }
        console.log('--------screename-----', this.screenarray);
        return this.screenarray;
    }


}