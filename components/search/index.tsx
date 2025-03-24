"use client";

import { Category, Message } from "./types";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import OpenAI from "openai";
import {
  GET_CATEGORIES_PROMPT,
  GET_TOPICS_PROMPT,
  START_CONVERSATION_PROMPT,
} from "./constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { LoaderCircle, MailQuestion } from "lucide-react";
import { COUNTRIES } from "@/lib/constants";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function Search() {
  const client = useRef(
    new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    })
  );

  const [form, setForm] = useState({
    primaryCategory: "",
    subCategory: "",
    firstCountry: "",
    secondCountry: "",
    topic: "",
  });

  const [question, setQuestion] = useState("");
  const [firstMessage, setFirstMessage] = useState("");

  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingTopics, setIsLoadingTopics] = useState(false);
  const [isLoadingConversation, setIsLoadingConversation] = useState(false);

  const [categories, setCategories] = useState<Category | null>(null);
  const [topics, setTopics] = useState<string[] | null>(null);
  const [conversation, setConversation] = useState<Message[]>([]);

  const countries = useMemo(() => {
    return COUNTRIES.map((country) => (
      <SelectItem key={country} value={country} className="hover:bg-blue-50">
        {country}
      </SelectItem>
    ));
  }, []);

  const handleGetCategories = async () => {
    setIsLoadingCategories(true);
    const maxRetries = 3;
    let retryCount = 0;

    while (retryCount < maxRetries) {
      try {
        const response = await client.current.chat.completions.create({
          messages: [{ role: "user", content: GET_CATEGORIES_PROMPT }],
          model: "gpt-3.5-turbo",
        });

        if (
          response.choices.length === 0 ||
          !response.choices[0].message?.content
        ) {
          return;
        }

        const cleanedJson = response.choices[0].message.content
          .replace(/|/g, "")
          .trim();

        setCategories(JSON.parse(cleanedJson));
        setIsLoadingCategories(false);
        return;
      } catch (error) {
        retryCount++;
        if (retryCount === maxRetries) {
          console.error(
            "Failed to get categories after",
            maxRetries,
            "attempts:",
            error
          );
          return;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000 * retryCount));
      }
    }
  };

  const handleGetTopics = async () => {
    setIsLoadingTopics(true);
    const maxRetries = 3;
    let retryCount = 0;

    while (retryCount < maxRetries) {
      try {
        const response = await client.current.chat.completions.create({
          messages: [
            {
              role: "user",
              content: GET_TOPICS_PROMPT.replace(
                "{MainCategory}",
                form.primaryCategory
              )
                .replace("{SubCategory}", form.subCategory)
                .replace("{FirstCountry}", form.firstCountry)
                .replace("{SecondCountry}", form.secondCountry),
            },
          ],
          model: "gpt-3.5-turbo",
        });

        if (
          response.choices.length === 0 ||
          !response.choices[0].message?.content
        ) {
          return;
        }

        const cleanedJson = response.choices[0].message.content
          .replace(/|/g, "")
          .trim();

        setTopics(JSON.parse(cleanedJson));
        setIsLoadingTopics(false);
        return;
      } catch (error) {
        retryCount++;
        if (retryCount === maxRetries) {
          console.error(
            "Failed to get topics after",
            maxRetries,
            "attempts:",
            error
          );
          return;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000 * retryCount));
      }
    }
  };

  const handleSubmit = async () => {
    setIsLoadingConversation(true);

    if (conversation.length === 0) setFirstMessage(question);

    // Prepare new user message
    const userMessage: Message = {
      role: "user" as const,
      content:
        conversation.length === 0
          ? START_CONVERSATION_PROMPT.replace(
              "{MainCategory}",
              form.primaryCategory
            )
              .replace("{SubCategory}", form.subCategory)
              .replace("{FirstCountry}", form.firstCountry)
              .replace("{SecondCountry}", form.secondCountry)
              .replace("{LawTopic}", form.topic)
              .replace("{UserQuestion}", question)
          : question,
    };

    // Update conversation state first
    const updatedConversation = [...conversation, userMessage];
    setConversation(updatedConversation);

    // Ensure fetchConversation is called only once with the updated conversation
    await fetchConversation(updatedConversation);
  };

  const fetchConversation = async (updatedConversation: Message[]) => {
    try {
      const response = await client.current.chat.completions.create({
        messages: updatedConversation,
        model: "gpt-4o-mini",
      });

      const _messages = response.choices
        .filter((choice) => choice.message?.content !== null)
        .map((choice) => ({
          role: choice.message.role,
          content: choice.message.content as string,
        }));

      setConversation((prev) => [...prev, ..._messages]);
    } catch (error) {
      console.error("Error fetching conversation:", error);
    } finally {
      setIsLoadingConversation(false);
    }
  };

  const BagIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 3H3C2.44772 3 2 3.44772 2 4V7C2 7.55228 2.44772 8 3 8H21C21.5523 8 22 7.55228 22 7V4C22 3.44772 21.5523 3 21 3Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 8V19C4 19.5304 4.21071 20.0391 4.58579 20.4142C4.96086 20.7893 5.46957 21 6 21H18C18.5304 21 19.0391 20.7893 19.4142 20.4142C19.7893 20.0391 20 19.5304 20 19V8"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 12H14"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const GlobeIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 2C9.43223 4.69615 8 8.27674 8 12C8 15.7233 9.43223 19.3038 12 22C14.5678 19.3038 16 15.7233 16 12C16 8.27674 14.5678 4.69615 12 2Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 12H22"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const TopicIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 2V10L13 7L16 10V2"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2H19C19.2652 2 19.5196 2.10536 19.7071 2.29289C19.8946 2.48043 20 2.73478 20 3V21C20 21.2652 19.8946 21.5196 19.7071 21.7071C19.5196 21.8946 19.2652 22 19 22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5ZM4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  useEffect(() => {
    const fn = async () => {
      await handleGetCategories();
    };

    fn();
  }, []);

  useEffect(() => {
    if (
      form.primaryCategory &&
      form.subCategory &&
      form.firstCountry &&
      form.secondCountry
    ) {
      handleGetTopics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    form.primaryCategory,
    form.subCategory,
    form.firstCountry,
    form.secondCountry,
  ]);

  if (isLoadingCategories) {
    return (
      <div className="flex items-center justify-center pt-12 w-2/3 mx-auto gap-5 black">
        <LoaderCircle className="animate-spin" /> Loading Categories...
      </div>
    );
  }

  return (
    <div className="w-2/3 mx-auto px-10 pt-12">
      {/* Categories */}
      <Label className="text-lg font-semibold mb-4 text-black">
        <BagIcon /> Choose Categories for Your Search
      </Label>

      <div className="grid grid-cols-1 gap-4 mb-8">
        <div>
          <Label
            htmlFor="mainCategory"
            className="block text-sm font-medium mb-2 text-gray-700"
          >
            Primary Category *
          </Label>

          <Select
            onValueChange={(value) =>
              setForm({ ...form, primaryCategory: value })
            }
          >
            <SelectTrigger
              id="mainCategory"
              className="w-full bg-white hover:bg-gray-50"
            >
              <SelectValue placeholder="e.g. Criminal Law" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(categories || {}).map((category) => (
                <SelectItem
                  key={category}
                  value={category}
                  className="hover:bg-blue-50"
                >
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {!form.primaryCategory ? null : (
          <div>
            <Label
              htmlFor="subCategory"
              className="block text-sm font-medium mb-2 text-gray-700"
            >
              Secondary Category *
            </Label>

            <Select
              onValueChange={(value) =>
                setForm({ ...form, subCategory: value })
              }
              disabled={!form.primaryCategory}
            >
              <SelectTrigger
                id="subCategory"
                className="w-full bg-white hover:bg-gray-50"
              >
                <SelectValue placeholder="e.g. Criminal Law" />
              </SelectTrigger>
              <SelectContent>
                {categories![form.primaryCategory].map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                    className="hover:bg-blue-50"
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {form.primaryCategory && form.subCategory ? (
        <>
          {/* Countries */}
          <Label className="text-lg font-semibold mb-4 text-black">
            <GlobeIcon /> Choose Countries for Your Search
          </Label>
          <div className="grid grid-cols-2 gap-6 mb-11">
            <div>
              <Label
                htmlFor="firstCountry"
                className="block text-sm font-medium mb-2 text-gray-700"
              >
                First Country *
              </Label>

              <Select
                onValueChange={(value) =>
                  setForm({ ...form, firstCountry: value })
                }
              >
                <SelectTrigger
                  id="firstCountry"
                  className="w-full bg-white hover:bg-gray-50"
                >
                  <SelectValue placeholder="Choose First Country" />
                </SelectTrigger>
                <SelectContent>{countries}</SelectContent>
              </Select>
            </div>

            <div>
              <Label
                htmlFor="secondCountry"
                className="block text-sm font-medium mb-2 text-gray-700"
              >
                Second Country *
              </Label>

              <Select
                onValueChange={(value) =>
                  setForm({ ...form, secondCountry: value })
                }
              >
                <SelectTrigger
                  id="secondCountry"
                  className="w-full bg-white hover:bg-gray-50"
                >
                  <SelectValue placeholder={"Choose Second Country"} />
                </SelectTrigger>
                <SelectContent>{countries}</SelectContent>
              </Select>
            </div>
          </div>
        </>
      ) : null}

      {/* Topics */}
      {isLoadingTopics ? (
        <div className="flex items-center justify-center pt-6 gap-5 text-black">
          <LoaderCircle className="animate-spin" /> Loading Topics...
        </div>
      ) : topics ? (
        <div className="mb-8">
          <Label className="text-lg font-semibold mb-4 text-black">
            <TopicIcon /> Choose a Topic
          </Label>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <Select
                onValueChange={(value) => setForm({ ...form, topic: value })}
              >
                <SelectTrigger
                  id="topic"
                  className="w-full bg-white hover:bg-gray-50"
                >
                  <SelectValue placeholder="Choose a topic" />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem
                      key={topic}
                      value={topic}
                      className="hover:bg-blue-50"
                    >
                      {topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ) : null}

      {/* Search Prompt */}
      {!form.topic ? null : !conversation.length ? (
        <div>
          <Label className="text-lg font-semibold mb-4 text-black">
            <MailQuestion /> What is your question?
          </Label>
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col items-start justify-start gap-3">
              <Textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <Button
                className="bg-indigo-700 flex items-center justify-center gap-2"
                onClick={handleSubmit}
                disabled={isLoadingConversation}
              >
                {isLoadingConversation && (
                  <span className="animate-spin">
                    <LoaderCircle />
                  </span>
                )}
                Submit
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Label className="text-lg font-semibold mb-4 text-indigo-700">
            Conversation
          </Label>
          <div className="space-y-4 pb-8">
            <div className={`p-4 rounded-lg bg-blue-50 ml-auto w-2/3`}>
              {firstMessage}
            </div>

            {conversation.slice(1).map((message, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg  w-2/3 ${
                  message.role === "assistant"
                    ? "bg-gray-100"
                    : "bg-blue-50 ml-auto"
                }`}
              >
                {message.content}
              </div>
            ))}

            {isLoadingConversation ? (
              <span className="animate-spin">
                <LoaderCircle />
              </span>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}

export default memo(Search);
