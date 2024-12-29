export default class Recipe {
    constructor(
        public name: string,
        public image:string,
        public description: string,
        public ingredients: string[],
        public instructions: string,
        public id?: string,
    ) {}
}
