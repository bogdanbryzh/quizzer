import { supabase } from "../lib/supabase";
import { Question } from "../types";

export const getQuestions = async () => {
  const { count, data, error } = await supabase
    .from<Question>("questions")
    .select("*", { count: "exact" });

  if (error) console.error(error);

  return {
    data,
    count,
  };
};

export const getQuestion = async (id: Question["id"]) => {
  const { data, error } = await supabase
    .from<Question>("questions")
    .select()
    .eq("id", id)
    .single();

  if (error) console.error(error);

  return {
    data,
  };
};

export type InsertQuestionData = Omit<Question, "id" | "created_at">;

export const createQuestion = async ({ text }: InsertQuestionData) => {
  const { data, error } = await supabase
    .from<Question>("questions")
    .insert([{ text }])
    .single();

  if (error) console.error(error);

  return {
    data,
  };
};

export const updateQuestion = async (
  id: Question["id"],
  { text }: Partial<InsertQuestionData>
) => {
  const { data, error } = await supabase
    .from<Question>("questions")
    .update({ text })
    .match({ id })
    .single();

  if (error) console.error(error);

  return {
    data,
  };
};

export const deleteQuestion = async (id: Question["id"]) => {
  const { data, error } = await supabase
    .from<Question>("questions")
    .delete()
    .match({ id })
    .single();

  if (error) console.error(error);

  return {
    data,
  };
};
