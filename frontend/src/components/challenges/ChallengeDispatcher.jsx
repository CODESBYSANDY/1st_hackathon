import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MultipleChoiceChallenge } from './MultipleChoiceChallenge';
import { CodeCompletionChallenge } from './CodeCompletionChallenge';
import { OrderingChallenge } from './OrderingChallenge';
import { DebugChallenge } from './DebugChallenge';
import { LynxCompanion } from '../lynx/LynxCompanion';
import { useLynx } from '../../context/LynxContext';
import { useLearning } from '../../context/LearningContext';
import { assessmentService } from '../../services/api/assessmentService';
import { trackLearningEvent } from '../../services/telemetry/eventTracker';
import { Sparkles, Coins, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ChallengeDispatcher = ({ challenge }) => {
  const navigate = useNavigate();
  const { setLynxState, mood, message } = useLynx();
  const { addRewards } = useLearning();

  // Interaction States
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedTokens, setSelectedTokens] = useState({});
  const [orderedItems, setOrderedItems] = useState(() => challenge.shuffledItems || []);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reorder Item for Ordering Challenge
  const handleMoveItem = (fromIndex, toIndex) => {
    setOrderedItems(prev => {
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  };

  // Submit Handler
  const handleSubmit = async () => {
    setIsSubmitting(true);
    let payload = selectedOption;
    if (challenge.type === 'code-completion') payload = selectedTokens;
    if (challenge.type === 'ordering') payload = orderedItems;

    try {
      const { data } = await assessmentService.submitChallengeAttempt(challenge.id, payload);
      setResult(data);
      setHasSubmitted(true);

      // Track telemetry
      trackLearningEvent({
        type: 'challenge_attempted',
        challengeId: challenge.id,
        isCorrect: data.isCorrect,
      });

      if (data.isCorrect) {
        // Trigger rewards
        addRewards(data.xpEarned, data.coinsEarned);

        // Mascot celebration
        setLynxState('celebrating', 'Great work! You nailed this concept!');

        // Confetti burst
        confetti({
          particleCount: 65,
          spread: 60,
          origin: { y: 0.7 }
        });
      } else {
        // Mascot empathy & coaching
        setLynxState('sad', "That's okay. Read the explanation and try again!");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinue = () => {
    // Navigate to Results page with attempt outcome
    navigate(`/result/attempt-${challenge.id}`, {
      state: {
        title: challenge.title,
        isCorrect: result?.isCorrect,
        xpEarned: result?.xpEarned || 20,
        coinsEarned: result?.coinsEarned || 10,
        skillsAffected: result?.skillsAffected || challenge.skills || [],
        explanation: result?.explanation || challenge.explanation,
        nextRecommended: result?.nextRecommended || 'web-l2-m4'
      }
    });
  };

  const handleRetry = () => {
    setHasSubmitted(false);
    setResult(null);
    setSelectedOption(null);
    setSelectedTokens({});
    setLynxState('encouraging', 'Take another shot. You can do this!');
  };

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Challenge Header Card */}
      <div
        className="glass-card"
        style={{
          padding: '24px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderLeft: '4px solid #7C3AED'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7C3AED', fontWeight: '800', fontSize: '0.8rem', textTransform: 'uppercase' }}>
            <span>Technical Challenge</span>
            <span>•</span>
            <span>+{challenge.xpReward || 25} XP</span>
            <span>•</span>
            <span>+{challenge.coinReward || 15} Coins</span>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0F172A', marginTop: '4px' }}>
            {challenge.title}
          </h2>
        </div>

        <LynxCompanion
          mood={mood}
          message={message}
          size="sm"
          showBubble={true}
        />
      </div>

      {/* Interactive Challenge Body */}
      <div className="glass-card" style={{ padding: '32px' }}>
        {challenge.type === 'multiple-choice' && (
          <MultipleChoiceChallenge
            challenge={challenge}
            selectedOption={selectedOption}
            onSelectOption={setSelectedOption}
            hasSubmitted={hasSubmitted}
            isCorrect={result?.isCorrect}
          />
        )}

        {challenge.type === 'code-completion' && (
          <CodeCompletionChallenge
            challenge={challenge}
            selectedTokens={selectedTokens}
            onSelectToken={(blankId, val) => setSelectedTokens(prev => ({ ...prev, [blankId]: val }))}
            hasSubmitted={hasSubmitted}
            isCorrect={result?.isCorrect}
          />
        )}

        {challenge.type === 'ordering' && (
          <OrderingChallenge
            challenge={challenge}
            orderedItems={orderedItems}
            onMoveItem={handleMoveItem}
            hasSubmitted={hasSubmitted}
            isCorrect={result?.isCorrect}
          />
        )}

        {(challenge.type === 'debug' || challenge.type === 'prediction') && (
          <DebugChallenge
            challenge={challenge}
            selectedOption={selectedOption}
            onSelectOption={setSelectedOption}
            hasSubmitted={hasSubmitted}
            isCorrect={result?.isCorrect}
          />
        )}

        {/* Feedback & Explanation Box */}
        {hasSubmitted && result && (
          <div
            style={{
              marginTop: '24px',
              padding: '20px',
              borderRadius: '14px',
              background: result.isCorrect ? '#ECFDF5' : '#FFF1F2',
              border: result.isCorrect ? '1.5px solid #6EE7B7' : '1.5px solid #FECDD3',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: '800', fontSize: '0.95rem', color: result.isCorrect ? '#065F46' : '#9F1239' }}>
                {result.isCorrect ? '✓ Challenge Mastered!' : '✕ Needs Review'}
              </span>
              <div style={{ display: 'flex', gap: '10px', fontSize: '0.85rem', fontWeight: '700' }}>
                <span style={{ color: '#7C3AED' }}>+{result.xpEarned} XP</span>
                <span style={{ color: '#D97706' }}>+{result.coinsEarned} Coins</span>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.5 }}>
              {result.explanation}
            </p>
          </div>
        )}

        {/* Action Controls */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '28px' }}>
          {!hasSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || (!selectedOption && !Object.keys(selectedTokens).length && !orderedItems.length)}
              className="btn-game-primary"
              style={{ padding: '12px 28px' }}
            >
              <span>{isSubmitting ? 'Evaluating...' : 'Submit Challenge'}</span>
              <ArrowRight size={18} />
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '12px' }}>
              {!result?.isCorrect && (
                <button onClick={handleRetry} className="btn-game-secondary">
                  <RotateCcw size={16} />
                  <span>Try Again</span>
                </button>
              )}
              <button onClick={handleContinue} className="btn-game-primary">
                <span>View Full Results</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
