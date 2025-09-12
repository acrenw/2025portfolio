import { Component, HostListener } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GameStateService } from '../../services/game-state.service';
import { CommonModule } from '@angular/common';

interface Project {
  id: number;
  title: string;
  caption: string;
  thumbnailUrl: string;
  details: {
    description: string;
    technologies: string[];
    images: string[];
    videos: string[];
    embeds: string[];
    links: { name: string; url: string; }[];
  };
}

interface Internship {
  id: number;
  title: string;
  date: string;
  thumbnailUrl: string;
  details: {
    description: string;
    technologies: string[];
    images: string[];
    videos: string[];
    embeds: string[];
    links: { name: string; url: string; }[];
  };
}

@Component({
  selector: 'app-pc',
  imports: [CommonModule],
  templateUrl: './pc.component.html',
  styleUrl: './pc.component.scss'
})
export class PcComponent {
  activeTab: 'internships' | 'projects' = 'internships';
  selectedProject: Project | null = null;
  selectedInternship: Internship | null = null;
  showProjectModal = false;
  showInternshipModal = false;


  // Sample internship data - replace with your actual internships
  internships: Internship[] = [
    {
      id: 1,
      title: 'Full Stack Developer',
      date: 'May 2025 - August 2025',
      thumbnailUrl: '/assets/pc/internships/city-of-waterloo/city-of-waterloo-logo.png',
      details: {
        description: 'I built a full-stack web app using ASP.NET Core, Angular, and Oracle, with Entity Framework Core handling the data layer. As part of the project, I upgraded the stack from .NET 7 to 8 and Angular 13 to 18, fixing dependency issues along the way and refreshing the overall UI/UX. I developed personnel, scheduling, and reporting modules with full CRUD functionality, filtering, and export options to PDF and Excel. On the front end, I used Angular Material to build a responsive, mobile-first UI. Finally, I also deployed the app to IIS with HTTPS properly configured.',
        technologies: ['.NET', 'Angular', 'Oracle', 'SQL', 'C#', 'TypeScript', 'HTML', 'SCSS', 'Git'],
        images: [
          '/assets/pc/internships/city-of-waterloo/filipa-reynolds.JPG',
          '/assets/pc/internships/city-of-waterloo/tim-anderson.JPG'
        ],
        videos: [],
        embeds: [],
        links: [
          { name: 'Company Website', url: 'https://www.waterloo.ca/en/index.aspx' }
        ]
      }
    },
    {
      id: 2,
      title: 'Robotics Software Intern',
      date: 'June 2024 - December 2024',
      thumbnailUrl: '/assets/pc/internships/rapyuta-robotics/rr-logo.jpeg',
      details: {
        description: 'I worked as a Robotics Software Engineer on the Robot Control Systems team at Rapyuta Robotics in Japan, contributing to an Automated Storage and Retrieval System (ASRS) robot. I developed dynamic obstacle collision avoidance in ROS2 using finite state machines and implemented a 3D R-tree for spatial indexing, reducing query time from O(n) to O(log n) while improving localization accuracy and safety. I helped design a master controller with a six-component optimization pipeline used by multiple clients and internal teams, co-developed genetic evolutionary algorithms for non-convex, multi-modal optimization of ASRS layouts, and built an interactive Python module for real-time layout arrangement using multi-source BFS, proximity-based sorting, and directional heuristics. I also ran simulations and generated plots to evaluate convergence and parameter correlations to enhance the optimization strategy.',
        technologies: ['ROS', 'Bash', 'C++', 'Python', 'Docker', 'RedHat', 'Git', 'Numpy', 'Pandas'],
        images: [
          '/assets/pc/internships/rapyuta-robotics/cheer.JPG',
          '/assets/pc/internships/rapyuta-robotics/group_photo.PNG'
        ],
        videos: [],
        embeds: [],
        links: [
          { name: 'Company Website', url: 'https://www.rapyuta-robotics.com/' }
        ]
      }
    },
    {
      id: 3,
      title: 'Embedded Programmer + Graphic Designer',
      date: 'June 2022 - September 2023',
      thumbnailUrl: '/assets/pc/internships/loopx/loopx-logo.jpeg',
      details: {
        description: 'I interned at LoopX in high school, my first robotics-related role, where I contributed to both autonomous delivery and mining robots. I programmed interactive LED screens in Python for GoosEx to display alerts and emoticons, and later integrated lidar-activated LED strips in C++ within ROS using Raspberry Pi and Jetson Nano. I also handled UI/UX design for the LoopX website and AISear AI platform with Adobe PS, Figma, and Procreate, and created marketing media including logos, posters, stickers, business cards, and apparel.',
        technologies: ['ROS', 'C++', 'Python', 'Raspberry Pi', 'Jetson Nano'],
        images: [
          '/assets/pc/internships/loopx/accelerator_center.png',
          '/assets/pc/internships/loopx/aisear.gif',
          '/assets/pc/internships/loopx/basement.png',
          '/assets/pc/internships/loopx/business_card.png',
          '/assets/pc/internships/loopx/goosex_design.png',
          '/assets/pc/internships/loopx/goosex.png',
          '/assets/pc/internships/loopx/landing_page.gif',
          '/assets/pc/internships/loopx/led_screen.jpg',
          '/assets/pc/internships/loopx/loopx-logo.jpeg',
          '/assets/pc/internships/loopx/mechanic.png',
          '/assets/pc/internships/loopx/obstacle.gif',
          '/assets/pc/internships/loopx/pin.png',
          '/assets/pc/internships/loopx/shirt_design.png',
          '/assets/pc/internships/loopx/shirt_design2.png',
          '/assets/pc/internships/loopx/sticker.png',
          '/assets/pc/internships/loopx/wires.png'
        ],
        videos: [],
        embeds: [],
        links: [
          { name: 'Company Website', url: 'https://www.loopx.ai/' }
        ]
      }
    },
    {
      id: 4,
      title: 'Full Stack Developer',
      date: 'June 2022 - October 2022',
      thumbnailUrl: '/assets/pc/internships/openprinciples/openprinciples-logo.png',
      details: {
        description: 'I worked as a full-stack developer at OpenPrinciples on UltraBrain, an AI-human assistant that aligns Google Calendar events with personal principles. I integrated the Notion API with Google Calendar in Python to improve database accuracy and UI, and built a Python-based data pipeline to streamline analytics and enhance data accessibility.',
        technologies: ['Python', 'Notion API', 'Docker', 'Postman'],
        images: [
          '/assets/pc/internships/openprinciples/discord_call.png'
        ],
        videos: [],
        embeds: [],
        links: [
          { name: 'Company Website', url: 'https://openprinciples.notion.site/OpenPrinciples-681ecdace05b4eda91afee4d91c1df1d' }
        ]
      }
    }
  ];

  // Projects ordered by impressiveness for recruiters
  projects: Project[] = [
    {
      id: 1,
      title: 'Lunar Lander',
      caption: 'Lunar lander simulator',
      thumbnailUrl: '/assets/pc/projects/lunar-lander/lunar-lander-tn.png',
      details: {
        description: 'I built a Lunar Lander simulator in Python using TensorFlow and OpenAI Gym, where I implemented a Deep Q-Network (DQN) agent to learn optimal landing strategies through reward-based feedback. I tuned hyperparameters such as learning rate, discount factor, and exploration policy to achieve consistent successful landings.',
        technologies: ['Python', 'TensorFlow', 'DQN', 'OpenAI Gym'],
        images: [
          '/assets/pc/projects/lunar-lander/IMG_2852.jpg',
          '/assets/pc/projects/lunar-lander/IMG_2853.jpg'
        ],
        videos: [
        ],
        embeds: [],
        links: []
      }
    },
    {
      id: 2,
      title: 'Movie Recommender',
      caption: 'Movie recommender systems',
      thumbnailUrl: '/assets/pc/projects/movie-recommender/movie-recommender-tn.png',
      details: {
        description: 'I built two movie recommender systems in Python using TensorFlow and NumPy: one based on collaborative filtering with matrix factorization and embeddings, and another using content-based filtering. Both systems applied normalization techniques like standardization and min-max scaling, and I evaluated their performance using MSE and similarity metrics.',
        technologies: ['Python', 'NumPy', 'TensorFlow'],
        images: [
          '/assets/pc/projects/movie-recommender/collab1.jpg',
          '/assets/pc/projects/movie-recommender/collab2.jpg',
          '/assets/pc/projects/movie-recommender/content.jpg'
        ],
        videos: [
        ],
        embeds: [],
        links: []
      }
    },
    {
      id: 3,
      title: 'Image Compression',
      caption: 'Image compression algorithm',
      thumbnailUrl: '/assets/pc/projects/image-compression/IMG_2848.jpg',
      details: {
        description: 'I built an image compression algorithm in Python using k-means clustering to reduce the number of colors in an image while preserving fidelity. I optimized performance by tuning k values, tracking distortion error, and visualizing results with before-and-after plots in Matplotlib.',
        technologies: ['Python', 'NumPy', 'Matplotlib', 'PostgreSQL', 'k-Means Clustering'],
        images: [
          '/assets/pc/projects/image-compression/IMG_2845.jpg',
          '/assets/pc/projects/image-compression/IMG_2846.jpg',
          '/assets/pc/projects/image-compression/IMG_2847.jpg',
          '/assets/pc/projects/image-compression/IMG_2848.jpg'
        ],
        videos: [
        ],
        embeds: [],
        links: []
      }
    },
    {
      id: 4,
      title: 'Try It On',
      caption: 'AR fashion try-on iOS app',
      thumbnailUrl: '/assets/pc/projects/try-it-on/try-it-on-logo.png',
      details: {
        description: "I built an iOS AR app that overlays 3D clothes onto tracked image targets using Vuforia in Unity for real-time virtual try-ons. The app also includes features like color and size toggles, as well as surface-anchored models powered by Unity's AR engine.",
        technologies: ['Unity', 'Vuforia', 'Xcode', 'C#'],
        images: [
        ],
        videos: [
          '/assets/pc/projects/try-it-on/ar-app.MP4'
        ],
        embeds: [],
        links: []
      }
    },
    {
      id: 5,
      title: 'ReadBetter',
      caption: 'Bionic reading web app',
      thumbnailUrl: '/assets/pc/projects/readbetter/readbetter-logo.png',
      details: {
        description: 'I developed ReadBetter, a bionic reading web app designed to improve reading speed by providing artificial fixation points. I integrated multiple APIs—including AssemblyAI, EasyOCR, and PyPDF2—to extract content from speech, text, and images, and built the full-stack application with Python and Flask, hosting it on AWS.',
        technologies: ['AWS', 'Assemblyai', 'HTML/CSS', 'EasyOCR', 'Flask', 'PyPDF2', 'Zeet'],
        images: [
          '/assets/pc/projects/readbetter/choose_file.png',
          '/assets/pc/projects/readbetter/complete_conversion.png',
          '/assets/pc/projects/readbetter/landing.png'
        ],
        videos: [
        ],
        embeds: [
          'https://youtu.be/BRFJ2iNiig0'
        ],
        links: [
          { name: 'Devpost', url: 'https://devpost.com/software/bet-you-can-read-it-better-like-this-readbetter' },
          { name: 'GitHub Repository', url: 'https://github.com/acrenw/JAMHacks7' }
        ]
      }
    },
    {
      id: 6,
      title: 'ShoeBill',
      caption: 'Facial expression tracking webapp to prevent rage gaming',
      thumbnailUrl: '/assets/pc/projects/shoebill/shoebill-logo.png',
      details: {
        description: "At CalHacks 10 (UC Berkeley), my team and I built ShoeBill, a full-stack web application using Python, Django, and HTML5. We integrated the Hume API for computer vision–based facial expression tracking and the Amazfit Zepp smartwatch API to enable watch-to-web app messaging and biometric data acquisition such as heart rate and breathing. On the front end, we used Vite to support live UI updates, while combining Mediapipe, OpenCV, SQL, and CSS for additional functionality.",
        technologies: ['Vite', 'Python', 'SQL', 'Django', 'Mediapipe', 'OpenCV'],
        images: [
          '/assets/pc/projects/shoebill/bluetooth.png',
          '/assets/pc/projects/shoebill/bluetooth2.png',
          '/assets/pc/projects/shoebill/landing_page.png',
          '/assets/pc/projects/shoebill/stats.png',
          '/assets/pc/projects/shoebill/support.png'
        ],
        videos: [
        ],
        embeds: [
          'https://youtu.be/qP-S0vukCM4'
        ],
        links: [
          { name: 'Devpost', url: 'https://devpost.com/software/discovervoice' },
          { name: 'GitHub Repository', url: 'https://github.com/shendrew/calhack2023' }
        ]
      }
    },
    {
      id: 7,
      title: 'Remindicine',
      caption: 'Portable smart pillbox',
      thumbnailUrl: '/assets/pc/projects/remindicine/remindicine-tn.png',
      details: {
        description: "At the University of Waterloo, I created Remindicine, a portable smart pillbox designed to support individuals with Alzheimer's. I programmed an STM32 in C and C++ to build a motion-activated alarm system with a user-adjustable screen display, and designed 3D-printed enclosures in Blender and Prusa to optimize user interaction with the hardware.",
        technologies: ['C', 'C++', 'STM32', 'Blender', 'Prusa'],
        images: [
          '/assets/pc/projects/remindicine/mechanical-drawing-v1_orig.png'
        ],
        videos: [],
        embeds: [],
        links: [
          { name: 'GitHub Repository', url: 'https://github.com/acrenw/remindicine' }
        ]
      }
    },
    {
      id: 8,
      title: 'HealThyme',
      caption: 'Web app for finding closest health clinics',
      thumbnailUrl: '/assets/pc/projects/healthyme/healthyme-logo.png',
      details: {
        description: 'At Hack the Valley 7 (UofT), my team and I built HealThyme, a healthcare web app that helps users find nearby walk-in clinics in real time. I used Azure Maps to integrate geolocation services, developed a backend and database to manage location and personal data, and built a responsive frontend with React.js.',
        technologies: ['Azure', 'Azure-Maps', 'HTML/CSS', 'React.js', 'Microsoft Cloud'],
        images: [
          '/assets/pc/projects/healthyme/booking.jpeg',
          '/assets/pc/projects/healthyme/booking_hospitals.png',
          '/assets/pc/projects/healthyme/booking_info.jpeg',
          '/assets/pc/projects/healthyme/landing_page.png',
          '/assets/pc/projects/healthyme/map.jpeg',
          '/assets/pc/projects/healthyme/profile.jpeg',
          '/assets/pc/projects/healthyme/sign_in.jpeg',
          '/assets/pc/projects/healthyme/sign_up.jpeg',
          '/assets/pc/projects/healthyme/waitlist.png'
        ],
        videos: [
        ],
        embeds: [
          'https://youtu.be/iKNFji-NY80'
        ],
        links: [
          { name: 'Devpost', url: 'https://devpost.com/software/healthyme-dpaixs' },
          { name: 'GitHub Repository', url: 'https://github.com/acrenw/my-app' }
        ]
      }
    },
    {
      id: 9,
      title: 'OSTranslate',
      caption: 'Web app for summarization and translation of any media',
      thumbnailUrl: '/assets/pc/projects/ostranslate/ostranslate-logo.png',
      details: {
        description: "We built OStranslate, a web app that summarizes and translates text, video, audio, and URLs into 133 languages. It was developed with Python, HTML, and CSS, integrating Symbl.ai and Google Translate APIs. Deployment was a major challenge—we tested Flask, Docker, and Vercel before finalizing a working setup. Planned improvements include adding Symbl.ai's Streaming API for real-time translation and expanding support for more file formats and languages.",
        technologies: ['Python', 'symbl.ai', 'Google Translate API', 'Flask', 'HTML/CSS', 'JS'],
        images: [
          '/assets/pc/projects/ostranslate/data.png',
          '/assets/pc/projects/ostranslate/home.png'
        ],
        videos: [
        ],
        embeds: [],
        links: [
          { name: 'Devpost', url: 'https://devpost.com/software/ostranslate' },
          { name: 'GitHub Repository', url: 'https://github.com/acrenw/ignitionsHacks2' }
        ]
      }
    },
    {
      id: 10,
      title: 'SignLingo',
      caption: 'Sign language translator and learning software',
      thumbnailUrl: '/assets/pc/projects/signlingo/signlingo-logo.png',
      details: {
        description: 'I developed SignLingo, a sign language translator that uses computer vision and the Blobscanner library for real-time translation between text and ASL. I designed a user-friendly interface that supports both education and practice, featuring error feedback for incorrect signs and an integrated ASL cheat sheet to enhance learning and proficiency.',
        technologies: ['Processing', 'Blobscanner', 'Procreate'],
        images: [
          '/assets/pc/projects/signlingo/detailed_instructions.png',
          '/assets/pc/projects/signlingo/title.png',
          '/assets/pc/projects/signlingo/user_manual.png'
        ],
        videos: [
        ],
        embeds: [
          'https://youtu.be/AVIqqDKNNUA'
        ],
        links: []
      }
    },
    {
      id: 11,
      title: 'Slouchn\'t',
      caption: 'CV Slouching detection program',
      thumbnailUrl: '/assets/pc/projects/slouchnt/slouchnt-logo.png',
      details: {
        description: "I built Slouchn't, a computer vision system for real-time posture analysis using Mediapipe and OpenCV. I applied multithreading to parallelize key components and implemented deviation detection algorithms to deliver instant posture alerts through a Tkinter interface.",
        technologies: ['OpenCV', 'Mediapipe', 'Tkinter'],
        images: [
          '/assets/pc/projects/slouchnt/calibration_complete.png',
          '/assets/pc/projects/slouchnt/sit_straight.jpg',
          '/assets/pc/projects/slouchnt/sitting_straight.png',
          '/assets/pc/projects/slouchnt/slouch.png',
          '/assets/pc/projects/slouchnt/slouching.png',
          '/assets/pc/projects/slouchnt/tip.png',
          '/assets/pc/projects/slouchnt/warning.png'
        ],
        videos: [
        ],
        embeds: [],
        links: [
          { name: 'Devpost', url: 'https://devpost.com/software/slouchn-t' },
          { name: 'GitHub Repository', url: 'https://github.com/PilotPrix/JamHacks-VI' }
        ]
      }
    },
    {
      id: 12,
      title: 'To Do List',
      caption: 'To do list iOS app',
      thumbnailUrl: '/assets/pc/projects/to-do-list/to-do-list-logo.png',
      details: {
        description: 'I built an iOS to-do list app in Swift with UIKit, featuring full CRUD functionality, touch gesture support, and persistent storage using Core Data and Firebase.',
        technologies: ['Swift', 'UIKit', 'Core Data', 'Firebase'],
        images: [
        ],
        videos: [
          '/assets/pc/projects/to-do-list/to-do-list-app-dark.MP4',
          '/assets/pc/projects/to-do-list/to-do-list-app-light.MP4'
        ],
        embeds: [],
        links: []
      }
    },
    {
      id: 13,
      title: 'VR Gesture Recognition',
      caption: 'RealityLabs',
      thumbnailUrl: '/assets/pc/projects/vr-gesture-recognition/realitylabs-logo.jpeg',
      details: {
        description: "At the University of Waterloo, I'm part of a team at RealityLabs working on a universal hand gesture recognition system in Unity using Meta MDK Gesture. We're building a custom package to make gesture and gesture sequence recognition easier for developers through an intuitive UI. On the ML side, our team is refining PyTorch-based gesture detection models to improve accuracy for real-time interactions.",
        technologies: ['Unity', 'C#', 'PyTorch', 'Meta MD Gesture'],
        images: [],
        videos: [
          'assets/pc/projects/vr-gesture-recognition/vr-demo.MOV'
        ],
        embeds: [],
        links: [
          { name: 'Design Team Website', url: 'https://uwrealitylabs.com/' }
        ]
      }
    },
    // {
    //   id: 14,
    //   title: 'PCB Design',
    //   caption: 'Waterloo Aerial Robotics Group',
    //   thumbnailUrl: '',
    //   details: {
    //     description: "At the University of Waterloo, I'm part of the Waterloo Aerial Robotics Group (WARG), where I worked on designing schematics and PCBs for drone avionics using Altium Designer.",
    //     technologies: ['Altium', 'STM32', 'Embedded C'],
    //     images: [],
    //     videos: [],
    //     embeds: [],
    //     links: [
    //       { name: 'Design Team Website', url: '' }
    //     ]
    //   }
    // },
    // {
    //   id: 15,
    //   title: 'Parking Slot Detection',
    //   caption: 'Parking slot detection and mapping tool',
    //   thumbnailUrl: '',
    //   details: {
    //     description: "I'm developing an AI-powered smart parking system that uses transfer learning and bounding-box object detection in Python with TensorFlow and OpenCV to recognize parking spaces. Ongoing work includes backend integration for stall mapping, multi-camera fusion, Google Maps API, and Bluetooth-based underground lot positioning, and I'm currently in discussions with industry partners for potential deployment.",
    //     technologies: ['Python', 'OpenCV', 'TensorFlow'],
    //     images: [],
    //     videos: [],
    //     embeds: [],
    //     links: [
    //       { name: 'GitHub Repository', url: '' }
    //     ]
    //   }
    // },
    {
      id: 16,
      title: 'Robotic Mouse',
      caption: 'AI powered robotic mouse toy for cats',
      thumbnailUrl: '/assets/pc/projects/robotic-mouse/rendered-mouse-shell.jpeg',
      details: {
        description: "I'm developing an AI-powered robotic mouse cat toy using Raspberry Pi, computer vision, and reinforcement learning. The prototype includes a 3D-printed enclosure with a built-in treat dispenser, USB-C charging, and weighted internal mounts for stability.",
        technologies: ['Raspberry Pi', 'Python', 'OpenCV', 'Embedded Systems'],
        images: [
          '/assets/pc/projects/robotic-mouse/cross-section-diagram.jpg',
          '/assets/pc/projects/robotic-mouse/rendered-mouse-shell.jpeg'
        ],
        videos: [],
        embeds: [],
        links: []
      }
    },
    {
      id: 18,
      title: 'FoodiEco',
      caption: 'Recipe app for healthier and eco friendly meals',
      thumbnailUrl: '/assets/pc/projects/foodieco/foodieco-logo.png',
      details: {
        description: "My team and I developed FoodiEco, winner of Best Software Project in a hackathon, a Python and Tkinter app that helps users reduce food waste and make eco-friendly choices. It features a fridge tracker for inventory management, a recipe organizer, and a replacement page suggesting healthier, sustainable ingredient alternatives.",
        technologies: ['Python', 'BeautifulSoup', 'Selenium', 'PostgreSQL', 'Docker'],
        images: [
          '/assets/pc/projects/foodieco/landing.png',
          '/assets/pc/projects/foodieco/fridge.png',
          '/assets/pc/projects/foodieco/recipe.png',
          '/assets/pc/projects/foodieco/replacement.png',
          '/assets/pc/projects/foodieco/search.png',
          '/assets/pc/projects/foodieco/list.png'
        ],
        videos: [],
        embeds: [
          'https://youtu.be/d77sW5xHxH4'
        ],
        links: [
          { name: 'Devpost', url: 'https://devpost.com/software/foodieco' },
          { name: 'GitHub Repository', url: 'https://github.com/acrenw/FoodiEco' }
        ]
      }
    },
    {
      id: 19,
      title: 'Feed the Child',
      caption: '2D platformer game',
      thumbnailUrl: 'assets/pc/projects/feed-the-child/feed-the-child-logo.png',
      details: {
        description: 'Feed the Child is a 2D platformer game built using Python, Tkinter, and Pygame. It incorporates a sound and timer system, and the graphics drawn by me using Procreate and Adobe PS.',
        technologies: ['Python', 'Tkinter', 'Pygame', 'Procreate', 'Adobe PS'],
        images: [],
        videos: [],
        embeds: [
          'https://www.youtube.com/embed/l8PHyBPLN_E'
        ],
        links: []
      }
    },
    {
      id: 20,
      title: '3D Projects',
      caption: '3D OnShape projects and designs',
      thumbnailUrl: '/assets/pc/projects/3d-projects/a1.png',
      details: {
        description: 'A collection of my 3D projects in OnShape.',
        technologies: ['OnShape'],
        images: [
          '/assets/pc/projects/3d-projects/a1.png',
          '/assets/pc/projects/3d-projects/a2.png',
          '/assets/pc/projects/3d-projects/b1.png',
          '/assets/pc/projects/3d-projects/b2.png',
          '/assets/pc/projects/3d-projects/ballista1.png',
          '/assets/pc/projects/3d-projects/ballista2.png',
          '/assets/pc/projects/3d-projects/ballista_closeup1.png',
          '/assets/pc/projects/3d-projects/ballista_closeup2.png',
          '/assets/pc/projects/3d-projects/c.png',
          '/assets/pc/projects/3d-projects/d.png',
          '/assets/pc/projects/3d-projects/e.png',
          '/assets/pc/projects/3d-projects/f.png',
          '/assets/pc/projects/3d-projects/f_mechanical_drawing.png',
          '/assets/pc/projects/3d-projects/g.png',
          '/assets/pc/projects/3d-projects/g_mechanical_drawing.png',
          '/assets/pc/projects/3d-projects/h.png',
          '/assets/pc/projects/3d-projects/i.png',
          '/assets/pc/projects/3d-projects/j.png',
          '/assets/pc/projects/3d-projects/k.png',
          '/assets/pc/projects/3d-projects/l.png',
          '/assets/pc/projects/3d-projects/m.png',
          '/assets/pc/projects/3d-projects/mechanical_drawing.png'
        ],
        videos: [],
        embeds: [],
        links: []
      }
    },
    {
      id: 21,
      title: 'ClockHacks',
      caption: 'Hackathon Organizer',
      thumbnailUrl: '/assets/pc/projects/clockhacks/logo.png',
      details: {
        description: 'I organized ClockHacks, the largest MLH-certified high school hackathon of 2023 with ~360 attendees, securing over $10,000 in sponsorships through a package I designed. I led workshops, opening/closing ceremonies, and invited guest speakers, while also creating all visual media including the logo, swag, banners, and promotional materials. A unique highlight was the 3-hour organizer hacking event, where my team built and live-streamed a base-10 clock using React, Tailwind, and JavaScript.',
        technologies: ['JS', 'React', 'Tailwind', 'Netlify'],
        images: [
          '/assets/pc/projects/clockhacks/better_clock1.png',
          '/assets/pc/projects/clockhacks/better_clock2.png',
          '/assets/pc/projects/clockhacks/discord_call.jpg',
          '/assets/pc/projects/clockhacks/ig_post.png',
          '/assets/pc/projects/clockhacks/shirt.png',
          '/assets/pc/projects/clockhacks/shirt2.png',
          '/assets/pc/projects/clockhacks/shirt3.png',
          '/assets/pc/projects/clockhacks/shirt4.png',
          '/assets/pc/projects/clockhacks/sticker1.png',
          '/assets/pc/projects/clockhacks/sticker2.png',
          '/assets/pc/projects/clockhacks/sticker3.png',
          '/assets/pc/projects/clockhacks/working.jpg'
        ],
        videos: [
        ],
        embeds: [
          'https://youtu.be/Irh7pC81TMM'
        ],
        links: [
          { name: 'Hackathon Website', url: 'https://github.com/example-scraper' },
          { name: 'Organizer Project Website', url: 'https://better-clock.netlify.app/' },
          { name: 'Organizer Project Devpost', url: 'https://devpost.com/software/better-clock' },
          { name: 'Organizer Project GitHub', url: 'https://github.com/ClockHacks/organizer-project' },
          { name: 'Organizer Project Strea', url: 'https://twitch.tv/clockhacks' },
        ]
      }
    },
    {
      id: 22,
      title: 'Data Colonialism Research Paper',
      caption: 'Data colonialism research paper pertaining to Meta',
      thumbnailUrl: '/assets/pc/projects/data-colonialism-research-paper/infographic.png',
      details: {
        description: "This research paper examines the issue of data colonialism as it pertains to Meta, with a specific focus on its environmental implications. Meta's history of data exploitation, exemplified by controversies like the Cambridge Analytica scandal and WhatsApp data sharing, underscores the pervasive societal impact of unethical data practices. Violations of user privacy not only threaten a fundamental human right but also amplify biases against marginalized groups and contribute to environmental harm through unsustainable technological development.",
        technologies: ['IEEE Xplore', 'Google Scholar', 'Microsoft Word'],
        images: [
          '/assets/pc/projects/data-colonialism-research-paper/infographic.png'
        ],
        videos: [
        ],
        embeds: [
          '/assets/pc/projects/data-colonialism-research-paper/data_colonialism.pdf'
        ],
        links: []
      }
    }
  ];

  constructor(private router: Router, private gameStateService: GameStateService, private sanitizer: DomSanitizer) {}
  
  ngOnInit() {
    this.internships.sort((a, b) => a.id - b.id);
    this.projects.sort((a, b) => a.id - b.id);
  }

  safeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getEmbedUrl(url: string): SafeResourceUrl {
    if (!url) {
      return this.safeUrl('');
    }
    let embed = url;
    // Normalize common YouTube URL formats to embed
    try {
      const u = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
      const host = u.hostname.replace('www.', '');
      if (host.endsWith('youtube.com')) {
        // watch?v=, shorts/, /live/
        const vid = u.searchParams.get('v');
        if (vid) {
          embed = `https://www.youtube.com/embed/${vid}`;
        } else if (u.pathname.startsWith('/shorts/')) {
          embed = `https://www.youtube.com/embed/${u.pathname.split('/')[2]}`;
        } else if (u.pathname.startsWith('/live/')) {
          embed = `https://www.youtube.com/embed/${u.pathname.split('/')[2]}`;
        } else if (u.pathname.startsWith('/embed/')) {
          embed = u.href;
        }
      } else if (host === 'youtu.be') {
        const id = u.pathname.replace('/', '');
        if (id) embed = `https://www.youtube.com/embed/${id}`;
      }
      const hasQuery = embed.includes('?');
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const params = `rel=0&modestbranding=1&playsinline=1&enablejsapi=1${origin ? `&origin=${encodeURIComponent(origin)}` : ''}`;
      embed = `${embed}${hasQuery ? '&' : '?'}${params}`;
    } catch {
      // Fallback: still try to trust original URL
    }
    return this.safeUrl(embed);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key.toLowerCase() === 'x') {
      this.router.navigate(['/']);
    }
  }

  goBack() {
    // save state before navigating back
    this.gameStateService.setShowPopup(false);
    this.router.navigate(['/']);
  }

  setActiveTab(tab: 'internships' | 'projects') {
    this.activeTab = tab;
  }

  openProjectModal(project: Project) {
    this.selectedProject = project;
    this.showProjectModal = true;
  }

  closeProjectModal() {
    this.showProjectModal = false;
    this.selectedProject = null;
  }

  openInternshipModal(internship: Internship) {
    this.selectedInternship = internship;
    this.showInternshipModal = true;
  }

  closeInternshipModal() {
    this.showInternshipModal = false;
    this.selectedInternship = null;
  }
}
