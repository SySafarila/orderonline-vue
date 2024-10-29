export type PokemonFavorite = {
  pokemon_name: string;
  id: number;
  created_at: string;
  updated_at: string;
  abilities: {
    name: string;
    is_hidden: boolean;
  }[];
};

export type Pokemon = {
  name: string;
  url: string;
};

export type Ability = {
  name: string;
  url: string;
};

export type Sprites = {
  back_default: null | string;
  back_female: null | string;
  back_shiny: null | string;
  back_shiny_female: null | string;
  front_default: null | string;
  front_female: null | string;
  front_shiny: null | string;
  front_shiny_female: null | string;
  other: {
    dream_world: {
      front_default: string | null;
      front_female: string | null;
    };
    home: {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
    "official-artwork": {
      front_default: string | null;
      front_shiny: string | null;
    };
    showdown: {
      back_default: string | null;
      back_female: string | null;
      back_shiny: string | null;
      back_shiny_female: string | null;
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
  };
  versions: {
    "generation-i": {
      "red-blue": {
        back_default: string | null;
        back_gray: string | null;
        back_transparent: string | null;
        front_default: string | null;
        front_gray: string | null;
        front_transparent: string | null;
      };
      yellow: {
        back_default: string | null;
        back_gray: string | null;
        back_transparent: string | null;
        front_default: string | null;
        front_gray: string | null;
        front_transparent: string | null;
      };
    };
    "generation-ii": {
      crystal: {
        back_default: string | null;
        back_shiny: string | null;
        back_shiny_transparent: string | null;
        back_transparent: string | null;
        front_default: string | null;
        front_shiny: string | null;
        front_shiny_transparent: string | null;
        front_transparent: string | null;
      };
      gold: {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
        front_transparent: string | null;
      };
      silver: {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
        front_transparent: string | null;
      };
    };
    "generation-iii": {
      emerald: {
        front_default: string | null;
        front_shiny: string | null;
      };
      "firered-leafgreen": {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
      };
      "ruby-sapphire": {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
      };
    };
    "generation-iv": {
      "diamond-pearl": {
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
      "heartgold-soulsilver": {
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
      platinum: {
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
    };
    "generation-v": {
      "black-white": {
        animated: {
          back_default: string | null;
          back_female: string | null;
          back_shiny: string | null;
          back_shiny_female: string | null;
          front_default: string | null;
          front_female: string | null;
          front_shiny: string | null;
          front_shiny_female: string | null;
        };
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
    };
    "generation-vi": {
      "omegaruby-alphasapphire": {
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
      "x-y": {
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
    };
    "generation-vii": {
      icons: {
        front_default: string | null;
        front_female: string | null;
      };
      "ultra-sun-ultra-moon": {
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
    };
    "generation-viii": {
      icons: {
        front_default: string | null;
        front_female: string | null;
      };
    };
  };
};

export type Abilities = {
  is_hidden: boolean;
  slot: number;
  ability: {
    name: string;
    url: string;
  };
};

export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type PokemonFromAbility = {
  is_hidden: boolean;
  pokemon: Pokemon;
  slot: number;
};
