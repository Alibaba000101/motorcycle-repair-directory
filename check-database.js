// Script to check your current Supabase database structure
// This will show us what columns exist in repair_shops table

const SUPABASE_URL = 'https://ynohfbequtrgvmowhtrn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlub2hmYmVxdXRyZ3Ztb3dodHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxMzA0MjgsImV4cCI6MjA4MDcwNjQyOH0.US6lRXa_zsed1iZnv5nrT1b6Cwzw7miZdW_xrudVGCA';

async function checkDatabase() {
  console.log('🔍 Checking Supabase database structure...\n');

  try {
    // Fetch one row to see the structure
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/repair_shops?limit=1`,
      {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.length > 0) {
      console.log('✅ Found repair_shops table!\n');
      console.log('📋 Current columns:');
      console.log('─'.repeat(50));
      
      const columns = Object.keys(data[0]);
      columns.forEach((col, index) => {
        console.log(`${index + 1}. ${col}`);
      });
      
      console.log('─'.repeat(50));
      console.log(`\n📊 Total columns: ${columns.length}`);
      console.log('\n💡 Sample data (first row):');
      console.log(JSON.stringify(data[0], null, 2));
    } else {
      console.log('⚠️  Table exists but has no data');
    }

    // Count total rows
    const countResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/repair_shops?select=count`,
      {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'count=exact',
        },
      }
    );

    const countHeader = countResponse.headers.get('content-range');
    if (countHeader) {
      const totalCount = countHeader.split('/')[1];
      console.log(`\n📈 Total shops in database: ${totalCount}`);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 Make sure your Supabase credentials are correct');
  }
}

checkDatabase();
