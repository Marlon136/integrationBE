"use client";

import { useEffect, useState } from "react";
import { Conversation } from "@/lib/types";
import ConversationList from "@/components/ConversationList";

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
    const responde = await fetch("http://localhost:3000/api/messages")
    const data = await responde.json();  
    console.log(data); 
      setConversations(data);
      setLoading(false);
    }
    fetchMessages();
  }, []);

  if (loading) return <div className="flex justify-center py-20 text-gray-400">Loading messages…</div>;

  return (
    <div className="max-w-2xl mx-auto h-[calc(100vh-3.5rem)] lg:h-screen border-x border-gray-200 bg-white">
      <ConversationList conversations={conversations} />
    </div>
  );
}
