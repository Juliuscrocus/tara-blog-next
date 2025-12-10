import { Client } from '@notionhq/client';

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

// Database IDs
const ARTICLES_DB = process.env.NOTION_ARTICLES_DB;
const PLACES_DB = process.env.NOTION_PLACES_DB;
const NEWSLETTER_DB = process.env.NOTION_NEWSLETTER_DB;

// ============================================
// ARTICLES
// ============================================

/**
 * Fetch all published articles from Notion
 */
export async function getArticles() {
  if (!ARTICLES_DB) {
    console.warn('NOTION_ARTICLES_DB not configured');
    return [];
  }

  const response = await notion.dataSources.query({
    data_source_id: ARTICLES_DB,
    filter: {
      property: 'Published',
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  });

  return response.results.map(parseArticle);
}

/**
 * Fetch a single article by slug
 */
export async function getArticleBySlug(slug) {
  if (!ARTICLES_DB) {
    console.warn('NOTION_ARTICLES_DB not configured');
    return null;
  }

  const response = await notion.dataSources.query({
    data_source_id: ARTICLES_DB,
    filter: {
      property: 'Slug',
      rich_text: {
        equals: slug,
      },
    },
  });

  if (response.results.length === 0) return null;

  const page = response.results[0];
  const blocks = await getPageContent(page.id);

  return {
    ...parseArticle(page),
    content: blocks,
  };
}

/**
 * Fetch articles by category
 */
export async function getArticlesByCategory(category) {
  if (!ARTICLES_DB) {
    console.warn('NOTION_ARTICLES_DB not configured');
    return [];
  }

  const response = await notion.dataSources.query({
    data_source_id: ARTICLES_DB,
    filter: {
      and: [
        {
          property: 'Published',
          checkbox: {
            equals: true,
          },
        },
        {
          property: 'Category',
          select: {
            equals: category,
          },
        },
      ],
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  });

  return response.results.map(parseArticle);
}

/**
 * Fetch featured articles
 */
export async function getFeaturedArticles() {
  if (!ARTICLES_DB) {
    console.warn('NOTION_ARTICLES_DB not configured');
    return [];
  }

  const response = await notion.dataSources.query({
    data_source_id: ARTICLES_DB,
    filter: {
      and: [
        {
          property: 'Published',
          checkbox: {
            equals: true,
          },
        },
        {
          property: 'Featured',
          checkbox: {
            equals: true,
          },
        },
      ],
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  });

  return response.results.map(parseArticle);
}

/**
 * Parse Notion page to article object
 */
function parseArticle(page) {
  const props = page.properties;

  return {
    id: page.id,
    slug: props.Slug?.rich_text?.[0]?.plain_text || '',
    title: {
      // Support both "Title_FR" and "Tittle_FR" (typo in Notion)
      fr: props.Title_FR?.title?.[0]?.plain_text || props.Tittle_FR?.title?.[0]?.plain_text || '',
      en: props.Title_EN?.rich_text?.[0]?.plain_text || props.Tittle_EN?.rich_text?.[0]?.plain_text || '',
    },
    excerpt: {
      fr: props.Excerpt_FR?.rich_text?.[0]?.plain_text || '',
      en: props.Excerpt_EN?.rich_text?.[0]?.plain_text || '',
    },
    category: props.Category?.select?.name || '',
    city: props.City?.select?.name || '',
    date: props.Date?.date?.start || '',
    readTime: props.ReadTime?.number || 5,
    image: props.Image?.url || props.Image_URL?.url || props.Image?.files?.[0]?.file?.url || '',
    featured: props.Featured?.checkbox || false,
  };
}

/**
 * Get page content (blocks)
 */
async function getPageContent(pageId) {
  const blocks = await notion.blocks.children.list({
    block_id: pageId,
  });

  return blocks.results.map(parseBlock);
}

/**
 * Parse Notion block to content object
 */
function parseBlock(block) {
  const type = block.type;

  switch (type) {
    case 'paragraph':
      return {
        type: 'paragraph',
        text: {
          fr: block.paragraph.rich_text.map(t => t.plain_text).join(''),
          en: block.paragraph.rich_text.map(t => t.plain_text).join(''), // Same for now
        },
      };
    case 'heading_1':
    case 'heading_2':
    case 'heading_3':
      return {
        type: 'heading',
        level: parseInt(type.slice(-1)),
        text: {
          fr: block[type].rich_text.map(t => t.plain_text).join(''),
          en: block[type].rich_text.map(t => t.plain_text).join(''),
        },
      };
    case 'image':
      return {
        type: 'image',
        url: block.image.file?.url || block.image.external?.url || '',
        caption: block.image.caption?.[0]?.plain_text || '',
      };
    case 'quote':
      return {
        type: 'quote',
        text: {
          fr: block.quote.rich_text.map(t => t.plain_text).join(''),
          en: block.quote.rich_text.map(t => t.plain_text).join(''),
        },
      };
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return {
        type: 'list_item',
        text: {
          fr: block[type].rich_text.map(t => t.plain_text).join(''),
          en: block[type].rich_text.map(t => t.plain_text).join(''),
        },
      };
    default:
      return {
        type: 'unknown',
        raw: block,
      };
  }
}

// ============================================
// PLACES (Carte)
// ============================================

/**
 * Fetch all places from Notion
 */
export async function getPlaces() {
  if (!PLACES_DB) {
    console.warn('NOTION_PLACES_DB not configured');
    return [];
  }

  const response = await notion.dataSources.query({
    data_source_id: PLACES_DB,
    sorts: [
      {
        property: 'City',
        direction: 'ascending',
      },
      {
        property: 'Name',
        direction: 'ascending',
      },
    ],
  });

  return response.results.map(parsePlace);
}

/**
 * Fetch places by city
 */
export async function getPlacesByCity(city) {
  if (!PLACES_DB) {
    console.warn('NOTION_PLACES_DB not configured');
    return [];
  }

  const response = await notion.dataSources.query({
    data_source_id: PLACES_DB,
    filter: {
      property: 'City',
      select: {
        equals: city,
      },
    },
  });

  return response.results.map(parsePlace);
}

/**
 * Parse Notion page to place object
 */
function parsePlace(page) {
  const props = page.properties;

  return {
    id: page.id,
    name: props.Name?.title?.[0]?.plain_text || '',
    area: props.Area?.rich_text?.[0]?.plain_text || '',
    city: props.City?.select?.name || '',
    type: props.Type?.select?.name || '',
    lat: props.Latitude?.number || 0,
    lng: props.Longitude?.number || 0,
    googleMapsUrl: props.GoogleMapsURL?.url || '',
  };
}

// ============================================
// NEWSLETTER
// ============================================

/**
 * Add email to newsletter database
 */
export async function addNewsletterEmail(email, source = 'website') {
  if (!NEWSLETTER_DB) {
    console.warn('NOTION_NEWSLETTER_DB not configured');
    return { success: false, error: 'Database not configured' };
  }

  try {
    // Check if email already exists
    const existing = await notion.dataSources.query({
      data_source_id: NEWSLETTER_DB,
      filter: {
        property: 'Email',
        email: {
          equals: email,
        },
      },
    });

    if (existing.results.length > 0) {
      return { success: false, error: 'Email already subscribed' };
    }

    // Add new email
    await notion.pages.create({
      parent: { data_source_id: NEWSLETTER_DB },
      properties: {
        Email: {
          email: email,
        },
        Source: {
          select: {
            name: source,
          },
        },
        SubscribedAt: {
          date: {
            start: new Date().toISOString(),
          },
        },
        Active: {
          checkbox: true,
        },
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error adding newsletter email:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get all newsletter subscribers
 */
export async function getNewsletterEmails() {
  if (!NEWSLETTER_DB) {
    console.warn('NOTION_NEWSLETTER_DB not configured');
    return [];
  }

  const response = await notion.dataSources.query({
    data_source_id: NEWSLETTER_DB,
    filter: {
      property: 'Active',
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: 'SubscribedAt',
        direction: 'descending',
      },
    ],
  });

  return response.results.map(page => ({
    email: page.properties.Email?.email || '',
    source: page.properties.Source?.select?.name || '',
    subscribedAt: page.properties.SubscribedAt?.date?.start || '',
  }));
}

// ============================================
// GUIDES
// ============================================

const GUIDES_DB = process.env.NOTION_GUIDES_DB;

/**
 * Fetch all guides from Notion
 */
export async function getGuides() {
  if (!GUIDES_DB) {
    console.warn('NOTION_GUIDES_DB not configured');
    return [];
  }

  const response = await notion.dataSources.query({
    data_source_id: GUIDES_DB,
    sorts: [
      {
        property: 'City',
        direction: 'ascending',
      },
    ],
  });

  return response.results.map(parseGuide);
}

/**
 * Fetch a single guide by slug
 */
export async function getGuideBySlug(slug) {
  if (!GUIDES_DB) {
    console.warn('NOTION_GUIDES_DB not configured');
    return null;
  }

  const response = await notion.dataSources.query({
    data_source_id: GUIDES_DB,
    filter: {
      property: 'Slug',
      rich_text: {
        equals: slug,
      },
    },
  });

  if (response.results.length === 0) return null;
  return parseGuide(response.results[0]);
}

/**
 * Parse Notion page to guide object
 */
function parseGuide(page) {
  const props = page.properties;

  return {
    id: page.id,
    slug: props.Slug?.rich_text?.[0]?.plain_text || '',
    city: props.City?.select?.name || '',
    title: {
      fr: props.Name?.title?.[0]?.plain_text || props.Title_FR?.title?.[0]?.plain_text || '',
      en: props.Title_EN?.rich_text?.[0]?.plain_text || '',
    },
    subtitle: {
      fr: props.Subtitle_FR?.rich_text?.[0]?.plain_text || '',
      en: props.Subtitle_EN?.rich_text?.[0]?.plain_text || '',
    },
    description: {
      fr: props.Description_FR?.rich_text?.[0]?.plain_text || '',
      en: props.Description_EN?.rich_text?.[0]?.plain_text || '',
    },
    image: props.Image?.url || '',
    places: props.Places?.number || 0,
    available: props.Available?.checkbox || false,
    pdfUrl: props.PDF_URL?.url || '',
  };
}
