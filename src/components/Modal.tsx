import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import { PARCHMENT, frame } from "../styles/panel";

type ModalProps = {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
};

/**
 * The shared modal shell: backdrop, spring, scroll lock, close button and the
 * parchment panel. Painted in CSS rather than from an image so it appears
 * instantly — the old `modal_background.png` was 1.25 MB and only fetched when
 * the modal opened, so the panel visibly popped in.
 */
const Modal = ({ open, onClose, children }: ModalProps) => {
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "unset";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [open]);

    // Click-outside is not reachable from a keyboard, so Escape closes too.
    useEffect(() => {
        if (!open) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open || typeof document === "undefined") return null;

    // Portalled to <body> so the modal can't be trapped in a caller's stacking
    // context. Any positioned ancestor with a z-index (ExperienceSection's `z-10`)
    // would otherwise cap this z-50, letting later page content paint over it.
    return createPortal(
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    onClick={event => event.stopPropagation()}
                    role="dialog"
                    aria-modal="true"
                    className="relative flex max-h-[90dvh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl shadow-2xl"
                    style={{ backgroundColor: PARCHMENT, ...frame }}
                >
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-xl font-bold text-white shadow-lg transition-all duration-200 hover:bg-red-600"
                    >
                        ×
                    </button>

                    <div
                        className="max-h-[90dvh] overflow-y-auto p-5 pt-16 md:p-10 md:pt-10"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                        {children}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>,
        document.body,
    );
};

export default Modal;
