import { useMemo } from "react";
import { COUNTRIES } from "@/lib/constants";
import { SelectItem } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { formSchema, FormValues } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const FAQ_ITEMS = [
  {
    id: "item-1",
    question: "What is this platform's primary function?",
    answer:
      "Our platform serves as an advanced legal document analysis system that uses artificial intelligence to streamline the review process. It helps legal professionals identify potential conflicts, inconsistencies, and compliance issues within legal documents. The platform can process multiple document types simultaneously, providing detailed insights and recommendations while significantly reducing the time spent on manual review.",
  },
  {
    id: "item-2",
    question: "How does the AI detect conflicts in legal documents?",
    answer:
      "Our AI platform analyzes legal documents by leveraging advanced natural language processing (NLP) and machine learning algorithms. It scans the text for key terms, clauses, and conditions, comparing them with a vast database of legal references, statutes, and case law. The AI identifies inconsistencies, contradictions, and potential conflicts between different sections of the document or with external legal regulations. It uses contextual analysis to understand the relationships between various provisions, highlighting areas where conflicts may arise. This process allows the AI to flag potential issues for review, helping legal professionals ensure compliance and avoid legal risks.",
  },
  {
    id: "item-3",
    question: "What types of legal documents can this platform analyze?",
    answer:
      "Our platform can analyze a wide range of legal documents, including but not limited to contracts, agreements, NDAs, employment documents, intellectual property documents, regulatory filings, compliance documents, and corporate governance materials. We also support analysis of international legal documents and can handle multiple languages and jurisdictions.",
  },
  {
    id: "item-4",
    question: "How accurate is the AI in detecting conflicts?",
    answer:
      "Our AI system maintains a high accuracy rate of over 95% in detecting potential conflicts and inconsistencies. This accuracy is achieved through continuous learning from millions of legal documents and regular updates to our algorithms. However, we always recommend human oversight for final verification, as the AI serves as a powerful tool to assist, not replace, legal professionals.",
  },
  {
    id: "item-5",
    question: "Is my data kept confidential and secure?",
    answer:
      "Yes, we take data security extremely seriously. All documents are encrypted using military-grade encryption (AES-256), and we maintain SOC 2 Type II compliance. Our servers are located in secure data centers, and we implement strict access controls. We never share or sell your data, and all analysis is performed in isolated environments to ensure maximum security.",
  },
  {
    id: "item-6",
    question:
      "How does the platform handle updates to legal regulations and laws?",
    answer:
      "Our platform maintains a constantly updated database of legal regulations and laws across multiple jurisdictions. We have partnerships with leading legal information providers and employ a team of legal experts who ensure our system stays current with the latest changes. Updates are automatically integrated into our analysis engine, ensuring your documents are always checked against the most recent legal requirements.",
  },
  {
    id: "item-7",
    question: "What are the pricing plans available for using this platform?",
    answer:
      "We offer flexible pricing plans to accommodate different needs and scales of operation. This includes a basic plan for small teams starting at $99/month, a professional plan at $299/month for medium-sized firms, and an enterprise plan with custom pricing for large organizations. All plans include core features, with additional capabilities available in higher tiers.",
  },
  {
    id: "item-8",
    question: "How do I get support if I encounter issues with the platform?",
    answer:
      "We provide 24/7 customer support through multiple channels, including live chat, email, and phone. Our dedicated support team typically responds within 1 hour during business hours. Enterprise clients also get access to a dedicated account manager. We also maintain an extensive knowledge base and provide regular training sessions for users.",
  },
  {
    id: "item-9",
    question:
      "Can the AI analyze documents from multiple jurisdictions simultaneously?",
    answer:
      "Yes, our AI is capable of analyzing documents from multiple jurisdictions simultaneously. It maintains separate legal frameworks for different jurisdictions and can identify cross-jurisdictional conflicts. The platform currently supports legal analysis for over 50 countries and can handle documents in multiple languages through our advanced translation capabilities.",
  },
  {
    id: "item-10",
    question: "What makes your AI different from other legal analysis tools?",
    answer:
      "Our AI stands out through its comprehensive approach to legal analysis, combining advanced machine learning with extensive legal expertise. Unlike other tools, we offer cross-jurisdictional analysis, real-time updates, and integration with major legal research databases. Our platform also provides customizable workflows, detailed audit trails, and collaborative features that enhance team productivity.",
  },
];

export default function useBookADemo() {
  const countries = useMemo(() => {
    return COUNTRIES.map((country) => (
      <SelectItem key={country} value={country} className="hover:bg-blue-50">
        {country}
      </SelectItem>
    ));
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "individual",
      companyName: "",
      numberOfEmployees: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // Handle form submission
  };

  const formType = form.watch("type");

  return {
    variables: {
      countries,
      formType,
      form
    },
    methods: {
      onSubmit,
    },
  };
}
