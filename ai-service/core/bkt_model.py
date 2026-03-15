# bkt_model.py — Bayesian Knowledge Tracing (BKT) Algorithm
#
# BKT is a statistical model that estimates HOW WELL a student knows a skill.
# Think of it like a probability meter: "What's the chance this student has learned this skill?"
#
# It uses 4 parameters (all between 0 and 1):
#   P_L0 = Prior probability of knowing the skill before any practice (default: 0.3 = 30%)
#   P_T  = Probability of LEARNING the skill after one practice attempt (transition)
#   P_G  = Probability of getting it right even if you DON'T know it (guessing)
#   P_S  = Probability of getting it wrong even if you DO know it (slipping/careless mistake)


class BKTModel:
    """
    Bayesian Knowledge Tracing model.
    
    JavaScript equivalent concept:
    const bkt = {
        P_L0: 0.3,  // initial knowledge
        P_T: 0.1,   // learning rate
        P_G: 0.2,   // guess rate
        P_S: 0.1,   // slip rate
        update: (p_mastery, is_correct) => { ... }
    }
    """

    def __init__(self, P_L0=0.3, P_T=0.1, P_G=0.2, P_S=0.1):
        # Store the 4 BKT parameters as instance variables
        self.P_L0 = P_L0  # Initial knowledge probability
        self.P_T = P_T    # Transition (learning) probability
        self.P_G = P_G    # Guess probability
        self.P_S = P_S    # Slip probability

    def update(self, p_mastery: float, is_correct: bool) -> float:
        """
        Update the mastery probability after ONE answer.
        
        This is the core BKT formula using Bayes' theorem.
        
        Think of it like this:
        - We have a prior belief: "Student knows this skill with probability p_mastery"
        - We observe evidence: "Student got this answer correct/incorrect"
        - We update our belief using Bayes' theorem
        
        Args:
            p_mastery: Current probability that student knows the skill (0.0 to 1.0)
            is_correct: True if student answered correctly, False otherwise
        
        Returns:
            Updated mastery probability (0.0 to 1.0)
        """

        # ── STEP 1: Calculate the probability of this observation ──────────────
        # P(correct | knows) = 1 - P_S  (knows it but might slip)
        # P(correct | doesn't know) = P_G  (doesn't know but might guess)
        
        if is_correct:
            # P(correct) = P(knows) * P(correct|knows) + P(doesn't know) * P(correct|doesn't know)
            # Like: "How likely is a correct answer given current mastery?"
            p_obs_given_learned = 1.0 - self.P_S      # probability of correct if learned
            p_obs_given_not_learned = self.P_G         # probability of correct if not learned
        else:
            # P(incorrect) = P(knows) * P(incorrect|knows) + P(doesn't know) * P(incorrect|doesn't know)
            p_obs_given_learned = self.P_S             # probability of wrong if learned (slip)
            p_obs_given_not_learned = 1.0 - self.P_G  # probability of wrong if not learned

        # ── STEP 2: Apply Bayes' theorem ──────────────────────────────────────
        # P(knows | observation) = P(observation | knows) * P(knows) / P(observation)
        # This is the "posterior" — our updated belief after seeing the evidence
        
        # Numerator: how likely is this observation AND the student knows it?
        numerator = p_obs_given_learned * p_mastery
        
        # Denominator: total probability of this observation (regardless of knowledge)
        denominator = (p_obs_given_learned * p_mastery) + (p_obs_given_not_learned * (1.0 - p_mastery))

        # Avoid division by zero (shouldn't happen with valid inputs, but safety first)
        if denominator == 0:
            p_learned_given_obs = p_mastery
        else:
            p_learned_given_obs = numerator / denominator

        # ── STEP 3: Apply the learning transition ─────────────────────────────
        # Even if the student didn't know it before, they might have learned it NOW
        # P(knows after) = P(knew before | obs) + P(didn't know before | obs) * P_T
        # This is like: "After this attempt, what's the chance they now know it?"
        
        p_learned_after = p_learned_given_obs + (1.0 - p_learned_given_obs) * self.P_T

        # Clamp the result between 0.01 and 0.99 to avoid extreme values
        return max(0.01, min(0.99, p_learned_after))

    def bulk_update(self, initial_mastery: float, responses: list) -> float:
        """
        Apply BKT update for MULTIPLE responses in sequence.
        
        This is like calling update() in a loop — each answer refines the estimate.
        
        JavaScript equivalent:
        const bulkUpdate = (initialMastery, responses) => {
            return responses.reduce((mastery, isCorrect) => update(mastery, isCorrect), initialMastery);
        }
        
        Args:
            initial_mastery: Starting mastery score (0.0 to 1.0)
            responses: List of booleans [True, False, True, True, ...]
        
        Returns:
            Final mastery score after processing all responses
        """
        mastery = initial_mastery
        
        # Process each response one by one, feeding the output back as input
        for is_correct in responses:
            mastery = self.update(mastery, is_correct)
            print(f"  BKT update: correct={is_correct} → mastery={mastery:.3f}")
        
        return mastery


# ── Singleton instance ────────────────────────────────────────────────────────
# Create one shared instance of BKTModel (like module.exports = new BKTModel() in Node.js)
# All routers import this single instance
bkt = BKTModel()

print("✅ BKT Model initialized with P_L0=0.3, P_T=0.1, P_G=0.2, P_S=0.1")
