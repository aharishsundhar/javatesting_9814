import { Response, response } from 'express';
import { DmnSupportWorker } from '../supportworker/DMNsupportWorker';
import * as generate from 'nanoid/generate';
import * as dictionary from 'nanoid-dictionary';
import { camundaService } from '../config/camundaService';

let dmnSupportFile = new DmnSupportWorker();

export class DmnWorkerFile {

    private screenarray = [];

    public dmnTable(screens, callback) {
        // console.log('------templatepath----->>>', screens);
        this.screenarray = [];
        let listofscreens = this.ScreenName(screens);
        let saveItems = this.SaveItems(listofscreens);
        let templatepath = camundaService.TEMPLATE_PATH;
        let generationpath = camundaService.GENERATION_PATH;
        // console.log('----Generationpath----',generationpath);
        dmnSupportFile.dmnSupportWorker(saveItems, generationpath, templatepath, (response) => {
            callback(response);
        })
    }

    ScreenName(value) {
        let screens = value;
        let menu = screens;
        let output = {};
        let finaloutputarr = [];
        let lastslice = '';
        if (menu.length > 0) {
            menu.forEach(element => {
                // console.log('eachj descriptions are ----  ', element);
                output[element.resources] = [];
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
                if (element.role == 'Developer') {
                    let Developer = {
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
                    output[element.resources].push(Developer);
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
            Object.keys(dmnvalue).forEach((key,index) => {
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