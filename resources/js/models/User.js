import { UserBaby } from "./UserBaby";

export class User {
    constructor(rawUser) {
        this.id = rawUser.id;
        this.name = rawUser.name;
        this.email = rawUser.email;
        this.created_at = rawUser.created_at;
        this.babies = rawUser.babies.map((baby) => new UserBaby(baby));
        this.pupils = rawUser.pupils.map((baby) => new UserBaby(baby));
    }

    get createdAt() {
        const createdAt = new Date(this.created_at);
        return createdAt.toLocaleDateString("fr-FR");
    }

    get allBabies() {
        return [...this.babies, ...this.pupils];
    }
}
