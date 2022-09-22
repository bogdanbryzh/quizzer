import { definitions } from "./supabase.types";

type Team = definitions["teams"];
type Question = definitions["questions"];
type Answer = definitions["answers"];

export type { Answer, Question, Team };
