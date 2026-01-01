import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
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
import Markdown from 'react-native-markdown-display';
import geminiAI from '../services/geminiAI';

const USE_NATIVE_DRIVER = Platform.OS !== 'web';

const WELCOME_EMOJIS = {
  wave: '\u{1F44B}',
  water: '\u{1F4A7}',
  rain: '\u{1F327}\u{FE0F}',
  plant: '\u{1F33E}',
  bulb: '\u{1F4A1}',
  chart: '\u{1F4CA}',
};

const getWelcomeMessage = (userName) => {
  const greeting = userName ? `Hello ${userName}!` : 'Hello!';
  return `${greeting} ${WELCOME_EMOJIS.wave}

I'm your AquaIntel AI Assistant. I can help you with:

${WELCOME_EMOJIS.water} Water level trends
${WELCOME_EMOJIS.rain} Rainfall forecasts
${WELCOME_EMOJIS.plant} Irrigation advice
${WELCOME_EMOJIS.bulb} Conservation tips
${WELCOME_EMOJIS.chart} Data interpretation

What would you like to know?`;
};

const AIAssistant = ({ userContext, appState, visible = true }) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const scrollViewRef = useRef(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const markdownStyles = useMemo(
    () => ({
      body: {
        color: theme.colors.onSurface,
        fontSize: 14,
        lineHeight: 20,
      },
      paragraph: {
        marginTop: 0,
        marginBottom: 8,
      },
      heading1: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: theme.colors.onSurface,
      },
      heading2: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 6,
        color: theme.colors.onSurface,
      },
      heading3: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        color: theme.colors.onSurface,
      },
      strong: {
        fontWeight: 'bold',
      },
      em: {
        fontStyle: 'italic',
      },
      bullet_list: {
        marginVertical: 4,
      },
      ordered_list: {
        marginVertical: 4,
      },
      list_item: {
        marginVertical: 2,
      },
      code_inline: {
        backgroundColor: theme.colors.surfaceVariant,
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 4,
        fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
        fontSize: 13,
      },
      code_block: {
        backgroundColor: theme.colors.surfaceVariant,
        padding: 12,
        borderRadius: 8,
        fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
        fontSize: 13,
        marginVertical: 8,
      },
      fence: {
        backgroundColor: theme.colors.surfaceVariant,
        padding: 12,
        borderRadius: 8,
        fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
        fontSize: 13,
        marginVertical: 8,
      },
      blockquote: {
        borderLeftWidth: 4,
        borderLeftColor: theme.colors.primary,
        paddingLeft: 12,
        marginVertical: 8,
        opacity: 0.8,
      },
      link: {
        color: theme.colors.primary,
        textDecorationLine: 'underline',
      },
      hr: {
        backgroundColor: theme.colors.outline,
        height: 1,
        marginVertical: 12,
      },
      table: {
        borderWidth: 1,
        borderColor: theme.colors.outline,
        borderRadius: 4,
        marginVertical: 8,
      },
      thead: {
        backgroundColor: theme.colors.surfaceVariant,
      },
      th: {
        padding: 8,
        fontWeight: 'bold',
      },
      td: {
        padding: 8,
        borderTopWidth: 1,
        borderColor: theme.colors.outline,
      },
    }),
    [theme]
  );

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: USE_NATIVE_DRIVER,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: USE_NATIVE_DRIVER,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

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
          content: getWelcomeMessage(userContext?.name),
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
          content:
            'Sorry, AI Assistant is currently unavailable. Please check your API key configuration.',
          timestamp: new Date(),
        },
      ]);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText.trim();
    setInputText('');

    const newUserMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await geminiAI.sendMessage(userMessage, appState);
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
    const cleanQuestion = question.replace(
      /^[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]\s*/u,
      ''
    );
    setInputText(cleanQuestion);
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
      <Animated.View style={[styles.fabContainer, { transform: [{ scale: pulseAnim }] }]}>
        <FAB
          icon="robot"
          label="AquaIntel AI"
          onPress={() => setIsOpen(true)}
          style={[styles.fab, { backgroundColor: theme.colors.primary }]}
          color="#fff"
          animated
        />
      </Animated.View>

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
            <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
              <View style={styles.headerLeft}>
                <MaterialCommunityIcons name="robot" size={28} color="#fff" />
                <View style={styles.headerText}>
                  <Text variant="titleMedium" style={styles.headerTitle}>
                    AquaIntel AI
                  </Text>
                  <Text variant="bodySmall" style={styles.headerSubtitle}>
                    Powered by Gemini Flash 2.5
                  </Text>
                </View>
              </View>
              <View style={styles.headerRight}>
                <IconButton icon="refresh" iconColor="#fff" size={20} onPress={handleClearChat} />
                <IconButton
                  icon="close"
                  iconColor="#fff"
                  size={24}
                  onPress={() => setIsOpen(false)}
                />
              </View>
            </View>

            <ScrollView
              ref={scrollViewRef}
              style={styles.messagesContainer}
              contentContainerStyle={styles.messagesContent}
              onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
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
                      <Card style={[styles.userMessage, { backgroundColor: theme.colors.primary }]}>
                        <Card.Content>
                          <Text style={styles.userMessageText}>{message.content}</Text>
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
                        style={[styles.aiMessage, { backgroundColor: theme.colors.surfaceVariant }]}
                      >
                        <Card.Content style={styles.aiMessageContent}>
                          <Markdown style={markdownStyles}>{message.content}</Markdown>
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

            <View style={[styles.inputContainer, { backgroundColor: theme.colors.surface }]}>
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
                      inputText.trim() && !isLoading ? theme.colors.primary : theme.colors.outline
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
    ...(Platform.select({
      web: { boxShadow: '0 4px 12px rgba(0,0,0,0.2)' },
      default: {
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
    }) || {}),
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
  aiMessageContent: {
    paddingVertical: 4,
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
