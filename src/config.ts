export const SITE = {
  name: "Chao's Brain",
  tagline: '思考、觀察、記錄',
  description: '分享商業思維、科技觀點、讀書筆記的個人部落格，記錄大腦裡那些值得留下來的想法。',
  url: 'https://chao-blog.vercel.app',
  author: 'Chao',
  email: 'hello@example.com',
  postsPerPage: 10,
  giscus: {
    repo: 'your-github-username/chao-blog',
    repoId: 'PLACEHOLDER',
    category: 'Announcements',
    categoryId: 'PLACEHOLDER',
  },
} as const;

export type CategoryConfig = {
  id: string;
  label: string;
  labelEn: string;
  color: string;
  href: string;
  children?: Omit<CategoryConfig, 'children'>[];
};

export const CATEGORIES: CategoryConfig[] = [
  {
    id: 'business',
    label: '商業思維',
    labelEn: 'Business',
    color: 'blue',
    href: '/category/business',
    children: [
      { id: 'investment', label: '投資筆記', labelEn: 'Investment', color: 'blue', href: '/category/business/investment' },
      { id: 'strategy', label: '策略觀察', labelEn: 'Strategy', color: 'blue', href: '/category/business/strategy' },
      { id: 'startup', label: '創業思考', labelEn: 'Startup', color: 'blue', href: '/category/business/startup' },
    ],
  },
  {
    id: 'tech',
    label: '科技觀點',
    labelEn: 'Tech',
    color: 'purple',
    href: '/category/tech',
    children: [
      { id: 'ai', label: 'AI 思考', labelEn: 'AI', color: 'purple', href: '/category/tech/ai' },
      { id: 'engineering', label: '軟體工程', labelEn: 'Engineering', color: 'purple', href: '/category/tech/engineering' },
      { id: 'trends', label: '科技趨勢', labelEn: 'Trends', color: 'purple', href: '/category/tech/trends' },
    ],
  },
  {
    id: 'books',
    label: '讀書筆記',
    labelEn: 'Books',
    color: 'green',
    href: '/category/books',
    children: [
      { id: 'biz-books', label: '商業書', labelEn: 'Biz Books', color: 'green', href: '/category/books/biz-books' },
      { id: 'mind-books', label: '思維書', labelEn: 'Mind Books', color: 'green', href: '/category/books/mind-books' },
      { id: 'tech-books', label: '科技書', labelEn: 'Tech Books', color: 'green', href: '/category/books/tech-books' },
    ],
  },
  {
    id: 'life',
    label: '生活隨筆',
    labelEn: 'Life',
    color: 'orange',
    href: '/category/life',
    children: [
      { id: 'travel', label: '旅行', labelEn: 'Travel', color: 'orange', href: '/category/life/travel' },
      { id: 'thoughts', label: '日常思考', labelEn: 'Thoughts', color: 'orange', href: '/category/life/thoughts' },
    ],
  },
];

export type ColorKey = 'blue' | 'purple' | 'green' | 'orange' | 'gray';

export const CATEGORY_COLORS: Record<ColorKey, { bg: string; text: string; border: string }> = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
  green: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200' },
  gray: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' },
};

export function getCategoryConfig(categoryId: string, subcategoryId?: string): CategoryConfig | undefined {
  const parent = CATEGORIES.find((c) => c.id === categoryId);
  if (!parent) return undefined;
  if (subcategoryId && parent.children) {
    return parent.children.find((c) => c.id === subcategoryId) ?? parent;
  }
  return parent;
}

export function getCategoryColor(categoryId: string): ColorKey {
  const cat = CATEGORIES.find((c) => c.id === categoryId);
  return (cat?.color as ColorKey) ?? 'gray';
}
