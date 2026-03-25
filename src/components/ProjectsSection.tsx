import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

import PetirImg from '../assets/petir.png';
import JoinUsGif from '../assets/joinus.gif';
import WeatherImg from '../assets/weatheer.gif';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  }),
};

const CardCarousel = ({ images }: { images: string[] }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = Math.abs(page % images.length);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 4000);
    return () => clearInterval(timer);
  }, [page]);

  return (
    <div className="relative group/carousel flex items-center justify-center w-full h-full overflow-hidden rounded-xl bg-black/5">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset }) => {
            const swipe = Math.abs(offset.x) > 50;
            if (swipe) paginate(offset.x > 0 ? -1 : 1);
          }}
          className="absolute w-full h-full object-cover select-none cursor-grab active:cursor-grabbing"
        />
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10">
        <button onClick={() => paginate(-1)} className="p-1 rounded-full bg-black/30 text-white backdrop-blur-sm">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button onClick={() => paginate(1)} className="p-1 rounded-full bg-black/30 text-white backdrop-blur-sm">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="absolute bottom-2 flex gap-1 z-10">
        {images.map((_, i) => (
          <div key={i} className={`h-1 rounded-full transition-all ${i === imageIndex ? 'w-4 bg-white' : 'w-1 bg-white/50'}`} />
        ))}
      </div>
    </div>
  );
};

const projects = [
  {
    title: 'Chemistry Exploration',
    description: 'A collection of my learning journey in chemistry, exploring concepts, experiments, and understanding how reactions shape the world around us.',
    tags: ['Chemistry', 'Science', 'Experiments'],
    image: [PetirImg, WeatherImg, JoinUsGif],
    color: 'from-blue-500/20 to-cyan-500/20',
    github: '#',
    demo: '#',
  },
  {
    title: 'Biology & Science Studies',
    description: 'Documenting my studies in biology and science, focusing on understanding living systems and how they interact with the environment.',
    tags: ['Biology', 'Science', 'Learning'],
    image: [WeatherImg, PetirImg, JoinUsGif],
    color: 'from-green-500/20 to-teal-500/20',
    github: '#',
    demo: '#',
  },
  {
    title: 'English Debate Journey',
    description: 'My experience in English debate, developing critical thinking, argumentation, and public speaking skills through competitions and practice.',
    tags: ['Debate', 'English', 'Public Speaking'],
    image: [JoinUsGif, PetirImg, WeatherImg],
    color: 'from-purple-500/20 to-pink-500/20',
    github: '#',
    demo: '#',
  },
  {
    title: 'Volleyball Team Experience',
    description: 'Being part of a volleyball team has taught me discipline, teamwork, and resilience both on and off the court.',
    tags: ['Volleyball', 'Teamwork', 'Sports'],
    image: [PetirImg, JoinUsGif, WeatherImg],
    color: 'from-orange-500/20 to-red-500/20',
    isContent: true,
    youtube: '#',
  },
  {
    title: 'Organization & Leadership',
    description: 'Active involvement in school organizations, contributing to teamwork, leadership, and event coordination experiences.',
    tags: ['Organization', 'Leadership', 'Teamwork'],
    image: [JoinUsGif, WeatherImg, PetirImg],
    color: 'from-cyan-500/20 to-blue-500/20',
    isContent: true,
    youtube: '#',
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-2 block">Portfolio</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            My Journey & Activities
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-6 glass border border-white/10 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 flex flex-col">
                
                <div className={`aspect-video rounded-xl mb-4 bg-gradient-to-br ${project.color}`}>
                  <CardCarousel images={project.image} />
                </div>
                
                <div className="space-y-3 flex-grow">
                  <div className="flex items-center gap-2">
                    {project.isContent && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary font-medium">
                        Activity
                      </span>
                    )}
                    <h3 className="font-display text-lg font-bold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-5 mt-auto">
                  {project.github && (
                    <Button variant="outline" size="sm" className="rounded-full flex-1" asChild>
                      <a href={project.github}>
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.demo && (
                    <Button size="sm" className="rounded-full flex-1" asChild>
                      <a href={project.demo}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View
                      </a>
                    </Button>
                  )}
                  {project.youtube && (
                    <Button size="sm" className="rounded-full w-full" asChild>
                      <a href={project.youtube}>
                        <Play className="h-4 w-4 mr-2" />
                        Explore
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}