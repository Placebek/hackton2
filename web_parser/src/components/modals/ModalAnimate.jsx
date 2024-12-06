import { motion, AnimatePresence } from "framer-motion";

function ModalAnimate({ isOpen, closeModal }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="modal"
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "white",
                        padding: "20px",
                        borderRadius: "8px",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    }}
                >
                    <h2>Модальное окно</h2>
                    <p>Это пример анимации с Framer Motion!</p>
                    <button onClick={closeModal}>Закрыть</button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default ModalAnimate;
