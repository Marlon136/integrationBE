"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Conversation } from "@/lib/types";
import ConversationList from "@/components/ConversationList";
import MessageThread from "@/components/MessageThread";

export default function MessageThreadPage() {
  const { id } = useParams<{ id: string }>();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function load() {
    try {
      const convRes = await fetch(`/api/messages/${id}`);
      const listRes = await fetch(`/api/messages`);

      const conv = await convRes.json();
      const list = await listRes.json();

      setConversation(conv);
      setConversations(list);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (id) load();

}, [id]);

  if (loading) return <div className="flex justify-center py-20 text-gray-400">Loading…</div>;
  if (!conversation) return <div className="flex justify-center py-20 text-gray-400">Conversation not found.</div>;

  return (
    <div className="flex h-[calc(100vh-3.5rem)] lg:h-screen max-w-4xl mx-auto border-x border-gray-200 bg-white">
      <div className="hidden md:block w-80 border-r border-gray-200 overflow-y-auto flex-shrink-0">
        <ConversationList conversations={conversations} activeId={id} />
      </div>
      <div className="flex-1 overflow-hidden">
        <MessageThread initialConversation={conversation} />
      </div>
    </div>
  );
}
