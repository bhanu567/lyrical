// import { WavyBackground } from "./ui/wavy-background";
// import { AnimatedTooltip } from "./ui/animated-tooltip";
import {
  WavyBackgroundComponent,
  AnimatedTooltipComponent,
} from "./BrowserSideComponents";
import { connect } from "@/dbConfig/dbConfig";
import Instructor from "@/models/instructorModel";

connect();

type Instructor = {
  id: number;
  name: string;
  designation: string;
  image: string;
};
async function getInstructors() {
  const instructorsData = await Instructor.find({});
  const instructors = instructorsData.map((instructor, idx) => ({
    id: Number(instructor._id),
    name: instructor.name,
    designation: instructor.designation,
    image: instructor.image,
  }));
  return instructors as Instructor[];
}

async function Instructors() {
  const instructorsStaticData: Instructor[] = await getInstructors();

  return (
    <div
      className="relative h-[40rem] overflow-hidden flex items-center justify-center"
      id="instructor"
    >
      <WavyBackgroundComponent className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl md:text-4xl lg:text-7xl text-white font-bold text-center mb-8">
          Meet Our Instructors
        </h2>
        <p className="text-base md:text-lg text-white text-center mb-4">
          Discover the talented professionals who will guide your musical
          journey
        </p>
        <div className="flex flex-row items-center justify-center mb-10 w-full">
          <AnimatedTooltipComponent items={instructorsStaticData} />
        </div>
      </WavyBackgroundComponent>
    </div>
  );
}

export default Instructors;
