// AI Chatbot with RAG (Retrieval-Augmented Generation)
// This chatbot uses a knowledge base to provide intelligent responses about Abraham's portfolio

class AIChatbot {
  constructor() {
    this.messages = [];
    this.isTyping = false;
    this.init();
  }

  init() {
    // Load knowledge base
    if (typeof knowledgeBase !== 'undefined' && typeof generateResponse !== 'undefined') {
      console.log('AI Chatbot initialized with knowledge base');
    } else {
      console.warn('Knowledge base functions not loaded yet, will retry...');
      // Retry after a short delay
      setTimeout(() => {
        if (typeof knowledgeBase !== 'undefined' && typeof generateResponse !== 'undefined') {
          console.log('AI Chatbot initialized with knowledge base (retry)');
        } else {
          console.error('Knowledge base still not loaded after retry');
        }
      }, 500);
    }
  }

  // Add user message to chat
  addUserMessage(text) {
    const message = {
      type: 'user',
      text: text,
      timestamp: new Date()
    };
    this.messages.push(message);
    return message;
  }

  // Add bot response to chat
  addBotMessage(text) {
    const message = {
      type: 'bot',
      text: text,
      timestamp: new Date()
    };
    this.messages.push(message);
    return message;
  }

  // Generate response using RAG
  async generateResponse(userQuery) {
    // Show typing indicator
    this.isTyping = true;
    
    // Simulate processing delay for natural feel
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));
    
    let response;
    
    try {
      // Use the knowledge base to generate response
      if (typeof generateResponse === 'function') {
        response = generateResponse(userQuery);
      } else {
        // Fallback if knowledge base not available
        response = this.getFallbackResponse(userQuery);
      }
    } catch (error) {
      console.error('Error generating response:', error);
      response = "I'm having trouble processing that right now. Please try again or contact Abraham directly at abrahamgebreyohannes12@gmail.com";
    }
    
    this.isTyping = false;
    return response;
  }

  // Fallback responses when knowledge base is unavailable
  getFallbackResponse(query) {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey')) {
      return "Hello! I'm Abraham's AI assistant. I can help you learn about his projects, skills, and services. What would you like to know?";
    }
    
    if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('hire')) {
      return "You can contact Abraham at abrahamgebreyohannes12@gmail.com or call +251 949 470 429. He's also available on Telegram at @a123abrsh";
    }
    
    if (lowerQuery.includes('project')) {
      return "Abraham has worked on various projects including healthcare platforms, restaurant systems, hotel websites, and business management systems. Check out the Projects section for details!";
    }
    
    if (lowerQuery.includes('skill') || lowerQuery.includes('technology')) {
      return "Abraham specializes in Laravel, PHP, MySQL, JavaScript, and modern web technologies. He builds full-stack applications with responsive designs.";
    }
    
    return "I'd be happy to help you learn more about Abraham's work. You can ask about his projects, skills, services, or how to contact him.";
  }

  // Get conversation history
  getConversationHistory() {
    return this.messages;
  }

  // Clear conversation
  clearConversation() {
    this.messages = [];
  }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Check if chatbot should be enabled
  const chatbotEnabled = true;
  
  if (chatbotEnabled) {
    window.aiChatbot = new AIChatbot();
    
    // Add AI chat toggle button to the page
    addAIChatToggle();
  }
});

// Add AI Chat toggle button to the page
function addAIChatToggle() {
  const toggleButton = document.createElement('button');
  toggleButton.id = 'aiChatToggle';
  toggleButton.className = 'ai-chat-toggle';
  toggleButton.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
    </svg>
    <span>AI Assistant</span>
  `;
  toggleButton.setAttribute('aria-label', 'Toggle AI Chat Assistant');
  
  document.body.appendChild(toggleButton);
  
  // Add click handler
  toggleButton.addEventListener('click', toggleAIChat);
  
  // Create AI chat window
  createAIChatWindow();
}

// Create AI Chat window
function createAIChatWindow() {
  const chatWindow = document.createElement('div');
  chatWindow.id = 'aiChatWindow';
  chatWindow.className = 'ai-chat-window';
  chatWindow.innerHTML = `
    <div class="ai-chat-header">
      <div class="ai-chat-avatar">
        <span class="ai-avatar-icon">🤖</span>
      </div>
      <div class="ai-chat-info">
        <h3>Abraham's AI Assistant</h3>
        <span class="ai-chat-status">Online · Powered by RAG</span>
      </div>
      <button class="ai-chat-close" aria-label="Close chat">&times;</button>
    </div>
    <div class="ai-chat-messages" id="aiChatMessages">
      <div class="ai-message ai-message-bot">
        <div class="ai-message-content">
          <p>👋 Hi! I'm Abraham's AI assistant. I can help you learn about his projects, skills, and services. What would you like to know?</p>
        </div>
        <span class="ai-message-time">Just now</span>
      </div>
    </div>
    <div class="ai-chat-input-area">
      <div class="ai-quick-questions">
        <button class="ai-quick-btn" data-question="What projects has Abraham worked on?">Projects</button>
        <button class="ai-quick-btn" data-question="What are Abraham's skills?">Skills</button>
        <button class="ai-quick-btn" data-question="How can I contact Abraham?">Contact</button>
      </div>
      <form id="aiChatForm" class="ai-chat-form">
        <input 
          type="text" 
          id="aiChatInput" 
          placeholder="Ask about Abraham's work..." 
          autocomplete="off"
          aria-label="Type your message"
        />
        <button type="submit" class="ai-send-btn" aria-label="Send message">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
          </svg>
        </button>
      </form>
    </div>
  `;
  
  document.body.appendChild(chatWindow);
  
  // Add event listeners
  const closeBtn = chatWindow.querySelector('.ai-chat-close');
  closeBtn.addEventListener('click', toggleAIChat);
  
  const form = chatWindow.querySelector('#aiChatForm');
  form.addEventListener('submit', handleAIChatSubmit);
  
  const quickBtns = chatWindow.querySelectorAll('.ai-quick-btn');
  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const question = btn.getAttribute('data-question');
      document.getElementById('aiChatInput').value = question;
      handleAIChatSubmit(new Event('submit'));
    });
  });
}

// Toggle AI Chat window
function toggleAIChat() {
  const chatWindow = document.getElementById('aiChatWindow');
  const toggleBtn = document.getElementById('aiChatToggle');
  
  if (chatWindow) {
    chatWindow.classList.toggle('ai-chat-open');
    toggleBtn.classList.toggle('ai-chat-active');
    
    if (chatWindow.classList.contains('ai-chat-open')) {
      document.getElementById('aiChatInput').focus();
    }
  }
}

// Handle AI Chat form submission
async function handleAIChatSubmit(e) {
  e.preventDefault();
  
  const input = document.getElementById('aiChatInput');
  const message = input.value.trim();
  
  if (!message) return;
  
  // Add user message to chat
  addAIMessage(message, 'user');
  input.value = '';
  
  // Generate and add bot response
  const messagesContainer = document.getElementById('aiChatMessages');
  
  // Add typing indicator
  const typingIndicator = document.createElement('div');
  typingIndicator.className = 'ai-message ai-message-bot ai-typing';
  typingIndicator.innerHTML = `
    <div class="ai-message-content">
      <div class="ai-typing-dots">
        <span></span><span></span><span></span>
      </div>
    </div>
  `;
  messagesContainer.appendChild(typingIndicator);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  // Generate response
  let response;
  if (window.aiChatbot) {
    response = await window.aiChatbot.generateResponse(message);
  } else {
    response = "I'm initializing. Please try again in a moment.";
  }
  
  // Remove typing indicator and add response
  messagesContainer.removeChild(typingIndicator);
  addAIMessage(response, 'bot');
}

// Add message to AI chat
function addAIMessage(text, type) {
  const messagesContainer = document.getElementById('aiChatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `ai-message ai-message-${type}`;
  
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  messageDiv.innerHTML = `
    <div class="ai-message-content">
      <p>${text}</p>
    </div>
    <span class="ai-message-time">${time}</span>
  `;
  
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
