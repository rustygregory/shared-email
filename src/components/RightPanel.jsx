import { useState } from 'react'
import styled from 'styled-components'
import SharedEmailSection from './SharedEmailSection'
import InteractionHistory from './InteractionHistory'
import { ticketData } from '../data/mockTicket'
import { sharedEmailUsers } from '../data/mockUsers'

const RightSection = styled.div`
  display: flex;
  flex-shrink: 0;
`

const SidePanel = styled.div`
  width: 340px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-left: 1px solid #eae9e8;
  flex-shrink: 0;
`

const SidePanelContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
`

const IconNav = styled.div`
  width: 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0;
  gap: 4px;
  border-left: 1px solid #eae9e8;
  flex-shrink: 0;
`

const NavIcon = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 4px;
  background: ${props => props.$active ? '#eae9e8' : 'transparent'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$active ? '#2f3130' : '#8b8e89'};
  &:hover { background: #eae9e8; }
`

const CustomerContext = styled.div`
  margin-bottom: 16px;
`

const CustomerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
`

const CustomerAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #406cc4;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;
`

const CustomerName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #2f3130;
`

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 12px 12px;
  font-size: 14px;
`

const InfoLabel = styled.span`
  color: #646864;
`

const InfoValue = styled.span`
  color: #2f3130;
`

const InfoLink = styled.span`
  color: #406cc4;
  cursor: pointer;
`

const NotesInput = styled.div`
  padding: 8px;
  border: 1px solid #dcdcda;
  border-radius: 4px;
  font-size: 14px;
  color: #999b97;
  min-height: 40px;
`

const Divider = styled.div`
  height: 1px;
  background: #eae9e8;
  margin: 16px 0;
`

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`

const SectionTitle = styled.h3`
  font-size: 13px;
  font-weight: 600;
  color: #2f3130;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`

const CollapseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #8b8e89;
  padding: 4px;
  display: flex;
  align-items: center;
  transform: ${props => props.$collapsed ? 'rotate(0deg)' : 'rotate(180deg)'};
  transition: transform 0.2s;
`

export default function RightPanel({ onOpenProfile, onReassign, onError }) {
  const [contextCollapsed, setContextCollapsed] = useState(false)
  const [historyCollapsed, setHistoryCollapsed] = useState(false)

  const requesterUser = sharedEmailUsers.find(u => u.id === ticketData.requesterId)

  return (
    <RightSection>
      <SidePanel>
        <SidePanelContent>
          {/* Customer Context */}
          <SectionHeader>
            <SectionTitle>{ticketData.requester}</SectionTitle>
            <CollapseButton $collapsed={contextCollapsed} onClick={() => setContextCollapsed(!contextCollapsed)}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M1.646 3.646a.5.5 0 01.638-.057l.07.057L6 7.293l3.646-3.647a.5.5 0 01.638-.057l.07.057a.5.5 0 01.057.638l-.057.07-4 4a.5.5 0 01-.638.057l-.07-.057-4-4a.5.5 0 010-.708z"/>
              </svg>
            </CollapseButton>
          </SectionHeader>

          {!contextCollapsed && (
            <CustomerContext>
              <InfoGrid>
                <InfoLabel>Email</InfoLabel>
                <InfoLink>{requesterUser?.email || 'support@globalretail.com'}</InfoLink>
                <InfoLabel>Org.</InfoLabel>
                <InfoLink>{requesterUser?.organization || 'Global Retail South'}</InfoLink>
                <InfoLabel>Local time</InfoLabel>
                <InfoValue>Thu, 14:08 EDT</InfoValue>
                <InfoLabel>Language</InfoLabel>
                <InfoValue>{requesterUser?.language || 'English (United States)'}</InfoValue>
                <InfoLabel>Notes</InfoLabel>
                <InfoValue><NotesInput>Add user notes</NotesInput></InfoValue>
              </InfoGrid>
            </CustomerContext>
          )}

          <Divider />

          {/* Shared Email Section */}
          <SharedEmailSection onOpenProfile={onOpenProfile} onReassign={onReassign} onError={onError} />

          <Divider />

          {/* Interaction History */}
          <SectionHeader>
            <SectionTitle>
              Interaction history
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#8b8e89" strokeWidth="1.5">
                <path d="M2 4l6 4 6-4M2 4v8l6 4 6-4V4" strokeLinejoin="round"/>
              </svg>
            </SectionTitle>
            <CollapseButton $collapsed={historyCollapsed} onClick={() => setHistoryCollapsed(!historyCollapsed)}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M1.646 3.646a.5.5 0 01.638-.057l.07.057L6 7.293l3.646-3.647a.5.5 0 01.638-.057l.07.057a.5.5 0 01.057.638l-.057.07-4 4a.5.5 0 01-.638.057l-.07-.057-4-4a.5.5 0 010-.708z"/>
              </svg>
            </CollapseButton>
          </SectionHeader>

          {!historyCollapsed && <InteractionHistory />}
        </SidePanelContent>
      </SidePanel>

      <IconNav>
        <NavIcon $active>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="10" cy="6" r="3"/>
            <path d="M4 18c0-3.3 2.7-6 6-6s6 2.7 6 6"/>
          </svg>
        </NavIcon>
        <NavIcon>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="14" height="14" rx="2"/>
            <path d="M7 7h6M7 10h6M7 13h4"/>
          </svg>
        </NavIcon>
        <NavIcon>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 5c0-1 1-2 2-2h2a2 2 0 012 1.5l.5 1.5h5a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"/>
          </svg>
        </NavIcon>
        <NavIcon>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="5" height="5" rx="1"/>
            <rect x="12" y="3" width="5" height="5" rx="1"/>
            <rect x="3" y="12" width="5" height="5" rx="1"/>
            <rect x="12" y="12" width="5" height="5" rx="1"/>
          </svg>
        </NavIcon>
        <NavIcon style={{ marginTop: 'auto' }}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10 3v14M3 10h14" strokeLinecap="round"/>
          </svg>
        </NavIcon>
      </IconNav>
    </RightSection>
  )
}
