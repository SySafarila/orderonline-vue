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
