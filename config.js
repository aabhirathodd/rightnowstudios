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

  // Custom Notched Dial Knob Settings (Top Right Menu)
  // Inspired by liftoffchallenge.hypr-space.com
  knobMenu: {
    size: 44,                      // Compact size in pixels
    color: "#1c1c1c",              // Matte dark charcoal center (from reference)
    outerRingColor: "#cccccc",     // Silver/grey outer bevel border (from reference)
    indicatorColor: "#ff3b30",     // Red-orange indicator notch (from reference)
    textColor: "#a0a0a0",          // Subtle label text color
    text: "HOME",                  // Text written on knob
    textPosition: "top",           // Position: "top", "bottom", "left", "right"
    rotationDegrees: 180            // How many degrees it turns when clicked/scrolled (e.g. 45, 90, 180)
  },

  // Hero Section Header Text & Rolling Text Animation (Louie.pro style)
  hero: {
    greeting: "Hi I'm",
    accentName: "Abhi.",  // Signature highlight color word
    introStaticText: "I design for the people who live with the product, and the",
    
    // Multiple words that will roll up vertically one-by-one
    introRollingWords: [
      "Engineers",
      "Assemblers",
      "Technicians",
      "Heros",
    ],    
    // Animation Speed settings (in milliseconds)
    rollSpeed: 2000,              // Duration each word is shown (2000 = 2 seconds)
    transitionDuration: 800,      // Speed of the roll-up animation (800 = 0.8 seconds)
    
    resumeUrl: "assets/resume.pdf",
    contactEmail: "abhishekrathoddesign@gmail.com", // Your Gmail address locked in
    letsTalkText: "Let's talk"
  },

  // Built by Hands Section (Inspired by sushantvohra.com "World Building")
  builtByHands: {
    title: "Built by hands",
    text: "I don't separate the engineer in me from the designer in me — one shows me how something gets made, the other shows me why it matters once it's out in the world. I believe the people who build a product deserve as much thought as the people who use it. So that's how I design: for the hands that make it, and the hands that hold it."
  },

  // Projects Bento Grid (Matches your Figma 5-card layout)
  projects: [
    {
      id: "hero-project",
      isHero: true,
      title: "MotionMate",
      category: "A Mobility Aid",
      year: "2026",
      image: "assets/hero_project.jpg",
      description: "A collaboration project with Eastrseals."
    },
    {
      id: "project-1",
      isHero: false,
      title: "ResQ-Link",
      category: "Consumer/Medical Device",
      year: "2025",
      image: "assets/project_1.jpg",
      description: "A Compact Wearable Tactile Defibrillator."
    },
    {
      id: "project-2",
      isHero: false,
      title: "Unified",
      category: "A softgood Project",
      year: "2025",
      image: "assets/project_2.png",
      description: "A backpack designed to minimize the manufacturing cost."
    },
    {
      id: "project-3",
      isHero: false,
      title: "Aero",
      category: "Ergonomic Pizza Cutter",
      year: "2025",
      image: "assets/project_3.jpg",
      description: "Redesign of of conventional pizza cutter."
    },
    {
      id: "project-4",
      isHero: false,
      title: "ClearShot",
      category: "Consumer Product",
      year: "2026",
      image: "assets/project_4.png",
      description: "A 3D printed NERFGUN."
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
    quote: "Abhi means 'right now'\nThe name is a nod to beging",
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
