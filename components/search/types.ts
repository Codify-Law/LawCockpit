export type Category = {
  [key: string]: string[];
};

export type Message = { role: "user" | "assistant"; content: string };
