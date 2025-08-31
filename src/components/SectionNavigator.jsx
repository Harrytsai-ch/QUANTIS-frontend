import React, { useState, useEffect } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

const SectionNavigator = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  // 定義頁面區塊
  const sections = [
    { id: 'upload-section', name: '上傳報表', icon: 'bi-upload' },
    { id: 'processing-section', name: '處理中任務', icon: 'bi-gear' },
    { id: 'reports-section', name: '報表列表', icon: 'bi-file-earmark-text' }
  ];

  // 滾動到指定區塊
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
    setIsExpanded(false);
  };

  // 監聽滾動事件，高亮當前區塊
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <>
      {/* 主要浮動按鈕 */}
      <div 
        className="section-navigator"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <Button
          variant="primary"
          className="navigator-main-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <i className="bi bi-list"></i>
        </Button>

        {/* 展開的選單 */}
        <div className={`navigator-menu ${isExpanded ? 'expanded' : ''}`}>
          {sections.map((section, index) => (
            <OverlayTrigger
              key={section.id}
              placement="left"
              overlay={
                <Tooltip id={`tooltip-${section.id}`}>
                  {section.name}
                </Tooltip>
              }
            >
              <Button
                variant={activeSection === section.id ? 'warning' : 'light'}
                className="navigator-item"
                onClick={() => scrollToSection(section.id)}
                style={{
                  transitionDelay: `${index * 0.05}s`
                }}
              >
                <i className={section.icon}></i>
              </Button>
            </OverlayTrigger>
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionNavigator;