import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export const MultipleChoiceChallenge = ({
  challenge,
  selectedOption,
  onSelectOption,
  hasSubmitted,
  isCorrect
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0F172A', lineHeight: 1.5 }}>
        {challenge.question}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
        {challenge.options.map((option) => {
          const isSelected = selectedOption === option.id;
          let border = '1px solid #CBD5E1';
          let background = '#FFFFFF';
          let textColor = '#1E293B';

          if (hasSubmitted) {
            if (option.isCorrect) {
              border = '2px solid #10B981';
              background = '#ECFDF5';
              textColor = '#065F46';
            } else if (isSelected && !option.isCorrect) {
              border = '2px solid #EF4444';
              background = '#FEF2F2';
              textColor = '#991B1B';
            }
          } else if (isSelected) {
            border = '2px solid #2563EB';
            background = '#EFF6FF';
            textColor = '#1D4ED8';
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
                color: textColor,
                cursor: hasSubmitted ? 'default' : 'pointer',
                fontWeight: isSelected ? '700' : '500',
                fontSize: '0.94rem',
                transition: 'all 0.15s ease'
              }}
            >
              <span>{option.text}</span>
              {hasSubmitted && option.isCorrect && (
                <CheckCircle2 size={18} color="#10B981" />
              )}
              {hasSubmitted && isSelected && !option.isCorrect && (
                <XCircle size={18} color="#EF4444" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
