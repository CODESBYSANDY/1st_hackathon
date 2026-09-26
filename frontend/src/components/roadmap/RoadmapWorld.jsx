import React, { useState } from 'react';
import { RoadmapNode } from './RoadmapNode';
import { LynxCompanion } from '../lynx/LynxCompanion';
import { Sparkles, Trophy, Compass, Flag } from 'lucide-react';

export const RoadmapWorld = ({ curriculum, onSelectLevel }) => {
  const levels = curriculum.levels || [];
  const currentLevel = levels.find(l => l.status === 'recommended' || l.status === 'in_progress') || levels[1];

  return (
    <div style={{ position: 'relative', width: '100%', padding: '20px 0 60px' }}>
      {/* World Header Banner */}
      <div
        className="glass-card"
        style={{
          padding: '24px 32px',
          marginBottom: '36px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(241,245,249,0.9) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderLeft: '4px solid #2563EB'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2563EB', fontWeight: '800', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            <Compass size={16} />
            <span>Interactive Learning World</span>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0F172A', marginTop: '4px' }}>
            {curriculum.domainName} Roadmap
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#64748B', marginTop: '2px' }}>
            Follow the path from foundational mechanics to capstone mastery. Every milestone unlocks new capabilities.
          </p>
        </div>

        {/* Mascot Advice Widget */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <LynxCompanion
            mood={currentLevel?.status === 'needs_reinforcement' ? 'encouraging' : 'motivating'}
            message={`Next up: Level ${currentLevel?.number} (${currentLevel?.title})!`}
            size="sm"
            showBubble={true}
          />
        </div>
      </div>

      {/* Connected Levels Path */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          position: 'relative',
          maxWidth: '840px',
          margin: '0 auto'
        }}
      >
        {levels.map((level, index) => {
          const isCurrent = level.id === currentLevel?.id;
          const isLast = index === levels.length - 1;

          return (
            <div key={level.id} style={{ position: 'relative' }}>
              {/* Connector line to next node */}
              {!isLast && (
                <div
                  style={{
                    position: 'absolute',
                    left: '38px',
                    bottom: '-24px',
                    width: '4px',
                    height: '24px',
                    background: level.status === 'completed' ? '#10B981' : level.status === 'recommended' ? '#3B82F6' : '#CBD5E1',
                    zIndex: 1
                  }}
                />
              )}

              <RoadmapNode
                level={level}
                isCurrent={isCurrent}
                onSelect={onSelectLevel}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
