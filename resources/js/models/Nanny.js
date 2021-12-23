export class Nanny {
    constructor(rawNanny) {
        this.id = rawNanny.id;
        this.name = rawNanny.name;
        this.email = rawNanny.email;
        this.commentsRole = rawNanny.pivot.comment_rights;
    }
    get roles() {
        return {
            comments: {
                read: this.commentsRole > 0,
                write: this.commentsRole > 1,
            },
        };
    }
}
