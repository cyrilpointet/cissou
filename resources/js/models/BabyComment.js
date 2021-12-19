export class BabyComment {
    constructor(rawComment) {
        this.text = rawComment.text;
        this.created_at = rawComment.created_at;
    }

    get createdAt() {
        const createdAt = new Date(this.created_at);
        return createdAt.toLocaleDateString("fr-FR");
    }
}
