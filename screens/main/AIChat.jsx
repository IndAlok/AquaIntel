// Full-screen AI Assistant Chat Interface

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import {
  Text,
  TextInput,
  IconButton,
  Card,
  Avatar,
  Chip,
  ActivityIndicator,
  useTheme,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import Markdown from 'react-native-markdown-display';
import geminiAI from '../../services/geminiAI';
import { useAuth } from '../../store/AuthContext';

const AIChat = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const scrollViewRef = useRef(null);

  // Quick action suggestions
  const quickActions = [
    {
      icon: 'water',
      text: 'Water Level Trends',
      query: 'Show me the recent water level trends in my area',
    },
    {
      icon: 'weather-pouring',
      text: 'Rainfall Data',
      query: 'What is the rainfall prediction for this week?',
    },
    {
      icon: 'sprout',
      text: 'Irrigation Tips',
      query: 'Give me irrigation tips for current season',
    },
    {
      icon: 'shield-check',
      text: 'Water Quality',
      query: 'How is the water quality in my region?',
    },
  ];

  useEffect(() => {
    initializeChat();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initializeChat = async () => {
    try {
      const userContext = {
        name: user?.displayName || 'User',
        email: user?.email,
        role: 'Citizen',
        region: 'India',
      };

      await geminiAI.initialize(userContext);
      setIsInitialized(true);

      // Add welcome message
      setMessages([
        {
          id: Date.now().toString(),
          text: `Namaste ${userContext.name}! ðŸ™\n\nI'm your AquaIntel AI Assistant, here to help you understand groundwater data, rainfall patterns, and water management.\n\nHow can I assist you today?`,
          sender: 'ai',
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Failed to initialize AI:', error);
      setMessages([
        {
          id: Date.now().toString(),
          text: "Sorry, I'm having trouble connecting right now. Please try again later.",
          sender: 'ai',
          timestamp: new Date(),
          isError: true,
        },
      ]);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    Keyboard.dismiss();

    try {
      const response = await geminiAI.sendMessage(inputText.trim());

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI response error:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'ai',
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (query) => {
    setInputText(query);
  };

  const mdStyles = {
    body: { color: theme.colors.onSurfaceVariant, fontSize: 14 },
    heading1: { color: theme.colors.onSurface, fontWeight: 'bold', fontSize: 20, marginBottom: 8 },
    heading2: { color: theme.colors.onSurface, fontWeight: 'bold', fontSize: 18, marginBottom: 6 },
    heading3: { color: theme.colors.onSurface, fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
    strong: { fontWeight: 'bold', color: theme.colors.onSurface },
    em: { fontStyle: 'italic' },
    bullet_list: { marginVertical: 4 },
    ordered_list: { marginVertical: 4 },
    list_item: { marginVertical: 2 },
    link: { color: theme.colors.primary },
    blockquote: {
      backgroundColor: theme.colors.surfaceVariant,
      borderLeftWidth: 3,
      borderLeftColor: theme.colors.primary,
      paddingLeft: 12,
      marginVertical: 8,
    },
    code_inline: {
      backgroundColor: theme.colors.surfaceVariant,
      paddingHorizontal: 4,
      borderRadius: 4,
      fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    },
    fence: {
      backgroundColor: theme.colors.surfaceVariant,
      padding: 12,
      borderRadius: 8,
      marginVertical: 8,
    },
  };

  const renderMessage = (message, index) => {
    const isUser = message.sender === 'user';
    const isError = message.isError;
    const txtColor = isUser
      ? theme.colors.onPrimaryContainer
      : isError
        ? theme.colors.onErrorContainer
        : theme.colors.onSurfaceVariant;

    return (
      <Animatable.View
        key={message.id}
        animation="fadeInUp"
        duration={400}
        delay={index * 50}
        style={[styles.messageWrapper, isUser && styles.userMessageWrapper]}
      >
        {!isUser && (
          <Avatar.Icon
            size={32}
            icon="robot"
            style={[styles.avatar, { backgroundColor: theme.colors.primary }]}
          />
        )}
        <Card
          style={[
            styles.messageCard,
            {
              backgroundColor: isUser
                ? theme.colors.primaryContainer
                : isError
                  ? theme.colors.errorContainer || '#FFCDD2'
                  : theme.colors.surfaceVariant,
            },
          ]}
        >
          <Card.Content style={styles.messageContent}>
            {isUser ? (
              <Text variant="bodyMedium" style={{ color: txtColor }}>
                {message.text}
              </Text>
            ) : (
              <Markdown style={{ ...mdStyles, body: { ...mdStyles.body, color: txtColor } }}>
                {message.text}
              </Markdown>
            )}
            <Text
              variant="labelSmall"
              style={[styles.timestamp, { color: txtColor, opacity: 0.7 }]}
            >
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </Card.Content>
        </Card>
        {isUser && (
          <Avatar.Text
            size={32}
            label={user?.displayName?.substring(0, 2).toUpperCase() || 'U'}
            style={[styles.avatar, { backgroundColor: theme.colors.secondary }]}
          />
        )}
      </Animatable.View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Chat messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.length === 0 && !isInitialized ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
              <Text style={[styles.loadingText, { color: theme.colors.onSurface }]}>
                Initializing AI Assistant...
              </Text>
            </View>
          ) : (
            <>
              {messages.map((message, index) => renderMessage(message, index))}
              {isLoading && (
                <Animatable.View animation="fadeIn" style={styles.typingIndicator}>
                  <Avatar.Icon
                    size={32}
                    icon="robot"
                    style={[styles.avatar, { backgroundColor: theme.colors.primary }]}
                  />
                  <Card
                    style={[styles.messageCard, { backgroundColor: theme.colors.surfaceVariant }]}
                  >
                    <Card.Content style={styles.messageContent}>
                      <View style={styles.typingDots}>
                        <Animatable.View
                          animation="pulse"
                          iterationCount="infinite"
                          duration={1000}
                          style={[styles.dot, { backgroundColor: theme.colors.onSurfaceVariant }]}
                        />
                        <Animatable.View
                          animation="pulse"
                          iterationCount="infinite"
                          duration={1000}
                          delay={200}
                          style={[styles.dot, { backgroundColor: theme.colors.onSurfaceVariant }]}
                        />
                        <Animatable.View
                          animation="pulse"
                          iterationCount="infinite"
                          duration={1000}
                          delay={400}
                          style={[styles.dot, { backgroundColor: theme.colors.onSurfaceVariant }]}
                        />
                      </View>
                    </Card.Content>
                  </Card>
                </Animatable.View>
              )}
            </>
          )}
        </ScrollView>

        {/* Quick actions */}
        {messages.length <= 1 && (
          <Animatable.View animation="fadeInUp" delay={500} style={styles.quickActionsContainer}>
            <Text
              variant="labelMedium"
              style={[styles.quickActionsTitle, { color: theme.colors.onSurfaceVariant }]}
            >
              Quick Actions
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.quickActions}
            >
              {quickActions.map((action, index) => (
                <Chip
                  key={index}
                  icon={action.icon}
                  onPress={() => handleQuickAction(action.query)}
                  style={styles.quickActionChip}
                  mode="outlined"
                >
                  {action.text}
                </Chip>
              ))}
            </ScrollView>
          </Animatable.View>
        )}

        {/* Input area */}
        <View style={[styles.inputContainer, { backgroundColor: theme.colors.surface }]}>
          <TextInput
            mode="outlined"
            placeholder="Ask me anything about water data..."
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSend}
            multiline
            maxLength={500}
            style={styles.input}
            outlineColor={theme.colors.outline}
            activeOutlineColor={theme.colors.primary}
            disabled={!isInitialized || isLoading}
          />
          <IconButton
            icon="send"
            size={24}
            iconColor={theme.colors.primary}
            onPress={handleSend}
            disabled={!inputText.trim() || isLoading}
            style={styles.sendButton}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-end',
  },
  userMessageWrapper: {
    justifyContent: 'flex-end',
  },
  avatar: {
    marginHorizontal: 8,
  },
  messageCard: {
    maxWidth: '75%',
    elevation: 1,
  },
  messageContent: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  timestamp: {
    marginTop: 4,
    opacity: 0.7,
  },
  typingIndicator: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-end',
  },
  typingDots: {
    flexDirection: 'row',
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  quickActionsContainer: {
    padding: 16,
    paddingTop: 8,
  },
  quickActionsTitle: {
    marginBottom: 8,
  },
  quickActions: {
    gap: 8,
  },
  quickActionChip: {
    marginRight: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    alignItems: 'center',
    ...(Platform.select({
      web: { boxShadow: '0 -2px 8px rgba(0,0,0,0.1)' },
      default: {
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }) || {}),
  },
  input: {
    flex: 1,
    maxHeight: 100,
  },
  sendButton: {
    marginLeft: 8,
  },
});

export default AIChat;
