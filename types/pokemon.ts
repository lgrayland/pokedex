export interface Pokemon {
  id: number;
  moves: Array<{
    move: {
      name: string;
    };
  }>;
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  stats: Array<{ stat: { name: string }; base_stat: number }>;
  types: Array<{
    type: {
      name: string;
    };
  }>;
}
