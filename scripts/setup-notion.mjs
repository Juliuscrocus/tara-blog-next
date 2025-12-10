import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

async function listAllDatabases() {
  console.log('🔍 Searching for all databases the integration can access...\n');

  try {
    const response = await notion.search({
      filter: { property: 'object', value: 'data_source' },
    });

    if (response.results.length === 0) {
      console.log('❌ No databases found. Make sure to connect the integration to your databases.');
      return;
    }

    console.log(`✅ Found ${response.results.length} database(s):\n`);

    for (const db of response.results) {
      const title = db.title?.[0]?.plain_text || 'Untitled';
      console.log(`📊 ${title}`);
      console.log(`   ID: ${db.id}`);
      console.log(`   URL: ${db.url}`);

      if (db.properties) {
        const propNames = Object.keys(db.properties).join(', ');
        console.log(`   Properties: ${propNames}`);
      }
      console.log('');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

listAllDatabases();
