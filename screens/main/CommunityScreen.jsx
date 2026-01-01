import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import {
  Text,
  Card,
  Avatar,
  Chip,
  Button,
  FAB,
  useTheme,
  Searchbar,
  SegmentedButtons,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const CommunityScreen = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  const posts = [
    {
      id: '1',
      author: 'Ramesh Kumar',
      authorRole: 'Farmer',
      avatar: 'RK',
      category: 'discussion',
      title: 'Water Level Improvement Tips',
      content: 'After implementing recharge pits in my village, we saw 2m improvement in water table within 6 months. Happy to share details!',
      time: '2 hours ago',
      likes: 24,
      comments: 8,
      tags: ['Best Practice', 'Recharge'],
      trending: true,
    },
    {
      id: '2',
      author: 'Dr. Priya Sharma',
      authorRole: 'Hydrologist',
      avatar: 'PS',
      category: 'expert',
      title: 'Understanding Aquifer Dynamics',
      content: 'Many farmers ask about optimal extraction rates. Here\'s a simple guide based on aquifer type and recharge patterns...',
      time: '5 hours ago',
      likes: 45,
      comments: 12,
      tags: ['Expert Advice', 'Education'],
      trending: false,
    },
    {
      id: '3',
      author: 'Vikram Singh',
      authorRole: 'Block Officer',
      avatar: 'VS',
      category: 'announcement',
      title: 'New Monitoring Stations in Jaipur',
      content: 'Excited to announce 10 new groundwater monitoring stations in Jaipur district. Real-time data coming soon!',
      time: '1 day ago',
      likes: 67,
      comments: 15,
      tags: ['Announcement', 'Infrastructure'],
      trending: true,
    },
    {
      id: '4',
      author: 'Meera Patel',
      authorRole: 'Environmental Activist',
      avatar: 'MP',
      category: 'discussion',
      title: 'Rainwater Harvesting Success Story',
      content: 'Our community in Gujarat collected 50,000 liters last monsoon using simple rooftop harvesting. Step-by-step guide available!',
      time: '2 days ago',
      likes: 89,
      comments: 23,
      tags: ['Success Story', 'Harvesting'],
      trending: true,
    },
    {
      id: '5',
      author: 'Suresh Yadav',
      authorRole: 'Farmer',
      avatar: 'SY',
      category: 'question',
      title: 'Need Help: Declining Borewell Yield',
      content: 'My borewell yield has dropped from 500L/hr to 200L/hr in past year. What could be the reasons? Any solutions?',
      time: '3 days ago',
      likes: 12,
      comments: 18,
      tags: ['Help Needed', 'Borewell'],
      trending: false,
    },
    {
      id: '6',
      author: 'Dr. Anjali Verma',
      authorRole: 'CGWB Scientist',
      avatar: 'AV',
      category: 'expert',
      title: 'Monsoon 2025 Outlook',
      content: 'Based on IMD forecasts, we expect normal to above-normal monsoon this year. Here\'s what it means for groundwater recharge...',
      time: '5 days ago',
      likes: 156,
      comments: 34,
      tags: ['Expert Advice', 'Forecast'],
      trending: false,
    },
  ];

  const categoryButtons = [
    { value: 'all', label: 'All Posts' },
    { value: 'discussion', label: 'Discussions' },
    { value: 'expert', label: 'Expert' },
    { value: 'question', label: 'Questions' },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const getFilteredPosts = () => {
    let filtered = posts;

    if (filterCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === filterCategory);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return filtered;
  };

  const filteredPosts = getFilteredPosts();

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'discussion':
        return 'forum';
      case 'expert':
        return 'shield-star';
      case 'announcement':
        return 'bullhorn';
      case 'question':
        return 'help-circle';
      default:
        return 'post';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'discussion':
        return theme.colors.primary;
      case 'expert':
        return theme.colors.tertiary;
      case 'announcement':
        return '#FF9800';
      case 'question':
        return theme.colors.secondary;
      default:
        return theme.colors.outline;
    }
  };

  const renderPost = (post, index) => {
    return (
      <Animatable.View
        key={post.id}
        animation="fadeInUp"
        duration={500}
        delay={index * 100}
      >
        <Card style={styles.postCard}>
          <Card.Content>
            <View style={styles.authorHeader}>
              <Avatar.Text
                size={40}
                label={post.avatar}
                style={{ backgroundColor: getCategoryColor(post.category) }}
              />
              <View style={styles.authorInfo}>
                <Text variant="titleSmall" style={{ color: theme.colors.onSurface }}>
                  {post.author}
                </Text>
                <View style={styles.authorMeta}>
                  <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                    {post.authorRole}
                  </Text>
                  <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                    {' â€¢ ' + post.time}
                  </Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name={getCategoryIcon(post.category)}
                size={24}
                color={getCategoryColor(post.category)}
              />
            </View>

            <View style={styles.postContent}>
              <View style={styles.titleRow}>
                <Text variant="titleMedium" style={{ color: theme.colors.onSurface, flex: 1 }}>
                  {post.title}
                </Text>
                {post.trending && (
                  <Chip
                    icon="trending-up"
                    compact
                    style={[styles.trendingChip, { backgroundColor: theme.colors.errorContainer }]}
                    textStyle={{ fontSize: 10, color: theme.colors.onErrorContainer }}
                  >
                    Trending
                  </Chip>
                )}
              </View>

              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onSurfaceVariant, marginTop: 8 }}
                numberOfLines={3}
              >
                {post.content}
              </Text>

              <View style={styles.tagsContainer}>
                {post.tags.map((tag, tagIndex) => (
                  <Chip
                    key={tagIndex}
                    compact
                    style={styles.tag}
                    textStyle={{ fontSize: 11 }}
                  >
                    {tag}
                  </Chip>
                ))}
              </View>
            </View>

            <View style={styles.actionsContainer}>
              <Button
                icon="thumb-up-outline"
                mode="text"
                compact
                onPress={() => {}}
                style={styles.actionButton}
              >
                {post.likes}
              </Button>
              <Button
                icon="comment-outline"
                mode="text"
                compact
                onPress={() => {}}
                style={styles.actionButton}
              >
                {post.comments}
              </Button>
              <Button
                icon="share-variant"
                mode="text"
                compact
                onPress={() => {}}
                style={styles.actionButton}
              >
                Share
              </Button>
            </View>
          </Card.Content>
        </Card>
      </Animatable.View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Animatable.View animation="fadeInDown" duration={600}>
        <Card style={[styles.headerCard, { backgroundColor: theme.colors.primaryContainer }]}>
          <Card.Content style={styles.headerContent}>
            <View style={styles.headerItem}>
              <MaterialCommunityIcons
                name="account-group"
                size={32}
                color={theme.colors.onPrimaryContainer}
              />
              <Text variant="headlineSmall" style={{ color: theme.colors.onPrimaryContainer, fontWeight: 'bold' }}>
                1,234
              </Text>
              <Text variant="bodySmall" style={{ color: theme.colors.onPrimaryContainer }}>
                Members
              </Text>
            </View>
            <View style={styles.headerItem}>
              <MaterialCommunityIcons
                name="post"
                size={32}
                color={theme.colors.onPrimaryContainer}
              />
              <Text variant="headlineSmall" style={{ color: theme.colors.onPrimaryContainer, fontWeight: 'bold' }}>
                {posts.length}
              </Text>
              <Text variant="bodySmall" style={{ color: theme.colors.onPrimaryContainer }}>
                Posts
              </Text>
            </View>
            <View style={styles.headerItem}>
              <MaterialCommunityIcons
                name="trending-up"
                size={32}
                color={theme.colors.onPrimaryContainer}
              />
              <Text variant="headlineSmall" style={{ color: theme.colors.onPrimaryContainer, fontWeight: 'bold' }}>
                {posts.filter((p) => p.trending).length}
              </Text>
              <Text variant="bodySmall" style={{ color: theme.colors.onPrimaryContainer }}>
                Trending
              </Text>
            </View>
          </Card.Content>
        </Card>
      </Animatable.View>

      <Animatable.View animation="fadeIn" delay={200} duration={600}>
        <View style={styles.controlsContainer}>
          <Searchbar
            placeholder="Search posts, tags, authors..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
            elevation={1}
          />
          <SegmentedButtons
            value={filterCategory}
            onValueChange={setFilterCategory}
            buttons={categoryButtons}
            style={styles.segmentedButtons}
          />
        </View>
      </Animatable.View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {filteredPosts.length === 0 ? (
          <Animatable.View animation="fadeIn" style={styles.emptyContainer}>
            <MaterialCommunityIcons
              name="post-outline"
              size={64}
              color={theme.colors.outline}
            />
            <Text variant="titleMedium" style={{ color: theme.colors.onSurfaceVariant, marginTop: 16 }}>
              No posts found
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.outline, marginTop: 8 }}>
              {searchQuery ? 'Try different search terms' : 'Be the first to post!'}
            </Text>
          </Animatable.View>
        ) : (
          filteredPosts.map((post, index) => renderPost(post, index))
        )}
      </ScrollView>

      <FAB
        icon="plus"
        label="New Post"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerCard: {
    margin: 16,
    marginBottom: 8,
    elevation: 2,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  headerItem: {
    alignItems: 'center',
    flex: 1,
  },
  controlsContainer: {
    padding: 16,
    paddingTop: 8,
  },
  searchBar: {
    marginBottom: 12,
  },
  segmentedButtons: {
    marginBottom: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 8,
    paddingBottom: 80,
  },
  postCard: {
    marginBottom: 16,
    elevation: 2,
  },
  authorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorInfo: {
    flex: 1,
    marginLeft: 12,
  },
  authorMeta: {
    flexDirection: 'row',
    marginTop: 2,
  },
  postContent: {
    marginTop: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  trendingChip: {
    height: 24,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 6,
  },
  tag: {
    height: 24,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: 12,
    marginLeft: -8,
  },
  actionButton: {
    marginRight: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default CommunityScreen;
