export type Checkbox = {
  id: string // Unique
  title: string
  checked: boolean
};

export type Tag = {
  id: string // Unique
  title: string
  colour: string
};

export type Card = {
  id: string // Unique
  title: string
  tags: Tag[]
  description?: string
  checklist?: Checkbox[]
};

export type Lane = {
  id: string // Unique
  title: string
  cards: Card[]
};

export type Board = {
  id: string // Unique
  title: string
  lanes: Lane[]
};
