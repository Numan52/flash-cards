export type Scenario = {
  id: string;
  name: string;
  image: string;
  description: string;
}

const scenarios: Scenario[] = [
    { id: "bar", name: "Bar", image: "bar.jpg", description: "A lively bar with music and drinks." },
    { id: "club", name: "Club", image: "club.jpg", description: "A crowded dance floor with loud music." },
    { id: "library", name: "Library", image: "library.jpg", description: "A quiet study space with books around." },
    { id: "gym", name: "Gym", image: "gym.jpg", description: "A place to work out and meet fitness enthusiasts." },
  ];
 
export default scenarios
