import { supabase } from "../lib/supabase";
import { Answer, Question, Team } from "../types";

export type AnswerWithTeamAndQuestion = Pick<Answer, "text"> & {
  teams: { name: Team["name"] };
} & {
  questions: { text: Question["text"] };
};

export const getAnswers = async () => {
  const { count, data, error } = await supabase
    .from<AnswerWithTeamAndQuestion>("answers")
    .select(`text, teams (name), questions (text)`, { count: "exact" });

  if (error) console.error(error);

  return {
    data,
    count,
  };
};

export const getAnswer = async (id: Answer["id"]) => {
  const { data, error } = await supabase
    .from<AnswerWithTeamAndQuestion & { id: string }>("answers")
    .select()
    .eq("id", id)
    .single();

  if (error) console.error(error);

  return {
    data,
  };
};

export type InsertAnswerData = Omit<Answer, "id" | "created_at">;

export const createAnswer = async ({
  question_id,
  team_id,
  text,
}: InsertAnswerData) => {
  const { data, error } = await supabase
    .from<Answer>("answers")
    .insert([{ question_id, team_id, text }])
    .single();

  if (error) console.error(error);

  return {
    data,
  };
};

export const deleteAnswer = async (id: Answer["id"]) => {
  const { data, error } = await supabase
    .from<Answer>("answers")
    .delete()
    .match({ id })
    .single();

  if (error) console.error(error);

  return {
    data,
  };
};
