export class Nanny {
    constructor(rawNanny) {
        this.id = rawNanny.id;
        this.name = rawNanny.name;
        this.email = rawNanny.email;
        this.roles = {
            comments: {
                read: rawNanny.pivot.comment_rights > 0,
                write: rawNanny.pivot.comment_rights > 1,
            },
        };
    }
}
