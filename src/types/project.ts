export interface WebsiteBlock {
  screenshot: string;
  /** Set when the site is live; omit for previews or in-development builds */
  liveUrl?: string;
  features: string[];
  keyFeatures: string[];
  gallery: string[];
}

export interface MarketingMetrics {
  followersGrowth: string;
  engagementRate: string;
  monthlyReach: string;
}

export interface MarketingBlock {
  platform: string;
  screenshot: string;
  metrics: MarketingMetrics;
  features: string[];
  keyFeatures: string[];
  gallery: string[];
}

export interface Project {
  id: string;
  name: string;
  industry: string;
  location: string;
  /** Short before/after summary (e.g. "400 followers, no website" → "11k followers, website") */
  before: string;
  after: string;
  website?: WebsiteBlock;
  marketing?: MarketingBlock;
}
