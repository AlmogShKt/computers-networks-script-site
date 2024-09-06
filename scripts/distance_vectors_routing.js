// מרחקים בין התחנות
const distances = {
  B: [5, 0, 7, 12, 3, 6], // Distance from station B to A, B, C, D, E, F
  F: [2, 2, 11, 9, 1, 0], // Distance from station F to A, B, C, D, E, F
};

// פונקציה לחישוב המרחק המינימלי
function findMinDistance(start, distances) {
  const destNames = ["A", "B", "C", "D", "E", "F"];
  let results = {};

  // Define distances from the start to station B and F
  let startToB, startToF;

  if (start === "B") {
    startToB = 0; // If we start at B, distance to B is 0
    startToF = distances.B[5]; // Distance from B to F
  } else if (start === "F") {
    startToF = 0; // If we start at F, distance to F is 0
    startToB = distances.F[5]; // Distance from F to B
  } else {
    console.error("Starting point should be either B or F.");
    return;
  }

  // Calculate the minimum distance to all destinations
  for (let i = 0; i < destNames.length; i++) {
    const dest = destNames[i];
    if (dest === start) {
      results[dest] = { line: start, distance: 0 };
    } else {
      const distanceViaB = startToB + distances.B[i];
      const distanceViaF = startToF + distances.F[i];

      // Determine the minimum distance to the destination via B or F
      if (distanceViaB < distanceViaF) {
        results[dest] = { line: "B", distance: distanceViaB };
      } else {
        results[dest] = { line: "F", distance: distanceViaF };
      }
    }
  }
  return results;
}

// חישוב תוצאות והדפסה
const start = "B"; // Change this to "F" if you want to start from F
const minDistances = findMinDistance(start, distances);
for (const dest in minDistances) {
  console.log(
    `Destination: ${dest}, Line: ${minDistances[dest].line}, Distance: ${minDistances[dest].distance}`
  );
}
