// Knowledge Base for RAG-based AI Chatbot
// This contains structured information about Abraham's portfolio, skills, and projects

const knowledgeBase = [
  {
    id: 1,
    category: "about",
    content: "Abraham Gebreyohannes is a full-stack web developer specializing in Laravel, PHP, MySQL, and modern JavaScript. He builds secure, scalable web applications for healthcare, hospitality, and business sectors.",
    keywords: ["abraham", "developer", "full-stack", "laravel", "php", "mysql", "javascript"]
  },
  {
    id: 2,
    category: "skills",
    content: "Abraham's technical skills include Laravel, PHP, MySQL, REST APIs, MVC architecture, JavaScript, HTML5, CSS3, Tailwind CSS, Bootstrap, responsive design, Git, payment integration, multilingual sites, QR systems, and booking systems.",
    keywords: ["skills", "technologies", "laravel", "php", "mysql", "javascript", "css", "html", "git", "api"]
  },
  {
    id: 3,
    category: "services",
    content: "Abraham offers full-stack web application development, business websites for clinics, hotels, and restaurants, and feature integrations including payment systems, QR menus, and appointment booking systems.",
    keywords: ["services", "offer", "web development", "business websites", "payment", "qr", "booking"]
  },
  {
    id: 4,
    category: "projects",
    content: "Dr. Debele Tola Medical Clinic - A professional healthcare platform with appointment booking and multilingual support in English, Amharic, and Afaan Oromo. Built with Laravel.",
    keywords: ["clinic", "healthcare", "medical", "appointment", "multilingual", "debele"]
  },
  {
    id: 5,
    category: "projects",
    content: "QR-Based Restaurant Menu - A QR code-powered digital menu system for restaurants and cafes that improves hygiene, speed, and customer experience.",
    keywords: ["qr", "menu", "restaurant", "digital", "hygiene"]
  },
  {
    id: 6,
    category: "projects",
    content: "Farmi Restaurant Website - A modern restaurant website showcasing menu items, services, and contact information to attract customers.",
    keywords: ["farmi", "restaurant", "website", "menu"]
  },
  {
    id: 7,
    category: "projects",
    content: "Fira Hotel Website - A professional hotel website with room listings, services, contact forms, and clean UI for guest accommodation booking.",
    keywords: ["fira", "hotel", "accommodation", "booking", "hospitality"]
  },
  {
    id: 8,
    category: "projects",
    content: "Supermarket Management System - A comprehensive supermarket management system with inventory tracking, sales management, and reporting features to streamline retail operations.",
    keywords: ["supermarket", "inventory", "sales", "retail", "management", "system"]
  },
  {
    id: 9,
    category: "projects",
    content: "Leo's Oil - A modern business website for Leo's Oil company showcasing products, services, and company information to enhance brand presence.",
    keywords: ["leo's oil", "oil", "business", "products", "services"]
  },
  {
    id: 10,
    category: "experience",
    content: "Abraham is a freelance full-stack web developer since 2024, working remotely with healthcare, hospitality, and restaurant clients from concept to production.",
    keywords: ["experience", "freelance", "remote", "work", "2024"]
  },
  {
    id: 11,
    category: "experience",
    content: "Abraham completed intensive STEM Power training in engineering, participating in national-level STEM competitions that sharpened analytical thinking and teamwork skills.",
    keywords: ["stem", "training", "engineering", "competition", "education"]
  },
  {
    id: 12,
    category: "contact",
    content: "Abraham is available for remote work worldwide. Contact via email at abrahamgebreyohannes12@gmail.com, phone at +251 949 470 429, or Telegram at @a123abrsh. GitHub: github.com/abraham952",
    keywords: ["contact", "email", "phone", "telegram", "github", "hire", "remote"]
  },
  {
    id: 13,
    category: "location",
    content: "Abraham is based in Ethiopia and is available for remote work worldwide.",
    keywords: ["location", "ethiopia", "remote", "worldwide"]
  }
];

// Simple keyword matching function for RAG
function searchKnowledgeBase(query, maxResults = 3) {
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/).filter(word => word.length > 2);
  
  const scoredResults = knowledgeBase.map(item => {
    let score = 0;
    
    // Exact phrase match
    if (item.content.toLowerCase().includes(queryLower)) {
      score += 10;
    }
    
    // Keyword matching
    queryWords.forEach(word => {
      item.keywords.forEach(keyword => {
        if (keyword.toLowerCase().includes(word) || word.includes(keyword.toLowerCase())) {
          score += 3;
        }
      });
      
      if (item.content.toLowerCase().includes(word)) {
        score += 1;
      }
    });
    
    return { ...item, score };
  });
  
  // Sort by score and return top results
  return scoredResults
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
}

// Generate response based on search results
function generateResponse(query) {
  const results = searchKnowledgeBase(query);
  
  if (results.length === 0) {
    return "I couldn't find specific information about that in Abraham's portfolio. However, you can contact Abraham directly at abrahamgebreyohannes12@gmail.com for more details.";
  }
  
  // Combine the top results into a coherent response
  const response = results.map((result, index) => {
    return result.content;
  }).join(' ');
  
  return response;
}
