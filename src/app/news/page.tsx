"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  MessageSquare,
  Heart,
  Share2,
  Bookmark,
  ChevronDown,
  X,
  Building2,
  Activity,
  Menu,
  Tag,
  User,
  Eye,
  ThumbsUp,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────

type NewsCategory = "all" | "company" | "product" | "industry" | "hr" | "events";

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: NewsCategory;
  author: string;
  authorRole: string;
  publishDate: string;
  readTime: number;
  imageUrl?: string;
  tags: string[];
  likes: number;
  comments: number;
  views: number;
  isFeatured: boolean;
  isBookmarked: boolean;
}

// ─── Mock Data ─────────────────────────────────────────────────────────

const CATEGORIES: { value: NewsCategory; label: string; color: string }[] = [
  { value: "all", label: "All News", color: "bg-slate-100 text-slate-700" },
  { value: "company", label: "Company", color: "bg-blue-100 text-blue-700" },
  { value: "product", label: "Product", color: "bg-purple-100 text-purple-700" },
  { value: "industry", label: "Industry", color: "bg-emerald-100 text-emerald-700" },
  { value: "hr", label: "HR Updates", color: "bg-amber-100 text-amber-700" },
  { value: "events", label: "Events", color: "bg-rose-100 text-rose-700" },
];

const INITIAL_ARTICLES: NewsArticle[] = [
  {
    id: "1",
    title: "WorkForce CRM Reaches 10,000 Active Users Milestone",
    excerpt: "Our platform continues to grow as more businesses trust WorkForce for their employee management needs.",
    content: "We are thrilled to announce that WorkForce CRM has officially surpassed 10,000 active users across 500+ companies worldwide. This milestone represents our commitment to delivering exceptional employee management solutions...",
    category: "company",
    author: "Sarah Johnson",
    authorRole: "CEO",
    publishDate: "2026-05-14",
    readTime: 3,
    tags: ["milestone", "growth", "announcement"],
    likes: 245,
    comments: 32,
    views: 1205,
    isFeatured: true,
    isBookmarked: false,
  },
  {
    id: "2",
    title: "Introducing AI-Powered Performance Analytics",
    excerpt: "New machine learning features help managers identify top performers and predict team success.",
    content: "Our latest release brings advanced AI capabilities to performance tracking. Managers can now access predictive analytics that forecast team productivity and identify potential issues before they impact deliverables...",
    category: "product",
    author: "Michael Chen",
    authorRole: "Head of Product",
    publishDate: "2026-05-12",
    readTime: 5,
    tags: ["ai", "analytics", "feature-release"],
    likes: 189,
    comments: 24,
    views: 892,
    isFeatured: true,
    isBookmarked: true,
  },
  {
    id: "3",
    title: "Remote Work Trends: 2026 Industry Report",
    excerpt: "Latest research shows hybrid work models increasing employee satisfaction by 34%.",
    content: "A comprehensive study of over 1,000 companies reveals that hybrid work arrangements continue to deliver the best results for both employers and employees. Key findings include improved work-life balance...",
    category: "industry",
    author: "Emily Rodriguez",
    authorRole: "Industry Analyst",
    publishDate: "2026-05-10",
    readTime: 7,
    tags: ["remote-work", "research", "trends"],
    likes: 156,
    comments: 18,
    views: 743,
    isFeatured: false,
    isBookmarked: false,
  },
  {
    id: "4",
    title: "Q2 Hiring Freeze Lifted: New Positions Open",
    excerpt: "Engineering and Sales departments expanding with 15 new roles available.",
    content: "Following a successful Q1 review, we are excited to announce that the hiring freeze has been lifted. We are now accepting applications for 15 new positions across Engineering, Sales, and Customer Success teams...",
    category: "hr",
    author: "Lisa Thompson",
    authorRole: "HR Director",
    publishDate: "2026-05-08",
    readTime: 2,
    tags: ["hiring", "careers", "growth"],
    likes: 312,
    comments: 45,
    views: 1567,
    isFeatured: false,
    isBookmarked: false,
  },
  {
    id: "5",
    title: "Annual Company Retreat: Save the Date",
    excerpt: "Join us in Colorado this September for team building and strategic planning.",
    content: "Mark your calendars for September 15-18! This year's company retreat will be held at the beautiful Aspen Meadows Resort. The agenda includes team building activities, strategic planning sessions...",
    category: "events",
    author: "James Wilson",
    authorRole: "Operations Manager",
    publishDate: "2026-05-05",
    readTime: 4,
    tags: ["retreat", "team-building", "events"],
    likes: 98,
    comments: 56,
    views: 623,
    isFeatured: false,
    isBookmarked: true,
  },
  {
    id: "6",
    title: "Security Update: Enhanced Data Protection",
    excerpt: "New encryption standards and compliance certifications now active.",
    content: "We have completed our latest security infrastructure upgrade. All customer data is now protected with AES-256 encryption at rest and TLS 1.3 in transit. We have also achieved SOC 2 Type II compliance...",
    category: "product",
    author: "David Kim",
    authorRole: "Security Lead",
    publishDate: "2026-05-03",
    readTime: 6,
    tags: ["security", "compliance", "update"],
    likes: 134,
    comments: 12,
    views: 534,
    isFeatured: false,
    isBookmarked: false,
  },
  {
    id: "7",
    title: "Employee Wellness Program Launch",
    excerpt: "New mental health resources and fitness benefits available starting June 1.",
    content: "We are proud to introduce our comprehensive Employee Wellness Program. Starting June 1st, all employees will have access to mental health counseling, gym memberships, meditation apps...",
    category: "hr",
    author: "Anna Martinez",
    authorRole: "Wellness Coordinator",
    publishDate: "2026-04-28",
    readTime: 4,
    tags: ["wellness", "benefits", "health"],
    likes: 267,
    comments: 38,
    views: 987,
    isFeatured: false,
    isBookmarked: false,
  },
  {
    id: "8",
    title: "TechCrunch Feature: WorkForce Named Top HR Tech Startup",
    excerpt: "Industry recognition for our innovative approach to workforce management.",
    content: "We are honored to be featured in TechCrunch's annual list of Top HR Technology Startups. The article highlights our unique approach to combining AI-driven insights with human-centered design...",
    category: "company",
    author: "Jennifer Lee",
    authorRole: "Marketing Director",
    publishDate: "2026-04-25",
    readTime: 3,
    tags: ["press", "award", "recognition"],
    likes: 423,
    comments: 67,
    views: 2134,
    isFeatured: true,
    isBookmarked: false,
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "Today";
  if (diffDays === 2) return "Yesterday";
  if (diffDays <= 7) return `${diffDays} days ago`;
  
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getCategoryStyle = (category: NewsCategory) => {
  const cat = CATEGORIES.find((c) => c.value === category);
  return cat ? cat.color : "bg-slate-100 text-slate-700";
};

const getCategoryLabel = (category: NewsCategory) => {
  const cat = CATEGORIES.find((c) => c.value === category);
  return cat ? cat.label : category;
};

// ─── Main Component ──────────────────────────────────────────────────

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>(INITIAL_ARTICLES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>("all");
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "trending">("latest");
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // ─── Derived Data ────────────────────────────────────────────────────

  const filteredArticles = useMemo(() => {
    let result = [...articles];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          a.author.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((a) => a.category === selectedCategory);
    }

    result.sort((a, b) => {
      if (sortBy === "latest") {
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      }
      if (sortBy === "popular") {
        return b.views - a.views;
      }
      if (sortBy === "trending") {
        return b.likes - a.likes;
      }
      return 0;
    });

    return result;
  }, [articles, searchQuery, selectedCategory, sortBy]);

  const featuredArticles = useMemo(() => {
    return articles.filter((a) => a.isFeatured).slice(0, 3);
  }, [articles]);

  const trendingTags = useMemo(() => {
    const tagCounts: Record<string, number> = {};
    articles.forEach((a) => {
      a.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([tag]) => tag);
  }, [articles]);

  // ─── Handlers ────────────────────────────────────────────────────────

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isBookmarked: !a.isBookmarked } : a))
    );
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, likes: a.likes + 1 } : a))
    );
  };

  const handleShare = (article: NewsArticle, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // ─── Render ──────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
                <Building2 className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 leading-tight">
                  WorkForce
                </h1>
                <p className="text-xs text-slate-500">News & Updates</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50">
                <Search size={20} />
              </button>
              <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50 relative">
                <Activity size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="text-right hidden lg:block">
                  <p className="text-sm font-semibold text-slate-900">Admin User</p>
                  <p className="text-xs text-slate-500">HR Manager</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-blue-200 flex items-center justify-center text-blue-700 font-bold text-sm">
                  AU
                </div>
              </div>
            </div>

            <button
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2">
            <p className="text-sm font-semibold text-slate-900">Admin User</p>
            <p className="text-xs text-slate-500">HR Manager</p>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">News & Updates</h2>
          <p className="text-slate-500 mt-2 text-lg">
            Stay informed with the latest company news, product updates, and industry insights
          </p>
        </div>

        {/* Featured Articles */}
        {selectedCategory === "all" && !searchQuery && (
          <div className="mb-10">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp size={20} className="text-blue-600" />
              Featured Stories
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {featuredArticles.map((article, index) => (
                <FeaturedCard
                  key={article.id}
                  article={article}
                  index={index}
                  onClick={() => setSelectedArticle(article)}
                  onBookmark={toggleBookmark}
                />
              ))}
            </div>
          </div>
        )}

        {/* Search & Filters */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search articles, tags, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
              >
                <Filter size={18} />
                Filters
              </button>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "latest" | "popular" | "trending")}
                className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="latest">Latest First</option>
                <option value="popular">Most Popular</option>
                <option value="trending">Most Liked</option>
              </select>
            </div>
          </div>

          {/* Category Filters */}
          <div className={`mt-4 flex flex-wrap gap-2 ${showFilters ? "block" : "hidden lg:flex"}`}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat.value
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Articles List */}
          <div className="lg:col-span-2 space-y-6">
            {filteredArticles.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
                <div className="flex flex-col items-center gap-3 text-slate-400">
                  <Search size={48} className="text-slate-300" />
                  <p className="text-lg font-medium text-slate-600">No articles found</p>
                  <p className="text-sm">Try adjusting your search or filters</p>
                </div>
              </div>
            ) : (
              filteredArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onClick={() => setSelectedArticle(article)}
                  onBookmark={toggleBookmark}
                  onLike={handleLike}
                  onShare={handleShare}
                />
              ))
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Tags */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Tag size={20} className="text-blue-600" />
                Trending Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">News Stats</h3>
              <div className="space-y-4">
                <StatRow
                  icon={<Eye size={18} className="text-blue-600" />}
                  label="Total Views"
                  value={articles.reduce((sum, a) => sum + a.views, 0).toLocaleString()}
                />
                <StatRow
                  icon={<ThumbsUp size={18} className="text-emerald-600" />}
                  label="Total Likes"
                  value={articles.reduce((sum, a) => sum + a.likes, 0).toLocaleString()}
                />
                <StatRow
                  icon={<MessageSquare size={18} className="text-purple-600" />}
                  label="Comments"
                  value={articles.reduce((sum, a) => sum + a.comments, 0).toLocaleString()}
                />
                <StatRow
                  icon={<Bookmark size={18} className="text-amber-600" />}
                  label="Bookmarked"
                  value={articles.filter((a) => a.isBookmarked).length.toString()}
                />
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-blue-600 rounded-xl shadow-sm p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
              <p className="text-blue-100 text-sm mb-4">
                Get the latest news and updates delivered to your inbox weekly.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <button className="w-full py-2.5 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onBookmark={toggleBookmark}
          onLike={handleLike}
          onShare={handleShare}
        />
      )}
    </div>
  );
}

// ─── Sub-Components ────────────────────────────────────────────────────

function FeaturedCard({
  article,
  index,
  onClick,
  onBookmark,
}: {
  article: NewsArticle;
  index: number;
  onClick: () => void;
  onBookmark: (id: string, e: React.MouseEvent) => void;
}) {
  const isFirst = index === 0;

  return (
    <div
      onClick={onClick}
      className={`group bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all ${
        isFirst ? "lg:col-span-2 lg:row-span-1" : ""
      }`}
    >
      <div className={`bg-blue-100 ${isFirst ? "h-48" : "h-40"} flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-blue-600/5" />
        <div className="text-blue-300">
          <Building2 size={isFirst ? 64 : 48} />
        </div>
        <button
          onClick={(e) => onBookmark(article.id, e)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
        >
          <Bookmark
            size={16}
            className={article.isBookmarked ? "fill-blue-600 text-blue-600" : "text-slate-400"}
          />
        </button>
      </div>
      
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryStyle(article.category)}`}>
            {getCategoryLabel(article.category)}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Clock size={12} />
            {article.readTime} min read
          </span>
        </div>
        
        <h3 className={`font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors ${
          isFirst ? "text-xl" : "text-lg"
        }`}>
          {article.title}
        </h3>
        
        <p className="text-sm text-slate-500 line-clamp-2 mb-4">
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-semibold text-xs flex items-center justify-center">
              {article.author.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">{article.author}</p>
              <p className="text-xs text-slate-400">{formatDate(article.publishDate)}</p>
            </div>
          </div>
          <ArrowRight size={18} className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </div>
  );
}

function ArticleCard({
  article,
  onClick,
  onBookmark,
  onLike,
  onShare,
}: {
  article: NewsArticle;
  onClick: () => void;
  onBookmark: (id: string, e: React.MouseEvent) => void;
  onLike: (id: string, e: React.MouseEvent) => void;
  onShare: (article: NewsArticle, e: React.MouseEvent) => void;
}) {
  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-xl border border-slate-200 shadow-sm p-6 cursor-pointer hover:shadow-md transition-all"
    >
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="sm:w-48 h-32 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
          <Building2 size={40} className="text-blue-200" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryStyle(article.category)}`}>
              {getCategoryLabel(article.category)}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock size={12} />
              {article.readTime} min read
            </span>
          </div>
          
          <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {article.title}
          </h3>
          
          <p className="text-sm text-slate-500 line-clamp-2 mb-4">
            {article.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-semibold text-xs flex items-center justify-center">
                {article.author.split(" ").map((n) => n[0]).join("")}
              </div>
              <span className="text-sm text-slate-600">{article.author}</span>
              <span className="text-slate-300">|</span>
              <span className="text-xs text-slate-400">{formatDate(article.publishDate)}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => onLike(article.id, e)}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-500 transition-colors"
              >
                <Heart size={14} />
                {article.likes}
              </button>
              <button
                onClick={(e) => onShare(article, e)}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-blue-600 transition-colors"
              >
                <Share2 size={14} />
              </button>
              <button
                onClick={(e) => onBookmark(article.id, e)}
                className="text-slate-400 hover:text-blue-600 transition-colors"
              >
                <Bookmark
                  size={16}
                  className={article.isBookmarked ? "fill-blue-600 text-blue-600" : ""}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArticleModal({
  article,
  onClose,
  onBookmark,
  onLike,
  onShare,
}: {
  article: NewsArticle;
  onClose: () => void;
  onBookmark: (id: string, e: React.MouseEvent) => void;
  onLike: (id: string, e: React.MouseEvent) => void;
  onShare: (article: NewsArticle, e: React.MouseEvent) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryStyle(article.category)}`}>
              {getCategoryLabel(article.category)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => onBookmark(article.id, e)}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Bookmark
                size={18}
                className={article.isBookmarked ? "fill-blue-600 text-blue-600" : ""}
              />
            </button>
            <button
              onClick={(e) => onShare(article, e)}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Share2 size={18} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="h-64 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
            <Building2 size={80} className="text-blue-200" />
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center">
              {article.author.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">{article.author}</p>
              <p className="text-xs text-slate-500">{article.authorRole}</p>
            </div>
            <div className="ml-auto flex items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {formatDate(article.publishDate)}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {article.readTime} min read
              </span>
            </div>
          </div>

          <div className="prose prose-slate max-w-none mb-6">
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              {article.excerpt}
            </p>
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">
              {article.content}
            </p>
            <p className="text-slate-700 leading-relaxed mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-slate-700 leading-relaxed mt-4">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <div className="flex items-center gap-4">
              <button
                onClick={(e) => onLike(article.id, e)}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Heart size={18} className={article.likes > 0 ? "fill-red-600" : ""} />
                <span className="font-semibold">{article.likes}</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                <MessageSquare size={18} />
                <span className="font-semibold">{article.comments}</span>
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Eye size={16} />
              {article.views.toLocaleString()} views
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
        <span className="text-sm text-slate-600">{label}</span>
      </div>
      <span className="text-sm font-bold text-slate-900">{value}</span>
    </div>
  );
}