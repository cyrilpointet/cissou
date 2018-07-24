export class Care {
    id: string = null;
    type: string = null;
    carerId: string = null;
    createDate: number = null;
    qte: number = null;
    content: string = null;
    duration: number = null;
    urine: boolean = null;
    stool: boolean = null;
    diarrhoea: boolean = null;
    carerName: string = "";

    constructor(data) {
        this.id = data.id;
        this.type = data.type;
        this.carerId = data.carerId;
        this.createDate = data.createDate;
        if (data.qte) {
            this.qte = data.qte;
        };
        if (data.content) {
            this.content = data.content;
        };
        if (data.duration) {
            this.duration = data.duration;
        };
        if (data.urine) {
            this.urine = data.urine;
        };
        if (data.stool) {
            this.stool = data.stool;
        };
        if (data.diarrhoea) {
            this.diarrhoea = data.diarrhoea;
        };
    }
}