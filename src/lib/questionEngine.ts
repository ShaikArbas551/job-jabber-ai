// Question database and AI evaluation engine for the interview simulator

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
    intermediate: [
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
    intermediate: [
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
    intermediate: [
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
    intermediate: [
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
    intermediate: [
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
    intermediate: [
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
    intermediate: [
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
    intermediate: [
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
      "API (Application Programming Interface) enables different software applications to communicate and share data or functionality."
    ],
    intermediate: [
      "Database indexing creates data structures to speed up query performance by avoiding full table scans, improving search and sort operations.",
      "INNER JOIN (matching records), LEFT JOIN (all left + matching right), RIGHT JOIN (all right + matching left), FULL OUTER JOIN (all records).",
      "Authentication verifies identity (login), authorization determines permissions. Use tokens, sessions, middleware, and role-based access control.",
      "Synchronous code executes sequentially (blocking), asynchronous code allows non-blocking operations using callbacks, promises, or async/await.",
      "Middleware processes requests between client and server, handling authentication, logging, error handling, and data transformation.",
      "MVC separates application into Model (data), View (presentation), Controller (business logic) for better organization and maintainability.",
      "Microservices: Pros - scalability, technology diversity, fault isolation. Cons - complexity, network overhead, data consistency challenges.",
      "Database normalization eliminates redundancy and ensures data integrity by organizing data into separate related tables.",
      "Implement try-catch blocks, centralized error handlers, proper HTTP status codes, logging frameworks, and monitoring systems.",
      "Caching stores frequently accessed data in memory for faster retrieval, reducing database load and improving response times."
    ],
    hard: [
      "Use load balancers, microservices, horizontal scaling, CDNs, caching layers, database sharding, and auto-scaling infrastructure.",
      "Implement 2-phase commit, saga pattern, event sourcing, or eventual consistency with compensation mechanisms across services.",
      "Design user tables, posts, relationships, comments, with proper indexing, partitioning, and denormalization for performance.",
      "Use blue-green deployments, rolling updates, backward compatibility, migration scripts, and feature flags for safe database changes.",
      "Implement WebSockets, message queues (Redis/RabbitMQ), pub/sub patterns, and real-time databases with proper scaling.",
      "Round-robin, weighted round-robin, least connections, IP hash, geographic routing - choose based on traffic patterns and requirements.",
      "Use eventual consistency, conflict resolution strategies, vector clocks, and design for network partitions in distributed systems.",
      "Implement redundancy, health checks, circuit breakers, graceful degradation, backup systems, and automatic failover mechanisms.",
      "Use token bucket, sliding window, or fixed window algorithms with Redis, monitoring, and proper error responses.",
      "Design event-driven architecture with message queues, stream processing (Kafka), horizontal scaling, and proper data partitioning."
    ]
  },
  frontend: {
    easy: [
      "let and const are block-scoped, var is function-scoped. const cannot be reassigned, let can be. var can be hoisted and redeclared.",
      "The CSS Box Model consists of content, padding, border, and margin. It defines how elements are sized and spaced.",
      "DOM is Document Object Model, a tree structure representing HTML. You can manipulate it using methods like getElementById, createElement, appendChild.",
      "HTML provides structure, CSS provides styling, JavaScript provides interactivity and behavior.",
      "Use flexbox with justify-content: center and align-items: center, or CSS Grid with place-items: center.",
      "Responsive design ensures websites work on all devices. It's important for user experience and mobile traffic.",
      "Inline elements flow with text (span, a), block elements take full width and start new lines (div, p).",
      "CSS selectors target HTML elements. Types include element, class (.class), ID (#id), attribute, and pseudo selectors.",
      "Using script tags: inline, external files, or through modules. Can be in head or body.",
      "Alt attribute provides alternative text for screen readers and when images fail to load, improving accessibility."
    ],
    intermediate: [
      "Closures allow inner functions to access outer function variables even after outer function returns. Example: function outer(x) { return function(y) { return x + y; } }",
      "== performs type coercion before comparison, === compares without type conversion. Use === for strict equality.",
      "Using Promises, async/await, callbacks. Modern approach prefers async/await for cleaner code.",
      "React Hooks allow using state and lifecycle in functional components. They're reusable and easier to test.",
      "Flexbox is 1D layout (row or column), Grid is 2D layout (rows and columns). Use Flexbox for components, Grid for layouts.",
      "Virtual DOM is React's in-memory representation of real DOM. It enables efficient updates by comparing and updating only changed elements.",
      "Minimize HTTP requests, optimize images, minify code, use CDN, lazy loading, caching strategies.",
      "CSS-in-JS, CSS modules, styled-components, traditional CSS files, or inline styles.",
      "Event bubbling: events propagate from target to root. Event capturing: opposite direction. Use stopPropagation() to prevent.",
      "localStorage persists until cleared, sessionStorage clears when tab closes. Both are domain-specific."
    ],
    hard: [
      "function debounce(func, delay) { let timeout; return function(...args) { clearTimeout(timeout); timeout = setTimeout(() => func.apply(this, args), delay); } } Used for search input, scroll events.",
      "Micro-frontends split UI into independent deployable pieces. Advantages: team autonomy, technology diversity, independent deployment.",
      "Using frameworks like Next.js, configure server-side rendering, handle hydration, manage state between server and client.",
      "Use state management libraries like Redux, Zustand, or Context API. Implement proper data flow, immutability, and normalized state structure.",
      "Code splitting, lazy loading, memoization, virtual scrolling, bundle analysis, tree shaking, image optimization.",
      "Web Workers run JavaScript in background threads. Use for heavy computations, data processing without blocking UI.",
      "Remove event listeners, clear timers, close connections, avoid global variables, use weak references.",
      "Tree shaking removes unused code during bundling. Webpack and other bundlers analyze imports and eliminate dead code.",
      "Use CSS Grid, Flexbox, container queries, viewport units, fluid typography, mobile-first approach.",
      "WebSockets, Server-Sent Events, WebRTC, or polling. Choose based on requirements: bi-directional vs one-way, frequency."
    ]
  },
  fullstack: {
    easy: [
      "Frontend handles user interface and interaction, backend handles server logic, databases, and APIs.",
      "API (Application Programming Interface) allows different software systems to communicate using defined protocols and data formats.",
      "Database stores and organizes data. Types: SQL (relational) like MySQL, PostgreSQL; NoSQL like MongoDB, Redis.",
      "HTTP is protocol for web communication. Methods: GET (retrieve), POST (create), PUT (update), DELETE (remove), PATCH (partial update).",
      "Client requests services from server. Client displays data, server processes requests and manages data.",
      "JSON (JavaScript Object Notation) is lightweight data format for data exchange between server and client.",
      "CRUD: Create (POST), Read (GET), Update (PUT/PATCH), Delete (DELETE) - basic database operations.",
      "Web server hosts websites and handles HTTP requests, serving files and processing dynamic content.",
      "SQL databases use structured tables and relationships, NoSQL databases use flexible document/key-value structures.",
      "Authentication verifies user identity, prevents unauthorized access, protects user data and system security."
    ],
    intermediate: [
      "MVC separates application into Model (data), View (presentation), Controller (business logic) for better organization and maintainability.",
      "REST uses HTTP methods, stateless communication, resource-based URLs, standard status codes, and uniform interface.",
      "Authentication verifies identity (login), authorization controls access (permissions). Use JWT tokens, sessions, or OAuth.",
      "Cookies: small data stored in browser. Sessions: server-side storage. Tokens: stateless authentication data.",
      "Database normalization reduces redundancy and improves data integrity by organizing data into related tables.",
      "Middleware functions execute between request and response, handling authentication, logging, validation, error handling.",
      "Implement try-catch blocks, error middleware, logging, user-friendly error messages, proper HTTP status codes.",
      "Monolithic: single deployable unit. Microservices: multiple independent services. Microservices offer scalability but complexity.",
      "Users, Products, Orders, OrderItems tables with foreign key relationships, proper indexing, and constraints.",
      "SQL injection, XSS, CSRF, authentication bypass, insecure data storage, insufficient logging."
    ],
    hard: [
      "Microservices architecture, load balancers, CDN, caching layers, database sharding, message queues, auto-scaling.",
      "WebSockets for real-time communication, message queues for scalability, proper authentication and room management.",
      "Use database transactions with ACID properties, implement proper isolation levels, handle rollbacks and deadlocks.",
      "Multi-layer caching: browser, CDN, reverse proxy, application cache, database cache. Use Redis or Memcached.",
      "Implement token bucket or sliding window algorithms, use Redis for distributed rate limiting, different limits per user type.",
      "Consistency, Availability, Partition tolerance - choose 2. Affects database design and system architecture decisions.",
      "File upload to cloud storage (S3), background job processing, virus scanning, image resizing, CDN distribution.",
      "Elasticsearch for full-text search, database indexing, search APIs, result ranking, autocomplete functionality.",
      "Horizontal scaling, load balancing, database sharding, caching, CDN, microservices, queue systems.",
      "Automated testing, containerization, infrastructure as code, monitoring, deployment strategies like blue-green or canary."
    ]
  },
  datascientist: {
    easy: [
      "Data science extracts insights from data using statistics, programming, and domain knowledge. Data scientists analyze data to solve business problems.",
      "Supervised learning uses labeled data (input-output pairs), unsupervised learning finds patterns in unlabeled data.",
      "Classification predicts categories (spam/not spam), regression predicts continuous values (house prices).",
      "Problem definition, data collection, exploration, cleaning, modeling, evaluation, deployment, monitoring.",
      "Correlation shows statistical relationship, causation shows one thing causes another. Correlation doesn't imply causation.",
      "Dataset is collection of data. Good data is accurate, complete, relevant, timely, and representative.",
      "Bar charts, line graphs, scatter plots, histograms, heatmaps, box plots for different data types and relationships.",
      "Data cleaning removes errors, handles missing values, fixes inconsistencies to ensure data quality.",
      "Machine learning enables computers to learn patterns from data and make predictions without explicit programming.",
      "Mean (average), median (middle value), mode (most frequent value) - measures of central tendency."
    ],
    intermediate: [
      "High bias: underfitting, too simple. High variance: overfitting, too complex. Balance needed for good generalization.",
      "Cross-validation splits data into training/testing sets multiple times to evaluate model performance reliably.",
      "Remove rows, impute with mean/median/mode, use algorithms that handle missing data, or predict missing values.",
      "Decision trees: single tree, interpretable but prone to overfitting. Random forests: multiple trees, more robust.",
      "Feature engineering creates new variables from existing data to improve model performance and interpretability.",
      "Overfitting: model memorizes training data. Prevent with cross-validation, regularization, more data, simpler models.",
      "Accuracy, precision, recall, F1-score, ROC-AUC, confusion matrix - choose based on problem type and business needs.",
      "Bagging: parallel training (Random Forest). Boosting: sequential training where models learn from previous errors (XGBoost).",
      "Clustering groups similar data points. Algorithms: K-means, hierarchical clustering, DBSCAN for different cluster shapes.",
      "One-hot encoding for nominal, ordinal encoding for ordered categories, target encoding, or embedding for high cardinality."
    ],
    hard: [
      "Data ingestion, feature engineering, model training, validation, deployment with monitoring, A/B testing, and feedback loops.",
      "Time series analysis, trend detection, seasonality, ARIMA models, or deep learning approaches like LSTM networks.",
      "Collaborative filtering (user-item matrix), content-based filtering (item features), hybrid approaches, matrix factorization.",
      "Resampling techniques (SMOTE), cost-sensitive learning, ensemble methods, proper evaluation metrics like precision-recall.",
      "Statistical significance testing, sample size calculation, randomization, controlling for confounding variables, metrics selection.",
      "Statistical methods (Z-score, IQR), machine learning approaches (Isolation Forest), domain knowledge, visualization techniques.",
      "Real-time feature engineering, ensemble models, streaming data processing, model updating, alert systems.",
      "Model versioning, performance monitoring, data drift detection, automated retraining, rollback strategies.",
      "Text preprocessing, tokenization, sentiment lexicons, machine learning classifiers, deep learning with embeddings.",
      "CNN architecture, data augmentation, transfer learning, proper validation, handling class imbalance, model optimization."
    ]
  },
  devops: {
    easy: [
      "DevOps combines development and operations to improve collaboration, automate processes, and deliver software faster.",
      "CI: Continuous Integration merges code frequently. CD: Continuous Delivery/Deployment automates software releases.",
      "Version control tracks code changes over time. Git enables collaboration, rollbacks, and code history management.",
      "Development: for coding and testing. Production: live environment serving real users with different configurations.",
      "Cloud computing provides on-demand computing resources. Providers: AWS, Azure, Google Cloud, offering scalability.",
      "Containerization packages applications with dependencies into portable containers using tools like Docker.",
      "Automation reduces manual work, improves consistency, reduces errors, and enables faster delivery.",
      "Monitoring tracks system health, performance, and errors to ensure reliability and quick issue resolution.",
      "Infrastructure includes servers, networks, databases, and other computing resources supporting applications.",
      "Horizontal: add more servers. Vertical: increase server resources. Horizontal offers better redundancy."
    ],
    intermediate: [
      "IaC manages infrastructure using code (Terraform, CloudFormation), enabling version control, repeatability, and automation.",
      "Docker creates lightweight containers from images, providing consistent environments across development and production.",
      "Automated pipeline: code commit triggers build, test, and deployment stages with quality gates and approvals.",
      "Containers share OS kernel (faster, lighter), VMs include full OS (more isolation but heavier resource usage).",
      "Kubernetes orchestrates containers: pods, services, deployments, managing scaling, networking, and service discovery.",
      "Use secret management tools (Vault, AWS Secrets Manager), encrypt at rest/transit, rotate regularly, limit access.",
      "Blue-green: two identical environments, switch traffic between them. Enables zero-downtime deployments and easy rollbacks.",
      "Centralized logging (ELK stack), metrics collection (Prometheus), distributed tracing, alerting systems.",
      "Independent services, single responsibility, decentralized data, failure isolation, technology diversity.",
      "Backup strategies, replication, failover procedures, RTO/RPO definitions, regular testing of recovery processes."
    ],
    hard: [
      "Multi-stage pipelines, service mesh integration, automated testing, security scanning, deployment strategies per service.",
      "Kubernetes HPA/VPA, cloud auto-scaling groups, metrics-based scaling, predictive scaling, cost optimization.",
      "Multi-layer monitoring: infrastructure, application, business metrics. Alerting rules, escalation, incident response.",
      "SAST/DAST tools, dependency scanning, container scanning, compliance checks, security gates in pipeline.",
      "Active-active setup, database replication, load balancing, automated failover, data synchronization strategies.",
      "Controlled failure injection, monitoring system resilience, game days, building confidence in system reliability.",
      "Right-sizing instances, reserved capacity, spot instances, auto-scaling, resource tagging, regular reviews.",
      "Git-based configuration management, ArgoCD/Flux, declarative infrastructure, policy as code.",
      "Environment-specific configs, secret management, feature flags, configuration validation, rollback capabilities.",
      "Blue-green deployment, canary releases, feature flags, health checks, automated rollback triggers."
    ]
  },
  productmanager: {
    easy: [
      "Product Manager defines product vision, strategy, and roadmap. They coordinate between teams to deliver valuable products.",
      "Product roadmap is visual timeline showing planned features, priorities, and milestones for product development.",
      "Features are product capabilities, benefits are value users get. Focus on benefits to communicate user value.",
      "Use frameworks like RICE, MoSCoW, or Kano model. Consider user impact, business value, effort, and strategic alignment.",
      "User feedback provides insights into user needs, satisfaction, and improvement areas through surveys, interviews, analytics.",
      "Market research analyzes competitors, user needs, trends, and opportunities to inform product decisions.",
      "MVP is simplest version with core features to validate assumptions and learn from real users quickly.",
      "Define success metrics: user adoption, engagement, retention, revenue, or other KPIs aligned with business goals.",
      "Product lifecycle: introduction, growth, maturity, decline. Different strategies needed for each stage.",
      "Stakeholders are people affected by product: users, customers, developers, sales, marketing, executives."
    ],
    intermediate: [
      "User interviews, surveys, analytics, usability testing, A/B tests, customer support feedback, market research.",
      "RICE (Reach, Impact, Confidence, Effort), MoSCoW, Kano model, value vs effort matrix, strategic alignment.",
      "A/B testing compares two versions to measure which performs better using statistical significance and user behavior.",
      "Clear requirements, regular communication, sprint planning, backlog grooming, technical feasibility discussions.",
      "User metrics: DAU/MAU, retention, engagement. Business metrics: revenue, conversion, churn, customer satisfaction.",
      "Prioritize requirements, communicate trade-offs, align with business goals, find win-win solutions, escalate when needed.",
      "Product-market fit means your product satisfies strong market demand with good user retention and growth.",
      "Prioritized list of features and user stories, regularly updated based on feedback and changing priorities.",
      "User persona represents target user segment with demographics, goals, pain points, and behaviors.",
      "Tailor message to audience: vision for executives, technical details for developers, benefits for sales."
    ],
    hard: [
      "Market analysis, positioning, pricing strategy, channel strategy, launch timeline, success metrics, risk mitigation.",
      "Differentiation strategy, unique value proposition, partnerships, aggressive pricing, superior user experience.",
      "Value-based pricing, competitor analysis, customer willingness to pay, tiered pricing, freemium models.",
      "Analyze failure reasons, identify new opportunities, gradual transition, communicate changes transparently.",
      "Cohort analysis, engagement scoring, churn prediction, onboarding optimization, feature adoption tracking.",
      "Localization, cultural considerations, regulatory compliance, local partnerships, market entry strategy.",
      "Feature mapping, migration timeline, user communication, training, support, gradual rollout.",
      "Platform strategy, APIs, third-party integrations, ecosystem partnerships, network effects.",
      "Define metrics, collect data, analyze patterns, test hypotheses, measure outcomes, iterate based on learnings.",
      "Crisis communication plan, rapid response team, user compensation, transparency, learning from failure."
    ]
  },
  uiux: {
    easy: [
      "UI (User Interface) is visual design and layout. UX (User Experience) is overall user interaction and satisfaction.",
      "User-centered design focuses on user needs, behaviors, and goals throughout the design process.",
      "Wireframe is basic layout structure showing content placement without visual design details.",
      "Simplicity, consistency, hierarchy, contrast, alignment, proximity, and accessibility.",
      "Consider brand colors, accessibility, color psychology, contrast ratios, and cultural meanings.",
      "Typography affects readability, brand perception, and user experience. Choose appropriate fonts and hierarchy.",
      "Accessibility ensures designs work for users with disabilities through proper contrast, alt text, keyboard navigation.",
      "Design system provides consistent components, patterns, and guidelines for scalable, cohesive products.",
      "User testing, surveys, analytics, heatmaps, feedback forms, and direct observation.",
      "Figma, Sketch, Adobe XD for design; InVision, Principle for prototyping; Miro for collaboration."
    ],
    intermediate: [
      "Research → Define → Ideate → Prototype → Test → Iterate. Each phase includes specific methods and deliverables.",
      "User interviews, surveys, usability testing, card sorting, analytics, A/B testing, field studies.",
      "Information architecture organizes content logically using site maps, user flows, and navigation structures.",
      "Responsive design principles, mobile-first approach, flexible grids, scalable images, touch-friendly interfaces.",
      "Design patterns are reusable solutions for common problems. Use established patterns for familiar interactions.",
      "User engagement metrics, task completion rates, error rates, time on task, user satisfaction scores.",
      "Low-fi: sketches, wireframes. Mid-fi: clickable wireframes. Hi-fi: detailed interactive prototypes.",
      "Regular communication, design handoffs with specifications, design systems, collaborative tools, feedback sessions.",
      "User research, identify pain points, analyze metrics, create user flows, test new designs, measure improvements.",
      "Structure feedback sessions, ask clarifying questions, separate personal opinions from user needs, iterate based on insights."
    ],
    hard: [
      "Comprehensive user research, complex information architecture, progressive disclosure, advanced interaction patterns, scalability considerations.",
      "WCAG guidelines, screen reader compatibility, keyboard navigation, color contrast, alternative interaction methods.",
      "Component libraries, design tokens, documentation, governance, versioning, tool integration across teams.",
      "Spatial interfaces, gesture controls, 3D interaction paradigms, context awareness, immersive experience design.",
      "Emerging interaction patterns, predictive interfaces, voice UI, gesture recognition, contextual computing.",
      "Mixed methods research, statistical analysis, compelling storytelling, stakeholder buy-in strategies.",
      "User journey mapping, onboarding flows, progressive proficiency, retention strategies, behavioral psychology.",
      "Cultural research, local usability testing, appropriate imagery and colors, text direction, cultural norms.",
      "Design metrics framework, regular assessment, peer reviews, user feedback integration, continuous improvement.",
      "Design leadership principles, team structure, hiring, culture building, stakeholder management, design advocacy."
    ]
  },
  mobile: {
    easy: [
      "Mobile app development creates applications for smartphones/tablets. Platforms: iOS, Android, cross-platform.",
      "Native apps built for specific platforms (Swift/iOS, Kotlin/Android). Hybrid apps work across platforms (React Native, Flutter).",
      "Responsive design adapts interfaces to different screen sizes and orientations for optimal user experience.",
      "UI components, navigation, data layer, business logic, platform services integration.",
      "Mobile apps: installed, offline access, device features. Web apps: browser-based, always online, limited device access.",
      "Review process for app stores (Apple App Store, Google Play) checking quality, content, and guidelines compliance.",
      "Touch interfaces, small screens, thumb navigation, loading states, offline functionality, battery usage.",
      "iOS: Swift/Objective-C, Xcode. Android: Kotlin/Java, Android Studio. Different design guidelines and capabilities.",
      "Responsive layouts, density-independent pixels, flexible grids, adaptive components, testing on multiple devices.",
      "Push notifications send messages to users' devices even when app isn't running, improving engagement."
    ],
    intermediate: [
      "Local storage: SQLite, Core Data, Realm. Remote storage: APIs, cloud databases, sync strategies.",
      "App lifecycle states: foreground, background, suspended. State management: Redux, MobX, or platform-specific solutions.",
      "Optimize images, minimize network requests, efficient algorithms, memory management, code splitting, lazy loading.",
      "Data encryption, secure communication (HTTPS), authentication, authorization, secure storage, code obfuscation.",
      "Local caching, offline databases, sync mechanisms, conflict resolution, progressive web app features.",
      "Tab navigation, stack navigation, drawer navigation, modal presentation, deep linking, navigation state management.",
      "Unit testing, integration testing, UI testing, device testing, emulator testing, automated testing frameworks.",
      "App store deployment, beta testing (TestFlight, Google Play Console), staged rollouts, monitoring.",
      "Runtime permissions, user consent, minimal permissions principle, explaining permission needs to users.",
      "WebSockets, push notifications, real-time databases, synchronization strategies, conflict resolution."
    ],
    hard: [
      "MVVM/MVP architecture, dependency injection, modular design, offline-first, real-time sync, scalable backend integration.",
      "Real-time databases, WebSockets, conflict resolution, eventual consistency, offline queue management.",
      "Backward compatibility, feature flags, gradual rollouts, migration strategies, user communication.",
      "Core ML/TensorFlow integration, ARKit/ARCore implementation, on-device processing, cloud ML services.",
      "Architecture decisions, shared codebase, platform-specific optimizations, team structure, tooling.",
      "Offline-first architecture, local databases, sync engines, conflict resolution, eventual consistency patterns.",
      "Microservices backend, CDN integration, caching strategies, database optimization, auto-scaling.",
      "Multi-factor authentication, biometric authentication, certificate pinning, runtime protection, secure coding practices.",
      "Performance profiling, memory optimization, network optimization, battery usage, rendering optimization.",
      "State management at scale, modular architecture, testing strategies, team coordination, code organization."
    ]
  }
};

export function generateQuestion(role: string, difficulty: string): string {
  const roleQuestions = questionBank[role];
  if (!roleQuestions) return "What motivated you to apply for this position?";
  
  const difficultyQuestions = roleQuestions[difficulty];
  if (!difficultyQuestions) return "Tell me about your experience with this technology.";
  
  const randomIndex = Math.floor(Math.random() * difficultyQuestions.length);
  return difficultyQuestions[randomIndex];
}

interface EvaluationResult {
  isCorrect: boolean;
  correctAnswer: string;
  feedback: string;
}

export async function evaluateAnswer(
  question: string, 
  userAnswer: string, 
  role: string, 
  difficulty: string
): Promise<EvaluationResult> {
  // Find the correct answer
  const roleQuestions = questionBank[role];
  const difficultyQuestions = roleQuestions?.[difficulty] || [];
  const questionIndex = difficultyQuestions.indexOf(question);
  
  const correctAnswersList = correctAnswers[role]?.[difficulty] || [];
  const correctAnswer = correctAnswersList[questionIndex] || "No correct answer available.";
  
  // Simple evaluation logic (in a real app, this would use an LLM API)
  const userAnswerLower = userAnswer.toLowerCase();
  const correctAnswerLower = correctAnswer.toLowerCase();
  
  // Extract key concepts from the correct answer
  const keyTerms = extractKeyTerms(correctAnswerLower);
  const matchedTerms = keyTerms.filter(term => userAnswerLower.includes(term));
  
  // Calculate similarity score
  const similarityScore = matchedTerms.length / keyTerms.length;
  const isCorrect = similarityScore >= 0.5; // 50% similarity threshold
  
  // Generate feedback
  let feedback = "";
  if (isCorrect) {
    feedback = `Great answer! You covered ${Math.round(similarityScore * 100)}% of the key concepts. `;
    if (similarityScore < 0.8) {
      feedback += "Consider elaborating on some additional points mentioned in the correct answer.";
    } else {
      feedback += "Your answer demonstrates strong understanding of the topic.";
    }
  } else {
    feedback = `Your answer covers some relevant points but misses key concepts. `;
    feedback += `Focus on: ${keyTerms.slice(0, 3).join(", ")}. `;
    feedback += "Review the correct answer to understand the expected depth and scope.";
  }
  
  return {
    isCorrect,
    correctAnswer,
    feedback
  };
}

function extractKeyTerms(text: string): string[] {
  // Simple keyword extraction (in a real app, this would be more sophisticated)
  const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'can', 'may', 'might', 'must', 'this', 'that', 'these', 'those', 'it', 'its', 'they', 'them', 'their', 'you', 'your', 'we', 'our', 'i', 'my', 'me'];
  
  const words = text.split(/\s+/)
    .map(word => word.replace(/[^\w]/g, ''))
    .filter(word => word.length > 3 && !commonWords.includes(word.toLowerCase()));
  
  // Remove duplicates and return top 10 terms
  return [...new Set(words)].slice(0, 10);
}