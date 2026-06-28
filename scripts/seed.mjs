/**
 * Run once to seed CMS collections with initial data.
 * Collections (Teams, Venues, Registrations) must exist in Wix CMS dashboard first.
 * Usage: node scripts/seed.mjs
 */
import { createClient, AppStrategy } from '@wix/sdk';
import { items, collections } from '@wix/data';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  try {
    const raw = readFileSync(join(__dirname, '../.env.local'), 'utf8');
    const env = {};
    for (const line of raw.split('\n')) {
      const stripped = line.trim();
      if (!stripped || stripped.startsWith('#')) continue;
      const eq = stripped.indexOf('=');
      if (eq === -1) continue;
      const key = stripped.slice(0, eq).trim();
      let val = stripped.slice(eq + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      env[key] = val;
    }
    return env;
  } catch {
    return {};
  }
}

const env = loadEnv();

const WIX_CLIENT_ID = env.WIX_CLIENT_ID || process.env.WIX_CLIENT_ID;
const WIX_CLIENT_SECRET = env.WIX_CLIENT_SECRET || process.env.WIX_CLIENT_SECRET;
const WIX_CLIENT_INSTANCE_ID = env.WIX_CLIENT_INSTANCE_ID || process.env.WIX_CLIENT_INSTANCE_ID;
const WIX_CLIENT_PUBLIC_KEY = env.WIX_CLIENT_PUBLIC_KEY || process.env.WIX_CLIENT_PUBLIC_KEY;

if (!WIX_CLIENT_ID || !WIX_CLIENT_SECRET || !WIX_CLIENT_INSTANCE_ID) {
  console.error('Missing WIX_CLIENT_ID / WIX_CLIENT_SECRET / WIX_CLIENT_INSTANCE_ID');
  process.exit(1);
}

const client = createClient({
  modules: { items, collections },
  auth: AppStrategy({
    appId: WIX_CLIENT_ID,
    appSecret: WIX_CLIENT_SECRET,
    instanceId: WIX_CLIENT_INSTANCE_ID,
    publicKey: WIX_CLIENT_PUBLIC_KEY,
  }),
});

async function ensureCollection(id, displayName, fields) {
  try {
    await client.collections.getDataCollection(id);
    console.log(`  collection ${id} already exists`);
  } catch {
    console.log(`  creating collection ${id}...`);
    await client.collections.createDataCollection({
      id,
      displayName,
      fields,
      permissions: {
        read: 'ANYONE',
        insert: 'ADMIN',
        update: 'ADMIN',
        remove: 'ADMIN',
      },
    });
    console.log(`  created ${id}`);
  }
}

const TEXT = 'TEXT';
const NUMBER = 'NUMBER';
const BOOLEAN = 'BOOLEAN';

const TEAM_FIELDS = [
  { key: 'name',       displayName: 'Team Name',       type: TEXT    },
  { key: 'division',   displayName: 'Division',         type: TEXT    },
  { key: 'pos',        displayName: 'Position',         type: NUMBER  },
  { key: 'p',          displayName: 'Played',           type: NUMBER  },
  { key: 'w',          displayName: 'Won',              type: NUMBER  },
  { key: 'd',          displayName: 'Drawn',            type: NUMBER  },
  { key: 'l',          displayName: 'Lost',             type: NUMBER  },
  { key: 'gf',         displayName: 'Goals For',        type: NUMBER  },
  { key: 'ga',         displayName: 'Goals Against',    type: NUMBER  },
  { key: 'gd',         displayName: 'Goal Difference',  type: TEXT    },
  { key: 'pts',        displayName: 'Points',           type: NUMBER  },
  { key: 'leader',     displayName: 'League Leader',    type: BOOLEAN },
  { key: 'relegation', displayName: 'Relegation Zone',  type: BOOLEAN },
];

const VENUE_FIELDS = [
  { key: 'name',     displayName: 'Venue Name',   type: TEXT },
  { key: 'postcode', displayName: 'Postcode',      type: TEXT },
  { key: 'walk',     displayName: 'Walk Time',     type: TEXT },
  { key: 'surface',  displayName: 'Surface',       type: TEXT },
  { key: 'slots',    displayName: 'Time Slots',    type: TEXT },
  { key: 'desc',     displayName: 'Description',   type: TEXT },
];

const REGISTRATION_FIELDS = [
  { key: 'company',   displayName: 'Company Name',     type: TEXT },
  { key: 'captain',   displayName: 'Captain Name',     type: TEXT },
  { key: 'email',     displayName: 'Work Email',       type: TEXT },
  { key: 'squadSize', displayName: 'Squad Size',       type: TEXT },
  { key: 'division',  displayName: 'Division',         type: TEXT },
  { key: 'venue',     displayName: 'Preferred Venue',  type: TEXT },
];

const STORY_FIELDS = [
  { key: 'heading', displayName: 'Heading', type: TEXT },
  { key: 'body',    displayName: 'Body',    type: TEXT },
];

const CAPTAIN_FIELDS = [
  { key: 'name',    displayName: 'Name',    type: TEXT },
  { key: 'company', displayName: 'Company', type: TEXT },
  { key: 'quote',   displayName: 'Quote',   type: TEXT },
];

const TEAMS_SEED = [
  { _id: 'team-nql', name: 'Northern Quarter Logistics', division: 'PRM', pos: 1, p: 12, w: 10, d: 1, l: 1, gf: 34, ga: 12, gd: '+22', pts: 31, leader: true,  relegation: false },
  { _id: 'team-daf', name: 'Deansgate Audit FC',          division: 'PRM', pos: 2, p: 12, w:  9, d: 2, l: 1, gf: 28, ga: 14, gd: '+14', pts: 29, leader: false, relegation: false },
  { _id: 'team-spu', name: 'Spinningfields Utd',          division: 'PRM', pos: 3, p: 12, w:  8, d: 1, l: 3, gf: 25, ga: 18, gd: '+7',  pts: 25, leader: false, relegation: false },
  { _id: 'team-pcp', name: 'Piccadilly Planners',         division: 'PRM', pos: 4, p: 12, w:  6, d: 3, l: 3, gf: 19, ga: 15, gd: '+4',  pts: 21, leader: false, relegation: false },
  { _id: 'team-mcr', name: 'Media City Rovers',           division: 'PRM', pos: 5, p: 12, w:  5, d: 2, l: 5, gf: 16, ga: 19, gd: '-3',  pts: 17, leader: false, relegation: false },
  { _id: 'team-cfu', name: 'Castlefield United',          division: 'PRM', pos: 6, p: 12, w:  4, d: 2, l: 6, gf: 14, ga: 22, gd: '-8',  pts: 14, leader: false, relegation: false },
  { _id: 'team-orw', name: 'Oxford Road Wanderers',       division: 'PRM', pos: 7, p: 12, w:  3, d: 1, l: 8, gf: 12, ga: 25, gd: '-13', pts: 10, leader: false, relegation: true  },
  { _id: 'team-anc', name: 'Ancoats Creative',            division: 'PRM', pos: 8, p: 12, w:  2, d: 2, l: 8, gf: 10, ga: 28, gd: '-18', pts:  8, leader: false, relegation: true  },
];

const STORY_SEED = [
  {
    _id: 'story-why-we-built',
    heading: 'Why We Built a League Around the Clock',
    body: 'The Lunch Hour League started because a finance team kept losing their five-a-side to overrunning meetings, and then losing the meeting because half the room wanted to be at football. We decided the hour was the product. Kickoff is 12:15 sharp; if a team is not on the pitch the clock still runs, because the next match needs the slot. Forty minutes of play, a hard final whistle at 12:55, and the showers are guaranteed clear by 13:00 so nobody walks into a one o\'clock standup damp. We field teams of six so a company can rotate and nobody sits out a whole match. The disciplinary panel is mostly a joke, except for the one rule it takes seriously: do not schedule a meeting over match day.',
  },
];

const CAPTAINS_SEED = [
  { _id: 'captain-priya',  name: 'Priya Shah',  company: 'Deansgate Audit FC',        quote: 'I have never once been late to a one o\'clock because of football. That sentence used to be a lie.' },
  { _id: 'captain-tom',    name: 'Tom Okafor',  company: 'Northern Quarter Logistics', quote: 'Six players means I am not begging people to commit to ninety minutes. They commit to one lunch. They show up.' },
  { _id: 'captain-ana',    name: 'Ana Machado', company: 'Spinningfields Utd',         quote: 'We won the division. The whole thing fits in a lunch break. Our manager still doesn\'t know.' },
];

const VENUES_SEED = [
  { _id: 'venue-cage', name: 'The Cage, Whitworth Street', postcode: 'M1',  walk: '6 MIN WALK',  surface: '3G Astro',         slots: '12:15, 12:45', desc: 'Covered all-weather pitch adjacent to Oxford Road corridor. Shower block on-site.' },
  { _id: 'venue-spf',  name: 'Spinningfields Five',        postcode: 'M3',  walk: '4 MIN WALK',  surface: 'Premium 4G',       slots: '12:15, 13:00', desc: 'Indoor sprung floor pitch inside the Deansgate tower complex. Climate controlled.' },
  { _id: 'venue-ctf',  name: 'Castlefield Turf',           postcode: 'M15', walk: '12 MIN WALK', surface: 'Indoor hardcourt', slots: '11:45, 12:30', desc: 'Largest venue in the network. Suitable for overflow fixtures and play-offs.' },
  { _id: 'venue-anc',  name: 'Ancoats Arena',              postcode: 'M4',  walk: '8 MIN WALK',  surface: 'Sand-based Astro', slots: '12:15, 13:00', desc: "Manchester's newest 3G facility. New for Autumn 2026 season." },
];

async function upsertItems(collectionId, seedData) {
  for (const { _id, ...fields } of seedData) {
    try {
      await client.items.get(collectionId, _id);
      console.log(`  item ${_id} already exists — skipping`);
    } catch {
      await client.items.insert(collectionId, { _id, ...fields });
      console.log(`  inserted ${_id}`);
    }
  }
}

(async () => {
  console.log('=== Lunch Hour League CMS Seed ===\n');
  console.log('Creating/verifying collections...');

  await ensureCollection('Teams', 'Teams', TEAM_FIELDS);
  await ensureCollection('Venues', 'Venues', VENUE_FIELDS);
  await ensureCollection('Registrations', 'Registrations', REGISTRATION_FIELDS);
  await ensureCollection('StoryBlocks', 'StoryBlocks', STORY_FIELDS);
  await ensureCollection('Captains', 'Captains', CAPTAIN_FIELDS);

  console.log('\nSeeding Teams...');
  await upsertItems('Teams', TEAMS_SEED);

  console.log('\nSeeding Venues...');
  await upsertItems('Venues', VENUES_SEED);

  console.log('\nSeeding StoryBlocks...');
  await upsertItems('StoryBlocks', STORY_SEED);

  console.log('\nSeeding Captains...');
  await upsertItems('Captains', CAPTAINS_SEED);

  console.log('\nDone. Run `npm run dev` to start the site.');
})().catch(err => {
  console.error('Seed failed:', err.message || err);
  process.exit(1);
});
