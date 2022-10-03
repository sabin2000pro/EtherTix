import { Bot } from "./bot";

class MediumBot extends Bot {

    constructor(name: any, description: any, intensity: any, credits: string, creditsLeft: string) {
        super(name, description, intensity, credits, creditsLeft);
    }

}

export {MediumBot}