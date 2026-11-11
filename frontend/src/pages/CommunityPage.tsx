import React, { useCallback, useEffect, useState } from 'react';
import { apiRequest, type ApiPost } from '../api';
import { useAuth } from '../auth/useAuth';
import CommunityHero from '../components/CommunityHero';
import CategoryTabs from '../components/CategoryTabs';
import CreatePostBox from '../components/CreatePostBox';
import FeedPost from '../components/FeedPost';
import TrendingSidebar from '../components/TrendingSidebar';
import FeaturedCreators from '../components/FeaturedCreators';
import ColorOfMonth from '../components/ColorOfMonth';

const demoPosts = [
  {
    authorInitials: 'MA',
    authorName: 'Minh Anh Atelier',
    authorBadge: 'Boutique',
    time: '2 giờ trước',
    category: 'Cảm hứng mùa mới',
    title: 'Hơi thở mùa xuân: Pastel Baby Blue & Khăn lụa tơ tằm',
    description: 'Sự giao thoa giữa phom dáng blazer vai mềm màu xanh pastel nhạt cùng chất liệu lụa satin tự nhiên.',
    tags: ['#Pastel', '#SilkChic', '#SpringAtelier'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfBD1Nlm66RQthn86kGsAoBi3C4nBg6nPnuWnqHp6MBGbN5s1ZRUYJU384eO0Sii08M1eLE_yhRhJmtKtf5PBB3ct0hJ9BD-fdINXNgrJShwgthkt_5ABa2_bH8maQAZkeUfJJqZs_9BmhMRzXBpdNHn0gN8OFLg5_EsJsyFGqQPr-i1TlMRXF_v8SqGmhtcbkRBMAlhYFqb23WhPezo3YLCIIS6_HU4xkSItTCAs',
    likes: '1.2k',
    inspires: '840',
    stars: '512',
    sparkles: '340',
    comments: '18',
    commentsList: [
      { initials: 'TL', name: 'Thảo Linh', time: '15 phút trước', text: 'Gam màu phối quá thơ, có link váy và khăn lụa không bạn ơi?' },
      { initials: 'KH', name: 'Khánh Huyền', time: '40 phút trước', text: 'Phần xếp ly tinh tế lắm!' },
    ],
  },
  {
    authorInitials: 'LD',
    authorName: 'Linh Đan Fashion',
    authorBadge: 'Stylist Top 1',
    time: '5 giờ trước',
    category: 'Gala Soirée Outfit',
    title: 'Moonlight Romance: Đầm trễ vai ánh trăng dạ tiệc',
    description: 'Lấy cảm hứng từ ánh trăng rọi qua màn sương đêm.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAW-CZRsLaU8QmD-laWNYQAx_go4jycs_fKyclWrA1KXG2H03iyJ7Ru-MyNee6YBeebIG0ro6LPGGJ5Rw_-O-aCNnNucw9wCbhfmixhOVF-lWQeiGWjbGLAoVkz1yr67PrjPPOQZO9_GsoPU6Izrro8zPJ_xS_kVQkztzhgEkg7JrHUxNo1cVH69Cx06D6I6WeX1jWjqZokMqddgwj5uGqgjnhO8r0k0UfF1bJZtD0',
    likes: '2.4k',
    inspires: '980',
    stars: '426',
    sparkles: '0',
    comments: '45',
    outfitBreakdown: [
      { item: 'Váy satin vàng trăng', brand: 'Aura Atelier' },
      { item: 'Giày Mary Jane ngọc trai', brand: 'Classic Line' },
    ],
  },
];

const initials = (name: string) => name
  .split(/\s+/)
  .filter(Boolean)
  .slice(-2)
  .map((part) => part[0]?.toUpperCase() ?? '')
  .join('');

const formatTime = (date: string) => new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
}).format(new Date(date));

const CommunityPage: React.FC = () => {
  const { accessToken, user } = useAuth();
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let active = true;
    apiRequest<ApiPost[]>('/posts', { accessToken })
      .then((feed) => {
        if (!active) return;
        setPosts(feed);
        setLoadError('');
      })
      .catch((error: unknown) => {
        if (!active) return;
        setLoadError(error instanceof Error ? error.message : 'Could not load community posts.');
      });
    return () => {
      active = false;
    };
  }, [accessToken]);

  const loadPosts = useCallback(async () => {
    try {
      const feed = await apiRequest<ApiPost[]>('/posts', { accessToken });
      setPosts(feed);
      setLoadError('');
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : 'Could not load community posts.');
    }
  }, [accessToken]);

  const toggleLike = async (postId: string, liked: boolean) => {
    if (!user || !accessToken) throw new Error('Sign in to like a post.');
    await apiRequest(`/posts/${postId}/like`, {
      method: liked ? 'PUT' : 'DELETE',
      accessToken,
    });
    await loadPosts();
  };

  const addComment = async (postId: string, text: string) => {
    if (!user || !accessToken) throw new Error('Sign in to comment on a post.');
    await apiRequest(`/posts/${postId}/comments`, {
      method: 'POST',
      accessToken,
      body: { body: text },
    });
    await loadPosts();
  };

  return (
    <>
      <CommunityHero />
      <CategoryTabs />
      <CreatePostBox onCreated={loadPosts} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 lg:w-2/3">
            {loadError && <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{loadError}</p>}
            {posts.length > 0 ? posts.map((post) => {
              const authorName = post.author?.display_name ?? 'Aura creator';
              return (
                <FeedPost
                  key={post.id}
                  postId={post.id}
                  authorInitials={initials(authorName)}
                  authorName={authorName}
                  time={formatTime(post.created_at)}
                  category={post.category}
                  title={post.title}
                  description={post.description}
                  tags={post.tags}
                  image={post.image_url ?? ''}
                  likes={String(post.like_count)}
                  inspires="0"
                  stars="0"
                  sparkles="0"
                  comments={String(post.comments.length)}
                  commentsList={post.comments.slice(0, 5).map((comment) => ({
                    initials: initials(comment.author?.display_name ?? 'Creator'),
                    name: comment.author?.display_name ?? 'Creator',
                    time: formatTime(comment.created_at),
                    text: comment.body,
                  }))}
                  isLiked={post.liked_by_me}
                  commentsEnabled={post.comments_enabled}
                  onToggleLike={toggleLike}
                  onComment={addComment}
                />
              );
            }) : demoPosts.map((post) => <FeedPost key={post.title} {...post} />)}
          </div>
          <div className="lg:w-1/3">
            <TrendingSidebar />
            <FeaturedCreators />
            <ColorOfMonth />
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityPage;
