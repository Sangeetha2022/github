import { Injectable } from '@angular/core';
import { Constants } from './Constant';


@Injectable({
    providedIn: 'root'
})
export class RegexExpression {

    public expression: String = Constants.getConstantReservedWords;

    public regexArray: String[] = this.expression.split(',');
    public generatedWords: any;



    constructor() { }

    generateReservedWord() {
        console.log('generate reserved word are ---- ', this.regexArray, this.regexArray.length);
        let count = 1;
        this.regexArray.forEach(element => {
            console.log('begins count values --- ', count);
            if (count === 1) {
                this.generatedWords = `(?:^|_|\\W)${element}(?:$|_|\\W)|`;
            } else if (count === this.regexArray.length) {
                this.generatedWords += `(?:^|_|\W)${element}(?:$|_|\\W)`;
            } else {
                this.generatedWords += `(?:^|_|\\W)${element}(?:$|_|\\W)|`;
            }
            count++;
        });
        console.log('after generated regex are ----- ', this.generatedWords);
    }

    getReservedWord() {
        return this.generatedWords;
    }

    public getSpecialCharacter() {
        console.log('getspecial chatr in rgex --- ', Constants.getConstantSpecialCharacters);
        return Constants.getConstantSpecialCharacters;
    }

}
