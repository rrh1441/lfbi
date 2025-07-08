// Quick debug script to see actual machine data structure
const response = await fetch('https://dealbrief-scanner.fly.dev/admin/debug-queue', {
  method: 'POST'
});

const data = await response.json();
console.log('Queue monitor response:', JSON.stringify(data, null, 2));