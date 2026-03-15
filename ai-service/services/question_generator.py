# services/question_generator.py — Dynamic Question Generator
# Generates practice questions algorithmically without LLM APIs.
# Uses templates + topic-specific knowledge banks.

import random
from typing import List, Optional


# ── Question template banks per subject ──────────────────────────────────────
QUESTION_BANKS = {
    "Mathematics": [
        {
            "template": "What is the derivative of {func}?",
            "variants": [
                {"func": "x²", "a": "2x", "b": "x", "c": "2", "d": "x³/3", "correct": "a",
                 "explanation": "Power rule: d/dx(xⁿ) = nxⁿ⁻¹, so d/dx(x²) = 2x"},
                {"func": "sin(x)", "a": "cos(x)", "b": "-cos(x)", "c": "sin(x)", "d": "-sin(x)", "correct": "a",
                 "explanation": "The derivative of sin(x) is cos(x)"},
                {"func": "eˣ", "a": "eˣ", "b": "xeˣ⁻¹", "c": "e", "d": "ln(x)", "correct": "a",
                 "explanation": "eˣ is its own derivative"},
                {"func": "ln(x)", "a": "1/x", "b": "x", "c": "1/x²", "d": "e/x", "correct": "a",
                 "explanation": "d/dx(ln x) = 1/x"},
            ]
        },
        {
            "template": "Solve for x: {equation}",
            "variants": [
                {"equation": "2x + 6 = 14", "a": "x = 4", "b": "x = 10", "c": "x = 3", "d": "x = 7", "correct": "a",
                 "explanation": "2x = 14 - 6 = 8, so x = 4"},
                {"equation": "x² - 9 = 0", "a": "x = ±3", "b": "x = 3", "c": "x = 9", "d": "x = ±9", "correct": "a",
                 "explanation": "x² = 9, so x = ±√9 = ±3"},
                {"equation": "3x - 5 = 16", "a": "x = 7", "b": "x = 11/3", "c": "x = 3", "d": "x = 5", "correct": "a",
                 "explanation": "3x = 21, so x = 7"},
            ]
        },
    ],
    "Programming": [
        {
            "template": "What is the time complexity of {algorithm}?",
            "variants": [
                {"algorithm": "Binary Search", "a": "O(log n)", "b": "O(n)", "c": "O(n²)", "d": "O(1)", "correct": "a",
                 "explanation": "Binary search halves the search space each step → O(log n)"},
                {"algorithm": "Bubble Sort", "a": "O(n²)", "b": "O(n log n)", "c": "O(n)", "d": "O(log n)", "correct": "a",
                 "explanation": "Bubble sort has nested loops → O(n²) worst case"},
                {"algorithm": "Hash Table Lookup", "a": "O(1)", "b": "O(n)", "c": "O(log n)", "d": "O(n²)", "correct": "a",
                 "explanation": "Hash tables provide O(1) average-case lookup"},
                {"algorithm": "Merge Sort", "a": "O(n log n)", "b": "O(n²)", "c": "O(n)", "d": "O(log n)", "correct": "a",
                 "explanation": "Merge sort divides and merges → O(n log n)"},
            ]
        },
        {
            "template": "In Python, what does {code} return?",
            "variants": [
                {"code": "len([1, 2, 3])", "a": "3", "b": "2", "c": "4", "d": "None", "correct": "a",
                 "explanation": "len() returns the number of elements in the list"},
                {"code": "type(3.14)", "a": "<class 'float'>", "b": "<class 'int'>", "c": "<class 'str'>", "d": "<class 'double'>", "correct": "a",
                 "explanation": "3.14 is a floating-point number"},
                {"code": "'hello'[::-1]", "a": "'olleh'", "b": "'hello'", "c": "'h'", "d": "Error", "correct": "a",
                 "explanation": "[::-1] reverses a string using slice notation"},
            ]
        },
    ],
    "Data Science": [
        {
            "template": "Which metric is best for {scenario}?",
            "variants": [
                {"scenario": "imbalanced classification", "a": "F1 Score", "b": "Accuracy", "c": "MSE", "d": "R²", "correct": "a",
                 "explanation": "F1 balances precision and recall, ideal for imbalanced datasets"},
                {"scenario": "regression evaluation", "a": "RMSE", "b": "Accuracy", "c": "AUC-ROC", "d": "F1 Score", "correct": "a",
                 "explanation": "RMSE measures average prediction error for regression"},
            ]
        },
    ],
    "General": [
        {
            "template": "Which of the following best describes {concept}?",
            "variants": [
                {"concept": "overfitting in ML", "a": "Model performs well on training but poorly on test data", "b": "Model performs poorly on all data", "c": "Model is too simple", "d": "Model has too few parameters", "correct": "a",
                 "explanation": "Overfitting means the model memorizes training data but fails to generalize"},
                {"concept": "a REST API", "a": "A stateless web service using HTTP methods", "b": "A real-time socket connection", "c": "A database query language", "d": "A frontend framework", "correct": "a",
                 "explanation": "REST APIs use HTTP (GET, POST, PUT, DELETE) and are stateless"},
            ]
        },
    ],
}


def generate_question(
    topic: str,
    subject: str,
    difficulty: int,
    past_mistakes: List[str] = None,
    mastery_score: float = 0.5,
) -> dict:
    """
    Generate a practice question for a given topic and difficulty.
    
    Returns:
        question_text, options {a,b,c,d}, correct_option, explanation, difficulty
    """
    past_mistakes = past_mistakes or []

    # Find matching subject bank
    bank = QUESTION_BANKS.get(subject, QUESTION_BANKS["General"])

    # Pick a random template group
    template_group = random.choice(bank)
    variants = template_group["variants"]

    # Shuffle variants to avoid always picking the same one
    random.shuffle(variants)
    variant = variants[0]

    # Build question text from template
    question_text = template_group["template"].format(**{
        k: v for k, v in variant.items()
        if k not in ("a", "b", "c", "d", "correct", "explanation")
    })

    # Shuffle answer options (keep track of correct answer)
    options_raw = {"a": variant["a"], "b": variant["b"], "c": variant["c"], "d": variant["d"]}
    correct_key = variant["correct"]
    correct_text = options_raw[correct_key]

    # Shuffle options
    items = list(options_raw.values())
    random.shuffle(items)
    keys = ["a", "b", "c", "d"]
    shuffled_options = {keys[i]: items[i] for i in range(4)}

    # Find new correct key after shuffle
    new_correct = next(k for k, v in shuffled_options.items() if v == correct_text)

    return {
        "question_text": question_text,
        "topic": topic,
        "subject": subject,
        "difficulty": difficulty,
        "options": shuffled_options,
        "correct_option": new_correct,
        "explanation": variant.get("explanation", ""),
        "generated": True,
    }


def generate_batch(topic: str, subject: str, difficulty: int, count: int = 5) -> List[dict]:
    """Generate multiple questions for a practice session."""
    return [generate_question(topic, subject, difficulty) for _ in range(count)]
