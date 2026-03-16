'use client';

import { Settings, User, Globe, Bell, Shield, Folder } from 'lucide-react';

export default function SettingsPage() {
  const settingsItems = [
    { icon: User, label: 'Konto', desc: 'Profilinformationen und Passwort' },
    { icon: Folder, label: 'Medien-Ordner', desc: 'Quellen für deine Medien verwalten' },
    { icon: Globe, label: 'Sprache & Region', desc: 'Deutsch (Deutschland)' },
    { icon: Bell, label: 'Benachrichtigungen', desc: 'System- und Update-Meldungen' },
    { icon: Shield, label: 'Datenschutz', desc: 'Sicherheit und Berechtigungen' },
  ];

  return (
    <div style={{ padding: '40px 24px' }}>
      <div className="section-hd">
        <div className="section-title">
          <Settings className="w-6 h-6 mr-2" />
          Einstellungen
        </div>
      </div>
      
      <div style={{ marginTop: '32px', maxWidth: '800px' }}>
        {settingsItems.map((item, idx) => (
          <div key={idx} className="stat-tile clickable" style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'flex-start',
            padding: '20px',
            marginBottom: '12px',
            textAlign: 'left'
          }}>
            <div className="si-ico" style={{ marginRight: '20px', backgroundColor: 'var(--bg3)', padding: '10px', borderRadius: '12px' }}>
              <item.icon className="w-6 h-6" />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{item.label}</div>
              <div style={{ color: 'var(--text3)', fontSize: '0.9rem' }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
