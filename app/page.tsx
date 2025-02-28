import { BlurFade } from "@/components/animation/blur-fade";
import { fetchS3Files } from "./actions/fetchImages";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getImageDimensions } from "@/helpers/getImageDimensions";

export default async function Home() {
  const files = await fetchS3Files();

  return (
    <section id="dog-blog" className="py-8 px-4 max-w-6xl mx-auto">
      <div className="flex flex-col items-center mb-8">
        <BlurFade delay={0.1} inView>
          <div className="relative">
            <Image
              src="/logo.png"
              alt='logo'
              width={430}
              height={380}
              className="mb-4 animate-float"
              style={{
                animation: "float 6s ease-in-out infinite"
              }}
            />
          </div>
          <p className="text-center text-primary mb-2 italic">Adventures and stories of our furry friends</p>
        </BlurFade>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <BlurFade delay={0.2} inView>
          <div className="p-6 rounded-xl shadow-md hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 ">
            <h2 className="text-2xl font-semibold text-primary mb-3 shine-effect">Featured Story</h2>
            <p className="text-primary mb-4">
              Meet Max, the golden retriever who learned to fetch the newspaper and everyone's hearts.
              His journey from a playful puppy to a neighborhood hero is one you don't want to miss.
            </p>
            <Button className="bg-[#3A2668] hover:bg-purple-800 transition-all duration-300 text-white py-2 px-4 rounded-lg transform hover:scale-105">
              Read More
            </Button>
          </div>
        </BlurFade>

        <BlurFade delay={0.3} inView>
          <div className=" p-6 rounded-xl shadow-md hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-primary mb-3 shine-effect">Dog Care Tips</h2>
            <ul className="text-primary space-y-2 mb-4">
              <li className="flex items-center">
                <span className="inline-block w-2 h-2 bg-purple-300 rounded-full mr-2"></span>
                The importance of regular vet check-ups
              </li>
              <li className="flex items-center">
                <span className="inline-block w-2 h-2 bg-purple-300 rounded-full mr-2"></span>
                Nutritional needs for different breeds
              </li>
              <li className="flex items-center">
                <span className="inline-block w-2 h-2 bg-purple-300 rounded-full mr-2"></span>
                Exercise routines for a happy, healthy pup
              </li>
              <li className="flex items-center">
                <span className="inline-block w-2 h-2 bg-purple-300 rounded-full mr-2"></span>
                Grooming essentials for every dog owner
              </li>
            </ul>
            <Button className="bg-[#3A2668] hover:bg-purple-800 transition-all duration-300 text-white py-2 px-4 rounded-lg transform hover:scale-105">
              View All Tips
            </Button>
          </div>
        </BlurFade>
      </div>

      <BlurFade delay={0.4} inView>
        <h2 className="text-3xl font-bold text-center mb-8 shine-effect">Our Furry Friends Gallery</h2>
      </BlurFade>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 auto-rows-min">
        {files.map((image, idx) => {
          const { height, span } = getImageDimensions(idx);
          return (
            <BlurFade key={idx} delay={0.5 + idx * 0.05} inView>
              <div
                className={`overflow-hidden rounded-lg shadow-md hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-500 group animate-fade-slide-up ${span}`}
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="relative">
                  <img
                    className={`w-full ${height} object-cover transform group-hover:scale-110 transition-transform duration-700`}
                    src={image.url}
                    alt={`Adorable dog ${idx + 1}`}
                    style={{
                      animationDelay: `${idx * 0.15}s`
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3A2668]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3A2668]/90 to-transparent p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-medium text-sm">Doggo #{idx + 1}</p>
                    <p className="text-purple-200 text-xs">Click to see more</p>
                  </div>
                </div>
              </div>
            </BlurFade>
          );
        })}
      </div>

      <BlurFade delay={0.8} inView>
        <div className="mt-12 p-6 rounded-xl shadow-lg border border-purple-400/30">
          <h2 className="text-2xl font-semibold text-purple-100 mb-3 shine-effect">Subscribe to Keeping Up With your Dog</h2>
          <p className="text-primary mb-4">Get weekly updates on dog care tips, heartwarming stories, and exclusive content.</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              placeholder="Your email address"
              className="flex-grow py-2 px-4 rounded-lg border border-purple-300  text-primary placeholder-purple-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
            />
            <Button className="bg-[#3A2668] hover:bg-purple-800 transition-all duration-300 text-white py-2 px-6 rounded-lg font-medium transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30">
              Subscribe
            </Button>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
