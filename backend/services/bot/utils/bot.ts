
class Bot {
    name: string;
    description: string;
    intensity: string;
    credits: string;
    creditsLeft: any; // Main Bot Class
    
    constructor(name: string, description: string, intensity: string, credits: string, creditsLeft: string) {
        this.name = name;
        this.description = description;
        this.intensity = intensity;
        this.credits = credits;
        this.creditsLeft = creditsLeft;
    }


}

export {Bot}