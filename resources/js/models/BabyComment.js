export class BabyComment {
    constructor(props) {
        this.id = props.id;
        this.text = props.text;
        this.created_at = props.created_at;
        this.user = {
            name: props.user.name,
            id: props.user.id,
            email: props.user.email,
        };
    }
}
