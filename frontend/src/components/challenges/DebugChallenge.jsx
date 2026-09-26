import React from 'react';
import { Bug, CheckCircle2, XCircle } from 'lucide-react';

export const DebugChallenge = ({
  challenge,
  selectedOption,
  onSelectOption,
  hasSubmitted,
  isCorrect
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0F172A', lineHeight: 1.5 }}>
        {challenge.question}
      </div>

      {/* Code Snippet Under Debug */}
      {challenge.codeSnippet && (
        <div
          style={{
            background: '#0F172A',
            padding: '18px',
            borderRadius: '12px',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.88rem',
            color: '#F8FAFC',
            lineHeight: 1.6,
            border: '1px solid #334155'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#F43F5E', fontSize: '0.75rem', fontWeight: '700', marginBottom: '8px' }}>
            <Bug size={14} />
            <span>DEBUG INSPECTION CONSOLE</span>
          </div>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
            <code>{challenge.codeSnippet}</code>
          </pre>
        </div>
      )}

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {challenge.options.map((option) => {
          const isSelected = selectedOption === option.id;
          let border = '1px solid #CBD5E1';
          let background = '#FFFFFF';

          if (hasSubmitted) {
            if (option.isCorrect) {
              border = '2px solid #10B981';
              background = '#ECFDF5';
            } else if (isSelected && !option.isCorrect) {
              border = '2px solid #EF4444';
              background = '#FEF2F2';
            }
          } else if (isSelected) {
            border = '2px solid #2563EB';
            background = '#EFF6FF';
          }

          return (
            <div
              key={option.id}
              onClick={() => !hasSubmitted && onSelectOption(option.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                borderRadius: '12px',
                border,
                background,
                cursor: hasSubmitted ? 'default' : 'pointer',
                fontWeight: isSelected ? '700' : '500',
                fontSize: '0.92rem'
              }}
            >
              <span>{option.text}</span>
              {hasSubmitted && option.isCorrect && <CheckCircle2 size={18} color="#10B981" />}
              {hasSubmitted && isSelected && !option.isCorrect && <XCircle size={18} color="#EF4444" />}
            </div>
          );
        })}
      </div>
    </div>
  );
};
