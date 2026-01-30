import CarouselSlide from "../Components/CarouselSlide.jsx";
import HomeLayout from "../Layouts/HomeLayout.jsx";
import aboutImage from "../imge/AboutImage.png";
import apj from "../imge/apj.png";
import billGetes from "../imge/billGates.png";
import einstine from "../imge/einstines.png";
import melsonMandel from "../imge/melsonMandela.png";
import setveJobs from "../imge/setveJobs.png";

const AboutUs = () => {
  const celibrities = [
    {
      title: "A. P. J. Abdul Kalam",
      description:
        "Education is the most powerful tool you can use to change the world",
      image: apj,
      slideNumber: 1,
    },
    {
      title: "Nelson Mandela",
      description:
        "Education is the most powerful weapon which you can use to change the world",
      image: melsonMandel,
      slideNumber: 2,
    },
    {
      title: "Bill Gates",
      description:
        "Don’t compare yourself with anyone in this world. If you do so, you are insulting yourself.",
      image: billGetes,
      slideNumber: 3,
    },
    {
      title: "Steve Jobs",
      description:
        "Your time is limited, so don’t waste it living someone else’s life.",
      image: setveJobs,
      slideNumber: 4,
    },
    {
      title: "Albert Einstein",
      description:
        "Education is not the learning of facts, but the training of the mind to think",
      image: einstine,
      slideNumber: 5,
    },
  ];

  return (
    <HomeLayout>
      <div className="pl-20 pt-20 flex flex-col text-white">
        <div className="flex items-center gap-5 mx-10">
          <section className="w-1/2 space-y-10">
            <h1 className="text-4xl text-yellow-500 font-semibold">
              Affordable and quality education
            </h1>
            <p className="text-xl text-gray-200">
              Our goal is to provide affordable and quality education to the
              world. We are providing the platform for aspiring teachers and
              students to share their skills, creativity and knowledge.
            </p>
          </section>

          <div className="w-1/2">
            <img
              src={aboutImage}
              alt="about main image"
              className="drop-shadow-2xl"
              style={{
                filter: "drop-shadow(0px 10px 10px rgb(0 0 0))",
              }}
            />
          </div>
        </div>

        {/* CAROUSEL */}
        <div className="carousel w-1/2 my-16 m-auto">
          {celibrities.map((celebrity) => (
            <CarouselSlide
              key={celebrity.slideNumber}
              {...celebrity}
              totalSlideNumber={celibrities.length}
            />
          ))}
        </div>
      </div>
    </HomeLayout>
  );
};

export default AboutUs;
