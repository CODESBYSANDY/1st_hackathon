import React, { useState } from 'react';
import { ArrowUp, ArrowDown, CheckCircle2 } from 'lucide-react';

export const OrderingChallenge = ({
  challenge,
  orderedItems,
  onMoveItem,
  hasSubmitted,
  isCorrect
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0F172A', lineHeight: 1.5 }}>
        {challenge.question}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {orderedItems.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderRadius: '10px',
              background: '#FFFFFF',
              border: hasSubmitted ? (isCorrect ? '1.5px solid #10B981' : '1.5px solid #EF4444') : '1px solid #CBD5E1',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: '#EFF6FF',
                  color: '#2563EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '800',
                  fontSize: '0.8rem'
                }}
              >
                {index + 1}
              </span>
              <span style={{ fontSize: '0.9rem', color: '#1E293B', fontWeight: '500' }}>
                {item}
              </span>
            </div>

            {!hasSubmitted && (
              <div style={{ display: 'flex', gap: '4px' }}>
                <button
                  disabled={index === 0}
                  onClick={() => onMoveItem(index, index - 1)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    background: '#F8FAFC',
                    cursor: index === 0 ? 'not-allowed' : 'pointer',
                    opacity: index === 0 ? 0.4 : 1
                  }}
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  disabled={index === orderedItems.length - 1}
                  onClick={() => onMoveItem(index, index + 1)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    background: '#F8FAFC',
                    cursor: index === orderedItems.length - 1 ? 'not-allowed' : 'pointer',
                    opacity: index === orderedItems.length - 1 ? 0.4 : 1
                  }}
                >
                  <ArrowDown size={14} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
