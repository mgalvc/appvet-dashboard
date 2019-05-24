export default class Product {
    constructor(name = '', description = '', price = '', quantity = '', picture = '', category = '', subcategory = '', brand_id = '') {
        this.name = name
        this.description = description
        this.price = price
        this.quantity = quantity
        this.picture = picture
        this.category = category
        this.subcategory = subcategory
        this.brand_id = brand_id
    }
}