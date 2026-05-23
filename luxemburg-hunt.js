startHunt({
  id: "luxemburg",
  title: "🕵️ Luxemburg Treasure Trail",
  radiusMeters: 180,

  intro: `
    Welcome to the Luxemburg Treasure Trail!
    Find each location, solve the tiny mission, and verify your position with GPS.
  `,

  extro: `
    🎉 Treasure found! You completed the Luxemburg scavenger hunt.
    Final challenge: celebrate with a group selfie.
  `,

  stops: [
    {
      title: "Stop 1: Palais Grand-Ducal",
      clue: "Track down the Palais Grand-Ducal in Luxemburg City.",
      task: "Reach the palace and note one detail from the facade.",
      hint: "Head toward the old town center near Rue du Marché-aux-Herbes.",
      lat: 49.6117,
      lon: 6.1319
    },
    {
      title: "Stop 2: Bock Casemates",
      clue: "Find the Bock Casemates viewpoint.",
      task: "Reach the viewpoint and take a photo of the valley.",
      hint: "Look for signs to Casemates du Bock near Montée de Clausen.",
      lat: 49.6128,
      lon: 6.1361
    },
    {
      title: "Stop 3: Gëlle Fra",
      clue: "Track down the Gëlle Fra monument.",
      task: "Reach the monument and count the nearby flagpoles.",
      hint: "Head to Place de la Constitution.",
      lat: 49.6099,
      lon: 6.1275
    }
  ]
});
