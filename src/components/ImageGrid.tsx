import Masonry from "react-responsive-masonry";
import image1 from "../assets/Croods - Party Time.png";
import image2 from "../assets/Hobbies - TV.png";
import image4 from "../assets/coffee.png";
import image5 from "../assets/selfie.png";
import image6 from "../assets/Allura - Giant Phone.png";
import image7 from "../assets/The Little Things - PopCorn Bowl.png";
import image10 from "../assets/Hands - Cash.png";
import image11 from "../assets/Hands - Compass.png";
import image12 from "../assets/Hands - Grip.png";
import image13 from "../assets/The Sad Snowman - Bird Companion.png"
import image14 from "../assets/The Sad Snowman - Bird Watching.png";
import image15 from "../assets/The Sad Snowman - Brainfood.png";
const images = [
    image1,image2,image4,image5,image6,image7,image10,image11,image12,image13,image14,image15,];
   
export default function ImageGrid(){
    return(
        <>
             <Masonry  columnsCount={3} gutter="8px">
            {images.map((image, i) => (
              <div key={i} className="">
                <img
                  src={image}
                  alt={`Gallery Image ${i + 1}`}
                  className="w-[300px] h-[220px] object-fill bg-gray-100 shadow-xl rounded-lg"
                />
              </div>
            ))}
          </Masonry>
        </>
    )
}