import { Nanny } from "./Nanny";

export class Baby {
    constructor(rawBaby) {
        this.id = rawBaby.id;
        this.name = rawBaby.name;
        this.birth = rawBaby.birth;
        this.parentId = rawBaby.user_id;
        this.parent = {
            id: rawBaby.parent.id,
            name: rawBaby.parent.name,
            email: rawBaby.parent.email,
        };
        this.nannies = rawBaby.nannies.map((nanny) => new Nanny(nanny));
        this.comments = rawBaby.comments
            ? rawBaby.comments.map((comment) => {
                  return {
                      text: comment.text,
                      created_at: comment.created_at,
                  };
              })
            : null;
    }

    get createdAt() {
        const createdAt = new Date(this.created_at);
        return createdAt.toLocaleDateString("fr-FR");
    }

    get formatedBrith() {
        const birth = new Date(this.birth);
        return birth.toLocaleDateString("fr-FR");
    }

    getUserRights(userId, category) {
        const nanny = this.nannies.find((elem) => elem.id === userId);
        return nanny && nanny.rights[category] ? nanny.rights[category] : 0;
    }
}
