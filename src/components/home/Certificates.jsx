import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiAward,
  FiExternalLink,
  FiFileText,
} from "react-icons/fi";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firebase";

function formatIssueDate(issueDate) {
  if (!issueDate) return "Date not added";

  const date = new Date(`${issueDate}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return issueDate;
  }

  return date.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
}

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "certificates"),
      (snapshot) => {
        const certificateList = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        setCertificates(certificateList);
        setLoading(false);
      },
      (error) => {
        console.error("Could not load certificates:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <section id="certificates" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-12 max-w-2xl text-center"
      >
        <p className="section-label">CERTIFICATIONS</p>

        <h2 className="section-title">
          Learning with <span className="gradient-text">proof.</span>
        </h2>

        <p className="mt-4 text-slate-400">
          Certifications that reflect my continuous learning and technical growth.
        </p>
      </motion.div>

      {loading ? (
        <div className="glass-card mx-auto max-w-xl p-10 text-center text-slate-400">
          Loading certificates...
        </div>
      ) : certificates.length === 0 ? (
        <div className="glass-card mx-auto max-w-xl p-10 text-center">
          <FiAward className="mx-auto text-4xl text-cyan-400" />

          <h3 className="mt-4 text-xl font-semibold text-white">
            Certificates will be added soon
          </h3>

          <p className="mt-2 text-slate-400">
            I am continuously improving my technical skills.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((certificate, index) => (
            <motion.article
              key={certificate.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="glass-card group flex min-h-64 flex-col p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/50"
            >
              <div className="flex items-start justify-between">
                <div className="rounded-xl bg-cyan-500/10 p-3 text-2xl text-cyan-400">
                  <FiAward />
                </div>

                <FiFileText className="text-xl text-slate-500" />
              </div>

              <h3 className="mt-6 text-xl font-bold text-white">
                {certificate.title || "Untitled Certificate"}
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                {certificate.issuer || "Issuer not added"}
              </p>

              <p className="mt-1 text-sm text-cyan-400">
                Issued: {formatIssueDate(certificate.issueDate)}
              </p>

              {certificate.credentialUrl ? (
                <a
                  href={certificate.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary mt-auto inline-flex items-center justify-center gap-2"
                  aria-label={`View ${certificate.title}`}
                >
                  View Certificate
                  <FiExternalLink />
                </a>
              ) : (
                <span className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-500">
                  Certificate link not added
                </span>
              )}
            </motion.article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Certificates;