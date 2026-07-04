import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { FiArrowLeft, FiCheck, FiMail, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { db } from "../../services/firebase";

function formatDate(timestamp) {
  if (!timestamp || typeof timestamp.toDate !== "function") {
    return "Just now";
  }

  return timestamp.toDate().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function MessagesManager() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "contactMessages"),
      (snapshot) => {
        const messageList = snapshot.docs
          .map((item) => ({
            id: item.id,
            ...item.data(),
          }))
          .sort((a, b) => {
            const firstTime = a.createdAt?.seconds || 0;
            const secondTime = b.createdAt?.seconds || 0;
            return secondTime - firstTime;
          });

        setMessages(messageList);
        setLoading(false);
      },
      (firebaseError) => {
        console.error("Messages loading error:", firebaseError);
        setError(
          "Could not load messages. Please check your Firestore rules and refresh."
        );
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const markAsRead = async (messageId) => {
    try {
      await updateDoc(doc(db, "contactMessages", messageId), {
        status: "read",
      });
    } catch (firebaseError) {
      console.error("Message update error:", firebaseError);
      setError("Could not update this message.");
    }
  };

  const deleteMessage = async (messageId) => {
    const confirmed = window.confirm("Delete this message permanently?");

    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "contactMessages", messageId));
    } catch (firebaseError) {
      console.error("Message delete error:", firebaseError);
      setError("Could not delete this message.");
    }
  };

  return (
    <main className="min-h-screen bg-[#080d1b] px-5 py-10 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <button
          type="button"
          onClick={() => navigate("/admin")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-cyan-400"
        >
          <FiArrowLeft />
          Back to dashboard
        </button>

        <header className="mt-10 border-b border-slate-800 pb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Portfolio Manager
          </p>

          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Messages
          </h1>

          <p className="mt-3 text-slate-400">
            Messages submitted through your portfolio contact form.
          </p>
        </header>

        {error && (
          <p className="mt-6 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}

        <section className="mt-8 space-y-5">
          {loading ? (
            <p className="text-slate-400">Loading messages...</p>
          ) : messages.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-10 text-center">
              <FiMail className="mx-auto text-4xl text-cyan-400" />

              <h2 className="mt-4 text-xl font-bold">No messages yet</h2>

              <p className="mt-2 text-slate-400">
                Visitor messages will appear here after they submit your contact form.
              </p>
            </div>
          ) : (
            messages.map((message) => {
              const isUnread = message.status !== "read";

              return (
                <article
                  key={message.id}
                  className={`rounded-2xl border p-6 ${
                    isUnread
                      ? "border-cyan-400/50 bg-cyan-400/5"
                      : "border-slate-800 bg-slate-900/70"
                  }`}
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-xl font-bold">
                          {message.subject || "No subject"}
                        </h2>

                        {isUnread && (
                          <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-bold text-cyan-300">
                            New
                          </span>
                        )}
                      </div>

                      <p className="mt-3 font-semibold text-slate-200">
                        {message.name || "Unknown visitor"}
                      </p>

                      <a
                        href={`mailto:${message.email || ""}`}
                        className="mt-1 inline-block text-sm text-cyan-400 hover:underline"
                      >
                        {message.email || "No email provided"}
                      </a>

                      <p className="mt-2 text-xs text-slate-500">
                        {formatDate(message.createdAt)}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {isUnread && (
                        <button
                          type="button"
                          onClick={() => markAsRead(message.id)}
                          className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/50 px-3 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/10"
                        >
                          <FiCheck />
                          Mark as read
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => deleteMessage(message.id)}
                        className="inline-flex items-center gap-2 rounded-lg border border-red-400/40 px-3 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/10"
                      >
                        <FiTrash2 />
                        Delete
                      </button>
                    </div>
                  </div>

                  <p className="mt-5 whitespace-pre-wrap rounded-xl bg-slate-950/70 p-4 leading-7 text-slate-300">
                    {message.message || "No message content"}
                  </p>
                </article>
              );
            })
          )}
        </section>
      </div>
    </main>
  );
}

export default MessagesManager;