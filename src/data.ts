export const USERS = [
  {
    id: 1,
    name: 'Johnny Depp',
    workouts: [
      {
        type: 'Kayaking',
        minutes: 15,
      },
      {
        type: 'Running',
        minutes: 45,
      },
    ],
  },
  {
    id: 2,
    name: 'Tom Cruise',
    workouts: [
      {
        type: 'Swimming',
        minutes: 30,
      },
      {
        type: 'Walking',
        minutes: 15,
      },
      {
        type: 'Cycling',
        minutes: 30,
      },
    ],
  },
  {
    id: 3,
    name: 'Will Smith',
    workouts: [
      {
        type: 'Hiking',
        minutes: 45,
      },
    ],
  },
];
export const workoutTypes: string[] = [
  'Swimming',
  'Cycling',
  'Walking',
  'Running',
  'Rowing',
  'Hiking',
  'Jump Rope',
  'Stair Climbing',
  'Kayaking',
];
