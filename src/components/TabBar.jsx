import styled from 'styled-components'

const Bar = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 8px;
  font-size: 13px;
  color: #2f3130;
  gap: 8px;
`

const TabItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  background: ${props => props.$active ? '#2f3130' : '#ffffff'};
  color: ${props => props.$active ? '#fff' : '#2f3130'};
  font-weight: 400;
  border: 1px solid ${props => props.$active ? '#2f3130' : '#dcdcda'};
  white-space: nowrap;
  &:hover { background: ${props => props.$active ? '#2f3130' : '#f7f7f7'}; }
`

const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.2;
`

const TabTitle = styled.span`
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
`

const TabSubtitle = styled.span`
  font-size: 12px;
  font-weight: 600;
  opacity: 0.7;
`

const TabClose = styled.span`
  font-size: 16px;
  color: ${props => props.$active ? 'rgba(255,255,255,0.7)' : '#999b97'};
  cursor: pointer;
  margin-left: 2px;
  line-height: 1;
  &:hover { color: ${props => props.$active ? '#fff' : '#2f3130'}; }
`

const TabIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$active ? '#fff' : '#646864'};
`

const AddTab = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b8e89;
  font-size: 20px;
  &:hover { background: #eae9e8; color: #2f3130; }
`

export default function TabBar({ openTabs, activeTab, onTabClick, onTabClose }) {
  return (
    <Bar>
      {openTabs.map(tab => {
        const isActive = tab.id === activeTab
        return (
          <TabItem
            key={tab.id}
            $active={isActive}
            onClick={() => onTabClick(tab.id)}
          >
            <TabIcon $active={isActive}>
              {tab.type === 'ticket' ? (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="8" cy="8" r="6"/>
                  <path d="M8 5v3l2 2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="8" cy="5" r="3"/>
                  <path d="M2 14c0-3 2.7-5 6-5s6 2 6 5"/>
                </svg>
              )}
            </TabIcon>
            <TabContent>
              <TabTitle>
                {tab.title.length > 22 ? tab.title.substring(0, 22) + '...' : tab.title}
              </TabTitle>
              {tab.type === 'ticket' && tab.ticketId && (
                <TabSubtitle>#{tab.ticketId}</TabSubtitle>
              )}
            </TabContent>
            <TabClose $active={isActive} onClick={(e) => { e.stopPropagation(); onTabClose(tab.id); }}>×</TabClose>
          </TabItem>
        )
      })}
      <AddTab>+</AddTab>
    </Bar>
  )
}
