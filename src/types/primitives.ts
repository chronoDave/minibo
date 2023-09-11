export type Json =
  string |
  number |
  boolean |
  null |
  Json[] |
  { [key: string]: Json };

export type Shape = { [key: string]: Json };
