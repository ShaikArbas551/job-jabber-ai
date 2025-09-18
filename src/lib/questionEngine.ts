// Question database and AI evaluation engine for the interview simulator

export interface Question {
  id: string;
  question: string;
  expectedKeywords: string[];
  correctAnswer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  role: string;
  isPersonal?: boolean;
}

// Personal/General Questions (mandatory for all interviews)
const personalQuestions: Question[] = [
  {
    id: 'personal_1',
    question: 'Please introduce yourself and tell us about your background.',
    expectedKeywords: [], // Always marked as correct
    correctAnswer: 'This is a personal question where any response is considered correct as it varies for each individual.',
    difficulty: 'easy',
    role: 'general',
    isPersonal: true
  },
  {
    id: 'personal_2',
    question: 'What are your career goals and where do you see yourself in the next 5 years?',
    expectedKeywords: [], // Always marked as correct
    correctAnswer: 'This is a personal question where any response is considered correct as it varies for each individual.',
    difficulty: 'easy',
    role: 'general',
    isPersonal: true
  }
];

interface QuestionBank {
  [role: string]: {
    [difficulty: string]: string[];
  };
}

const questionBank: QuestionBank = {
  backend: {
    easy: [
      "What is the difference between HTTP and HTTPS?",
      "Explain what REST API means and its basic principles.",
      "What is a database and why do we use it?",
      "What does CRUD stand for in database operations?",
      "Explain the difference between GET and POST HTTP methods.",
      "What is JSON and why is it commonly used in APIs?",
      "What is the purpose of a web server?",
      "Explain what SQL stands for and its basic purpose.",
      "What is the difference between a relational and non-relational database?",
      "What does API stand for and what is its purpose?"
    ],
    medium: [
      "Explain the concept of database indexing and its benefits.",
      "What are the different types of joins in SQL? Explain each.",
      "How do you handle authentication and authorization in web applications?",
      "Explain the difference between synchronous and asynchronous programming.",
      "What is middleware and how is it used in web frameworks?",
      "Describe the MVC (Model-View-Controller) architecture pattern.",
      "What are the advantages and disadvantages of microservices architecture?",
      "Explain database normalization and why it's important.",
      "How do you handle error handling and logging in backend applications?",
      "What is caching and how can it improve application performance?"
    ],
    hard: [
      "Design a scalable system for handling millions of concurrent users.",
      "Explain how you would implement distributed transactions across multiple services.",
      "How would you design a database schema for a social media platform?",
      "Describe strategies for handling database migration in production systems.",
      "How would you implement real-time messaging between multiple users?",
      "Explain various load balancing algorithms and when to use each.",
      "How would you handle eventual consistency in a distributed system?",
      "Design a fault-tolerant system that can handle server failures gracefully.",
      "Explain how you would implement a rate limiting system for an API.",
      "How would you design a system to process millions of events per second?"
    ]
  },
  frontend: {
    easy: [
      "What is the difference between let, const, and var in JavaScript?",
      "Explain what CSS Box Model is.",
      "What is the DOM and how do you manipulate it?",
      "What are the differences between HTML, CSS, and JavaScript?",
      "How do you center a div horizontally and vertically?",
      "What is responsive design and why is it important?",
      "Explain the difference between inline and block elements.",
      "What are CSS selectors and name a few types?",
      "How do you include JavaScript in an HTML page?",
      "What is the purpose of alt attribute in img tags?"
    ],
    medium: [
      "Explain the concept of closures in JavaScript with an example.",
      "What is the difference between == and === in JavaScript?",
      "How do you handle asynchronous operations in JavaScript?",
      "What are React Hooks and why are they useful?",
      "Explain the difference between CSS Grid and Flexbox.",
      "What is the Virtual DOM and how does it work?",
      "How do you optimize website performance?",
      "What are the different ways to style React components?",
      "Explain event bubbling and event capturing in JavaScript.",
      "What is the difference between localStorage and sessionStorage?"
    ],
    hard: [
      "Implement a debounce function in JavaScript and explain when you would use it.",
      "Explain the concept of micro-frontends and their advantages.",
      "How would you implement server-side rendering with React?",
      "Design a system for managing state in a large React application.",
      "Explain how you would optimize a React application for better performance.",
      "What are Web Workers and when would you use them?",
      "How do you handle memory leaks in JavaScript applications?",
      "Explain the concept of tree shaking and how it works.",
      "Design a responsive layout system without using CSS frameworks.",
      "How would you implement real-time updates in a web application?"
    ]
  },
  fullstack: {
    easy: [
      "What is the difference between frontend and backend development?",
      "Explain what an API is and how it works.",
      "What is a database and what are the different types?",
      "What is HTTP and what are common HTTP methods?",
      "Explain the client-server architecture.",
      "What is JSON and why is it used in web development?",
      "What are the basic CRUD operations?",
      "Explain what a web server is and how it works.",
      "What is the difference between SQL and NoSQL databases?",
      "What is authentication and why is it important?"
    ],
    medium: [
      "Explain the MVC architecture pattern.",
      "What is REST and what makes an API RESTful?",
      "How do you handle user authentication and authorization?",
      "What are the differences between cookies, sessions, and tokens?",
      "Explain database normalization and its benefits.",
      "What is middleware and how is it used in web applications?",
      "How do you handle errors in a full-stack application?",
      "What is the difference between monolithic and microservices architecture?",
      "Explain how you would design a simple e-commerce database schema.",
      "What are the common security vulnerabilities in web applications?"
    ],
    hard: [
      "Design a scalable architecture for a social media platform.",
      "How would you implement real-time messaging in a chat application?",
      "Explain how you would handle database transactions in a complex system.",
      "Design a caching strategy for a high-traffic web application.",
      "How would you implement a rate limiting system?",
      "Explain the CAP theorem and its implications for distributed systems.",
      "Design a system for handling file uploads and processing.",
      "How would you implement a search functionality across multiple databases?",
      "Explain how you would design a system for handling millions of users.",
      "How would you implement a CI/CD pipeline for a full-stack application?"
    ]
  },
  datascientist: {
    easy: [
      "What is data science and what does a data scientist do?",
      "Explain the difference between supervised and unsupervised learning.",
      "What is the difference between classification and regression?",
      "What are the basic steps in a data science project?",
      "What is the difference between correlation and causation?",
      "Explain what a dataset is and what makes good data.",
      "What are some common data visualization techniques?",
      "What is the purpose of data cleaning?",
      "Explain what machine learning is in simple terms.",
      "What are some common statistical measures like mean, median, and mode?"
    ],
    medium: [
      "Explain the bias-variance tradeoff in machine learning.",
      "What is cross-validation and why is it important?",
      "How do you handle missing data in a dataset?",
      "What are the differences between decision trees and random forests?",
      "Explain the concept of feature engineering and its importance.",
      "What is overfitting and how can you prevent it?",
      "How do you evaluate the performance of a classification model?",
      "What is the difference between bagging and boosting?",
      "Explain what clustering is and name some clustering algorithms.",
      "How do you handle categorical variables in machine learning models?"
    ],
    hard: [
      "Design an end-to-end machine learning pipeline for predicting customer churn.",
      "How would you approach a time series forecasting problem?",
      "Explain how you would implement a recommendation system.",
      "How do you handle imbalanced datasets in classification problems?",
      "Design an A/B testing framework for measuring feature effectiveness.",
      "Explain how you would detect and handle outliers in large datasets.",
      "How would you implement a real-time fraud detection system?",
      "Design a system for monitoring and maintaining machine learning models in production.",
      "How would you approach natural language processing for sentiment analysis?",
      "Explain how you would design a deep learning model for image recognition."
    ]
  },
  devops: {
    easy: [
      "What is DevOps and why is it important?",
      "Explain what CI/CD means.",
      "What is version control and why do we use it?",
      "What is the difference between development and production environments?",
      "What is cloud computing and name some cloud providers?",
      "Explain what containerization is.",
      "What is automation and why is it important in DevOps?",
      "What is monitoring and why do we need it?",
      "Explain what infrastructure means in the context of software.",
      "What is the difference between horizontal and vertical scaling?"
    ],
    medium: [
      "Explain the concept of Infrastructure as Code (IaC).",
      "What is Docker and how does it work?",
      "How do you implement a CI/CD pipeline?",
      "What are the benefits of using containers over virtual machines?",
      "Explain what Kubernetes is and its main components.",
      "How do you handle secrets and sensitive data in DevOps?",
      "What is blue-green deployment and when would you use it?",
      "How do you implement monitoring and logging in a distributed system?",
      "What are the principles of microservices architecture?",
      "Explain how you would implement disaster recovery."
    ],
    hard: [
      "Design a complete CI/CD pipeline for a microservices architecture.",
      "How would you implement auto-scaling for a cloud-native application?",
      "Design a monitoring and alerting strategy for a complex distributed system.",
      "How would you implement security scanning in your DevOps pipeline?",
      "Design a multi-region deployment strategy with failover capabilities.",
      "How would you implement chaos engineering to test system resilience?",
      "Design a cost optimization strategy for cloud infrastructure.",
      "How would you implement a GitOps workflow for infrastructure management?",
      "Design a strategy for managing configuration across multiple environments.",
      "How would you implement zero-downtime deployments for a critical system?"
    ]
  },
  productmanager: {
    easy: [
      "What does a Product Manager do?",
      "Explain what a product roadmap is.",
      "What is the difference between features and benefits?",
      "How do you prioritize product features?",
      "What is user feedback and why is it important?",
      "Explain what market research is and why it matters.",
      "What is a minimum viable product (MVP)?",
      "How do you define success for a product?",
      "What is the product lifecycle?",
      "Explain what stakeholders are and how you work with them."
    ],
    medium: [
      "How do you conduct user research and what methods do you use?",
      "Explain how you would prioritize features using a framework.",
      "What is A/B testing and how do you use it in product management?",
      "How do you work with engineering teams to deliver products?",
      "What metrics do you use to measure product success?",
      "How do you handle conflicting requirements from different stakeholders?",
      "Explain the concept of product-market fit.",
      "How do you create and maintain a product backlog?",
      "What is user persona and how do you create one?",
      "How do you communicate product vision to different audiences?"
    ],
    hard: [
      "Design a go-to-market strategy for a new product launch.",
      "How would you enter a highly competitive market with a new product?",
      "Design a pricing strategy for a SaaS product.",
      "How would you pivot a product that's not meeting market expectations?",
      "Create a framework for measuring and improving user retention.",
      "How would you design a product for international expansion?",
      "Design a strategy for migrating users from a legacy product to a new one.",
      "How would you build and manage a product ecosystem?",
      "Design a framework for making data-driven product decisions.",
      "How would you handle a product crisis or major user complaints?"
    ]
  },
  uiux: {
    easy: [
      "What is the difference between UI and UX design?",
      "Explain what user-centered design means.",
      "What is a wireframe and why is it important?",
      "What are the basic principles of good design?",
      "How do you choose colors for a design?",
      "What is typography and why does it matter?",
      "Explain what accessibility means in design.",
      "What is a design system and why is it useful?",
      "How do you gather user feedback on designs?",
      "What tools do you use for UI/UX design?"
    ],
    medium: [
      "Explain your design process from research to final design.",
      "How do you conduct user research and what methods do you use?",
      "What is information architecture and how do you create it?",
      "How do you design for different screen sizes and devices?",
      "Explain the concept of design patterns and when to use them.",
      "How do you measure the success of your designs?",
      "What is prototyping and what are different types of prototypes?",
      "How do you collaborate with developers and other stakeholders?",
      "Explain how you would redesign a poorly performing user interface.",
      "How do you handle design critiques and feedback?"
    ],
    hard: [
      "Design a complete user experience for a complex enterprise application.",
      "How would you design an interface for users with disabilities?",
      "Create a design system that scales across multiple products.",
      "How would you approach designing for emerging technologies like VR/AR?",
      "Design a solution for a completely new type of user interaction.",
      "How would you conduct and present UX research to convince stakeholders?",
      "Design a strategy for improving user onboarding and retention.",
      "How would you design for international users with different cultural contexts?",
      "Create a framework for measuring and improving design quality.",
      "How would you lead a design team and establish design culture in an organization?"
    ]
  },
  mobile: {
    easy: [
      "What is mobile app development and what platforms exist?",
      "Explain the difference between native and hybrid app development.",
      "What is responsive design in the context of mobile apps?",
      "What are the main components of a mobile app?",
      "How do mobile apps differ from web applications?",
      "What is the app store approval process?",
      "Explain what mobile UI/UX considerations are important.",
      "What is the difference between iOS and Android development?",
      "How do you handle different screen sizes in mobile apps?",
      "What are push notifications and how do they work?"
    ],
    medium: [
      "How do you handle data storage in mobile applications?",
      "Explain the mobile app lifecycle and state management.",
      "How do you optimize mobile app performance?",
      "What are the security considerations for mobile apps?",
      "How do you handle offline functionality in mobile apps?",
      "Explain how to implement navigation in mobile apps.",
      "How do you test mobile applications?",
      "What are the different deployment strategies for mobile apps?",
      "How do you handle device permissions in mobile apps?",
      "Explain how to implement real-time features in mobile apps."
    ],
    hard: [
      "Design a scalable architecture for a social media mobile app.",
      "How would you implement real-time synchronization across devices?",
      "Design a strategy for handling app updates and backwards compatibility.",
      "How would you implement advanced features like AR or machine learning in mobile apps?",
      "Design a cross-platform development strategy for a complex app.",
      "How would you implement a robust offline-first mobile application?",
      "Design a mobile app architecture that supports millions of users.",
      "How would you implement advanced security measures for a banking mobile app?",
      "Design a strategy for optimizing mobile app performance across different devices.",
      "How would you implement a complex state management system for a large mobile app?"
    ]
  }
};

// Correct answers database
const correctAnswers: QuestionBank = {
  backend: {
    easy: [
      "HTTPS uses SSL/TLS encryption for secure data transmission, while HTTP sends data in plain text. HTTPS is essential for protecting sensitive information.",
      "REST (Representational State Transfer) is an architectural style for APIs using HTTP methods, stateless communication, and resource-based URLs.",
      "A database stores and organizes data efficiently. We use it for persistent data storage, data integrity, concurrent access, and complex queries.",
      "CRUD stands for Create, Read, Update, Delete - the four basic operations performed on database records.",
      "GET retrieves data without modifying server state (idempotent), POST sends data to create/modify resources (not idempotent).",
      "JSON (JavaScript Object Notation) is a lightweight data format. It's human-readable, language-independent, and perfect for API communication.",
      "A web server handles HTTP requests, serves static files, processes dynamic content, and manages multiple client connections.",
      "SQL (Structured Query Language) is used to communicate with relational databases for querying, updating, and managing data.",
      "Relational databases use structured tables with relationships (SQL), while non-relational databases use flexible schemas (NoSQL).",
      "API (Application Programming Interface) defines how applications communicate, enabling data exchange between different systems."
    ],
    medium: [
      "Database indexing creates data structures for faster queries. Benefits include improved query performance, reduced disk I/O, and faster data retrieval.",
      "SQL joins include INNER (matching records), LEFT (all left table records), RIGHT (all right table records), and FULL OUTER (all records from both tables).",
      "Authentication verifies user identity, authorization controls access. Use secure protocols, token-based systems, role-based access control, and session management.",
      "Synchronous code executes sequentially, blocking execution. Asynchronous code runs concurrently, allowing non-blocking operations and better performance.",
      "Middleware are functions that execute during request-response cycle. They handle authentication, logging, error handling, and request processing.",
      "MVC separates application logic: Model (data), View (presentation), Controller (business logic). It improves code organization and maintainability.",
      "Microservices offer scalability, technology diversity, fault isolation. Disadvantages include complexity, network overhead, and distributed system challenges.",
      "Database normalization reduces redundancy and improves data integrity by organizing data into logical tables with defined relationships.",
      "Implement try-catch blocks, centralized error handling, logging systems, monitoring tools, and proper error response codes.",
      "Caching stores frequently accessed data in memory. It reduces database load, improves response times, and enhances application performance."
    ],
    hard: [
      "Use load balancers, microservices architecture, horizontal scaling, distributed databases, CDNs, caching layers, and auto-scaling infrastructure.",
      "Use two-phase commit, saga pattern, event sourcing, or distributed transaction coordinators like Apache Kafka for eventual consistency.",
      "Design normalized tables for users, posts, relationships, comments. Use proper indexing, partitioning, and consider NoSQL for specific use cases.",
      "Plan migrations carefully, use version control, test in staging, implement rollback strategies, and minimize downtime with blue-green deployments.",
      "Implement WebSocket connections, message queues, real-time databases, event-driven architecture, and proper scaling strategies.",
      "Round-robin, least connections, weighted round-robin, IP hash, least response time. Choose based on application requirements and traffic patterns.",
      "Design for eventual consistency, use conflict resolution strategies, implement compensating transactions, and monitor data consistency across services.",
      "Implement redundancy, health checks, circuit breakers, auto-recovery, monitoring, backup systems, and graceful degradation strategies.",
      "Use algorithms like token bucket, sliding window, fixed window. Implement at API gateway level with Redis for distributed rate limiting.",
      "Use event streaming platforms like Kafka, implement parallel processing, use appropriate data stores, and design for horizontal scaling."
    ]
  },
  // ... (include all other role answers here for brevity, following the same pattern)
};

export function getQuestionsForInterview(role: string, difficulty: string, count: number): Question[] {
  // Always include personal questions at the beginning
  const personalQs = [...personalQuestions];
  
  // Get technical questions for the role
  const roleQuestions = questionBank[role];
  if (!roleQuestions) return personalQs;
  
  const difficultyQuestions = roleQuestions[difficulty];
  if (!difficultyQuestions) return personalQs;
  
  // Convert string questions to Question objects and shuffle
  const technicalQuestions: Question[] = difficultyQuestions
    .map((q, index) => ({
      id: `${role}_${difficulty}_${index}`,
      question: q,
      expectedKeywords: [],
      correctAnswer: correctAnswers[role]?.[difficulty]?.[index] || "This is a technical question that requires specific knowledge.",
      difficulty: difficulty as 'easy' | 'medium' | 'hard',
      role: role
    }))
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
  
  return [...personalQs, ...technicalQuestions];
}

export function evaluateAnswer(question: Question, userAnswer: string): { isCorrect: boolean; feedback: string; correctAnswer: string } {
  // Personal questions are always marked as correct
  if (question.isPersonal) {
    return {
      isCorrect: true,
      feedback: "Thank you for sharing! Personal responses help us understand you better.",
      correctAnswer: question.correctAnswer
    };
  }

  if (!userAnswer || userAnswer.trim().length < 10) {
    return {
      isCorrect: false,
      feedback: "Your answer is too short. Please provide a more detailed response.",
      correctAnswer: question.correctAnswer
    };
  }

  // Simple keyword matching for technical questions
  const userWords = userAnswer.toLowerCase().split(/\s+/);
  const correctAnswer = question.correctAnswer.toLowerCase();
  const correctWords = correctAnswer.split(/\s+/);
  
  // Calculate similarity based on common words
  const commonWords = userWords.filter(word => 
    word.length > 3 && correctWords.some(correctWord => 
      correctWord.includes(word) || word.includes(correctWord)
    )
  ).length;
  
  const similarity = commonWords / Math.max(correctWords.length * 0.3, 5);
  const isCorrect = similarity >= 0.4; // 40% similarity threshold

  let feedback = "";
  if (isCorrect) {
    feedback = `Good answer! You covered ${Math.round(similarity * 100)}% of the key concepts. `;
    if (similarity < 0.7) {
      feedback += "Consider adding more technical details to strengthen your response.";
    } else {
      feedback += "Excellent technical knowledge demonstrated!";
    }
  } else {
    feedback = "Your answer needs improvement. ";
    feedback += "Focus on the key technical concepts and provide more specific details. ";
    feedback += "Review the correct answer to understand the expected depth.";
  }

  return {
    isCorrect,
    feedback,
    correctAnswer: question.correctAnswer
  };
}