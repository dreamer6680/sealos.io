'use client';

import React, { useState } from 'react';

interface TabProps {
  title: string;
  children: React.ReactNode;
}

interface TabsProps {
  children: React.ReactNode;
}

export const Tab: React.FC<TabProps> = ({ children }) => {
  return <div className="tab-content">{children}</div>;
};

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  const tabs = React.Children.toArray(children) as React.ReactElement<TabProps>[];
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-button ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.props.title}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {tabs[activeTab]}
      </div>
      <style jsx>{`
        .tabs-container {
          margin: 1rem 0;
        }
        .tabs-header {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
          border-bottom: 1px solid #e5e7eb;
        }
        .tab-button {
          padding: 0.5rem 1rem;
          border: none;
          background: none;
          cursor: pointer;
          font-size: 0.875rem;
          color: #4b5563;
          border-bottom: 2px solid transparent;
          margin-bottom: -1px;
        }
        .tab-button:hover {
          color: #1f2937;
        }
        .tab-button.active {
          color: #2563eb;
          border-bottom-color: #2563eb;
        }
        .tab-content {
          padding: 1rem 0;
        }
      `}</style>
    </div>
  );
};
