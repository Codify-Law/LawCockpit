export const GET_CATEGORIES_PROMPT =
  'Provide me with a comprehensive list of legal categories, covering different branches and areas of law, including but not limited to civil, criminal, corporate, and regulatory law. Organize them in a structured manner. The output must only contain the exact list of categories in raw json format and not anything else. The format should looks like this: {"CivilLaw":["ContractLaw","TortLaw","PropertyLaw"]}';

export const GET_COUNTRIES_PROMPT =
  'Provide me with a comprehensive list of all internationally recognized sovereign countries. The output must only contain the exact list of country names in raw JSON format and nothing else. The format should look like this: ["Afghanistan","Albania","Algeria","Andorra","Angola"]';

export const GET_TOPICS_PROMPT =
  'Provide me with a comprehensive list of law topics related to {MainCategory} under the {SubCategory} branch that specifically applies to legal relations between {FirstCountry} and {SecondCountry}. Organize the topics in a structured manner. The output must only contain the exact list of law topics in raw JSON format and nothing else. The format should look like this: ["Tariff Regulations", "Intellectual Property Rights", "Import/Export Compliance"]';
  
export const START_CONVERSATION_PROMPT =
  'The conversation should be focused on the legal topic of {LawTopic} within the context of {MainCategory} under the {SubCategory} branch, specifically related to legal relations between {FirstCountry} and {SecondCountry}. Discuss the relevant laws, regulations, and legal issues related to this topic between the two countries. After establishing the context, answer the following question: {UserQuestion}';
