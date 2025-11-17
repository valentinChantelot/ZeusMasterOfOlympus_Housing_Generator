interface ByLevelData {
  Beginner: number | null;
  Mortal: number;
  Hero: number;
  Titan: number;
  Olympian: number;
}

interface Walker {
  name: string;
  tiles: number;
  speed: number; // tile/month
}

interface Data {
  name: string;
  code: string;
  size: string;
  workers: number | null;
  walker?: Walker;
  cost: ByLevelData | null;
  appeal: {
    INI: number | null;
    SZE: number | null;
    STP: number | null;
    RNG: number | null;
  };
  fireRisk: ByLevelData | null;
  damageRisk: ByLevelData | null;
}

// General Buildings
const generalBuildings: Data[] = [
  {
    name: "Road",
    code: "-",
    size: "1x1",
    workers: null,
    cost: { Beginner: 2, Mortal: 2, Hero: 3, Titan: 4, Olympian: 5 },
    appeal: { INI: null, SZE: null, STP: null, RNG: null },
    fireRisk: null,
    damageRisk: null
  },
  {
    name: "Roadblock",
    code: "+",
    size: "1x1",
    workers: null,
    cost: { Beginner: 2, Mortal: 3, Hero: 4, Titan: 5, Olympian: 10 },
    appeal: { INI: null, SZE: null, STP: null, RNG: null },
    fireRisk: null,
    damageRisk: null
  }
];

const commonHousing: Data[] = [
  {
    name: "House",
    code: "Ho",
    size: "2x2",
    workers: null,
    cost: { Beginner: 10, Mortal: 15, Hero: 20, Titan: 25, Olympian: 30 },
    appeal: { INI: null, SZE: null, STP: null, RNG: null },
    fireRisk: { Beginner: 8, Mortal: 12, Hero: 15, Titan: 18, Olympian: 20 },
    damageRisk: null
  }
];

const eliteHousing: Data[] = [
  {
    name: "Elite House",
    code: "Eh",
    size: "4x4",
    workers: null,
    cost: { Beginner: 100, Mortal: 150, Hero: 200, Titan: 250, Olympian: 300 },
    appeal: { INI: 6, SZE: 2, STP: -1, RNG: 4 },
    fireRisk: { Beginner: 8, Mortal: 12, Hero: 15, Titan: 18, Olympian: 20 },
    damageRisk: null
  },
];

const hygieneAndSafetyBuildings: Data[] = [
  {
    name: "Fountain",
    code: "Fo",
    size: "2x2",
    workers: 4,
    cost: { Beginner: 50, Mortal: 80, Hero: 100, Titan: 120, Olympian: 150 },
    appeal: { INI: 4, SZE: 2, STP: -2, RNG: 4 },
    fireRisk: null,
    damageRisk: { Beginner: 8, Mortal: 8, Hero: 8, Titan: 12, Olympian: 8 }
  },
  {
    name: "Infirmary",
    code: "In",
    size: "4x4",
    workers: null,
    cost: { Beginner: 100, Mortal: 150, Hero: 200, Titan: 250, Olympian: 300 },
    appeal: { INI: 6, SZE: 2, STP: -1, RNG: 4 },
    fireRisk: { Beginner: 8, Mortal: 12, Hero: 15, Titan: 18, Olympian: 20 },
    damageRisk: null
  },
];

const distributionBuildings: Data[] = [
  {
    name: "Granary",
    code: "granary",
    size: "4x4",
    workers: 18,
    walker: { name: "Deliveryman", tiles: -1, speed: 54.4 },
    cost: { Beginner: 50, Mortal: 80, Hero: 100, Titan: 120, Olympian: 150 },
    appeal: { INI: -12, SZE: 1, STP: 2, RNG: 4 },
    fireRisk: { Beginner: 8, Mortal: 12, Hero: 16, Titan: 16, Olympian: 20 },
    damageRisk: { Beginner: 8, Mortal: 12, Hero: 16, Titan: 20, Olympian: 20 }
  },
  {
    name: "Storehouse",
    code: "storehouse",
    size: "3x3",
    workers: 12,
    walker: { name: "Deliveryman", tiles: -1, speed: 54.4 },
    cost: { Beginner: 25, Mortal: 40, Hero: 50, Titan: 60, Olympian: 75 },
    appeal: { INI: -2, SZE: 4, STP: 1, RNG: 4 },
    fireRisk: { Beginner: 5, Mortal: 10, Hero: 10, Titan: 15, Olympian: 18 },
    damageRisk: null
  },
  {
    name: "Agora",
    code: "Ag",
    size: "3x6",
    workers: null,
    walker: { name: "Peddler", tiles: 44, speed: 54.4 },
    cost: { Beginner: 25, Mortal: 40, Hero: 50, Titan: 60, Olympian: 75 },
    appeal: { INI: 12, SZE: 2, STP: -2, RNG: 6 },
    fireRisk: { Beginner: 6, Mortal: 12, Hero: 12, Titan: 12, Olympian: 20 },
    damageRisk: null
  },
  {
    name: "Grand Agora",
    code: "Ga",
    size: "5x6",
    workers: null,
    walker: { name: "Peddler", tiles: 44, speed: 54.4 },
    cost: { Beginner: 50, Mortal: 80, Hero: 100, Titan: 120, Olympian: 150 },
    appeal: { INI: 12, SZE: 2, STP: -2, RNG: 6 },
    fireRisk: { Beginner: 6, Mortal: 12, Hero: 12, Titan: 12, Olympian: 20 },
    damageRisk: null
  },
  {
    name: "Food Vendor",
    code: "foV",
    size: "2x2a",
    workers: 4,
    cost: { Beginner: 10, Mortal: 16, Hero: 20, Titan: 24, Olympian: 30 },
    appeal: { INI: null, SZE: null, STP: null, RNG: null },
    fireRisk: null,
    damageRisk: null
  },
  {
    name: "Fleece Vendor",
    code: "flV",
    size: "2x2a",
    workers: 4,
    cost: { Beginner: 10, Mortal: 16, Hero: 20, Titan: 24, Olympian: 30 },
    appeal: { INI: null, SZE: null, STP: null, RNG: null },
    fireRisk: null,
    damageRisk: null
  },
  {
    name: "Oil Vendor",
    code: "oV",
    size: "2x2a",
    workers: 4,
    cost: { Beginner: 10, Mortal: 16, Hero: 20, Titan: 24, Olympian: 30 },
    appeal: { INI: null, SZE: null, STP: null, RNG: null },
    fireRisk: null,
    damageRisk: null
  },
  {
    name: "Arms Vendor",
    code: "aV",
    size: "2x2a",
    workers: 4,
    cost: { Beginner: 10, Mortal: 16, Hero: 20, Titan: 24, Olympian: 30 },
    appeal: { INI: null, SZE: null, STP: null, RNG: null },
    fireRisk: null,
    damageRisk: null
  },
  {
    name: "Wine Vendor",
    code: "wV",
    size: "2x2a",
    workers: 4,
    cost: { Beginner: 10, Mortal: 16, Hero: 20, Titan: 24, Olympian: 30 },
    appeal: { INI: null, SZE: null, STP: null, RNG: null },
    fireRisk: null,
    damageRisk: null
  },
  {
    name: "Horse Trainer",
    code: "hV",
    size: "2x2a",
    workers: 4,
    cost: { Beginner: 10, Mortal: 16, Hero: 20, Titan: 24, Olympian: 30 },
    appeal: { INI: null, SZE: null, STP: null, RNG: null },
    fireRisk: null,
    damageRisk: null
  },
];

const cultureBuildings: Data[] = [
  {
    name: "College",
    code: "Co",
    size: "3x3",
    workers: 12,
    cost: { Beginner: 30, Mortal: 50, Hero: 65, Titan: 75, Olympian: 100 },
    appeal: { INI: -5, SZE: 1, STP: -3, RNG: 2 },
    fireRisk: null,
    damageRisk: { Beginner: 6, Mortal: 12, Hero: 12, Titan: 15, Olympian: 18 }
  },
  {
    name: "Podium",
    code: "Po",
    size: "2x2",
    workers: 4,
    walker: { name: "Philosopher", tiles: 35, speed: 54.4 },
    cost: { Beginner: 15, Mortal: 24, Hero: 30, Titan: 35, Olympian: 45 },
    appeal: { INI: 3, SZE: 1, STP: -1, RNG: 3 },
    fireRisk: null,
    damageRisk: { Beginner: null, Mortal: 5, Hero: 5, Titan: 7, Olympian: 10 }
  },
  {
    name: "Gymnasium",
    code: "Gy",
    size: "3x3",
    workers: 7,
    walker: { name: "Athlete", tiles: 35, speed: 54.4 },
    cost: { Beginner: 30, Mortal: 60, Hero: 75, Titan: 90, Olympian: 120 },
    appeal: { INI: null, SZE: null, STP: null, RNG: null },
    fireRisk: null,
    damageRisk: { Beginner: null, Mortal: 5, Hero: 5, Titan: 7, Olympian: 10 }
  },
  {
    name: "Drama School",
    code: "Ds",
    size: "3x3",
    workers: 10,
    cost: { Beginner: 16, Mortal: 30, Hero: 35, Titan: 42, Olympian: 50 },
    appeal: { INI: null, SZE: null, STP: null, RNG: null },
    fireRisk: null,
    damageRisk: { Beginner: 8, Mortal: 10, Hero: 15, Titan: 18, Olympian: 18 }
  },
  {
    name: "Theater",
    code: "Th",
    size: "5x5",
    workers: 18,
    walker: { name: "Actor", tiles: 35, speed: 54.4 },
    cost: { Beginner: 60, Mortal: 100, Hero: 120, Titan: 145, Olympian: 180 },
    appeal: { INI: 6, SZE: 1, STP: -1, RNG: 3 },
    fireRisk: null,
    damageRisk: { Beginner: 8, Mortal: 10, Hero: 15, Titan: 18, Olympian: 22 }
  },
  {
    name: "Stadium",
    code: "St",
    size: "10x5",
    workers: 45,
    walker: { name: "Competitor", tiles: 35, speed: 54.4 },
    cost: { Beginner: 200, Mortal: 320, Hero: 400, Titan: 500, Olympian: 600 },
    appeal: { INI: null, SZE: null, STP: null, RNG: null },
    fireRisk: null,
    damageRisk: { Beginner: null, Mortal: 8, Hero: 8, Titan: 12, Olympian: 15 }
  }
];

const aestheticsBuildings: Data[] = [
  {
    name: "Column",
    code: "o",
    size: "1x1",
    workers: null,
    cost: { Beginner: 8, Mortal: 12, Hero: 16, Titan: 18, Olympian: 24 },
    appeal: { INI: 4, SZE: 1, STP: -2, RNG: 3 },
    fireRisk: null,
    damageRisk: null
  },
  {
    name: "Park",
    code: "p",
    size: "1x1",
    workers: null,
    cost: { Beginner: 6, Mortal: 10, Hero: 12, Titan: 15, Olympian: 20 },
    appeal: { INI: 3, SZE: 1, STP: -1, RNG: 3 },
    fireRisk: null,
    damageRisk: null
  },
  {
    name: "Boulevard",
    code: "#",
    size: "3xn r",
    workers: null,
    cost: { Beginner: 15, Mortal: 24, Hero: 30, Titan: 36, Olympian: 45 },
    appeal: { INI: 3, SZE: 2, STP: -2, RNG: 4 },
    fireRisk: null,
    damageRisk: null
  },
  {
    name: "Avenue",
    code: "=",
    size: "2xn r",
    workers: null,
    cost: { Beginner: 10, Mortal: 16, Hero: 20, Titan: 25, Olympian: 30 },
    appeal: { INI: 3, SZE: 1, STP: -1, RNG: 3 },
    fireRisk: null,
    damageRisk: null
  },
  {
    name: "Bench",
    code: "b",
    size: "1x1",
    workers: null,
    cost: { Beginner: 6, Mortal: 10, Hero: 12, Titan: 15, Olympian: 20 },
    appeal: { INI: 2, SZE: 2, STP: -1, RNG: 4 },
    fireRisk: null,
    damageRisk: null
  },
  {
    name: "Flower Garden",
    code: "f",
    size: "2x2",
    workers: null,
    cost: { Beginner: 20, Mortal: 32, Hero: 40, Titan: 50, Olympian: 60 },
    appeal: { INI: 8, SZE: 1, STP: -1, RNG: 3 },
    fireRisk: null,
    damageRisk: null
  },
  {
    name: "Gazebo",
    code: "g",
    size: "2x2",
    workers: null,
    cost: { Beginner: 24, Mortal: 36, Hero: 45, Titan: 58, Olympian: 72 },
    appeal: { INI: 6, SZE: 1, STP: -1, RNG: 6 },
    fireRisk: null,
    damageRisk: null
  },
  {
    name: "Hedge Maze",
    code: "h",
    size: "3x3",
    workers: null,
    cost: { Beginner: 40, Mortal: 70, Hero: 85, Titan: 105, Olympian: 125 },
    appeal: { INI: 12, SZE: 1, STP: -1, RNG: 4 },
    fireRisk: null,
    damageRisk: null
  },
  {
    name: "Fish Pond",
    code: "~",
    size: "4x4",
    workers: null,
    cost: { Beginner: 60, Mortal: 100, Hero: 125, Titan: 145, Olympian: 185 },
    appeal: { INI: 18, SZE: 1, STP: -3, RNG: 6 },
    fireRisk: null,
    damageRisk: null
  },
  {
    name: "Commemorative monument",
    code: "*",
    size: "3x3",
    workers: null,
    cost: null,
    appeal: { INI: 30, SZE: 2, STP: -5, RNG: 6 },
    fireRisk: null,
    damageRisk: null
  }
];

export {
  generalBuildings,
  commonHousing,
  eliteHousing,
  hygieneAndSafetyBuildings,
  distributionBuildings,
  cultureBuildings,
  aestheticsBuildings
};