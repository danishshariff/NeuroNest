# NeuroNest System Architecture: Step-by-Step Diagrams

## 🏗️ System Overview

```
┌─────────────────┐    HTTP Requests    ┌─────────────────┐    Database Queries    ┌─────────────────┐
│                 │ ◄─────────────────► │                 │ ◄────────────────────► │                 │
│   FRONTEND      │                     │    BACKEND      │                        │   DATABASE      │
│   (EJS Views)   │                     │   (Node.js)     │                        │   (MongoDB)     │
│                 │                     │                 │                        │                 │
│ • User Interface│                     │ • Business Logic│                        │ • User Data     │
│ • Chat Interface│                     │ • AI Integration│                        │ • Chat History  │
│ • Dashboard     │                     │ • Authentication│                        │ • Mood Data     │
└─────────────────┘                     └─────────────────┘                        └─────────────────┘
                                                │
                                                │ AI API Calls
                                                ▼
                                        ┌─────────────────┐
                                        │                 │
                                        │  GOOGLE GEMINI  │
                                        │      AI API     │
                                        │                 │
                                        │ • Mental Health │
                                        │   Assistant     │
                                        │ • Conversation  │
                                        │   Memory        │
                                        │ • Safety Checks │
                                        └─────────────────┘
```

---

## 📊 Diagram 1: AI Chat System Flow

### **Step-by-Step Process:**

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                    AI CHAT SYSTEM FLOW                                             │
└─────────────────────────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────┐        1. User types message         ┌─────────────────┐        2. Process & Save   ┌─────────────────┐
│                 │ ─────────────────────────────────► │                 │ ───────────────────────────► │                 │
│   FRONTEND      │                                    │    BACKEND      │                              │   DATABASE      │
│                 │                                    │                 │                              │                 │
│ • Chat Interface│                                    │ • Validate Input│                              │ • Messages Collection│
│ • Message Input │                                    │ • Get History   │                              │ • User Messages │
│ • Send Request  │                                    │ • AI Processing │                              │ • Bot Responses │
└─────────────────┘                                    └─────────────────┘                              └─────────────────┘
         │                                                       │                                               │
         │                                                       │                                               │
         │ 3. Send POST /chat                                   │ 4. Save User Message                        │
         │    { userInput: "I'm feeling anxious" }               │    • Create message record                  │
         │    • Session validation                               │    • Set sender: "user"                     │
         │    • Authentication check                             │    • Link to user ID                        │
         │    • CSRF protection                                  │    • Add timestamp                          │
         │                                                       │                                               │
         │                                                       │ 5. Retrieve Chat History                    │
         │                                                       │    • Query MongoDB for user's messages      │
         │                                                       │    • Sort by creation time                  │
         │                                                       │    • Convert to Gemini format               │
         │                                                       │    • Include system prompt                  │
         │                                                       │                                               │
         │                                                       │ 6. Generate AI Response                     │
         │                                                       │    • Call Gemini API                        │
         │                                                       │    • Pass conversation context              │
         │                                                       │    • Apply safety filters                   │
         │                                                       │    • Generate compassionate response        │
         │                                                       │                                               │
         │                                                       │ 7. Save AI Response                         │
         │                                                       │    • Create bot message record              │
         │                                                       │    • Set sender: "bot"                      │
         │                                                       │    • Store AI response text                 │
         │                                                       │    • Link to user ID                        │
         │                                                       │                                               │
         │                                                       │ 8. Check Achievements                       │
         │                                                       │    • Count user messages                    │
         │                                                       │    • Check achievement criteria             │
         │                                                       │    • Award new achievements                 │
         │                                                       │    • Update user profile                    │
         │                                                       │                                               │
         │ 9. Display Response                                  │                                               │
         │    • Show AI message                                 │                                               │
         │    • Update chat UI                                  │                                               │
         │    • Display achievements                            │                                               │
         │    • Natural typing delay                            │                                               │
         │                                                       │                                               │
         ▼                                                       ▼                                               ▼
┌─────────────────┐                                    ┌─────────────────┐                              ┌─────────────────┐
│                 │                                    │                 │                              │                 │
│   CHAT UI       │                                    │   AI RESPONSE   │                              │   CONVERSATION  │
│   (Updated)     │                                    │   Generated     │                              │   SAVED         │
│                 │                                    │                 │                              │                 │
│ • New message   │                                    │ • Compassionate │                              │ • User Message  │
│ • AI response   │                                    │   response      │                              │ • Bot Response  │
│ • Achievement   │                                    │ • Safety checks │                              │ • Timestamps    │
│   notification  │                                    │ • Context aware │                              │ • User linked   │
└─────────────────┘                                    └─────────────────┘                              └─────────────────┘
```

### **Detailed AI Processing Flow:**
```
1. Frontend → Backend: POST /chat
   {
     "userInput": "I'm feeling really anxious about my presentation tomorrow"
   }

2. Backend Processing:
   - Validate session and user authentication
   - Save user message to MongoDB
   - Retrieve full chat history for this user
   - Convert history to Gemini format:
     [
       { role: "user", parts: [{ text: "Previous message" }] },
       { role: "model", parts: [{ text: "Previous response" }] }
     ]

3. AI System Prompt:
   {
     role: "user",
     parts: [{
       text: "You are a professional mental health assistant. Only reply to mental health related topics like stress, anxiety, sadness, mindfulness, emotional wellbeing. If anything else is asked, politely decline."
     }]
   }

4. Gemini API Call:
   - Model: gemini-1.5-flash
   - Temperature: 0.7 (balanced creativity)
   - Max tokens: 1000
   - Full conversation history included

5. AI Response Generation:
   - Context-aware response
   - Mental health focused
   - Crisis detection
   - Professional guidance

6. Backend → Frontend: Response
   {
     "success": true,
     "messages": [
       { content: "User message", sender: "user", createdAt: "..." },
       { content: "AI response", sender: "bot", createdAt: "..." }
     ],
     "achievements": ["first_ai_chat"]
   }
```

---

## 📊 Diagram 2: Session-Based Authentication Flow

### **Step-by-Step Process:**

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                SESSION-BASED AUTHENTICATION FLOW                                   │
└─────────────────────────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────┐        1. User login attempt         ┌─────────────────┐        2. Validate credentials ┌─────────────────┐
│                 │ ─────────────────────────────────► │                 │ ───────────────────────────► │                 │
│   FRONTEND      │                                    │    BACKEND      │                              │   DATABASE      │
│                 │                                    │                 │                              │                 │
│ • Login Form    │                                    │ • Session Mgmt  │                              │ • Users Collection│
│ • Credentials   │                                    │ • Password Check│                              │ • User Records   │
│ • Form Submit   │                                    │ • Session Create│                              │ • Hashed Passwords│
└─────────────────┘                                    └─────────────────┘                              └─────────────────┘
         │                                                       │                                               │
         │                                                       │                                               │
         │ 3. Send POST /auth/login                             │ 4. Validate User Credentials                │
         │    { email: "user@example.com", password: "..." }     │    • Query database by email                │
         │    • Form validation                                 │    • Check if user exists                   │
         │    • CSRF protection                                 │    • Retrieve hashed password               │
         │    • Input sanitization                              │    • Compare with bcrypt                    │
         │                                                       │                                               │
         │                                                       │ 5. Create Session                          │
         │                                                       │    • Generate session ID                    │
         │                                                       │    • Store user ID in session               │
         │                                                       │    • Set session cookie                     │
         │                                                       │    • Configure session options              │
         │                                                       │                                               │
         │                                                       │ 6. Update User Login Data                  │
         │                                                       │    • Add login date to user record          │
         │                                                       │    • Update last login timestamp            │
         │                                                       │    • Check for login streaks                │
         │                                                       │    • Award login achievements               │
         │                                                       │                                               │
         │                                                       │ 7. Return Success Response                 │
         │                                                       │    • Redirect to dashboard                  │
         │                                                       │    • Set session cookie in browser          │
         │                                                       │    • Include user data (without password)   │
         │                                                       │                                               │
         │ 8. Access Protected Routes                           │                                               │
         │    • Session cookie sent with requests               │                                               │
         │    • Middleware validates session                    │                                               │
         │    • User ID attached to request                     │                                               │
         │    • Access to user-specific data                    │                                               │
         │                                                       │                                               │
         ▼                                                       ▼                                               ▼
┌─────────────────┐                                    ┌─────────────────┐                              ┌─────────────────┘
│                 │                                    │                 │                              │                 │
│   DASHBOARD     │                                    │   SESSION       │                              │   USER DATA     │
│   (Authenticated)│                                    │   Established   │                              │   Updated       │
│                 │                                    │                 │                              │                 │
│ • User profile  │                                    │ • Session ID    │                              │ • Login dates   │
│ • Chat access   │                                    │ • User ID       │                              │ • Achievements  │
│ • Mood tracker  │                                    │ • Cookie set    │                              │ • Last login    │
│ • Community     │                                    │ • Secure config │                              │ • Streak data   │
└─────────────────┘                                    └─────────────────┘                              └─────────────────┘
```

### **Session Configuration Details:**
```javascript
// Session Setup
app.use(session({
    secret: process.env.SESSION_SECRET,        // Environment variable
    resave: false,                             // Don't save if unchanged
    saveUninitialized: false,                  // Don't save empty sessions
    cookie: { 
        secure: false,                         // Set to true for HTTPS
        httpOnly: true,                        // Prevent XSS
        maxAge: 24 * 60 * 60 * 1000           // 24 hours
    }
}));

// Authentication Middleware
const requireAuth = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect("/auth/login");
    }
    next();
};
```

---

## 📊 Diagram 3: Achievement System Flow

### **Step-by-Step Process:**

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                    ACHIEVEMENT SYSTEM FLOW                                         │
└─────────────────────────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────┐        1. User action triggers         ┌─────────────────┐        2. Check achievements ┌─────────────────┐
│                 │ ─────────────────────────────────► │                 │ ───────────────────────────► │                 │
│   FRONTEND      │                                    │    BACKEND      │                              │   DATABASE      │
│                 │                                    │                 │                              │                 │
│ • User Activity │                                    │ • Achievement   │                              │ • User Profile  │
│ • Action Event  │                                    │   Manager       │                              │ • Achievements  │
│ • API Call      │                                    │ • Context Check │                              │ • Activity Data │
└─────────────────┘                                    └─────────────────┘                              └─────────────────┘
         │                                                       │                                               │
         │                                                       │                                               │
         │ 3. User performs action                              │ 4. Create Achievement Context               │
         │    • Sends chat message                              │    • Action type (ai_chat, mood_entry, etc.) │
         │    • Logs mood entry                                 │    • Count of actions performed             │
         │    • Posts in community                              │    • User's current state                   │
         │    • Completes breathing exercise                    │    • Streak information                     │
         │                                                       │                                               │
         │                                                       │ 5. Check Achievement Criteria               │
         │                                                       │    • Loop through all achievements          │
         │                                                       │    • Check if user already has achievement  │
         │                                                       │    • Evaluate qualification logic           │
         │                                                       │    • Determine if criteria met              │
         │                                                       │                                               │
         │                                                       │ 6. Award New Achievements                   │
         │                                                       │    • Add achievement ID to user array       │
         │                                                       │    • Save updated user profile              │
         │                                                       │    • Return newly awarded achievements      │
         │                                                       │    • Include achievement details            │
         │                                                       │                                               │
         │ 7. Display Achievement Notification                   │                                               │
         │    • Show achievement popup                          │                                               │
         │    • Display achievement icon                        │                                               │
         │    • Show achievement description                    │                                               │
         │    • Update dashboard achievement list               │                                               │
         │                                                       │                                               │
         ▼                                                       ▼                                               ▼
┌─────────────────┐                                    ┌─────────────────┐                              ┌─────────────────┐
│                 │                                    │                 │                              │                 │
│   DASHBOARD     │                                    │   ACHIEVEMENT   │                              │   USER PROFILE  │
│   (Updated)     │                                    │   Awarded       │                              │   (Updated)     │
│                 │                                    │                 │                              │                 │
│ • New badge     │                                    │ • Achievement ID│                              │ • Achievements  │
│ • Notification  │                                    │ • Title         │                              │   array updated │
│ • Progress bar  │                                    │ • Description   │                              │ • Activity data │
│ • Motivation    │                                    │ • Icon          │                              │ • Streak info   │
└─────────────────┘                                    └─────────────────┘                              └─────────────────┘
```

### **Achievement Logic Examples:**
```javascript
// Achievement Qualification Logic
_qualifies(achievement, user, context) {
    switch (achievement.id) {
        case 'first_ai_chat':
            return context.type === 'ai_chat' && context.count === 1;
        
        case 'mood_10':
            return context.type === 'mood_entry' && context.count === 10;
        
        case 'login_streak_3':
            return context.type === 'login' && context.streak >= 3;
        
        case 'community_helper':
            return context.type === 'community_answer' && context.count === 1;
        
        case 'active_user_30':
            return context.type === 'login' && context.uniqueDays >= 30;
    }
}

// Achievement Types
const ACHIEVEMENTS = [
    new Achievement('first_ai_chat', 'First AI Chat', 'Had your first chat with the AI companion!', '💬'),
    new Achievement('mood_10', 'Mood Milestone: 10', 'Logged 10 mood entries! Keep it up!', '🔟'),
    new Achievement('login_streak_3', 'Dedicated User', 'Signed in for 3 days in a row!', '🔥'),
    new Achievement('community_helper', 'Community Helper', 'Answered a question in the community!', '🤝')
];
```

---

## 📊 Diagram 4: Mood Tracking & Analytics Flow

### **Step-by-Step Process:**

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                    MOOD TRACKING FLOW                                              │
└─────────────────────────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────┐        1. User logs mood         ┌─────────────────┐        2. Process & Save   ┌─────────────────┐
│                 │ ─────────────────────────────────► │                 │ ───────────────────────────► │                 │
│   FRONTEND      │                                    │    BACKEND      │                              │   DATABASE      │
│                 │                                    │                 │                              │                 │
│ • Mood Slider   │                                    │ • Validate Data │                              │ • Moods Collection│
│ • Notes Input   │                                    │ • Save Entry    │                              │ • User Moods    │
│ • Submit Form   │                                    │ • Analytics     │                              │ • Timestamps    │
└─────────────────┘                                    └─────────────────┘                              └─────────────────┘
         │                                                       │                                               │
         │                                                       │                                               │
         │ 3. Send POST /mood-tracker/add                       │ 4. Validate Mood Data                        │
         │    { mood: 7, notes: "Feeling productive today" }     │    • Check mood value (1-10)                │
         │    • Session validation                               │    • Validate notes length                   │
         │    • User authentication                              │    • Sanitize input data                     │
         │    • CSRF protection                                  │    • Check for duplicate entries             │
         │                                                       │                                               │
         │                                                       │ 5. Save Mood Entry                           │
         │                                                       │    • Create mood record                      │
         │                                                       │    • Link to user ID                         │
         │                                                       │    • Add timestamp                           │
         │                                                       │    • Store mood value and notes              │
         │                                                       │                                               │
         │                                                       │ 6. Calculate Analytics                       │
         │                                                       │    • Count total mood entries                │
         │                                                       │    • Calculate average mood                  │
         │                                                       │    • Identify mood patterns                  │
         │                                                       │    • Generate trend data                     │
         │                                                       │                                               │
         │                                                       │ 7. Check Mood Achievements                   │
         │                                                       │    • Check for milestone achievements        │
         │                                                       │    • Award mood-related badges               │
         │                                                       │    • Update user profile                     │
         │                                                       │                                               │
         │ 8. Display Updated Analytics                          │                                               │
         │    • Show new mood entry                              │                                               │
         │    • Update mood chart                                │                                               │
         │    • Display trends                                   │                                               │
         │    • Show achievements                                │                                               │
         │                                                       │                                               │
         ▼                                                       ▼                                               ▼
┌─────────────────┐                                    ┌─────────────────┐                              ┌─────────────────┐
│                 │                                    │                 │                              │                 │
│   MOOD TRACKER  │                                    │   ANALYTICS     │                              │   MOOD DATA     │
│   (Updated)     │                                    │   Generated     │                              │   (Stored)      │
│                 │                                    │                 │                              │                 │
│ • New entry     │                                    │ • Mood trends   │                              │ • Mood value    │
│ • Visual chart  │                                    │ • Patterns      │                              │ • Notes         │
│ • Insights      │                                    │ • Statistics    │                              │ • Timestamp     │
│ • Achievements  │                                    │ • Recommendations│                              │ • User linked   │
└─────────────────┘                                    └─────────────────┘                              └─────────────────┘
```

---

## 🔄 Real-Time Data Flow Examples

### **Example 1: User Has AI Chat Session**
```
┌─────────────┐ 1. Types message      ┌─────────────┐ 2. Send to backend  ┌─────────────┐
│   User      │ ─────────────────────► │  Frontend   │ ───────────────────► │  Backend    │
│             │                        │             │                     │             │
│ • "I'm      │                        │ • Chat form │                     │ • Validate  │
│   stressed" │                        │ • API call  │                     │ • Get       │
│             │                        │ • Session   │                     │   history   │
└─────────────┘                        └─────────────┘                     └─────────────┘
                                                │                                │
                                                │ 3. POST /chat                 │
                                                │ { userInput: "I'm stressed" } │
                                                │                                │
                                                │                                │ 4. Query MongoDB
                                                │                                │ ──────────────►
                                                │                                │
                                                │                                ┌─────────────┐
                                                │                                │  Database   │
                                                │                                │             │
                                                │                                │ • Get chat  │
                                                │                                │   history   │
                                                │                                │ • User      │
                                                │                                │   messages  │
                                                │                                └─────────────┘
                                                │                                │
                                                │                                │ 5. Call Gemini AI
                                                │                                │ ──────────────►
                                                │                                │
                                                │                                ┌─────────────┐
                                                │                                │  Gemini AI  │
                                                │                                │             │
                                                │                                │ • Process   │
                                                │                                │   context   │
                                                │                                │ • Generate  │
                                                │                                │   response  │
                                                │                                └─────────────┘
                                                │                                │
                                                │                                │ 6. Save response
                                                │                                │ ──────────────►
                                                │                                │
                                                │                                ┌─────────────┐
                                                │                                │  Database   │
                                                │                                │             │
                                                │                                │ • Save bot  │
                                                │                                │   message   │
                                                │                                │ • Update    │
                                                │                                │   history   │
                                                │                                └─────────────┘
                                                │                                │
                                                │ 7. Display AI response          │
                                                │ ──────────────►                │
                                                │                                │
                                                ┌─────────────┐                  │
                                                │  Frontend   │                  │
                                                │             │                  │
                                                │ • Show AI   │                  │
                                                │   response  │                  │
                                                │ • Update    │                  │
                                                │   chat UI   │                  │
                                                │ • Display   │                  │
                                                │   achievement│                  │
                                                └─────────────┘                  │
```

### **Example 2: User Logs Mood Entry**
```
┌─────────────┐ 1. Sets mood to 8     ┌─────────────┐ 2. Submit mood      ┌─────────────┐
│   User      │ ─────────────────────► │  Frontend   │ ───────────────────► │  Backend    │
│             │                        │             │                     │             │
│ • Feels     │                        │ • Mood      │                     │ • Validate  │
│   good      │                        │   slider    │                     │ • Save      │
│ • Adds      │                        │ • Notes     │                     │ • Analytics │
│   notes     │                        │ • Form      │                     │ • Check     │
└─────────────┘                        └─────────────┘                     └─────────────┘
                                                │                                │
                                                │ 3. POST /mood-tracker/add      │
                                                │ { mood: 8, notes: "..." }     │
                                                │                                │
                                                │                                │ 4. Save to MongoDB
                                                │                                │ ──────────────►
                                                │                                │
                                                │                                ┌─────────────┐
                                                │                                │  Database   │
                                                │                                │             │
                                                │                                │ • Store     │
                                                │                                │   mood      │
                                                │                                │ • Link to   │
                                                │                                │   user      │
                                                │                                └─────────────┘
                                                │                                │
                                                │                                │ 5. Calculate trends
                                                │                                │ ──────────────►
                                                │                                │
                                                │                                ┌─────────────┐
                                                │                                │  Analytics  │
                                                │                                │             │
                                                │                                │ • Average   │
                                                │                                │   mood      │
                                                │                                │ • Patterns  │
                                                │                                │ • Trends    │
                                                │                                └─────────────┘
                                                │                                │
                                                │ 6. Check achievements          │
                                                │ ──────────────►                │
                                                │                                │
                                                ┌─────────────┐                  │
                                                │ Achievement │                  │
                                                │ Manager     │                  │
                                                │             │                  │
                                                │ • Check     │                  │
                                                │   criteria  │                  │
                                                │ • Award     │                  │
                                                │   badges    │                  │
                                                └─────────────┘                  │
                                                │
                                                │ 7. Update dashboard
                                                │ ──────────────►
                                                │
                                                ┌─────────────┐
                                                │  Frontend   │
                                                │             │
                                                │ • New mood  │
                                                │   entry     │
                                                │ • Updated   │
                                                │   chart     │
                                                │ • Achievement│
                                                │   notification│
                                                └─────────────┘
```

---

## 🛠️ Technical Implementation Details

### **AI Chat System:**
```javascript
// Chat Route Implementation
router.post("/chat", requireAuth, async (req, res) => {
    const userInput = req.body.userInput?.trim();
    
    try {
        // Save user message
        const userMessage = await Message.create({
            content: userInput,
            sender: "user",
            user: req.session.userId,
        });

        // Get chat history
        const chatHistory = await Message.find({ user: req.session.userId })
            .sort({ createdAt: 1 })
            .lean();

        // Convert to Gemini format
        const geminiHistory = chatHistory.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));

        // Generate AI response
        const result = await geminiResponse(userInput, geminiHistory);
        
        // Add natural delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Save bot response
        const botMessage = await Message.create({
            content: result.responseText,
            sender: "bot",
            user: req.session.userId,
        });

        // Check achievements
        const achievementManager = new AchievementManager();
        const userMessageCount = await Message.countDocuments({ 
            user: req.session.userId, 
            sender: 'user' 
        });
        const user = await User.findById(req.session.userId);
        const context = { type: 'ai_chat', count: userMessageCount };
        const newlyAwarded = await achievementManager.checkAndAward(user, context);

        res.json({
            success: true,
            messages: [userMessage, botMessage],
            achievements: newlyAwarded,
        });
    } catch (error) {
        console.error("Chat error:", error);
        res.status(500).json({
            error: "An error occurred while processing your message.",
            sender: "bot",
        });
    }
});
```

### **Session Management:**
```javascript
// Session Configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
}));

// Authentication Middleware
const requireAuth = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect("/auth/login");
    }
    next();
};

// Dashboard Route
app.get("/dashboard", async (req, res) => {
    if (!req.session.user) {
        return res.redirect("/auth/login");
    }
    
    const user = await User.findById(req.session.user._id);
    const achievementManager = new AchievementManager();
    const achievements = user.achievements
        .map(id => achievementManager.getAchievementById(id))
        .filter(Boolean);
    
    res.render("dashboard", { user, achievements });
});
```

### **Database Queries:**
```javascript
// Get user's chat history
const messages = await Message.find({ user: req.session.userId })
    .sort({ createdAt: 1 })
    .lean();

// Get user's mood entries
const moods = await Mood.find({ user: req.session.userId })
    .sort({ createdAt: -1 })
    .limit(30);

// Count user messages for achievements
const messageCount = await Message.countDocuments({ 
    user: req.session.userId, 
    sender: 'user' 
});
```

### **Achievement System:**
```javascript
// Achievement checking
async checkAndAward(user, context) {
    const newlyAwarded = [];
    for (const achievement of this.achievements) {
        if (!user.achievements.includes(achievement.id) && 
            this._qualifies(achievement, user, context)) {
            user.achievements.push(achievement.id);
            newlyAwarded.push(achievement);
        }
    }
    if (newlyAwarded.length > 0) {
        await user.save();
    }
    return newlyAwarded;
}
```

These diagrams show exactly how data flows through your NeuroNest mental health platform, highlighting the sophisticated AI chat system, secure session management, and gamified achievement system. This comprehensive architecture demonstrates your technical expertise in building a full-stack mental health application with AI integration! 