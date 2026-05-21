// Utility functions to calculate distances between lat/lng points
// Haversine formula
export function distanceKm(a, b) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const sinDlat = Math.sin(dLat / 2);
  const sinDlon = Math.sin(dLon / 2);
  const aa = sinDlat * sinDlat + sinDlon * sinDlon * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1 - aa));
  return R * c;
}

export function totalDistanceKm(points = []) {
  if (!points || points.length < 2) return 0;
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    total += distanceKm(points[i - 1], points[i]);
  }
  return total;
}

// Returns array of segment objects with from, to, distanceKm
export function segmentDistances(points = []) {
  if (!points || points.length < 2) return [];
  const segments = [];
  for (let i = 1; i < points.length; i++) {
    const from = points[i - 1];
    const to = points[i];
    const dist = distanceKm(from, to);
    segments.push({ from, to, distanceKm: dist });
  }
  return segments;
}

export function segmentsWithCost(points = [], ratePerKm = 12000) {
  const segs = segmentDistances(points);
  return segs.map(s => ({ ...s, cost: Math.round(s.distanceKm * ratePerKm) }));
}
