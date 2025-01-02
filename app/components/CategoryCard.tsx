import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  image: string;
  title: string;
}

const CategoryCard = ({ image, title }: CategoryCardProps) => {

  return (
    <div
      className="bg-white w-full h-60 rounded-lg shadow-lg relative overflow-hidden hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
    >
      <Link href={`/recipes/category/${title.toLowerCase()}`} >
      <div className="w-full h-48 relative">
        <Image
          src={image}
          alt={title}
          layout="fill" 
          objectFit="cover" 
          className="w-full h-full"
        />
      </div>
      <h5 className="text-xl font-semibold text-gray-800 p-2">{title}</h5>
      </Link>
    </div>
  );
};

export default CategoryCard;
