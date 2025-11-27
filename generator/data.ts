type Services = "fire" | "damage" | "water" | "medicine" | "athlete" | "philosopher" | "actor" | "competitor" | "study" | "appeal" | "basicNeeds" | "richNeeds"

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
  require: Services[];
  produce: Services[];
}

const generalBuildings: Data[] = [
  {
    name: "Road",
    code: "-",
    size: "1x1",
    workers: null,
    cost: { Beginner: 2, Mortal: 2, Hero: 3, Titan: 4, Olympian: 5 },
    require: [],
    produce: []
  },
  {
    name: "Roadblock",
    code: "+",
    size: "1x1r",
    workers: null,
    cost: { Beginner: 2, Mortal: 3, Hero: 4, Titan: 5, Olympian: 10 },
    require: [],
    produce: []
  }
];

const commonHousing: Data[] = [
  {
    name: "House",
    code: "Ho",
    size: "2x2",
    workers: null,
    cost: { Beginner: 10, Mortal: 15, Hero: 20, Titan: 25, Olympian: 30 },
    require: ["fire", "damage", "water", "basicNeeds", "appeal", "medicine", "philosopher", "actor", "athlete", "study"],
    produce: []
  }
];

const eliteHousing: Data[] = [
  {
    name: "Elite House",
    code: "Eh",
    size: "4x4",
    workers: null,
    cost: { Beginner: 100, Mortal: 150, Hero: 200, Titan: 250, Olympian: 300 },
    require: ["fire", "damage", "water", "basicNeeds", "appeal", "medicine", "philosopher", "actor", "athlete", "study", "richNeeds", "competitor"],
    produce: []
  },
];

const hygieneAndSafetyBuildings: Data[] = [
  {
    name: "Fountain",
    code: "Fo",
    size: "2x2",
    workers: 4,
    cost: { Beginner: 50, Mortal: 80, Hero: 100, Titan: 120, Olympian: 150 },
    require: ["fire", "damage"],
    produce: ["water"]
  },
  {
    name: "Infirmary",
    code: "In",
    size: "4x4",
    workers: 11,
    cost: { Beginner: 100, Mortal: 150, Hero: 200, Titan: 250, Olympian: 300 },
    require: ["fire", "damage", "water"],
    produce: ["medicine"]
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
    require: ["fire", "damage", "water"],
    produce: []
  },
  {
    name: "Storehouse",
    code: "storehouse",
    size: "3x3",
    workers: 12,
    walker: { name: "Deliveryman", tiles: -1, speed: 54.4 },
    cost: { Beginner: 25, Mortal: 40, Hero: 50, Titan: 60, Olympian: 75 },
    require: ["fire", "damage", "water"],
    produce: []
  },
  {
    name: "Agora",
    code: "Ag",
    size: "3x6",
    workers: 12,
    walker: { name: "Peddler", tiles: 44, speed: 54.4 },
    cost: { Beginner: 25, Mortal: 40, Hero: 50, Titan: 60, Olympian: 75 },
    require: [],
    produce: ["basicNeeds"]
  },
  {
    name: "Grand Agora",
    code: "Ga",
    size: "5x6",
    workers: 24,
    walker: { name: "Peddler", tiles: 44, speed: 54.4 },
    cost: { Beginner: 50, Mortal: 80, Hero: 100, Titan: 120, Olympian: 150 },
    require: [],
    produce: ["richNeeds"]
  }
];

const cultureBuildings: Data[] = [
  {
    name: "College",
    code: "Co",
    size: "3x3",
    workers: 12,
    cost: { Beginner: 30, Mortal: 50, Hero: 65, Titan: 75, Olympian: 100 },
    require: ["fire", "damage", "water"],
    produce: ["study"]
  },
  {
    name: "Podium",
    code: "Po",
    size: "2x2",
    workers: 4,
    walker: { name: "Philosopher", tiles: 35, speed: 54.4 },
    cost: { Beginner: 15, Mortal: 24, Hero: 30, Titan: 35, Olympian: 45 },
    require: ["fire", "damage", "water"],
    produce: ["philosopher"]
  },
  {
    name: "Gymnasium",
    code: "Gy",
    size: "3x3",
    workers: 7,
    walker: { name: "Athlete", tiles: 35, speed: 54.4 },
    cost: { Beginner: 30, Mortal: 60, Hero: 75, Titan: 90, Olympian: 120 },
    require: ["fire", "damage", "water"],
    produce: ["athlete"]
  },
  {
    name: "Drama School",
    code: "Ds",
    size: "3x3",
    workers: 10,
    cost: { Beginner: 16, Mortal: 30, Hero: 35, Titan: 42, Olympian: 50 },
    require: ["fire", "damage", "water"],
    produce: ["actor"]
  },
  {
    name: "Theater",
    code: "Th",
    size: "5x5",
    workers: 18,
    walker: { name: "Actor", tiles: 35, speed: 54.4 },
    cost: { Beginner: 60, Mortal: 100, Hero: 120, Titan: 145, Olympian: 180 },
    require: ["fire", "damage", "water"],
    produce: ["actor"]
  },
  // {
  //   name: "Stadium",
  //   code: "St",
  //   size: "10x5",
  //   workers: 45,
  //   walker: { name: "Competitor", tiles: 35, speed: 54.4 },
  //   cost: { Beginner: 200, Mortal: 320, Hero: 400, Titan: 500, Olympian: 600 },
  //   require: ["fire", "damage", "water"],
  //   produce: ["competitor"]
  // }
];

const aestheticsBuildings: Data[] = [
  {
    name: "Column",
    code: "o",
    size: "1x1",
    workers: null,
    cost: { Beginner: 8, Mortal: 12, Hero: 16, Titan: 18, Olympian: 24 }, require: [],
    produce: ["appeal"]
  },
  {
    name: "Park",
    code: "p",
    size: "1x1",
    workers: null,
    cost: { Beginner: 6, Mortal: 10, Hero: 12, Titan: 15, Olympian: 20 }, require: [],
    produce: ["appeal"]
  },
  {
    name: "Boulevard",
    code: "#",
    size: "3xn r",
    workers: null,
    cost: { Beginner: 15, Mortal: 24, Hero: 30, Titan: 36, Olympian: 45 }, require: [],
    produce: ["appeal"]
  },
  {
    name: "Avenue",
    code: "=",
    size: "2xn r",
    workers: null,
    cost: { Beginner: 10, Mortal: 16, Hero: 20, Titan: 25, Olympian: 30 }, require: [],
    produce: ["appeal"]
  },
  {
    name: "Bench",
    code: "b",
    size: "1x1",
    workers: null,
    cost: { Beginner: 6, Mortal: 10, Hero: 12, Titan: 15, Olympian: 20 }, require: [],
    produce: ["appeal"]
  },
  {
    name: "Flower Garden",
    code: "f",
    size: "2x2",
    workers: null,
    cost: { Beginner: 20, Mortal: 32, Hero: 40, Titan: 50, Olympian: 60 }, require: [],
    produce: ["appeal"]
  },
  {
    name: "Gazebo",
    code: "g",
    size: "2x2",
    workers: null,
    cost: { Beginner: 24, Mortal: 36, Hero: 45, Titan: 58, Olympian: 72 }, require: [],
    produce: ["appeal"]
  },
  {
    name: "Hedge Maze",
    code: "h",
    size: "3x3",
    workers: null,
    cost: { Beginner: 40, Mortal: 70, Hero: 85, Titan: 105, Olympian: 125 }, require: [],
    produce: ["appeal"]
  },
  {
    name: "Fish Pond",
    code: "~",
    size: "4x4",
    workers: null,
    cost: { Beginner: 60, Mortal: 100, Hero: 125, Titan: 145, Olympian: 185 }, require: [],
    produce: ["appeal"]
  },
  {
    name: "Commemorative monument",
    code: "*",
    size: "3x3",
    workers: null,
    cost: null,
    require: [],
    produce: ["appeal"]
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