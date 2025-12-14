"use client"; // Obligatoire pour Framer Motion

import { Note } from "@prisma/client";
import { NoteCard } from "./NoteCard";
import { motion, AnimatePresence } from "framer-motion";

export function NotesGrid({ notes }: { notes: Note[] }) {
  return (
    // AnimatePresence permet d'animer les éléments qui DISPARAISSENT du DOM (suppression)
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
            {notes.map((note, index) => (
                <motion.div
                    key={note.id}
                    layout // 👈 La magie est ici : si la layout change, l'élément GLISSE au lieu de sauter
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                    transition={{ 
                        duration: 0.3, 
                        delay: index * 0.05 // 👈 Effet "Cascade" : les notes apparaissent une par une
                    }}
                >
                    <NoteCard note={note} />
                </motion.div>
            ))}
        </AnimatePresence>
    </div>
  );
}