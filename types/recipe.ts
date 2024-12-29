export default class Recipe {
    constructor(
        public name: string,
        public image: string,
        public description: string,
        public ingredients: string[],
        public instructions: string,
        public category: string, 
        public servings: number,  
        public prepTime: number, 
        public cookTime: number,  
        public difficulty: string,  
        public authorId: string, 
        public ratings: { userId: string, rating: number, comment: string }[] = [], 
        public id?: string, 
        public createdAt?: Date,
        public updatedAt?: Date  
    ) {}
}
