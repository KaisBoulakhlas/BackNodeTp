module.exports = class List {
    constructor(shop, date, useraccount_id) {
        this.shop = shop;
        this.date = date;
        this.archived = false;
        this.useraccount_id = useraccount_id;
    }

    toString() {
        return `${this.shop} ${this.date}`
    }
};