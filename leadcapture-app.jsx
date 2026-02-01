import React, { useState, useRef } from 'react';

// Mock data for demonstration
const mockLeads = [
  {
    id: 1,
    name: 'Sarah Chen',
    title: 'VP of Engineering',
    company: 'TechFlow Solutions',
    email: 'sarah.chen@techflow.io',
    phone: '+1 (415) 555-0123',
    linkedin: 'linkedin.com/in/sarahchen',
    enrichment: {
      industry: 'Enterprise Software',
      size: '500-1000 employees',
      funding: 'Series C - $85M',
      news: 'Recently launched AI analytics platform'
    },
    status: 'new',
    capturedAt: '2024-01-15T10:30:00'
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    title: 'Director of Operations',
    company: 'Meridian Health',
    email: 'm.johnson@meridianhealth.com',
    phone: '+1 (312) 555-0456',
    linkedin: 'linkedin.com/in/marcusjohnson',
    enrichment: {
      industry: 'Healthcare Technology',
      size: '1000-5000 employees',
      funding: 'Public (NYSE: MHC)',
      news: 'Expanding into telehealth services'
    },
    status: 'enriched',
    capturedAt: '2024-01-15T11:45:00'
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    title: 'Chief Marketing Officer',
    company: 'Vertex Dynamics',
    email: 'elena@vertexdynamics.com',
    phone: '+1 (512) 555-0789',
    linkedin: 'linkedin.com/in/elenarodriguez',
    enrichment: {
      industry: 'Manufacturing Automation',
      size: '200-500 employees',
      funding: 'Series B - $42M',
      news: 'Partnership with major automotive OEM'
    },
    status: 'synced',
    capturedAt: '2024-01-14T16:20:00'
  }
];

// Icons as components
const Icons = {
  Camera: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  ),
  Upload: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  ),
  User: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Building: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
      <path d="M9 22v-4h6v4"/>
      <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>
    </svg>
  ),
  Mail: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  Phone: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  Linkedin: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  Search: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
    </svg>
  ),
  Sync: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
    </svg>
  ),
  Send: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Sparkle: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    </svg>
  ),
  X: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  Grid: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  List: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"/>
      <line x1="8" y1="12" x2="21" y2="12"/>
      <line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/>
      <line x1="3" y1="12" x2="3.01" y2="12"/>
      <line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  ),
  TrendingUp: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  Zap: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Target: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  )
};

// Status badge component
const StatusBadge = ({ status }) => {
  const styles = {
    new: { bg: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', label: 'New' },
    enriched: { bg: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', label: 'Enriched' },
    synced: { bg: 'rgba(16, 185, 129, 0.15)', color: '#34d399', label: 'Synced' }
  };
  const s = styles[status] || styles.new;
  
  return (
    <span style={{
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '11px',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      background: s.bg,
      color: s.color
    }}>
      {s.label}
    </span>
  );
};

// Stat Card component
const StatCard = ({ icon, label, value, trend }) => (
  <div style={{
    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid rgba(148, 163, 184, 0.1)',
    position: 'relative',
    overflow: 'hidden'
  }}>
    <div style={{
      position: 'absolute',
      top: '-20px',
      right: '-20px',
      width: '100px',
      height: '100px',
      background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
      borderRadius: '50%'
    }} />
    <div style={{ color: '#06b6d4', marginBottom: '12px' }}>{icon}</div>
    <div style={{ fontSize: '32px', fontWeight: '700', color: '#f1f5f9', marginBottom: '4px' }}>{value}</div>
    <div style={{ fontSize: '13px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</div>
    {trend && (
      <div style={{ fontSize: '12px', color: '#34d399', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Icons.TrendingUp /> {trend}
      </div>
    )}
  </div>
);

// Lead Card component
const LeadCard = ({ lead, onClick, isSelected }) => (
  <div 
    onClick={onClick}
    style={{
      background: isSelected 
        ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(30, 41, 59, 0.9) 100%)'
        : 'linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)',
      borderRadius: '16px',
      padding: '20px',
      border: isSelected ? '1px solid rgba(6, 182, 212, 0.4)' : '1px solid rgba(148, 163, 184, 0.1)',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      transform: isSelected ? 'scale(1.02)' : 'scale(1)',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          fontWeight: '700',
          color: '#0f172a'
        }}>
          {lead.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <div style={{ fontSize: '16px', fontWeight: '600', color: '#f1f5f9' }}>{lead.name}</div>
          <div style={{ fontSize: '13px', color: '#94a3b8' }}>{lead.title}</div>
        </div>
      </div>
      <StatusBadge status={lead.status} />
    </div>
    
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '14px', marginBottom: '12px' }}>
      <Icons.Building />
      <span style={{ color: '#cbd5e1' }}>{lead.company}</span>
    </div>
    
    <div style={{ 
      display: 'flex', 
      gap: '16px', 
      fontSize: '12px', 
      color: '#64748b',
      paddingTop: '12px',
      borderTop: '1px solid rgba(148, 163, 184, 0.1)'
    }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Icons.Mail /> Email
      </span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Icons.Phone /> Phone
      </span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Icons.Linkedin /> LinkedIn
      </span>
    </div>
  </div>
);

// Lead Detail Panel
const LeadDetailPanel = ({ lead, onClose }) => {
  if (!lead) return null;
  
  return (
    <div style={{
      background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(15, 23, 42, 0.95) 100%)',
      borderRadius: '20px',
      border: '1px solid rgba(148, 163, 184, 0.1)',
      overflow: 'hidden',
      animation: 'slideIn 0.3s ease-out'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(6, 182, 212, 0.05) 100%)',
        padding: '24px',
        borderBottom: '1px solid rgba(148, 163, 184, 0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: '700',
              color: '#0f172a'
            }}>
              {lead.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#f1f5f9' }}>{lead.name}</h2>
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#94a3b8' }}>{lead.title}</p>
              <p style={{ margin: '2px 0 0', fontSize: '14px', color: '#06b6d4' }}>{lead.company}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'rgba(148, 163, 184, 0.1)',
              border: 'none',
              borderRadius: '10px',
              padding: '8px',
              color: '#94a3b8',
              cursor: 'pointer'
            }}
          >
            <Icons.X />
          </button>
        </div>
      </div>
      
      {/* Contact Info */}
      <div style={{ padding: '24px' }}>
        <h3 style={{ 
          fontSize: '11px', 
          fontWeight: '600', 
          color: '#64748b', 
          textTransform: 'uppercase', 
          letterSpacing: '1px',
          marginBottom: '16px' 
        }}>
          Contact Information
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#cbd5e1' }}>
            <div style={{ color: '#06b6d4' }}><Icons.Mail /></div>
            <span>{lead.email}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#cbd5e1' }}>
            <div style={{ color: '#06b6d4' }}><Icons.Phone /></div>
            <span>{lead.phone}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#cbd5e1' }}>
            <div style={{ color: '#06b6d4' }}><Icons.Linkedin /></div>
            <span>{lead.linkedin}</span>
          </div>
        </div>
      </div>
      
      {/* Enrichment Data */}
      <div style={{ padding: '0 24px 24px' }}>
        <h3 style={{ 
          fontSize: '11px', 
          fontWeight: '600', 
          color: '#64748b', 
          textTransform: 'uppercase', 
          letterSpacing: '1px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Icons.Sparkle /> Company Insights
        </h3>
        <div style={{
          background: 'rgba(30, 41, 59, 0.5)',
          borderRadius: '12px',
          padding: '16px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px'
        }}>
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>Industry</div>
            <div style={{ fontSize: '14px', color: '#f1f5f9' }}>{lead.enrichment.industry}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>Company Size</div>
            <div style={{ fontSize: '14px', color: '#f1f5f9' }}>{lead.enrichment.size}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>Funding</div>
            <div style={{ fontSize: '14px', color: '#f1f5f9' }}>{lead.enrichment.funding}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>Recent News</div>
            <div style={{ fontSize: '14px', color: '#f1f5f9' }}>{lead.enrichment.news}</div>
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div style={{ 
        padding: '20px 24px', 
        borderTop: '1px solid rgba(148, 163, 184, 0.1)',
        display: 'flex',
        gap: '12px'
      }}>
        <button style={{
          flex: 1,
          padding: '14px 20px',
          borderRadius: '12px',
          border: 'none',
          background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
          color: '#0f172a',
          fontWeight: '600',
          fontSize: '14px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <Icons.Sync /> Sync to HubSpot
        </button>
        <button style={{
          flex: 1,
          padding: '14px 20px',
          borderRadius: '12px',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          background: 'rgba(30, 41, 59, 0.5)',
          color: '#f1f5f9',
          fontWeight: '600',
          fontSize: '14px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <Icons.Send /> Draft Email
        </button>
      </div>
    </div>
  );
};

// Capture Modal
const CaptureModal = ({ isOpen, onClose }) => {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  
  if (!isOpen) return null;
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <div style={{
        background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
        borderRadius: '24px',
        padding: '32px',
        width: '90%',
        maxWidth: '500px',
        border: '1px solid rgba(148, 163, 184, 0.1)',
        animation: 'scaleIn 0.3s ease-out'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#f1f5f9' }}>
            Capture Business Card
          </h2>
          <button 
            onClick={onClose}
            style={{
              background: 'rgba(148, 163, 184, 0.1)',
              border: 'none',
              borderRadius: '10px',
              padding: '8px',
              color: '#94a3b8',
              cursor: 'pointer'
            }}
          >
            <Icons.X />
          </button>
        </div>
        
        {/* Drop Zone */}
        <div 
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => { e.preventDefault(); setDragActive(false); }}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: `2px dashed ${dragActive ? '#06b6d4' : 'rgba(148, 163, 184, 0.3)'}`,
            borderRadius: '16px',
            padding: '48px 24px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            background: dragActive ? 'rgba(6, 182, 212, 0.05)' : 'transparent'
          }}
        >
          <input 
            ref={fileInputRef}
            type="file" 
            accept="image/*" 
            capture="environment"
            style={{ display: 'none' }} 
          />
          <div style={{ 
            width: '72px', 
            height: '72px', 
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(6, 182, 212, 0.05) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            color: '#06b6d4'
          }}>
            <Icons.Upload />
          </div>
          <p style={{ margin: 0, fontSize: '16px', color: '#f1f5f9', fontWeight: '500' }}>
            Drop your business card here
          </p>
          <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#64748b' }}>
            or click to upload / take photo
          </p>
        </div>
        
        {/* Divider */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '16px', 
          margin: '24px 0',
          color: '#64748b',
          fontSize: '12px',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(148, 163, 184, 0.2)' }} />
          <span>or</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(148, 163, 184, 0.2)' }} />
        </div>
        
        {/* Camera Button */}
        <button 
          onClick={() => fileInputRef.current?.click()}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            border: 'none',
            background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
            color: '#0f172a',
            fontWeight: '600',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
        >
          <Icons.Camera /> Open Camera
        </button>
      </div>
    </div>
  );
};

// Main App
export default function LeadCaptureApp() {
  const [leads, setLeads] = useState(mockLeads);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showCaptureModal, setShowCaptureModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #020617 50%, #0f172a 100%)',
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#f1f5f9'
    }}>
      {/* Background Effects */}
      <div style={{
        position: 'fixed',
        top: '10%',
        left: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'fixed',
        bottom: '20%',
        right: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      
      {/* Header */}
      <header style={{
        padding: '20px 32px',
        borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0f172a'
            }}>
              <Icons.Target />
            </div>
            <span style={{ fontSize: '20px', fontWeight: '700', letterSpacing: '-0.5px' }}>
              Lead<span style={{ color: '#06b6d4' }}>Capture</span>
            </span>
          </div>
          
          <button 
            onClick={() => setShowCaptureModal(true)}
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
              color: '#0f172a',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 20px rgba(6, 182, 212, 0.3)'
            }}
          >
            <Icons.Camera /> Capture Card
          </button>
        </div>
      </header>
      
      {/* Main Content */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px' }}>
        {/* Stats Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          <StatCard 
            icon={<Icons.User />} 
            label="Total Leads" 
            value={leads.length}
            trend="+12% this week"
          />
          <StatCard 
            icon={<Icons.Sparkle />} 
            label="Enriched" 
            value={leads.filter(l => l.status !== 'new').length}
          />
          <StatCard 
            icon={<Icons.Check />} 
            label="Synced to CRM" 
            value={leads.filter(l => l.status === 'synced').length}
          />
          <StatCard 
            icon={<Icons.Zap />} 
            label="Conversion Rate" 
            value="68%"
            trend="+5% vs last month"
          />
        </div>
        
        {/* Search & Filters */}
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          marginBottom: '24px',
          flexWrap: 'wrap'
        }}>
          <div style={{ 
            flex: 1, 
            minWidth: '250px',
            position: 'relative' 
          }}>
            <div style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#64748b'
            }}>
              <Icons.Search />
            </div>
            <input 
              type="text"
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 16px 14px 48px',
                borderRadius: '12px',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                background: 'rgba(30, 41, 59, 0.5)',
                color: '#f1f5f9',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
        </div>
        
        {/* Content Grid */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: selectedLead ? '1fr 400px' : '1fr',
          gap: '24px',
          transition: 'all 0.3s ease'
        }}>
          {/* Leads Grid */}
          <div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '16px' 
            }}>
              <h2 style={{ 
                margin: 0, 
                fontSize: '18px', 
                fontWeight: '600',
                color: '#f1f5f9'
              }}>
                Recent Leads
              </h2>
              <span style={{ fontSize: '13px', color: '#64748b' }}>
                {filteredLeads.length} leads
              </span>
            </div>
            
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '16px'
            }}>
              {filteredLeads.map(lead => (
                <LeadCard 
                  key={lead.id}
                  lead={lead}
                  isSelected={selectedLead?.id === lead.id}
                  onClick={() => setSelectedLead(selectedLead?.id === lead.id ? null : lead)}
                />
              ))}
            </div>
            
            {filteredLeads.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '64px 24px',
                color: '#64748b'
              }}>
                <p style={{ fontSize: '16px', marginBottom: '8px' }}>No leads found</p>
                <p style={{ fontSize: '14px' }}>Try adjusting your search or capture a new card</p>
              </div>
            )}
          </div>
          
          {/* Detail Panel */}
          {selectedLead && (
            <LeadDetailPanel 
              lead={selectedLead} 
              onClose={() => setSelectedLead(null)}
            />
          )}
        </div>
      </main>
      
      {/* Capture Modal */}
      <CaptureModal 
        isOpen={showCaptureModal}
        onClose={() => setShowCaptureModal(false)}
      />
      
      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
        }
        
        input::placeholder {
          color: #64748b;
        }
        
        button:hover {
          transform: translateY(-1px);
          transition: transform 0.2s ease;
        }
        
        button:active {
          transform: translateY(0);
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes slideIn {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.3);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.5);
        }
      `}</style>
    </div>
  );
}
