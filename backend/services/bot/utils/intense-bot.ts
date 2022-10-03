import { Bot } from "./bot";

class IntenseBot extends Bot {

    constructor(name: any, description: any, intensity: any, credits: string, creditsLeft: string) {
        super(name, description, intensity, credits, creditsLeft);
    }

}

export {IntenseBot}