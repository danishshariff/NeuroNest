# 🧠 NeuroNest - Mental Health Support Platform

A comprehensive mental health support platform that combines AI-powered chat assistance, community support, mood tracking, and professional resources to help individuals on their mental wellness journey.

## ✨ Features

### 🤖 AI Chat Support
- **24/7 AI Companion**: Get immediate support through our AI-powered chat system
- **Compassionate Responses**: Built with empathy and understanding
- **Personalized Guidance**: Tailored responses based on your needs
- **Powered by Google Gemini AI**: Advanced conversational AI technology

### 👥 Community Support
- **Peer Support Groups**: Connect with others on similar journeys
- **Anonymous Discussions**: Share experiences safely and anonymously
- **Expert Moderation**: Professional oversight for community safety
- **Resource Sharing**: Access shared mental health resources

### 📊 Mood Tracking
- **Daily Mood Monitoring**: Track your emotional well-being over time
- **Visual Analytics**: See patterns and trends in your mood
- **Personalized Insights**: Get recommendations based on your patterns
- **Progress Tracking**: Monitor your mental health journey

### 🧘 Breathing Exercises
- **Guided Breathing**: Step-by-step breathing techniques
- **Stress Relief**: Quick exercises for immediate relief
- **Customizable Sessions**: Adjust duration and intensity
- **Progress Tracking**: Monitor your breathing practice

### 🆘 Emergency Support
- **Crisis Resources**: Immediate access to emergency contacts
- **Professional Help**: Direct links to mental health professionals
- **Safety Information**: Guidelines for crisis situations
- **24/7 Hotlines**: Access to suicide prevention and crisis support

### 📚 Mental Health Resources
- **Educational Content**: Articles and guides on mental health
- **Professional Directory**: Find qualified mental health professionals
- **Self-Help Tools**: Practical exercises and techniques
- **Crisis Resources**: Emergency support information

## 🛠️ Technology Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: EJS templating engine
- **AI Integration**: Google Gemini AI API
- **Authentication**: Session-based with bcrypt encryption
- **Styling**: Custom CSS with Bootstrap components
- **Development**: Nodemon for hot reloading

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- Google Gemini AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd neuronest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   SESSION_SECRET=your_session_secret_here
   MONGO_URI=your_mongodb_connection_string
   PORT=8000
   ```

4. **Start the application**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:8000`

## 📁 Project Structure

```
neuronest/
├── app.js                 # Main application entry point
├── middleware/
│   └── auth.js           # Authentication middleware
├── models/               # Database models
│   ├── user.js          # User model
│   ├── message.js       # Chat message model
│   ├── Mood.js          # Mood tracking model
│   └── community/       # Community models
│       ├── post.js      # Community posts
│       └── answer.js    # Community answers
├── routes/              # Application routes
│   ├── auth.js         # Authentication routes
│   ├── chat.js         # AI chat routes
│   ├── community.js    # Community features
│   ├── mood.js         # Mood tracking
│   ├── breathing.js    # Breathing exercises
│   ├── emergency.js    # Emergency support
│   ├── resources.js    # Mental health resources
│   └── about.js        # About page
├── views/              # EJS templates
│   ├── partials/       # Reusable components
│   ├── auth/          # Authentication pages
│   └── *.ejs          # Main page templates
├── public/            # Static assets
│   ├── css/          # Stylesheets
│   └── images/       # Images and logos
└── utils/
    └── gemini-helper.js  # AI integration utilities
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini AI API key | Yes |
| `SESSION_SECRET` | Secret for session encryption | Yes |
| `MONGO_URI` | MongoDB connection string | Yes |
| `PORT` | Server port (default: 8000) | No |

### Database Setup

The application uses MongoDB with the following collections:
- `users` - User accounts and profiles
- `messages` - Chat conversation history
- `moods` - Mood tracking data
- `posts` - Community posts
- `answers` - Community responses

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

If you're experiencing a mental health crisis or need immediate support:

- **National Suicide Prevention Lifeline**: 988 (US)
- **Crisis Text Line**: Text HOME to 741741 (US)
- **Emergency Services**: 911 (US)

## 🙏 Acknowledgments

- Google Gemini AI for providing the conversational AI capabilities
- The mental health community for inspiration and guidance
- All contributors who help make mental health support more accessible

## 📞 Contact

For technical support or questions about the application, please open an issue in the repository.

---

**Remember**: This application is designed to provide support and resources, but it is not a substitute for professional mental health care. If you're experiencing severe mental health issues, please seek help from a qualified mental health professional. 