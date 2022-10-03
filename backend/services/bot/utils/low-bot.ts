import { Bot } from "./bot";

class LowBot extends Bot {

    constructor(name: any, description: any, intensity: any, credits: string, creditsLeft: string) {
        super(name, description, intensity, credits, creditsLeft);
    }

}

export {LowBot}