import React from 'react';
import { CheckCircle2, Code2 } from 'lucide-react';

export const CodeCompletionChallenge = ({
  challenge,
  selectedTokens,
  onSelectToken,
  hasSubmitted,
  isCorrect
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0F172A', lineHeight: 1.5 }}>
        {challenge.question}
      </div>

      {/* Code Editor Box */}
      <div
        style={{
          background: '#0F172A',
          padding: '20px',
          borderRadius: '14px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.95rem',
          color: '#F8FAFC',
          lineHeight: 1.7,
          border: hasSubmitted ? (isCorrect ? '2px solid #10B981' : '2px solid #EF4444') : '1px solid #334155'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94A3B8', fontSize: '0.75rem', marginBottom: '8px' }}>
          <Code2 size={14} />
          <span>CODE CANVAS</span>
        </div>
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
          <code>{challenge.template}</code>
        </pre>
      </div>

      {/* Token Selection Bank */}
      <div style={{ marginTop: '8px' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', marginBottom: '8px' }}>
          Select Token to Fill Blank:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {challenge.optionsBlank1?.map((token) => {
            const isSelected = selectedTokens['blank-1'] === token;
            return (
              <button
                key={token}
                disabled={hasSubmitted}
                onClick={() => onSelectToken('blank-1', token)}
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: isSelected ? '2px solid #2563EB' : '1px solid #CBD5E1',
                  background: isSelected ? '#EFF6FF' : '#FFFFFF',
                  color: isSelected ? '#1D4ED8' : '#0F172A',
                  fontWeight: '700',
                  fontSize: '0.88rem',
                  cursor: hasSubmitted ? 'default' : 'pointer'
                }}
              >
                {token}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
