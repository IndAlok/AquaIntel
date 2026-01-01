import { GoogleGenerativeAI } from '@google/generative-ai';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY = Constants.expoConfig?.extra?.geminiApiKey || process.env.EXPO_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn('\u{26A0}\u{FE0F} Gemini API Key not found. AI Assistant will not work.');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

const EMOJI = {
  water: '\u{1F4A7}',
  rain: '\u{1F327}\u{FE0F}',
  plant: '\u{1F33E}',
  bulb: '\u{1F4A1}',
  chart: '\u{1F4CA}',
  landscape: '\u{1F3DE}\u{FE0F}',
  warning: '\u{26A0}\u{FE0F}',
  pin: '\u{1F4CD}',
  bell: '\u{1F514}',
  sun: '\u{2600}\u{FE0F}',
  check: '\u{2705}',
};

const getSystemPrompt = (userContext) => {
  const { name, region, district, state, role, preferences } = userContext || {};
  
  return `You are AquaIntel AI Assistant, an expert groundwater management advisor for India.

**Your Role:**
- You are a specialized AI assistant for the AquaIntel app by the Ministry of Jal Shakti
- Help users understand groundwater data, water levels, rainfall patterns, and make informed decisions
- Provide personalized insights based on user's region and data
- Use simple, clear language suitable for farmers, officials, and citizens
- Always be helpful, accurate, and supportive

**User Context:**
${name ? `- User Name: ${name}` : ''}
${region ? `- Region: ${region}` : ''}
${district ? `- District: ${district}` : ''}
${state ? `- State: ${state}` : ''}
${role ? `- Role: ${role}` : ''}

**Knowledge Base:**
- Indian groundwater monitoring systems (WRIS, NWIC, CGWB)
- Monsoon patterns and rainfall data
- Water table levels and aquifer management
- Irrigation best practices
- Water conservation techniques
- Government schemes (Jal Jeevan Mission, Atal Bhujal Yojana)
- Regional water quality issues
- Drought and flood management

**Guidelines:**
1. Always provide data-driven, scientifically accurate responses
2. Use simple language, avoid jargon
3. When discussing water levels, use local units (meters, feet)
4. Provide actionable advice specific to the user's region
5. Cite government sources when relevant (CGWB, IMD, MoJS)
6. Be empathetic about water scarcity issues
7. Encourage sustainable water use
8. If you don't know something, admit it and suggest checking official sources

**Response Style:**
- Keep responses concise (2-4 paragraphs max)
- Use bullet points for lists
- Include emojis sparingly for better readability
- End with a helpful suggestion or question

**Topics You Can Help With:**
${EMOJI.check} Water level trends and forecasts
${EMOJI.check} Rainfall data interpretation
${EMOJI.check} Irrigation scheduling
${EMOJI.check} Water conservation tips
${EMOJI.check} Government scheme information
${EMOJI.check} Emergency water management
${EMOJI.check} Crop-specific water requirements
${EMOJI.check} Borewell and well management
${EMOJI.check} Water quality concerns
${EMOJI.check} Recharge pit construction

Remember: You're here to empower users with water intelligence! ${EMOJI.water}`;
};

const CHAT_HISTORY_KEY = '@aquaintel_chat_history';

class GeminiAIService {
  constructor() {
    this.model = null;
    this.chat = null;
    this.userContext = {};
  }

  async initialize(userContext = {}) {
    if (!genAI) {
      throw new Error('Gemini AI not configured. Please add EXPO_PUBLIC_GEMINI_API_KEY to your environment.');
    }

    this.userContext = userContext;
    
    this.model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash-exp',
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 1024,
      },
      safetySettings: [
        {
          category: 'HARM_CATEGORY_HARASSMENT',
          threshold: 'BLOCK_NONE',
        },
        {
          category: 'HARM_CATEGORY_HATE_SPEECH',
          threshold: 'BLOCK_NONE',
        },
      ],
    });

    const history = await this.loadChatHistory();
    
    this.chat = this.model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: getSystemPrompt(userContext) }],
        },
        {
          role: 'model',
          parts: [{ text: `Hello! I'm your AquaIntel AI Assistant. I'm here to help you with groundwater data, water management, and conservation. What would you like to know? ${EMOJI.water}` }],
        },
        ...history.map(({ role, parts }) => ({ role, parts })),
      ],
    });

    return true;
  }

  async sendMessage(userMessage, additionalContext = {}) {
    if (!this.chat) {
      await this.initialize(this.userContext);
    }

    try {
      let contextualMessage = userMessage;
      if (Object.keys(additionalContext).length > 0) {
        contextualMessage += `\n\n[Current Context: ${JSON.stringify(additionalContext)}]`;
      }

      const result = await this.chat.sendMessage(contextualMessage);
      const response = result.response.text();

      await this.saveChatMessage('user', userMessage);
      await this.saveChatMessage('model', response);

      return response;
    } catch (error) {
      console.error('Gemini AI Error:', error);
      
      if (error.message?.includes('quota')) {
        return 'Sorry, the AI service quota has been exceeded. Please try again later or contact support.';
      }
      
      if (error.message?.includes('API key')) {
        return 'AI service is not configured properly. Please check your API key.';
      }

      return 'Sorry, I encountered an error. Please try again.';
    }
  }

  async saveChatMessage(role, content) {
    try {
      const history = await this.loadChatHistory();
      history.push({
        role,
        parts: [{ text: content }],
        timestamp: new Date().toISOString(),
      });

      const recentHistory = history.slice(-50);
      await AsyncStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(recentHistory));
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  }

  async loadChatHistory() {
    try {
      const historyJson = await AsyncStorage.getItem(CHAT_HISTORY_KEY);
      return historyJson ? JSON.parse(historyJson) : [];
    } catch (error) {
      console.error('Error loading chat history:', error);
      return [];
    }
  }

  async clearChatHistory() {
    try {
      await AsyncStorage.removeItem(CHAT_HISTORY_KEY);
      this.chat = null;
      await this.initialize(this.userContext);
    } catch (error) {
      console.error('Error clearing chat history:', error);
    }
  }

  updateUserContext(newContext) {
    this.userContext = { ...this.userContext, ...newContext };
  }

  getQuickQuestions(region) {
    const questions = [
      `${EMOJI.water} What is the current water level trend in my area?`,
      `${EMOJI.rain} How much rainfall is expected this month?`,
      `${EMOJI.plant} When should I irrigate my crops?`,
      `${EMOJI.bulb} How can I conserve groundwater?`,
      `${EMOJI.chart} Explain my water table data`,
      `${EMOJI.landscape} Are there any government schemes for water management?`,
      `${EMOJI.warning} What should I do during water shortage?`,
      `${EMOJI.pin} How to check water quality?`,
    ];

    return questions;
  }

  getSuggestions(appState) {
    const { waterLevel, rainfall, season, alerts } = appState || {};
    const suggestions = [];

    if (waterLevel?.status === 'critical') {
      suggestions.push(`${EMOJI.warning} Your water level is critical. What can I do?`);
    }

    if (rainfall?.isDeficit) {
      suggestions.push(`${EMOJI.rain} Low rainfall detected. How to manage water?`);
    }

    if (alerts?.length > 0) {
      suggestions.push(`${EMOJI.bell} Explain my current alerts`);
    }

    if (season === 'summer') {
      suggestions.push(`${EMOJI.sun} Summer water conservation tips`);
    }

    if (season === 'monsoon') {
      suggestions.push(`${EMOJI.rain} How to harvest rainwater?`);
    }

    return suggestions;
  }
}

const geminiAI = new GeminiAIService();

export default geminiAI;
export { GeminiAIService };
