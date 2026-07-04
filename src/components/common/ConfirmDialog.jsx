import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle, FiX } from 'react-icons/fi';

const ConfirmDialog = ({ open, title, message, onConfirm, onCancel, confirmText = 'Delete', danger = true }) => {
  if (!open) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCancel} />
        <motion.div
          className="relative glass-card p-6 max-w-sm w-full z-10"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-white"
            onClick={onCancel}
            aria-label="Close"
          >
            <FiX />
          </button>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
              <FiAlertTriangle className="text-red-400" />
            </div>
            <h3 className="text-white font-semibold">{title || 'Confirm Action'}</h3>
          </div>
          <p className="text-gray-400 text-sm mb-6">{message}</p>
          <div className="flex gap-3">
            <button className="btn-ghost flex-1" onClick={onCancel}>Cancel</button>
            <button
              className={`flex-1 px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                danger
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                  : 'btn-primary'
              }`}
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConfirmDialog;
