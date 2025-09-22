
const profiles = require('../../../data/profiles');
export function GET() {

  return new Response(JSON.stringify(profiles), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
