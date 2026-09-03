"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare, Users, TrendingUp, Clock, Search, Filter,
  ChevronDown, ChevronUp, Heart, MessageCircle, Share2, Bookmark,
  MoreHorizontal, Plus, X, User, Calendar, MapPin, Link as LinkIcon,
  Image as ImageIcon, Send, Bell, Star, Award, Zap, Target,
  CheckCircle2
} from 'lucide-react';

// --- Types ---

type Category = 'general' | 'product-updates' | 'tips-tricks' | 'showcase' | 'help' | 'events' | 'jobs' | 'intro';

interface User {
  id: string;
  name: string;
  avatar: string;
  role: 'member' | 'moderator' | 'admin' | 'expert';
  reputation: number;
  joinedAt: string;
  location?: string;
  bio?: string;
  badges: string[];
}

interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: string;
  likes: number;
  replies: Comment[];
}

interface Discussion {
  id: string;
  title: string;
  content: string;
  author: User;
  category: Category;
  tags: string[];
  createdAt: string;
  views: number;
  likes: number;
  replies: number;
  isPinned: boolean;
  isSolved?: boolean;
  lastActivity: string;
  comments: Comment[];
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: 'virtual' | string;
  type: 'webinar' | 'meetup' | 'hackathon' | 'ama';
  attendees: number;
  maxAttendees?: number;
  host: User;
  isRegistered: boolean;
}

interface LeaderboardEntry {
  user: User;
  rank: number;
  points: number;
  contributions: number;
  streak: number;
}

// --- Mock Data (Overloaded) ---

const categories = [
  { id: 'all', name: 'All Discussions', count: 2847, icon: MessageSquare },
  { id: 'general', name: 'General', count: 523, icon: MessageSquare },
  { id: 'product-updates', name: 'Product Updates', count: 156, icon: Zap },
  { id: 'tips-tricks', name: 'Tips & Tricks', count: 892, icon: Target },
  { id: 'showcase', name: 'Showcase', count: 234, icon: Star },
  { id: 'help', name: 'Help & Questions', count: 678, icon: MessageCircle },
  { id: 'events', name: 'Events', count: 89, icon: Calendar },
  { id: 'jobs', name: 'Jobs', count: 145, icon: Award },
  { id: 'intro', name: 'Introductions', count: 130, icon: User },
];

const currentUser: User = {
  id: 'u1',
  name: 'Alex Morgan',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  role: 'expert',
  reputation: 2840,
  joinedAt: '2023-06-15',
  location: 'San Francisco, CA',
  bio: 'CRM Consultant | Helping businesses scale',
  badges: ['Top Contributor', 'Early Adopter', 'Problem Solver']
};

const topUsers: User[] = [
  { id: 'u2', name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', role: 'admin', reputation: 5420, joinedAt: '2022-01-10', badges: ['Founding Member', 'Community Hero'] },
  { id: 'u3', name: 'Marcus Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', role: 'moderator', reputation: 3890, joinedAt: '2022-08-22', badges: ['Technical Expert'] },
  { id: 'u4', name: 'Emma Wilson', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face', role: 'expert', reputation: 3150, joinedAt: '2023-02-14', badges: ['Rising Star'] },
  { id: 'u5', name: 'David Park', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', role: 'member', reputation: 1280, joinedAt: '2023-11-05', badges: [] },
];

const discussions: Discussion[] = [
  {
    id: 'd1',
    title: 'Welcome to the new Community Hub! Here is everything you need to know',
    content: 'We are thrilled to launch our redesigned community space. This post covers all new features including reputation system, events, direct messaging, and our updated code of conduct. Please read and share your feedback!',
    author: topUsers[0],
    category: 'general',
    tags: ['announcement', 'community', 'new-features'],
    createdAt: '2 hours ago',
    views: 3420,
    likes: 567,
    replies: 89,
    isPinned: true,
    lastActivity: '5 minutes ago',
    comments: [
      {
        id: 'c1',
        author: topUsers[1],
        content: 'Amazing work on the redesign! The reputation system is a great addition.',
        createdAt: '1 hour ago',
        likes: 45,
        replies: []
      }
    ]
  },
  {
    id: 'd2',
    title: 'How I automated 80% of my sales pipeline using webhooks and Zapier',
    content: 'I wanted to share my complete automation setup that has saved our team 20+ hours per week. I will walk through the webhook configuration, Zapier integration, and the custom CRM views I created.',
    author: topUsers[2],
    category: 'tips-tricks',
    tags: ['automation', 'webhooks', 'zapier', 'productivity'],
    createdAt: '5 hours ago',
    views: 1280,
    likes: 234,
    replies: 56,
    isPinned: false,
    lastActivity: '15 minutes ago',
    comments: []
  },
  {
    id: 'd3',
    title: 'Q2 2024 Product Roadmap Discussion - Share your priorities',
    content: 'Our product team has drafted the Q2 roadmap focusing on AI features, mobile improvements, and enterprise security. We want YOUR input before finalizing. What matters most to your workflow?',
    author: topUsers[0],
    category: 'product-updates',
    tags: ['roadmap', 'feedback', 'ai-features', 'mobile'],
    createdAt: '1 day ago',
    views: 2156,
    likes: 445,
    replies: 123,
    isPinned: true,
    lastActivity: '2 hours ago',
    comments: []
  },
  {
    id: 'd4',
    title: 'Showcase: Custom dashboard for real estate agency with 50+ agents',
    content: 'Been working on this setup for 3 months. Sharing screenshots and the custom field structure that handles property listings, agent commissions, and client matching.',
    author: topUsers[3],
    category: 'showcase',
    tags: ['showcase', 'real-estate', 'dashboard', 'enterprise'],
    createdAt: '2 days ago',
    views: 890,
    likes: 178,
    replies: 34,
    isPinned: false,
    lastActivity: '4 hours ago',
    comments: []
  },
  {
    id: 'd5',
    title: 'API rate limits clarification - Enterprise vs Professional',
    content: 'I am hitting 429 errors on Professional plan with 500 req/min. Documentation says Enterprise is 2000/min. Can someone confirm if upgrading will solve this? Also, are there burst allowances?',
    author: topUsers[4],
    category: 'help',
    tags: ['api', 'rate-limits', 'enterprise', 'support'],
    createdAt: '3 hours ago',
    views: 234,
    likes: 12,
    replies: 8,
    isPinned: false,
    isSolved: true,
    lastActivity: '30 minutes ago',
    comments: []
  },
  {
    id: 'd6',
    title: 'Hiring: Senior CRM Implementation Specialist - Remote, $120-160k',
    content: 'Fast-growing SaaS company looking for someone with 5+ years CRM experience. You will lead implementations for enterprise clients. DM me for details.',
    author: { id: 'u6', name: 'Hiring Manager', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face', role: 'member', reputation: 450, joinedAt: '2023-09-10', badges: [] },
    category: 'jobs',
    tags: ['hiring', 'remote', 'senior', 'implementation'],
    createdAt: '6 hours ago',
    views: 567,
    likes: 45,
    replies: 23,
    isPinned: false,
    lastActivity: '1 hour ago',
    comments: []
  },
  {
    id: 'd7',
    title: 'Introduction: CRM consultant from London, specializing in nonprofits',
    content: 'Hello everyone! I am Emma, been in the CRM space for 8 years. Currently helping UK charities optimize their donor management. Looking forward to sharing knowledge and learning from this community.',
    author: { id: 'u7', name: 'Emma Thompson', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face', role: 'member', reputation: 120, joinedAt: '2024-01-15', badges: [] },
    category: 'intro',
    tags: ['introduction', 'nonprofit', 'uk', 'consultant'],
    createdAt: '8 hours ago',
    views: 345,
    likes: 89,
    replies: 42,
    isPinned: false,
    lastActivity: '20 minutes ago',
    comments: []
  },
  {
    id: 'd8',
    title: 'Monthly AMA: Ask our CTO anything about security & infrastructure',
    content: 'Our CTO Sarah will be answering questions live next Tuesday about our security practices, SOC 2 compliance, infrastructure scaling, and upcoming security features. Drop your questions below!',
    author: topUsers[0],
    category: 'events',
    tags: ['ama', 'security', 'cto', 'live'],
    createdAt: '3 days ago',
    views: 1567,
    likes: 234,
    replies: 156,
    isPinned: true,
    lastActivity: '10 minutes ago',
    comments: []
  }
];

const events: Event[] = [
  {
    id: 'e1',
    title: 'Advanced Automation Workshop',
    description: 'Deep dive into workflow automation, webhooks, and API integrations. Live coding session included.',
    date: '2024-02-20',
    time: '10:00 AM PST',
    location: 'virtual',
    type: 'webinar',
    attendees: 456,
    maxAttendees: 500,
    host: topUsers[2],
    isRegistered: false
  },
  {
    id: 'e2',
    title: 'San Francisco Community Meetup',
    description: 'In-person networking, product demos, and feedback session with the product team.',
    date: '2024-02-25',
    time: '6:00 PM PST',
    location: 'San Francisco, CA',
    type: 'meetup',
    attendees: 78,
    maxAttendees: 100,
    host: topUsers[0],
    isRegistered: true
  },
  {
    id: 'e3',
    title: 'Spring Hackathon 2024',
    description: '48-hour hackathon to build the best CRM integration. $10k in prizes.',
    date: '2024-03-08',
    time: '9:00 AM PST',
    location: 'virtual',
    type: 'hackathon',
    attendees: 234,
    host: topUsers[1],
    isRegistered: false
  }
];

const leaderboard: LeaderboardEntry[] = [
  { user: topUsers[0], rank: 1, points: 5420, contributions: 892, streak: 145 },
  { user: topUsers[2], rank: 2, points: 3890, contributions: 567, streak: 89 },
  { user: topUsers[3], rank: 3, points: 3150, contributions: 445, streak: 67 },
  { user: topUsers[4], rank: 4, points: 1280, contributions: 234, streak: 23 },
];

const trendingTags = ['automation', 'api', 'showcase', 'help', 'webhooks', 'zapier', 'enterprise', 'mobile', 'security', 'productivity'];

// --- Components ---

const RoleBadge = ({ role }: { role: User['role'] }) => {
  const colors = {
    admin: 'bg-rose-100 text-rose-700',
    moderator: 'bg-blue-100 text-blue-700',
    expert: 'bg-amber-100 text-amber-700',
    member: 'bg-gray-100 text-gray-600'
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors[role]}`}>
      {role}
    </span>
  );
};

const CategoryBadge = ({ category }: { category: Category }) => {
  const colors: Record<Category, string> = {
    general: 'bg-gray-100 text-gray-700',
    'product-updates': 'bg-blue-100 text-blue-700',
    'tips-tricks': 'bg-emerald-100 text-emerald-700',
    showcase: 'bg-purple-100 text-purple-700',
    help: 'bg-amber-100 text-amber-700',
    events: 'bg-pink-100 text-pink-700',
    jobs: 'bg-cyan-100 text-cyan-700',
    intro: 'bg-indigo-100 text-indigo-700'
  };
  return (
    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${colors[category]}`}>
      {category.replace('-', ' ')}
    </span>
  );
};

const DiscussionCard = ({ discussion, isExpanded, onToggle }: { 
  discussion: Discussion; 
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showReply, setShowReply] = useState(false);

  return (
    <div className={`bg-[var(--bg-primary)] rounded-xl border ${discussion.isPinned ? 'border-[var(--color-primary-300)]' : 'border-[var(--border-light)]'} overflow-hidden`}>
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Vote buttons */}
          <div className="flex flex-col items-center gap-1">
            <button 
              onClick={() => setLiked(!liked)}
              className={`p-2 rounded-lg transition-colors ${liked ? 'bg-rose-50 text-rose-600' : 'hover:bg-[var(--bg-secondary)] text-[var(--text-tertiary)]'}`}
            >
              <ChevronUp className="w-5 h-5" />
            </button>
            <span className={`font-bold text-sm ${liked ? 'text-rose-600' : 'text-[var(--text-primary)]'}`}>
              {discussion.likes + (liked ? 1 : 0)}
            </span>
            <button className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg text-[var(--text-tertiary)] transition-colors">
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <CategoryBadge category={discussion.category} />
              {discussion.isPinned && (
                <span className="px-2 py-0.5 bg-[var(--color-primary-100)] text-[var(--color-primary-700)] rounded text-xs font-medium flex items-center gap-1">
                  <Target className="w-3 h-3" /> Pinned
                </span>
              )}
              {discussion.isSolved && (
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-xs font-medium flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" /> Solved
                </span>
              )}
            </div>

            <h3 
              onClick={onToggle}
              className="text-lg font-semibold text-[var(--text-primary)] mb-2 cursor-pointer hover:text-[var(--color-primary-600)] transition-colors"
            >
              {discussion.title}
            </h3>

            <p className="text-[var(--text-secondary)] text-sm line-clamp-2 mb-3">
              {discussion.content}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {discussion.tags.map(tag => (
                <span key={tag} className="text-xs text-[var(--color-primary-600)] hover:underline cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img  src={discussion.author?.avatar || "/default-avatar.png"}
  alt={discussion.author?.name || "User"}
  className="w-6 h-6 rounded-full"  />
              <span className="text-sm font-medium text-[var(--text-primary)]">
  {discussion.author?.name || "Anonymous"}
</span>

<RoleBadge role={discussion.author?.role || "member"} />
                <span className="text-xs text-[var(--text-tertiary)]">{discussion.createdAt}</span>
              </div>

              <div className="flex items-center gap-4 text-sm text-[var(--text-tertiary)]">
                <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4" /> {discussion.replies}</span>
                <span className="flex items-center gap-1"><TrendingUp className="w-4 h-4" /> {discussion.views}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {discussion.lastActivity}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2 rounded-lg transition-colors ${bookmarked ? 'text-[var(--color-primary-600)]' : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'}`}
            >
              <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] rounded-lg transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] rounded-lg transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Comments */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden border-t border-[var(--border-light)]"
          >
            <div className="p-5 bg-[var(--bg-secondary)]">
              {/* Comments */}
              {discussion.comments.map((comment) => (
                <div key={comment.id} className="flex gap-4 mb-4">
                  <img src={comment.author.avatar} alt={comment.author.name} className="w-8 h-8 rounded-full flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm text-[var(--text-primary)]">{comment.author.name}</span>
                      <RoleBadge role={comment.author.role} />
                      <span className="text-xs text-[var(--text-tertiary)]">{comment.createdAt}</span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)]">{comment.content}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <button className="flex items-center gap-1 text-xs text-[var(--text-tertiary)] hover:text-rose-600 transition-colors">
                        <Heart className="w-3 h-3" /> {comment.likes}
                      </button>
                      <button className="text-xs text-[var(--text-tertiary)] hover:text-[var(--color-primary-600)] transition-colors">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Reply Input */}
              {showReply ? (
                <div className="flex gap-4 mt-4">
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full flex-shrink-0" />
                  <div className="flex-1">
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 border border-[var(--border-medium)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary-400)] resize-none text-sm"
                      placeholder="Write your reply..."
                    />
                    <div className="flex justify-end gap-2 mt-2">
                      <button 
                        onClick={() => setShowReply(false)}
                        className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        Cancel
                      </button>
                      <button className="px-4 py-2 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                        <Send className="w-4 h-4" /> Post Reply
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => setShowReply(true)}
                  className="mt-4 text-sm text-[var(--color-primary-600)] hover:underline font-medium"
                >
                  Write a reply...
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const EventCard = ({ event }: { event: Event }) => {
  const [registered, setRegistered] = useState(event.isRegistered);

  return (
    <div className=" rounded-xl border border-[var(--border-light)] p-5 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-3">
        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
          event.type === 'webinar' ? 'bg-blue-100 text-blue-700' :
          event.type === 'meetup' ? 'bg-emerald-100 text-emerald-700' :
          event.type === 'hackathon' ? 'bg-purple-100 text-purple-700' :
          'bg-amber-100 text-amber-700'
        }`}>
          {event.type.toUpperCase()}
        </span>
        {registered && (
          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-medium">
            Registered
          </span>
        )}
      </div>

      <h4 className="font-bold text-[var(--text-primary)] mb-2">{event.title}</h4>
      <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">{event.description}</p>

      <div className="space-y-2 text-sm text-[var(--text-tertiary)] mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {event.date} at {event.time}
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          {event.location === 'virtual' ? 'Virtual Event' : event.location}
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          {event.attendees}{event.maxAttendees ? `/${event.maxAttendees}` : ''} attending
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <img src={event.host.avatar} alt={event.host.name} className="w-6 h-6 rounded-full" />
        <span className="text-sm text-[var(--text-secondary)]">Hosted by {event.host.name}</span>
      </div>

      <button 
        onClick={() => setRegistered(!registered)}
        className={`w-full py-2 rounded-lg font-medium text-sm transition-colors ${
          registered 
            ? 'border border-[var(--border-medium)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]' 
            : 'bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white'
        }`}
      >
        {registered ? 'Cancel Registration' : 'Register Now'}
      </button>
    </div>
  );
};

export default function CommunityPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedDiscussion, setExpandedDiscussion] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'discussions' | 'events' | 'members'>('discussions');
  const [showNewPost, setShowNewPost] = useState(false);

  const filteredDiscussions = discussions.filter(d => {
    const matchesCategory = activeCategory === 'all' || d.category === activeCategory;
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen text-[var(--text-primary)]">
      <Head>
        <title>Community | Join the Conversation</title>
      </Head>

      {/* Hero */}
      <div className="bg-gradient-to-t from-[var(--color-primary-600)] via-[var(--color-secondary-700)] to-[var(--color-secondary-600)] pt-18 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-[var(--color-primary-100)]">Join the Conversation</h1>
              <p className="text-white/80">Connect with 15,000+ CRM professionals. Share knowledge, get help, grow together.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">2,847</div>
                <div className="text-xs text-white/70">Discussions</div>
              </div>
              <div className="w-px h-10 bg-white/30" />
              <div className="text-center">
                <div className="text-2xl font-bold">15.2k</div>
                <div className="text-xs text-white/70">Members</div>
              </div>
              <div className="w-px h-10 bg-white/30" />
              <div className="text-center">
                <div className="text-2xl font-bold">892</div>
                <div className="text-xs text-white/70">Online</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar */}
          <aside className="lg:w-64 flex-shrink-0 space-y-6">
            {/* User Card */}
            <div className="bg-[var(--bg-primary)] rounded-xl border border-[var(--border-light)] p-5">
              <div className="flex items-center gap-3 mb-4">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-12 h-12 rounded-full" />
                <div>
                  <h3 className="font-bold text-[var(--text-primary)]">{currentUser.name}</h3>
                  <div className="flex items-center gap-2">
                    <RoleBadge role={currentUser.role} />
                    <span className="text-xs text-[var(--text-tertiary)]">{currentUser.reputation} pts</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-4">
                {currentUser.badges.map(badge => (
                  <span key={badge} className="px-2 py-0.5 bg-[var(--color-primary-100)] text-[var(--color-primary-700)] rounded text-xs">
                    {badge}
                  </span>
                ))}
              </div>
              <button 
                onClick={() => setShowNewPost(true)}
                className="w-full py-2 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> New Discussion
              </button>
            </div>

            {/* Navigation */}
            <div className="bg-[var(--bg-primary)] rounded-xl border border-[var(--border-light)] p-2">
              {[
                { id: 'discussions', label: 'Discussions', icon: MessageSquare, count: 2847 },
                { id: 'events', label: 'Events', icon: Calendar, count: 12 },
                { id: 'members', label: 'Members', icon: Users, count: 15234 }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-[var(--color-primary-100)] text-[var(--color-primary-700)]'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </div>
                  <span className={`text-xs ${activeTab === tab.id ? 'text-[var(--color-primary-600)]' : 'text-[var(--text-tertiary)]'}`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-wider mb-3 px-2">Categories</h3>
              <div className="space-y-1">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                      activeCategory === cat.id
                        ? 'bg-[var(--color-primary-50)] text-[var(--color-primary-700)] font-medium'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-primary)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <cat.icon className={`w-4 h-4 ${activeCategory === cat.id ? 'text-[var(--color-primary-600)]' : 'text-[var(--text-tertiary)]'}`} />
                      {cat.name}
                    </div>
                    <span className={`text-xs ${activeCategory === cat.id ? 'text-[var(--color-primary-600)]' : 'text-[var(--text-tertiary)]'}`}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Tags */}
            <div>
              <h3 className="text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-wider mb-3 px-2">Trending Topics</h3>
              <div className="flex flex-wrap gap-2 px-2">
                {trendingTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-3 py-1 bg-[var(--bg-primary)] border border-[var(--border-light)] rounded-full text-xs text-[var(--text-secondary)] hover:border-[var(--color-primary-400)] hover:text-[var(--color-primary-600)] transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Feed */}
          <div className="flex-1">
            {/* Search & Filter */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-tertiary)]" />
                <input
                  type="text"
                  placeholder="Search discussions, topics, or members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-[var(--border-medium)] rounded-xl bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary-400)]"
                />
              </div>
              <button className="p-3 border border-[var(--border-medium)] rounded-xl hover:bg-[var(--bg-primary)] text-[var(--text-secondary)] transition-colors">
                <Filter className="w-5 h-5" />
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'discussions' && (
              <div className="space-y-4 overflow-hidden">
                {/* Sort tabs */}
                <div className="flex items-center  gap-2 mb-4">
                  {['Latest', 'Top', 'Unanswered', 'Following'].map((sort, idx) => (
                    <button
                      key={sort}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        idx === 0 ? 'bg-[var(--bg-primary)] text-[var(--text-primary)] shadow-sm' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-primary)]'
                      }`}
                    >
                      {sort}
                    </button>
                  ))}
                </div>

                {/* Discussion List */}
                {filteredDiscussions.map(discussion => (
                  <DiscussionCard
                    key={discussion.id}
                    discussion={discussion}
                    isExpanded={expandedDiscussion === discussion.id}
                    onToggle={() => setExpandedDiscussion(expandedDiscussion === discussion.id ? null : discussion.id)}
                  />
                ))}

                {filteredDiscussions.length === 0 && (
                  <div className="text-center py-12">
                    <MessageSquare className="w-12 h-12 text-[var(--text-tertiary)] mx-auto mb-4" />
                    <h3 className="font-bold text-[var(--text-primary)] mb-2">No discussions found</h3>
                    <p className="text-[var(--text-secondary)]">Try adjusting your search or category filter</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'events' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">Upcoming Events</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {events.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'members' && (
              <div className="space-y-6">
                {/* Leaderboard */}
                <div className="bg-[var(--bg-primary)] rounded-xl border border-[var(--border-light)] p-6">
                  <h3 className="font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-[var(--color-primary-600)]" /> Top Contributors
                  </h3>
                  <div className="space-y-3">
                    {leaderboard.map((entry, idx) => (
                      <div key={entry.user.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          idx === 0 ? 'bg-amber-100 text-amber-700' :
                          idx === 1 ? 'bg-gray-200 text-gray-700' :
                          idx === 2 ? 'bg-orange-100 text-orange-700' :
                          'bg-[var(--bg-tertiary)] text-[var(--text-tertiary)]'
                        }`}>
                          {entry.rank}
                        </div>
                        <img src={entry.user.avatar} alt={entry.user.name} className="w-10 h-10 rounded-full" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-[var(--text-primary)]">{entry.user.name}</span>
                            <RoleBadge role={entry.user.role} />
                          </div>
                          <div className="flex items-center gap-4 text-xs text-[var(--text-tertiary)]">
                            <span>{entry.points.toLocaleString()} points</span>
                            <span>{entry.contributions} contributions</span>
                            <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> {entry.streak} day streak</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Member Grid */}
                <div>
                  <h3 className="font-bold text-[var(--text-primary)] mb-4">Active Members</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {topUsers.map(user => (
                      <div key={user.id} className="bg-[var(--bg-primary)] rounded-xl border border-[var(--border-light)] p-4 text-center hover:shadow-lg transition-all cursor-pointer">
                        <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full mx-auto mb-3" />
                        <h4 className="font-medium text-[var(--text-primary)] text-sm">{user.name}</h4>
                        <RoleBadge role={user.role} />
                        <div className="text-xs text-[var(--text-tertiary)] mt-2">{user.reputation.toLocaleString()} reputation</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <aside className="lg:w-72 flex-shrink-0 space-y-6">
            {/* Community Stats */}
            <div className="bg-[var(--bg-primary)] rounded-xl border border-[var(--border-light)] p-5">
              <h3 className="font-bold text-[var(--text-primary)] mb-4">Community Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Discussions today</span>
                  <span className="font-medium text-[var(--text-primary)]">47</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Answers posted</span>
                  <span className="font-medium text-[var(--text-primary)]">156</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Problems solved</span>
                  <span className="font-medium text-emerald-600">89</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">New members</span>
                  <span className="font-medium text-[var(--text-primary)]">23</span>
                </div>
              </div>
            </div>

            {/* Online Now */}
            <div className="bg-[var(--bg-primary)] rounded-xl border border-[var(--border-light)] p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[var(--text-primary)]">Online Now</h3>
                <span className="flex items-center gap-1 text-xs text-emerald-600">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  892 online
                </span>
              </div>
              <div className="flex -space-x-2 mb-3">
                {topUsers.map(user => (
                  <img key={user.id} src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border-2 border-[var(--bg-primary)]" />
                ))}
                <div className="w-8 h-8 rounded-full bg-[var(--bg-tertiary)] border-2 border-[var(--bg-primary)] flex items-center justify-center text-xs text-[var(--text-tertiary)]">
                  +886
                </div>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                Join the conversation with CRM professionals worldwide
              </p>
            </div>

            {/* Guidelines */}
            <div className="bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-secondary-50)] rounded-xl border border-[var(--color-primary-200)] p-5">
              <h3 className="font-bold text-[var(--text-primary)] mb-2">Community Guidelines</h3>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  Be respectful and constructive
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  Search before posting
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  Share knowledge freely
                </li>
              </ul>
              <a href="#" className="text-sm text-[var(--color-primary-600)] hover:underline mt-3 inline-block">
                Read full guidelines
              </a>
            </div>

            {/* Newsletter */}
            <div className="bg-[var(--bg-primary)] rounded-xl border border-[var(--border-light)] p-5">
              <h3 className="font-bold text-[var(--text-primary)] mb-2">Weekly Digest</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-3">
                Get the best discussions and tips delivered to your inbox
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2 border border-[var(--border-medium)] rounded-lg text-sm focus:outline-none focus:border-[var(--color-primary-400)]"
                />
                <button className="px-3 py-2 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white rounded-lg transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* New Post Modal */}
      <AnimatePresence>
        {showNewPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl bg-[var(--bg-primary)] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-[var(--border-light)] flex items-center justify-between sticky top-0 bg-[var(--bg-primary)]">
                <h3 className="text-xl font-bold text-[var(--text-primary)]">Start a New Discussion</h3>
                <button onClick={() => setShowNewPost(false)} className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg">
                  <X className="w-5 h-5 text-[var(--text-secondary)]" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Category</label>
                  <select className="w-full px-4 py-2 border border-[var(--border-medium)] rounded-lg bg-[var(--bg-primary)] focus:outline-none focus:border-[var(--color-primary-400)]">
                    {categories.filter(c => c.id !== 'all').map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Title</label>
                  <input
                    type="text"
                    placeholder="What's your question or topic?"
                    className="w-full px-4 py-2 border border-[var(--border-medium)] rounded-lg bg-[var(--bg-primary)] focus:outline-none focus:border-[var(--color-primary-400)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Content</label>
                  <textarea
                    rows={6}
                    placeholder="Describe your topic in detail..."
                    className="w-full px-4 py-2 border border-[var(--border-medium)] rounded-lg bg-[var(--bg-primary)] focus:outline-none focus:border-[var(--color-primary-400)] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {trendingTags.slice(0, 5).map(tag => (
                      <button key={tag} className="px-3 py-1 border border-[var(--border-medium)] rounded-full text-sm text-[var(--text-secondary)] hover:border-[var(--color-primary-400)] hover:text-[var(--color-primary-600)] transition-colors">
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-[var(--border-light)]">
                  <button className="p-2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] rounded-lg transition-colors">
                    <ImageIcon className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] rounded-lg transition-colors">
                    <LinkIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 border-t border-[var(--border-light)] flex justify-end gap-3">
                <button 
                  onClick={() => setShowNewPost(false)}
                  className="px-6 py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Cancel
                </button>
                <button className="px-6 py-2 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white rounded-lg font-medium transition-colors">
                  Post Discussion
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}