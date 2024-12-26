import mongoose,{Schema,Document, mongo} from 'mongoose'

interface RecipeDocument extends Document{
    name:string;
    image:string;
    description:string;
    ingredients:string[];
    instructions:string;
}

const recipeSchema:Schema = new Schema(
    {
        name:{type:String,required:true},
        image:{type:String,required:true},
        description:{type:String,required:true},
        ingredients:{type:[String],required:true},
        instructions:{type:String,required:true}
    },
    {timestamps:true}
)

const RecipeModel = mongoose.model<RecipeDocument>("Recipe",recipeSchema)

export default RecipeModel