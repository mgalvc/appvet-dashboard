export default class Log {
    constructor(client = '', order_date = '', delivery_date = '', delivery_address = '', products = '', price = '') {
        this.client = client;
        this.order_date = order_date;
        this.delivery_date = delivery_date;
        this.delivery_address = delivery_address;
        this.products = products;
        this.price = price;
    }
}