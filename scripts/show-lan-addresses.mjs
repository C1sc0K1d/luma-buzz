import { networkInterfaces } from 'node:os';

console.log('\nOpen on a phone connected to the same local network (default port 4200):');
let found = false;
for (const [name, addresses] of Object.entries(networkInterfaces())) {
  for (const { address, family, internal } of addresses ?? []) {
    if (family !== 'IPv4' || internal || address.startsWith('169.254.')) continue;
    console.log(`  ${name}: http://${address}:4200`);
    found = true;
  }
}
if (!found) console.log('  No local IPv4 address found. Check your Wi-Fi or Ethernet connection.');
console.log('The Next.js 0.0.0.0 address means all network interfaces; use an address above.\n');
