# 🤖 MindfulBot - Powered by Google Gemini AI

## Overview
MindfulBot now uses Google's Gemini AI to provide intelligent, contextual mental health support. This integration offers more natural conversations and better understanding of user needs.

## Setup Instructions

### 1. Get Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the API key

### 2. Configure Environment Variables
Create a `.env` file in the root directory with:

```env
# Gemini AI Configuration
GEMINI_API_KEY=your_actual_gemini_api_key_here

# Other required variables
NODE_ENV=development
PORT=3000
MONGO_URI=mongodb://localhost:27017/mindfulconnect
SESSION_SECRET=your_session_secret_here
```

### 3. Install Dependencies
```bash
npm install @google/generative-ai
```

## Features

### 🧠 AI-Powered Conversations
- **Natural Language Processing**: Understands context and intent
- **Conversation Memory**: Remembers previous messages in the session
- **Personalized Responses**: Adapts tone and style based on conversation
- **Mental Health Focus**: Specialized in mental health and wellness topics

### 🚨 Safety Features
- **Emergency Detection**: Automatically detects crisis situations
- **Crisis Resources**: Provides immediate access to help lines
- **Professional Boundaries**: Maintains appropriate AI assistant boundaries

### 💬 Conversation Capabilities
- **Context Awareness**: Understands conversation flow
- **Topic Continuity**: Builds on previous messages
- **Emotional Intelligence**: Responds with empathy and understanding
- **Resource Guidance**: Suggests helpful coping strategies

## Technical Implementation

### File Structure
```
utils/
└── geminiService.js    # Gemini AI service class

routes/
└── chat.js            # Updated chat endpoints

views/
└── chat.ejs          # Chat interface
```

### Key Components

#### GeminiService Class
- **Session Management**: Maintains conversation context per user
- **Response Generation**: Uses Gemini AI for intelligent responses
- **Emergency Detection**: Monitors for crisis keywords
- **Error Handling**: Graceful fallback for API issues

#### API Endpoints
- `POST /chat` - Send message and get AI response
- `POST /clear-chat` - Clear conversation history
- `GET /bot-info` - Get bot information and session status

## Usage

### Starting a Conversation
1. Navigate to the chat page
2. Type your message
3. Gemini AI will generate a contextual, empathetic response
4. Conversation context is maintained throughout the session

### Emergency Detection
If crisis keywords are detected:
- Immediate crisis response is triggered
- Crisis resources are provided
- Visual alerts are shown
- Professional help is encouraged

### Clearing Conversations
- Click the trash icon to clear chat history
- This also resets the AI conversation context
- New session starts fresh

## Safety and Ethics

### Crisis Management
- **Automatic Detection**: Keywords trigger crisis response
- **Resource Provision**: Hotline numbers and crisis text lines
- **Professional Guidance**: Encourages seeking professional help
- **Boundary Maintenance**: Clear AI assistant limitations

### Privacy and Security
- **Session Isolation**: Each user has separate conversation context
- **No Data Persistence**: AI conversations are not stored long-term
- **Secure API**: Uses Google's secure Gemini API
- **Environment Variables**: API keys stored securely

## Troubleshooting

### Common Issues

#### API Key Errors
```
Error: Invalid API key
```
**Solution**: Check your `.env` file and ensure `GEMINI_API_KEY` is set correctly

#### Connection Issues
```
Error: Failed to connect to Gemini API
```
**Solution**: 
- Check internet connection
- Verify API key is valid
- Check Google AI Studio status

#### Rate Limiting
```
Error: Rate limit exceeded
```
**Solution**: 
- Wait a few minutes before trying again
- Consider upgrading API quota if needed

### Error Handling
The system includes fallback responses when Gemini AI is unavailable:
- Graceful degradation to basic responses
- Clear error messages to users
- Logging for debugging

## API Configuration

### Model Settings
- **Model**: `gemini-pro`
- **Max Tokens**: 1000
- **Temperature**: 0.7 (balanced creativity and consistency)
- **Context Window**: Maintains conversation history

### Customization
You can modify the AI personality by editing the system prompt in `geminiService.js`:

```javascript
{
    role: "user",
    parts: "You are MindfulBot, a supportive AI assistant focused on mental health and wellness..."
}
```

## Cost Considerations

### API Usage
- Gemini API has usage quotas and costs
- Monitor usage in Google AI Studio
- Consider implementing rate limiting for production

### Optimization
- Session management reduces API calls
- Efficient context handling
- Fallback responses for errors

## Future Enhancements

### Planned Features
- **Multi-language Support**: Expand to other languages
- **Voice Integration**: Add voice chat capabilities
- **Mood Tracking**: Integrate with existing mood tracker
- **Personalization**: Learn user preferences over time

### Technical Improvements
- **Response Caching**: Cache common responses
- **Advanced Analytics**: Track conversation patterns
- **A/B Testing**: Test different response styles
- **Performance Optimization**: Reduce response times

## Support

For technical support:
1. Check the troubleshooting section
2. Verify environment configuration
3. Test API key in Google AI Studio
4. Review error logs in console

## License
This integration uses Google's Gemini AI API and follows Google's terms of service. 