import type { APIRoute } from 'astro';
import { items } from '@wix/data';

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400 });
  }

  const { companyName, captainName, workEmail, squadSize, preferredDivision, preferredVenue } = body;

  if (!companyName || !captainName || !workEmail) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  await items.insert('Registrations', { companyName, captainName, workEmail, squadSize, preferredDivision, preferredVenue });
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
