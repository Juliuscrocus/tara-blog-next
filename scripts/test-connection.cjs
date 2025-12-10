const { Client } = require('@notionhq/client');
require('dotenv').config({ path: '.env.local' });

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

async function testAllDatabases() {
  console.log('🧪 Testing Notion connection for all databases...\n');

  // Test Articles
  console.log('📝 ARTICLES');
  try {
    const articles = await notion.dataSources.query({
      data_source_id: process.env.NOTION_ARTICLES_DB,
      page_size: 1,
    });
    console.log(`   ✅ Connected! ${articles.results.length > 0 ? 'Has data' : 'Empty'}`);
    if (articles.results.length > 0) {
      const props = Object.keys(articles.results[0].properties);
      console.log(`   Properties: ${props.join(', ')}`);
    }
  } catch (e) {
    console.log(`   ❌ Error: ${e.message}`);
  }

  // Test Places
  console.log('\n📍 LIEUX');
  try {
    const places = await notion.dataSources.query({
      data_source_id: process.env.NOTION_PLACES_DB,
      page_size: 1,
    });
    console.log(`   ✅ Connected! ${places.results.length > 0 ? 'Has data' : 'Empty'}`);
    if (places.results.length > 0) {
      const props = Object.keys(places.results[0].properties);
      console.log(`   Properties: ${props.join(', ')}`);
    }
  } catch (e) {
    console.log(`   ❌ Error: ${e.message}`);
  }

  // Test Newsletter
  console.log('\n📧 NEWSLETTER');
  try {
    const newsletter = await notion.dataSources.query({
      data_source_id: process.env.NOTION_NEWSLETTER_DB,
      page_size: 1,
    });
    console.log(`   ✅ Connected! ${newsletter.results.length > 0 ? 'Has data' : 'Empty'}`);
    if (newsletter.results.length > 0) {
      const props = Object.keys(newsletter.results[0].properties);
      console.log(`   Properties: ${props.join(', ')}`);
    }
  } catch (e) {
    console.log(`   ❌ Error: ${e.message}`);
  }

  // Test Guides
  console.log('\n🗺️ GUIDES');
  try {
    const guides = await notion.dataSources.query({
      data_source_id: process.env.NOTION_GUIDES_DB,
      page_size: 1,
    });
    console.log(`   ✅ Connected! ${guides.results.length > 0 ? 'Has data' : 'Empty'}`);
    if (guides.results.length > 0) {
      const props = Object.keys(guides.results[0].properties);
      console.log(`   Properties: ${props.join(', ')}`);
    }
  } catch (e) {
    console.log(`   ❌ Error: ${e.message}`);
  }

  console.log('\n✨ Test complete!');
}

testAllDatabases();
