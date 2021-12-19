export class UserBaby {
    constructor(rawBaby) {
        this.id = rawBaby.id;
        this.name = rawBaby.name;
        this.birth = rawBaby.birth;
        this.parentId = rawBaby.user_id;
    }

    get formatedBrith() {
        const birth = new Date(this.birth);
        return birth.toLocaleDateString("fr-FR");
    }
}
