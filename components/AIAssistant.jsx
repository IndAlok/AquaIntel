// components/AIAssistant.jsx
// Floating AI Assistant Button with Chat Interface

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {
  FAB,
  Portal,
  Modal,
  Text,
  TextInput,
  Card,
  Chip,
  IconButton,
  ActivityIndicator,
  useTheme,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import geminiAI from '../services/geminiAI';

const AIAssistant = ({ userContext, appState, visible = true }) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const scrollViewRef = useRef(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Pulsing animation for FAB
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    return () => pulse.stop();
  }, []);

  // Initialize AI when modal opens
  useEffect(() => {
    if (isOpen && !isInitialized) {
      initializeAI();
    }
  }, [isOpen]);

  const initializeAI = async () => {
    try {
      await geminiAI.initialize(userContext);
      setMessages([
        {
          id: '1',
          role: 'model',
          content: `Hello${userContext?.name ? ` ${userContext.name}` : ''}! 👋\n\nI'm your AquaIntel AI Assistant. I can help you with:\n\n💧 Water level trends\n🌧️ Rainfall forecasts\n🌾 Irrigation advice\n💡 Conservation tips\n📊 Data interpretation\n\nWhat would you like to know?`,
          timestamp: new Date(),
        },
      ]);
      setIsInitialized(true);
    } catch (error) {
      console.error('AI initialization error:', error);
      setMessages([
        {
          id: '1',
          role: 'error',
          content: 'Sorry, AI Assistant is currently unavailable. Please check your API key configuration.',
          timestamp: new Date(),
        },
      ]);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText.trim();
    setInputText('');

    // Add user message
    const newUserMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newUserMessage]);

    // Show loading
    setIsLoading(true);

    try {
      // Send to AI with app context
      const response = await geminiAI.sendMessage(userMessage, appState);

      // Add AI response
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Send message error:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: 'error',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  const handleQuickQuestion = (question) => {
    setInputText(question.replace(/^[💧🌧️🌾💡📊🏞️⚠️🔍]\s/, '')); // Remove emoji
  };

  const handleClearChat = async () => {
    await geminiAI.clearChatHistory();
    setMessages([]);
    setIsInitialized(false);
    initializeAI();
  };

  const quickQuestions = geminiAI.getQuickQuestions(userContext?.region);
  const suggestions = geminiAI.getSuggestions(appState);

  if (!visible) return null;

  return (
    <>
      {/* Floating Action Button */}
      <Animated.View
        style={[
          styles.fabContainer,
          { transform: [{ scale: pulseAnim }] },
        ]}
      >
        <FAB
          icon="robot"
          label="AI Assistant"
          onPress={() => setIsOpen(true)}
          style={[
            styles.fab,
            { backgroundColor: theme.colors.primary },
          ]}
          color="#fff"
          animated
        />
      </Animated.View>

      {/* Chat Modal */}
      <Portal>
        <Modal
          visible={isOpen}
          onDismiss={() => setIsOpen(false)}
          contentContainerStyle={[
            styles.modalContainer,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}
          >
            {/* Header */}
            <View
              style={[
                styles.header,
                { backgroundColor: theme.colors.primary },
              ]}
            >
              <View style={styles.headerLeft}>
                <MaterialCommunityIcons name="robot" size={28} color="#fff" />
                <View style={styles.headerText}>
                  <Text variant="titleMedium" style={styles.headerTitle}>
                    AI Assistant
                  </Text>
                  <Text variant="bodySmall" style={styles.headerSubtitle}>
                    Powered by Gemini Flash 2.5
                  </Text>
                </View>
              </View>
              <View style={styles.headerRight}>
                <IconButton
                  icon="refresh"
                  iconColor="#fff"
                  size={20}
                  onPress={handleClearChat}
                />
                <IconButton
                  icon="close"
                  iconColor="#fff"
                  size={24}
                  onPress={() => setIsOpen(false)}
                />
              </View>
            </View>

            {/* Messages */}
            <ScrollView
              ref={scrollViewRef}
              style={styles.messagesContainer}
              contentContainerStyle={styles.messagesContent}
              onContentSizeChange={() =>
                scrollViewRef.current?.scrollToEnd({ animated: true })
              }
            >
              {messages.map((message, index) => (
                <Animatable.View
                  key={message.id}
                  animation="fadeInUp"
                  duration={300}
                  delay={index * 50}
                >
                  {message.role === 'user' ? (
                    <View style={styles.userMessageContainer}>
                      <Card
                        style={[
                          styles.userMessage,
                          { backgroundColor: theme.colors.primary },
                        ]}
                      >
                        <Card.Content>
                          <Text style={styles.userMessageText}>
                            {message.content}
                          </Text>
                        </Card.Content>
                      </Card>
                    </View>
                  ) : (
                    <View style={styles.aiMessageContainer}>
                      <MaterialCommunityIcons
                        name="robot"
                        size={24}
                        color={theme.colors.primary}
                        style={styles.aiIcon}
                      />
                      <Card
                        style={[
                          styles.aiMessage,
                          {
                            backgroundColor: theme.colors.surfaceVariant,
                          },
                        ]}
                      >
                        <Card.Content>
                          <Text
                            style={[
                              styles.aiMessageText,
                              { color: theme.colors.onSurface },
                            ]}
                          >
                            {message.content}
                          </Text>
                        </Card.Content>
                      </Card>
                    </View>
                  )}
                </Animatable.View>
              ))}

              {isLoading && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color={theme.colors.primary} />
                  <Text style={styles.loadingText}>AI is thinking...</Text>
                </View>
              )}
            </ScrollView>

            {/* Quick Questions */}
            {messages.length === 1 && !isLoading && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.quickQuestionsContainer}
                contentContainerStyle={styles.quickQuestionsContent}
              >
                {[...suggestions, ...quickQuestions.slice(0, 4)].map((question, index) => (
                  <Chip
                    key={index}
                    mode="outlined"
                    style={styles.quickChip}
                    onPress={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </Chip>
                ))}
              </ScrollView>
            )}

            {/* Input */}
            <View
              style={[
                styles.inputContainer,
                { backgroundColor: theme.colors.surface },
              ]}
            >
              <TextInput
                mode="outlined"
                placeholder="Ask me anything about water management..."
                value={inputText}
                onChangeText={setInputText}
                style={styles.input}
                multiline
                maxLength={500}
                right={
                  <TextInput.Icon
                    icon="send"
                    onPress={handleSendMessage}
                    disabled={!inputText.trim() || isLoading}
                    color={
                      inputText.trim() && !isLoading
                        ? theme.colors.primary
                        : theme.colors.outline
                    }
                  />
                }
                onSubmitEditing={handleSendMessage}
              />
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: 80,
    right: 16,
    zIndex: 1000,
  },
  fab: {
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  modalContainer: {
    margin: 20,
    borderRadius: 16,
    maxHeight: '90%',
    overflow: 'hidden',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerText: {
    marginLeft: 12,
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#fff',
    opacity: 0.8,
    fontSize: 11,
  },
  headerRight: {
    flexDirection: 'row',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  userMessageContainer: {
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  userMessage: {
    maxWidth: '80%',
    elevation: 2,
  },
  userMessageText: {
    color: '#fff',
  },
  aiMessageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  aiIcon: {
    marginRight: 8,
    marginTop: 8,
  },
  aiMessage: {
    flex: 1,
    maxWidth: '80%',
    elevation: 1,
  },
  aiMessageText: {
    lineHeight: 20,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 12,
    opacity: 0.6,
  },
  quickQuestionsContainer: {
    maxHeight: 50,
    marginBottom: 8,
  },
  quickQuestionsContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  quickChip: {
    marginRight: 8,
  },
  inputContainer: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  input: {
    maxHeight: 100,
  },
});

export default AIAssistant;
