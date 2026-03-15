import { create } from 'zustand'

const useStore = create((set) => ({
  // ─── User ──────────────────────────────────────────────────────────────────
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),

  // ─── Mastery map: { [skill_id]: mastery_score } ───────────────────────────
  mastery: {},
  setMastery: (mastery) => set({ mastery }),

  // ─── Recommendations list ─────────────────────────────────────────────────
  recommendations: [],
  setRecommendations: (recommendations) => set({ recommendations }),

  // ─── Currently selected topic for the tutor ───────────────────────────────
  currentTopic: null,
  setCurrentTopic: (currentTopic) => set({ currentTopic }),

  // ─── Learning path ────────────────────────────────────────────────────────
  learningPath: [],
  setLearningPath: (learningPath) => set({ learningPath }),

  // ─── Learning Plan ────────────────────────────────────────────────────────
  plan: null,
  setPlan: (plan) => set({ plan }),

  // ─── Todo tasks ───────────────────────────────────────────────────────────
  todos: [],
  setTodos: (todos) => set({ todos }),
  addTodo: (task) => set((s) => ({ todos: [task, ...s.todos] })),
  removeTodo: (id) => set((s) => ({ todos: s.todos.filter((t) => t._id !== id) })),
  updateTodoItem: (id, updated) =>
    set((s) => ({ todos: s.todos.map((t) => (t._id === id ? updated : t)) })),
}))

export default useStore
