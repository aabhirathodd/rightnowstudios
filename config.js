/* ==========================================================================
   RIGHTNOWSTUDIOS - EASY SITE CONFIGURATION
   ==========================================================================
   Instructions for Abhishek:
   - You don't need to know any coding to edit this file!
   - Simply change the text inside quotes "" to update your website content.
   ========================================================================== */

const SITE_CONFIG = {
  // Top Navigation Bar Branding
  brandName: "Abhishek Rathod | RIGHTNOWSTUDIOS",

  // Site Background configuration
  backgroundImage: "assets/background-grid.svg",

  // Custom Notched Dial Knob Settings (Top Right Menu)
  // Inspired by liftoffchallenge.hypr-space.com
  knobMenu: {
    size: 44,                      // Compact size in pixels
    color: "#1c1c1c",              // Matte dark charcoal center (from reference)
    outerRingColor: "#cccccc",     // Silver/grey outer bevel border (from reference)
    indicatorColor: "#ff3b30",     // Red-orange indicator notch (from reference)
    textColor: "#a0a0a0",          // Subtle label text color
    text: "HOME",                  // Text written on knob
    textPosition: "bottom",      // Position: "top", "bottom", "left", "right"
    rotationDegrees: 90            // How many degrees it turns when clicked/scrolled (e.g. 45, 90, 180)
  },

  // Hero Section Header Text & Rolling Text Animation (Louie.pro style)
  hero: {
    greeting: "Hi I'm",
    accentName: "Abhi.",  // Signature highlight color word
    introStaticText: "I love to",
    
    // Multiple words that will roll up vertically one-by-one
    introRollingWords: [
      "sketch.",
      "prototype.",
      "sew.",
      "build.",
      "design."
    ],
    
    introSuffixText: " ",
    
    // Animation Speed settings (in milliseconds)
    rollSpeed: 2000,              // Duration each word is shown (2000 = 2 seconds)
    transitionDuration: 800,      // Speed of the roll-up animation (800 = 0.8 seconds)
    
    resumeUrl: "assets/Abhishek_Rathod_Resume.pdf",
    contactEmail: "abhishekrathoddesign@gmail.com",
    letsTalkText: "Let's talk"
  },

  // Built by Hands Section (Inspired by sushantvohra.com "World Building")
  builtByHands: {
    title: "Built by hands",
    text: "I don't separate the engineer in me from the designer in me — one shows me how something gets made, the other shows me why it matters once it's out in the world. I believe the people who build a product deserve as much thought as the people who use it. So that's how I design: for the hands that make it, and the hands that hold it."
  },

  // Projects Bento Grid (Masonry style, with image click slider)
  // Define 3-4 images for every card to cycle through on click.
  // behanceUrl is the direct link to the case study (no popup alert).
  projects: [
    {
      id: "hero-project",
      isHero: true,
      title: "MotionMate",
      category: "Industrial Design",
      year: "2026",
      images: [
        "assets/hero_project.jpg",
        "assets/1000202179.jpg",
        "assets/JPG 2K (3).jpg"
      ],
      behanceUrl: "https://www.behance.net/gallery/252193163/MotionMate-A-Child-mobility-aid"
    },
    {
      id: "project-1",
      isHero: false,
      title: "ResQ-Link",
      category: "Industrial Design/Medical",
      year: "2025",
      images: [
        "assets/project_1.jpg",
        "assets/260508-163412-change_the_background_dont_make_it_just_chaotic._k.png",
        "assets/JPG 2K.jpg"
      ],
      behanceUrl: "https://www.behance.net/gallery/249817725/ResQ-Link-A-tactile-Defibrillator"
    },
    {
      id: "project-2",
      isHero: false,
      title: "Unified",
      category: "Softgoods",
      year: "2025",
      images: [
        "assets/project_2.jpg",
        "assets/JPG 2K (2).jpg",
        "assets/unified.jpg"
      ],
      behanceUrl: "https://www.behance.net/gallery/250424045/Unified-A-study-of-softgoods-construction"
    },
    {
      id: "project-3",
      isHero: false,
      title: "Aero",
      category: "Ergonomics",
      year: "2025",
      images: [
        "assets/project_3.jpg",
        "assets/PNG 8K2.png",
        "assets/PNG 8K1.png"
      ],
      behanceUrl: "https://www.behance.net/gallery/251244789/AERO-An-Ergonomic-Pizza-Cutter"
    },
    {
      id: "project-4",
      isHero: false,
      title: "ClearShot",
      category: "Visualization & 3D Print",
      year: "2026",
      images: [
        "assets/project_4.png",
        "assets/RENDER8.png",
        "assets/RENDER7.png"
      ],
      behanceUrl: "https://www.behance.net/gallery/234042041/2025-PORTFOLIO"
    }
  ],

  // Interactive Accordion Services Section (Dropdowns like sushantvohra.com)
  services: [
    {
      id: "industrial-design",
      title: "INDUSTRIAL DESIGN",
      items: [
        "Concept Generation",
        "CAD",
        "Design Development",
        "CMF Development",
        "Appearance Models",
        "Design For Manufacture"
      ]
    },
    {
      id: "visualization",
      title: "VISUALIZATION",
      items: [
        "3D Rendering",
        "Animation",
        "Video Editing",
        "Video Shooting",
        "Product Video Shoot"
      ]
    }
  ],

  // Dark Footer Section (Locked in with your social URLs)
  footer: {
    quote: "Abhi means 'right now'\nThe name is a nod to begin.",
    studioTitle: "RIGHTNOWSTUDIOS",
    copyright: "© 2026 Abhishek Rathod Industrial Designer",
    socials: [
      { name: "LinkedIn", url: "https://www.linkedin.com/in/aabhirathodd/", icon: "linkedin" },
      { name: "Email", url: "mailto:abhishekrathoddesign@gmail.com", icon: "email" },
      { name: "Instagram", url: "https://www.instagram.com/aabhishekdesignn/?hl=en", icon: "instagram" },
      { name: "Behance", url: "https://www.behance.net/abhishekrathod15", icon: "behance" }
    ]
  }
};
