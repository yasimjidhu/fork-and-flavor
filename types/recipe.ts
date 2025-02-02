export default class Recipe {
    constructor(
        public name: string,
        public ingredients: string[],
        public description: string,
        public instructions: string[],
        public category: string, 
        public servings: number,  
        public prepTime: string, 
        public cookTime: string,  
        public difficulty: string,  
        public image?: string|File,
        public _id?: string, 
        public createdAt?: Date,
        public updatedAt?: Date  
    ) {}
}
