import type { Project } from '../types/project';

export const projects: Project[] = [
  {
    id: 'annas-care',
    name: "Anna's Care",
    industry: 'Beauty Clinic',
    location: 'Jbeil, Lebanon',
    before: '450 followers, no website, hard to find online.',
    after: '11k+ followers, live website, full Instagram & Facebook presence.',
    website: {
      screenshot: '/images/AnnascarelbPortfolio.PNG',
      liveUrl: 'https://annascarelb.com',
      features: ['Mobile optimized', 'Fast loading', 'Service showcase'],
      keyFeatures: [
        'Online Fast delivery system',
        'Mobile-first responsive design',
        'Fast loading performance',
        'SEO friendly structure',
        'Google Maps integration',
        'Call and WhatsApp contact buttons',
        'Clean UI for customers'
      ],
      gallery: [
        '/images/AnnascarelbScreenshot1.PNG',
        '/images/annascarelbscreenshot3.png'
      ]
    },
    marketing: {
      platform: 'Instagram & Facebook',
      screenshot: '/images/AnnascarelbPortfolio.PNG',
      metrics: {
        followersGrowth: '+10.6K',
        engagementRate: '19.7%',
        monthlyReach: '895.4K'
      },
      features: ['Beauty content', 'Client testimonials', 'Appointment bookings'],
      keyFeatures: [
        'Consistent brand storytelling',
        'Before/after and service highlights',
        'Community engagement and DMs'
      ],
      gallery: [
        '/images/AnnascarelbScreenshot2.jpeg',
        'https://readdy.ai/api/search-image?query=facebook%20ads%20mockup%20for%20beauty%20clinic%20showing%20targeted%20advertising%2C%20service%20promotions%2C%20special%20offers%2C%20professional%20ad%20creative%20for%20local%20audience&width=1200&height=750&seq=annas-ads&orientation=landscape'
      ]
    }
  },
  {
    id: 'hub-30',
    name: 'Hub30',
    industry: 'GYM',
    location: 'Lebanon',
    before: 'No central place for schedules, pricing, or class info online.',
    after: 'A focused gym website: classes, membership, and contact—built for conversions.',
    website: {
      screenshot:
        '/images/Hub30Portfolio.PNG',
      features: ['Class schedules', 'Membership plans', 'Trainer highlights'],
      keyFeatures: [
        'Clear membership and pricing sections',
        'Class timetable visitors can scan quickly',
        'Strong CTAs for trials and contact',
        'Mobile-first layout for members on the go',
        'Fast-loading imagery and typography',
        'WhatsApp and phone shortcuts'
      ],
      gallery: []
    }
  },
  {
    id: 'road-443',
    name: 'Road443',
    industry: 'Restaurant',
    location: 'Lebanon',
    before: 'Menu and story lived only on social—hard to share or bookmark.',
    after: 'A restaurant website focused on menu, atmosphere, and reservations—website only.',
    website: {
      screenshot:
        '/images/RoadPortfolio.PNG',
        liveUrl: 'https://Road443.netlify.app',
      features: ['Digital menu', 'Location & hours', 'Reservation focus'],
      keyFeatures: [
        'Menu-first layout for hungry visitors',
        'Location map and opening hours',
        'Reservation or call-to-book flow',
        'Photo-led brand feel',
        'Mobile-optimized for on-the-go orders',
        'Fast loading food imagery'
      ],
      gallery: []
    }
  },
  {
    id: 'maria-beauty-salon',
    name: 'Maria Beauty Salon',
    industry: 'Perfume & Beauty Retail',
    location: 'Lebanon',
    before: 'Products and services were hard to browse outside the physical store.',
    after: 'A clean retail-style site showcasing perfumes and beauty offerings—website only.',
    website: {
      screenshot:
        '/images/MariaBeautySalonPortfolio.PNG',
        liveUrl: 'https://mariabeautysalon.netlify.app',
      features: ['Product highlights', 'Brand story', 'Contact & location'],
      keyFeatures: [
        'Perfume and beauty product grids',
        'Editorial-style imagery and typography',
        'Clear paths to WhatsApp or visit',
        'SEO-friendly structure for local discovery',
        'Smooth mobile shopping-style browse',
        'Trust cues and service areas'
      ],
      gallery: [
        '/images/MariaBeautySalonPhone.PNG',
      ]
    }
  }
];
