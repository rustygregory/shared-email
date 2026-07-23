import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useToast, Notification, Title, Close } from '@zendeskgarden/react-notifications'
import PropertiesPanel from './PropertiesPanel'
import ConversationArea from './ConversationArea'
import RightPanel from './RightPanel'
import { ticketData } from '../data/mockTicket'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`

const ContextBar = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 16px;
  border-bottom: 1px solid #eae9e8;
  flex-shrink: 0;
  font-size: 13px;
  color: #2f3130;
  gap: 12px;
`

const ContextLink = styled.span`
  color: #646864;
  cursor: pointer;
  &:hover { color: #2f3130; }
`

const ContextName = styled.span`
  font-weight: 500;
`

const StatusTag = styled.span`
  background: #c63f46;
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 3px;
  text-transform: uppercase;
`

const TicketLabel = styled.span`
  font-size: 13px;
  color: #646864;
`

const Body = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`

const MainSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
`

const Footer = styled.div`
  border-top: 1px solid #dcdcda;
  height: 56px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  background: #fff;
  flex-shrink: 0;
`

const CloseTabButton = styled.button`
  background: none;
  border: none;
  font-size: 13px;
  color: #2f3130;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
`

const SubmitGroup = styled.div`
  display: flex;
  margin-left: auto;
`

const SubmitButton = styled.button`
  background: #2f3130;
  color: #fff;
  border: none;
  border-radius: 4px 0 0 4px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  &:hover { background: #404241; }
`

const SubmitChevron = styled.button`
  background: #2f3130;
  color: #fff;
  border: none;
  border-left: 1px solid rgba(255,255,255,0.2);
  border-radius: 0 4px 4px 0;
  padding: 8px 10px;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover { background: #404241; }
`

export default function TicketView({ onOpenProfile, mode }) {
  const [requester, setRequester] = useState(ticketData.requester)
  const [reassigned, setReassigned] = useState(false)
  const [rightPanelOpen, setRightPanelOpen] = useState(mode !== 'workspace2' && mode !== 'workspace3')
  const { addToast } = useToast()

  useEffect(() => {
    setRightPanelOpen(mode !== 'workspace2' && mode !== 'workspace3')
    setBannerDismissed(false)
  }, [mode])

  const [bannerDismissed, setBannerDismissed] = useState(false)
  const [requesterFocused, setRequesterFocused] = useState(false)
  const [sharedSearchFocusCount, setSharedSearchFocusCount] = useState(0)

  const handleComposerEditClick = () => {
    setRequesterFocused(true)
  }

  const handleChangeRequester = () => {
    setRightPanelOpen(true)
    setSharedSearchFocusCount(c => c + 1)
  }

  const [requesterUser, setRequesterUser] = useState(null)

  const handleReassign = (user) => {
    setRequester(user.name)
    setRequesterUser(user)
    setReassigned(true)
    setBannerDismissed(true)
    addToast(({ close }) => (
      <Notification type="success" style={{ maxWidth: 400 }}>
        <Title>Requester successfully reassigned</Title>
        <Close aria-label="Close" onClick={close} />
      </Notification>
    ), { placement: 'top-end', autoDismiss: 5000 })
  }

  const handleError = (message) => {
    addToast(({ close }) => (
      <Notification type="error" style={{ maxWidth: 400 }}>
        <Title>{message}</Title>
        <Close aria-label="Close" onClick={close} />
      </Notification>
    ), { placement: 'top-end', autoDismiss: 5000 })
  }

  return (
    <Container>
      <ContextBar>
        <ContextLink>Global Retail</ContextLink>
        <ContextName>{requester}</ContextName>
        <StatusTag>Open</StatusTag>
        <TicketLabel>Ticket #{ticketData.id}</TicketLabel>
      </ContextBar>
      <Body>
        <PropertiesPanel requester={requester} onReassign={handleReassign} showWarning={!reassigned} mode={mode} requesterFocused={requesterFocused} onRequesterBlur={() => setRequesterFocused(false)} />
        <MainSection>
          <ConversationArea mode={mode} onReassign={handleReassign} onOpenProfile={onOpenProfile} rightPanelOpen={rightPanelOpen} onOpenRightPanel={handleChangeRequester} bannerDismissed={bannerDismissed} onDismissBanner={() => setBannerDismissed(true)} requester={requester} reassigned={reassigned} onComposerEditClick={handleComposerEditClick} />
        </MainSection>
        <RightPanel
          onOpenProfile={onOpenProfile}
          onReassign={handleReassign}
          onError={handleError}
          mode={mode}
          panelOpen={(mode === 'workspace2' || mode === 'workspace3') ? rightPanelOpen : undefined}
          onTogglePanel={(mode === 'workspace2' || mode === 'workspace3') ? () => setRightPanelOpen(prev => !prev) : undefined}
          sharedSearchFocusCount={sharedSearchFocusCount}
          requesterUser={requesterUser}
        />
      </Body>

      <Footer>
        <CloseTabButton>
          Close tab
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#2f3130" strokeWidth="1.5">
            <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </CloseTabButton>
        <SubmitGroup>
          <SubmitButton>Submit as Open</SubmitButton>
          <SubmitChevron>
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="2">
              <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </SubmitChevron>
        </SubmitGroup>
      </Footer>
    </Container>
  )
}
