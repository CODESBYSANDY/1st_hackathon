import React, { useState } from 'react';
import { ArrowRight, Check, Eye, HelpCircle, Layers, Server, Globe, Laptop } from 'lucide-react';

export const VisualSection = ({ visualType }) => {
  // 1. Tag Anatomy Interactive Visualizer
  const [activeTagPart, setActiveTagPart] = useState('element');

  // 2. Box Model Interactive Visualizer
  const [padding, setPadding] = useState(20);
  const [margin, setMargin] = useState(25);
  const [border, setBorder] = useState(4);
  const [contentWidth, setContentWidth] = useState(180);

  // 3. URL Journey Stepper
  const [urlStep, setUrlStep] = useState(0);
  const urlSteps = [
    { title: '1. Browser Cache', desc: 'Checks memory cache for existing IP mapping.', icon: Laptop },
    { title: '2. Recursive DNS Lookup', desc: 'Queries root nameservers and TLD servers to resolve netra.dev to 104.21.5.12.', icon: Globe },
    { title: '3. TCP Handshake', desc: 'SYN -> SYN-ACK -> ACK completes reliable 3-way transport handshake.', icon: Server },
    { title: '4. TLS Security', desc: 'Exchanges certificates and generates symmetric session keys.', icon: Layers },
    { title: '5. HTTP GET Request', desc: 'Transmits GET / HTTP/1.1 with user agent and accept headers.', icon: ArrowRight },
    { title: '6. Server Response & Render', desc: 'HTTP 200 OK received; HTML parsed and painted on screen.', icon: Check }
  ];

  if (visualType === 'tagAnatomy') {
    return (
      <div style={{ background: '#0F172A', color: 'white', padding: '24px', borderRadius: '16px', marginTop: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <span style={{ fontSize: '0.8rem', color: '#38BDF8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Interactive Visualizer: Anatomy of an HTML Element
          </span>
          <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Click any part to inspect</span>
        </div>

        {/* Live Interactive Tag Display */}
        <div
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '1.25rem',
            padding: '20px',
            background: '#1E293B',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            border: '1px solid #334155'
          }}
        >
          {/* Opening Tag */}
          <span
            onClick={() => setActiveTagPart('openingTag')}
            style={{
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '6px',
              background: activeTagPart === 'openingTag' ? '#1E40AF' : 'transparent',
              color: '#60A5FA',
              border: activeTagPart === 'openingTag' ? '1px solid #93C5FD' : '1px solid transparent'
            }}
          >
            &lt;a
          </span>

          {/* Attribute */}
          <span
            onClick={() => setActiveTagPart('attribute')}
            style={{
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '6px',
              background: activeTagPart === 'attribute' ? '#065F46' : 'transparent',
              color: '#34D399',
              border: activeTagPart === 'attribute' ? '1px solid #6EE7B7' : '1px solid transparent'
            }}
          >
            href=&quot;https://netra.dev&quot;
          </span>

          {/* Close bracket of opening tag */}
          <span style={{ color: '#60A5FA' }}>&gt;</span>

          {/* Content */}
          <span
            onClick={() => setActiveTagPart('content')}
            style={{
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '6px',
              background: activeTagPart === 'content' ? '#78350F' : 'transparent',
              color: '#FBBF24',
              border: activeTagPart === 'content' ? '1px solid #FCD34D' : '1px solid transparent'
            }}
          >
            Explore Next Step
          </span>

          {/* Closing Tag */}
          <span
            onClick={() => setActiveTagPart('closingTag')}
            style={{
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '6px',
              background: activeTagPart === 'closingTag' ? '#1E40AF' : 'transparent',
              color: '#60A5FA',
              border: activeTagPart === 'closingTag' ? '1px solid #93C5FD' : '1px solid transparent'
            }}
          >
            &lt;/a&gt;
          </span>
        </div>

        {/* Inspector Description */}
        <div style={{ marginTop: '16px', padding: '14px', background: '#1E293B', borderRadius: '10px', fontSize: '0.88rem' }}>
          {activeTagPart === 'openingTag' && (
            <p><strong>Opening Tag (&lt;a&gt;):</strong> Declares the start of the element and informs the browser how to render the subsequent content.</p>
          )}
          {activeTagPart === 'attribute' && (
            <p><strong>Attribute (href=&quot;...&quot;):</strong> Modifiers that supply extra metadata. In this link, <code>href</code> specifies the destination URL.</p>
          )}
          {activeTagPart === 'content' && (
            <p><strong>Content (&quot;Explore Next Step&quot;):</strong> The visual text or nested child nodes displayed inside the browser viewport.</p>
          )}
          {activeTagPart === 'closingTag' && (
            <p><strong>Closing Tag (&lt;/a&gt;):</strong> Identical tag name preceded by a forward slash (<code>/</code>) indicating where the element terminates.</p>
          )}
          {activeTagPart === 'element' && (
            <p><strong>HTML Element:</strong> The entire composite entity from the opening tag through to the closing tag.</p>
          )}
        </div>
      </div>
    );
  }

  if (visualType === 'boxModelInteractive') {
    const totalRenderedWidth = contentWidth + (padding * 2) + (border * 2) + (margin * 2);

    return (
      <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '24px', borderRadius: '16px', marginTop: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#2563EB', textTransform: 'uppercase' }}>
            Interactive CSS Box Model Simulator
          </span>
          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0F172A', background: '#F1F5F9', padding: '4px 10px', borderRadius: '8px' }}>
            Total Occupied Width: {totalRenderedWidth}px
          </span>
        </div>

        {/* Visual Concentric Boxes */}
        <div
          style={{
            background: '#FEF3C7', // Margin orange
            padding: `${margin}px`,
            borderRadius: '14px',
            border: '2px dashed #F59E0B',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
          }}
        >
          <span style={{ position: 'absolute', top: '4px', left: '8px', fontSize: '0.68rem', fontWeight: '800', color: '#B45309' }}>
            MARGIN ({margin}px)
          </span>

          <div
            style={{
              background: '#93C5FD', // Border blue
              padding: `${border}px`,
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            <div
              style={{
                background: '#A7F3D0', // Padding green
                padding: `${padding}px`,
                borderRadius: '6px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative'
              }}
            >
              <div
                style={{
                  background: '#3B82F6', // Content deep blue
                  color: 'white',
                  width: `${contentWidth}px`,
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  borderRadius: '4px'
                }}
              >
                CONTENT ({contentWidth}px)
              </div>
            </div>
          </div>
        </div>

        {/* Sliders */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '14px', marginTop: '20px' }}>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#B45309' }}>Margin: {margin}px</label>
            <input type="range" min="5" max="40" value={margin} onChange={e => setMargin(Number(e.target.value))} style={{ width: '100%' }} />
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#1D4ED8' }}>Border: {border}px</label>
            <input type="range" min="1" max="12" value={border} onChange={e => setBorder(Number(e.target.value))} style={{ width: '100%' }} />
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#047857' }}>Padding: {padding}px</label>
            <input type="range" min="5" max="35" value={padding} onChange={e => setPadding(Number(e.target.value))} style={{ width: '100%' }} />
          </div>
        </div>
      </div>
    );
  }

  if (visualType === 'urlJourney') {
    const CurrentStepIcon = urlSteps[urlStep].icon;

    return (
      <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '24px', borderRadius: '16px', marginTop: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#06B6D4', textTransform: 'uppercase' }}>
            Interactive URL-to-Render Pipeline
          </span>
          <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
            Step {urlStep + 1} of {urlSteps.length}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', background: 'white', borderRadius: '12px', border: '1px solid #CBD5E1' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CurrentStepIcon size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0F172A' }}>{urlSteps[urlStep].title}</h4>
            <p style={{ fontSize: '0.86rem', color: '#475569', marginTop: '3px' }}>{urlSteps[urlStep].desc}</p>
          </div>
        </div>

        {/* Step Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
          <button
            disabled={urlStep === 0}
            onClick={() => setUrlStep(prev => prev - 1)}
            className="btn-game-secondary"
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            ← Previous Stage
          </button>
          <button
            disabled={urlStep === urlSteps.length - 1}
            onClick={() => setUrlStep(prev => prev + 1)}
            className="btn-game-primary"
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            Next Stage →
          </button>
        </div>
      </div>
    );
  }

  // Default fallback visual banner
  return (
    <div style={{ background: '#F1F5F9', padding: '16px', borderRadius: '12px', marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Layers size={20} color="#2563EB" />
      <span style={{ fontSize: '0.86rem', color: '#334155' }}>
        Interactive system visualizer initialized for this concept.
      </span>
    </div>
  );
};
