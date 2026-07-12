// Knowledge Base for RAG-based AI Chatbot
// This contains structured information about Abraham's portfolio, skills, and projects

const knowledgeBase = [
  {
    id: 1,
    category: "about",
    content: "Abraham Gebreyohannes is a dedicated full-stack web developer with hands-on experience building production web applications, business websites, and custom systems. He specializes in Laravel, PHP, MySQL, and modern JavaScript, building secure, scalable web applications for healthcare, hospitality, retail, and business sectors. He writes clean, maintainable code and delivers high-performance digital solutions that solve real business problems.",
    keywords: ["abraham", "developer", "full-stack", "laravel", "php", "mysql", "javascript", "about", "bio", "background"]
  },
  {
    id: 2,
    category: "skills",
    content: "Abraham's technical skills include Backend: Laravel, PHP, MySQL, REST APIs, MVC architecture, database design, authentication systems. Frontend: JavaScript, HTML5, CSS3, Tailwind CSS, Bootstrap, responsive design, modern UI/UX. Tools & Integrations: Git & GitHub, payment integration, multilingual websites (English, Amharic, Afaan Oromo), QR code systems, booking systems, API development. He has 8+ live projects and serves 5 different industries.",
    keywords: ["skills", "technologies", "laravel", "php", "mysql", "javascript", "css", "html", "git", "api", "frontend", "backend", "tools"]
  },
  {
    id: 3,
    category: "services",
    content: "Abraham offers comprehensive web development services: 1) Full-Stack Web Applications - Custom Laravel applications with secure backends, REST APIs, admin panels, and production-ready deployments using MVC architecture and database design. 2) Business Websites - Modern, responsive websites for clinics, hotels, restaurants, and retail businesses with multilingual support, SEO-friendly structure, and mobile-first UI. 3) Feature Integrations - Booking systems, QR menus, payment gateways, appointment systems, and contact workflows integrated into existing stacks.",
    keywords: ["services", "offer", "web development", "business websites", "payment", "qr", "booking", "integration", "hire", "freelance"]
  },
  {
    id: 4,
    category: "projects",
    content: "Dr. Debele Tola Medical Clinic (Featured Project) - A professional healthcare platform with appointment booking, multilingual support in English, Amharic, and Afaan Oromo, and modern responsive design. Built with Laravel, this platform improves patient experience and accessibility at scale. Live site: https://drdebeleclinic.com",
    keywords: ["clinic", "healthcare", "medical", "appointment", "multilingual", "debele", "featured", "doctor"]
  },
  {
    id: 5,
    category: "projects",
    content: "QR-Based Restaurant Menu - A QR code-powered digital menu system for restaurants and cafes. Customers can browse menus on their phones, improving hygiene, speed, and user experience. This system is particularly valuable for modern dining establishments. Source: https://github.com/abraham952/QR-menu",
    keywords: ["qr", "menu", "restaurant", "digital", "hygiene", "dining", "cafe"]
  },
  {
    id: 6,
    category: "projects",
    content: "Farmi Restaurant Website - A modern restaurant website showcasing menu items, services, and contact information. Designed to attract customers and strengthen online presence with responsive design and business-focused UI/UX. Source: https://github.com/abraham952/Farmi_-web",
    keywords: ["farmi", "restaurant", "website", "menu", "business"]
  },
  {
    id: 7,
    category: "projects",
    content: "Fira Hotel Website - A professional hotel website with room listings, services, contact forms, and clean UI. Helps guests easily explore and book accommodations. Built with hospitality best practices and user-centered design. Live site: https://firahotel.com.et/",
    keywords: ["fira", "hotel", "accommodation", "booking", "hospitality", "rooms"]
  },
  {
    id: 8,
    category: "projects",
    content: "Supermarket Management System - A comprehensive full-stack supermarket management system with inventory tracking, sales management, and reporting features. This business system streamlines retail operations and improves efficiency. Built for modern retail businesses. Live site: https://supermarket-management-sys.vercel.app Source: https://github.com/abraham952/Super-market-system",
    keywords: ["supermarket", "inventory", "sales", "retail", "management", "system", "business"]
  },
  {
    id: 9,
    category: "projects",
    content: "Leo's Oil - A modern business website for Leo's Oil company showcasing products, services, and company information. Designed to enhance brand presence and customer engagement with professional business website features. Live site: https://leos-oil.vercel.app/ Source: https://github.com/abraham952/leos-oil",
    keywords: ["leo's oil", "oil", "business", "products", "services", "company"]
  },
  {
    id: 10,
    category: "experience",
    content: "Abraham has been a freelance full-stack web developer since 2024, working remotely with healthcare, hospitality, restaurant, retail, and business clients. He takes projects from concept to production, delivering complete solutions. His work spans multiple industries, integrating appointment booking, multilingual support, online payments, and QR-based systems into polished, responsive experiences.",
    keywords: ["experience", "freelance", "remote", "work", "2024", "background", "career"]
  },
  {
    id: 11,
    category: "experience",
    content: "STEM Power Training - Abraham completed intensive training at STEM Power, participating in national-level STEM competitions. This program sharpened his analytical thinking, teamwork, innovation, and engineering mindset. The training covered problem-solving and engineering principles that apply to his development work.",
    keywords: ["stem", "training", "engineering", "competition", "education", "academic"]
  },
  {
    id: 12,
    category: "experience",
    content: "Academic Recognition - Abraham was recognized for outstanding student performance, discipline, leadership qualities, and positive contributions to school and extracurricular activities. This recognition highlights his dedication, industrious performance, and leadership potential.",
    keywords: ["academic", "student", "leadership", "recognition", "school", "education"]
  },
  {
    id: 13,
    category: "contact",
    content: "Abraham is available for remote work worldwide. Contact methods: Email - abrahamgebreyohannes12@gmail.com, Phone - +251 949 470 429, Telegram - @a123abrsh, GitHub - https://github.com/abraham952. He usually replies within 24 hours and is open for freelance work, remote roles, and project collaborations.",
    keywords: ["contact", "email", "phone", "telegram", "github", "hire", "remote", "reach", "communication"]
  },
  {
    id: 14,
    category: "location",
    content: "Abraham is based in Ethiopia and is available for remote work worldwide. He collaborates with international teams and is experienced in async communication and Git workflows for remote collaboration.",
    keywords: ["location", "ethiopia", "remote", "worldwide", "country", "based"]
  },
  {
    id: 15,
    category: "portfolio",
    content: "Abraham's portfolio showcases 8+ live projects across 5 industries: healthcare, hospitality, restaurants, retail, and business. His work demonstrates expertise in full-stack development, multilingual support, payment integration, QR systems, and booking platforms. The portfolio features real-world projects designed and developed end-to-end, from healthcare platforms to business management systems.",
    keywords: ["portfolio", "projects", "work", "showcase", "demonstrate", "expertise"]
  },
  {
    id: 16,
    category: "testimonials",
    content: "Client testimonials highlight Abraham's professionalism and quality: Healthcare Client praised the professional clinic website with multilingual support and booking. Restaurant Owner noted the QR menu system improved service speed and customer experience with clean design. Business Client commended responsive, modern work built with attention to detail, clear communication, and on-time delivery.",
    keywords: ["testimonials", "reviews", "clients", "feedback", "satisfaction", "quality"]
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
