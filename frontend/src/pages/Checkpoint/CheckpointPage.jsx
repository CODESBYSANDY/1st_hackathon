import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { assessmentService } from '../../services/api/assessmentService';
import { LynxCompanion } from '../../components/lynx/LynxCompanion';
import { useLearning } from '../../context/LearningContext';
import { Shield, CheckCircle2, ArrowRight, Award, AlertCircle, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckpointPage = () => {
  const { checkpointId } = useParams();
  const navigate = useNavigate();
  const { addRewards } = useLearning();

  const [checkpoint, setCheckpoint] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    assessmentService.getCheckpoint(checkpointId)
      .then((res) => {
        if (isMounted) {
          setCheckpoint(res.data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [checkpointId]);

  const handleSelectOption = (questionId, optionId) => {
    if (!hasSubmitted) {
      setSelectedAnswers(prev => ({ ...prev, [questionId]: optionId }));
    }
  };

  const handleSubmit = async () => {
    const { data } = await assessmentService.submitCheckpoint(checkpoint.id, selectedAnswers);
    setResult(data);
    setHasSubmitted(true);

    // Reward student
    addRewards(50, 25);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleContinue = () => {
    navigate('/result/checkpoint-' + checkpoint.id, {
      state: {
        title: checkpoint.title,
        isCorrect: true,
        scorePercentage: result?.score_percentage || 100,
        xpEarned: 50,
        coinsEarned: 25,
        skillsAffected: Object.keys(result?.skill_updates || {}),
        strongAreas: result?.strong_areas || ['HTTP Protocols'],
        weakAreas: result?.weak_areas || [],
        nextRecommended: result?.next_action?.activity_id || 'web-l2',
        lynxReaction: result?.lynxReaction || "You've proven strong foundational understanding!"
      }
    });
  };

  if (loading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', color: '#64748B' }}>
        <RefreshCw size={26} className="anim-float anim-spin" style={{ margin: '0 auto 12px' }} />
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Loading Checkpoint Diagnostic...</h3>
      </div>
    );
  }

  if (!checkpoint) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center', maxWidth: '480px', margin: '0 auto' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0F172A' }}>Checkpoint Complete</h3>
        <p style={{ fontSize: '0.88rem', color: '#64748B', marginTop: '6px' }}>
          This knowledge checkpoint is not active or has already been completed.
        </p>
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          style={{
            marginTop: '16px',
            padding: '10px 20px',
            borderRadius: '12px',
            background: '#2563EB',
            color: '#FFFFFF',
            fontWeight: '700',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const allAnswered = checkpoint.questions?.every(q => selectedAnswers[q.id]);

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Checkpoint Header Banner */}
      <div
        className="glass-card"
        style={{
          padding: '28px 36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderLeft: '4px solid #F59E0B'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#D97706', fontWeight: '800', fontSize: '0.82rem', textTransform: 'uppercase' }}>
            <Shield size={18} />
            <span>KNOWLEDGE CHECKPOINT</span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0F172A', marginTop: '4px' }}>
            &ldquo;Let&apos;s see what you&apos;ve learned.&rdquo;
          </h1>
          <p style={{ fontSize: '0.94rem', color: '#64748B', marginTop: '4px' }}>
            {checkpoint.description}
          </p>
        </div>

        <LynxCompanion
          mood={hasSubmitted ? 'celebrating' : 'thinking'}
          message={hasSubmitted ? 'Diagnostic passed with flying colors!' : "Let's test your mental model."}
          size="sm"
          showBubble={true}
        />
      </div>

      {/* Multi-step Diagnostic Questions */}
      <div className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {checkpoint.questions?.map((q, idx) => (
          <div key={q.id} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '1.02rem', fontWeight: '700', color: '#0F172A' }}>
              {idx + 1}. {q.question}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {q.options.map((opt) => {
                const isSelected = selectedAnswers[q.id] === opt.id;
                let border = '1px solid #CBD5E1';
                let background = '#FFFFFF';

                if (hasSubmitted) {
                  if (opt.isCorrect) {
                    border = '2px solid #10B981';
                    background = '#ECFDF5';
                  } else if (isSelected && !opt.isCorrect) {
                    border = '2px solid #EF4444';
                    background = '#FEF2F2';
                  }
                } else if (isSelected) {
                  border = '2px solid #F59E0B';
                  background = '#FFFBEB';
                }

                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectOption(q.id, opt.id)}
                    style={{
                      padding: '12px 18px',
                      borderRadius: '10px',
                      border,
                      background,
                      cursor: hasSubmitted ? 'default' : 'pointer',
                      fontSize: '0.92rem',
                      fontWeight: isSelected ? '700' : '500'
                    }}
                  >
                    {opt.text}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Checkpoint Results Summary */}
        {hasSubmitted && result && (
          <div
            style={{
              padding: '24px',
              borderRadius: '16px',
              background: '#ECFDF5',
              border: '1.5px solid #6EE7B7',
              marginTop: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800', color: '#065F46', fontSize: '1.1rem' }}>
                <CheckCircle2 size={20} />
                <span>Diagnostic Complete: {result.score_percentage}% Mastery Score</span>
              </div>
              <span style={{ fontWeight: '800', color: '#7C3AED' }}>+50 XP • +25 Coins</span>
            </div>

            <div style={{ fontSize: '0.88rem', color: '#334155' }}>
              <strong>Strengths Demonstrated:</strong> {result.strong_areas.join(', ')}
            </div>

            <div style={{ fontSize: '0.88rem', color: '#047857' }}>
              <strong>Adaptive Recommendation:</strong> Proceed to {result.next_action.title}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          {!hasSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="btn-game-primary"
              style={{
                background: allAnswered ? 'linear-gradient(135deg, #D97706, #B45309)' : '#CBD5E1',
                cursor: allAnswered ? 'pointer' : 'not-allowed'
              }}
            >
              <span>Submit Checkpoint</span>
              <ArrowRight size={18} />
            </button>
          ) : (
            <button onClick={handleContinue} className="btn-game-primary">
              <span>Continue Learning Journey</span>
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
