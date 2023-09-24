export type Checkbox = {
  id: string // Unique
  title: string
  checked: boolean
};

export type Tag = {
  id: string // Unique
  title: string
  colour: string
  // Foreign
  board: string
};

export type Card = {
  id: string // Unique
  title: string
  description?: string
  checklist?: Checkbox[]
  // Foreign
  tags: Set<string>
};

export type Lane = {
  id: string // Unique
  title: string
  // Foreign
  cards: Set<string>
};

export type Board = {
  id: string // Unique
  title: string
  // Foreign
  lanes: Set<string>
  tags: Set<string>
};
