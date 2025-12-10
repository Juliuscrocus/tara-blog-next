import pkg from '@notionhq/client';
const { Client } = pkg;

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

const PLACES_DB = process.env.NOTION_PLACES_DB;
const NEWSLETTER_DB = process.env.NOTION_NEWSLETTER_DB;
const GUIDES_DB = process.env.NOTION_GUIDES_DB;

// Properties to add to Lieux database
const placesProperties = {
  Area: { rich_text: {} },
  City: {
    select: {
      options: [
        { name: 'Paris', color: 'blue' },
        { name: 'Dublin', color: 'green' },
        { name: 'London', color: 'red' },
        { name: 'Osaka', color: 'purple' },
      ],
    },
  },
  Type: {
    select: {
      options: [
        { name: 'Café', color: 'brown' },
        { name: 'Restaurant', color: 'orange' },
        { name: 'Wine Bar', color: 'pink' },
      ],
    },
  },
  Latitude: { number: {} },
  Longitude: { number: {} },
  GoogleMapsURL: { url: {} },
};

// Properties to add to Newsletter database
const newsletterProperties = {
  Email: { email: {} },
  Source: {
    select: {
      options: [
        { name: 'website', color: 'blue' },
        { name: 'social', color: 'purple' },
        { name: 'other', color: 'gray' },
      ],
    },
  },
  SubscribedAt: { date: {} },
  Active: { checkbox: {} },
};

// Properties to add to Guides database
const guidesProperties = {
  Title_EN: { rich_text: {} },
  Slug: { rich_text: {} },
  Subtitle_FR: { rich_text: {} },
  Subtitle_EN: { rich_text: {} },
  Description_FR: { rich_text: {} },
  Description_EN: { rich_text: {} },
  City: {
    select: {
      options: [
        { name: 'Paris', color: 'blue' },
        { name: 'Dublin', color: 'green' },
        { name: 'London', color: 'red' },
        { name: 'Osaka', color: 'purple' },
      ],
    },
  },
  Image: { url: {} },
  Places: { number: {} },
  Available: { checkbox: {} },
  PDF_URL: { url: {} },
};

async function updateDatabase(dbId, dbName, properties) {
  console.log(`\n📊 Updating ${dbName} database...`);
  console.log(`   ID: ${dbId}`);

  try {
    // First retrieve to confirm access using dataSources
    const existing = await notion.dataSources.retrieve({ data_source_id: dbId });
    console.log(`   Found: ${existing.title?.[0]?.plain_text || 'Untitled'}`);

    // Then update using dataSources
    const result = await notion.dataSources.update({
      data_source_id: dbId,
      properties: properties,
    });
    console.log(`✅ ${dbName} updated successfully!`);
    console.log(`   New properties: ${Object.keys(result.properties).join(', ')}`);
  } catch (error) {
    console.error(`❌ Error updating ${dbName}:`, error.message);
    console.error(`   Code: ${error.code}`);
  }
}

async function setupAllDatabases() {
  console.log('🚀 Setting up Notion databases...\n');

  // Update Lieux
  if (PLACES_DB) {
    await updateDatabase(PLACES_DB, 'Lieux', placesProperties);
  }

  // Update Newsletter
  if (NEWSLETTER_DB) {
    await updateDatabase(NEWSLETTER_DB, 'Newsletter', newsletterProperties);
  }

  // Update Guides
  if (GUIDES_DB) {
    await updateDatabase(GUIDES_DB, 'Guides', guidesProperties);
  }

  console.log('\n🎉 All databases configured!');
}

setupAllDatabases();
