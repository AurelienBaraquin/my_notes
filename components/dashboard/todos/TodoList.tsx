"use client"; // Obligatoire pour Framer Motion

import { Todo } from "@prisma/client";
import { TodoItem } from "./TodoItem";
import { motion, AnimatePresence } from "framer-motion";

export function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <div className="space-y-3">
        <AnimatePresence mode="popLayout">
            {todos.map((todo, index) => (
                <motion.div
                    key={todo.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                    transition={{ 
                        duration: 0.3, 
                        delay: index * 0.05
                    }}
                >
                    <TodoItem todo={todo} />
                </motion.div>
            ))}
        </AnimatePresence>
    </div>
  );
}