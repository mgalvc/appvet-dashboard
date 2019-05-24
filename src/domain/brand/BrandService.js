export default class BrandService {
    constructor(resource) {
        this._resource = resource('brands/listing');
    }

    lista() {
        return this._resource
            .query()
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível obter as marcas. Tente mais tarde');
            })
    }
}