import styled from 'styled-components'
import { Tag } from '@zendeskgarden/react-tags'

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

const ContentArea = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`

const Sidebar = styled.div`
  width: 316px;
  border-right: 1px solid #eae9e8;
  overflow-y: auto;
  padding: 20px 16px;
  flex-shrink: 0;
`

const MainArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px 32px;
`

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`

const LargeAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${props => props.$color || '#b7b7b3'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  flex-shrink: 0;
`

const ProfileName = styled.h1`
  font-size: 22px;
  font-weight: 500;
  color: #2f3130;
  margin: 0;
`

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 12px 24px;
  align-items: baseline;
`

const SidebarLabel = styled.div`
  font-size: 13px;
  color: #8b8e89;
  text-align: right;
  white-space: nowrap;
`

const SidebarValue = styled.div`
  font-size: 13px;
  color: #2f3130;
`

const SidebarLink = styled.div`
  font-size: 13px;
  color: #406cc4;
  cursor: pointer;
`

const TagWrapper = styled.div`
  margin-top: -8px;
  grid-column: 2;
`

const ProfileTabBar = styled.div`
  display: flex;
  gap: 24px;
  border-bottom: 1px solid #eae9e8;
  margin-bottom: 16px;
`

const ProfileTab = styled.span`
  font-size: 14px;
  padding-bottom: 10px;
  cursor: pointer;
  color: ${props => props.$active ? '#406cc4' : '#646864'};
  border-bottom: ${props => props.$active ? '2px solid #406cc4' : '2px solid transparent'};
  font-weight: ${props => props.$active ? '500' : '400'};
`

const TicketTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
`

const Th = styled.th`
  text-align: left;
  padding: 8px 12px;
  font-weight: 600;
  color: #2f3130;
  border-bottom: 1px solid #eae9e8;
  font-size: 12px;
`

const Td = styled.td`
  padding: 10px 12px;
  color: #2f3130;
  border-bottom: 1px solid #f7f7f7;
`

const StatusBadge = styled.span`
  background: ${props => props.$status === 'Open' ? '#c63f46' : '#4b7d04'};
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 3px;
  text-transform: uppercase;
`

const TicketCount = styled.span`
  font-size: 13px;
  color: #646864;
  margin-bottom: 12px;
  display: block;
`

const mockTickets = [
  { id: 4872, status: 'Open', subject: 'Order #GR-29104 not received', requested: 'Jun 24, 2026', updated: 'Jun 25, 2026' },
  { id: 4651, status: 'Solved', subject: 'Bulk order pricing inquiry', requested: 'Jun 10, 2026', updated: 'Jun 12, 2026' },
  { id: 4302, status: 'Solved', subject: 'Return authorization needed', requested: 'May 15, 2026', updated: 'May 18, 2026' },
  { id: 4101, status: 'Solved', subject: 'Account access issue', requested: 'Apr 28, 2026', updated: 'Apr 29, 2026' },
  { id: 3890, status: 'Solved', subject: 'Invoice discrepancy', requested: 'Apr 02, 2026', updated: 'Apr 05, 2026' },
]

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
}

export default function CustomerProfilePage({ user, mode = 'mvp' }) {
  return (
    <Container>
      <ContextBar>
        <ContextLink>{user.organization}</ContextLink>
        <ContextName>{user.name}</ContextName>
      </ContextBar>
      <ContentArea>
      <Sidebar>
        <InfoGrid>
          <SidebarLabel>User type</SidebarLabel>
          <SidebarValue>{user.userType} ▾</SidebarValue>

          <SidebarLabel>Access</SidebarLabel>
          <SidebarValue>Can view and edit own... ▾</SidebarValue>

          <SidebarLabel>Primary email</SidebarLabel>
          <SidebarLink>{user.email}</SidebarLink>
          <TagWrapper>
            <Tag size="small">Shared</Tag>
          </TagWrapper>

          <SidebarLabel>Phone</SidebarLabel>
          <SidebarLink>{user.phone}</SidebarLink>
          {mode === 'scaled' && user.sharedPhone && <TagWrapper><Tag size="small">Shared</Tag></TagWrapper>}

          <SidebarLabel>Tags</SidebarLabel>
          <SidebarValue>—</SidebarValue>

          <SidebarLabel>Org.</SidebarLabel>
          <SidebarLink>{user.organization}</SidebarLink>

          <SidebarLabel>User segments</SidebarLabel>
          <SidebarValue>—</SidebarValue>

          <SidebarLabel>Language</SidebarLabel>
          <SidebarValue>{user.language}</SidebarValue>

          <SidebarLabel>Time zone</SidebarLabel>
          <SidebarValue>{user.timezone}</SidebarValue>

          <SidebarLabel>Details</SidebarLabel>
          <SidebarValue>—</SidebarValue>

          <SidebarLabel>Notes</SidebarLabel>
          <SidebarValue>{user.notes || '—'}</SidebarValue>
        </InfoGrid>
      </Sidebar>

      <MainArea>
        <ProfileHeader>
          <LargeAvatar $color={user.avatarColor}>
            {getInitials(user.name)}
          </LargeAvatar>
          <ProfileName>{user.name}</ProfileName>
        </ProfileHeader>

        <ProfileTabBar>
          <ProfileTab $active>Tickets ({mockTickets.length})</ProfileTab>
          <ProfileTab>Help center (0)</ProfileTab>
          <ProfileTab>Related</ProfileTab>
          <ProfileTab>Security settings</ProfileTab>
        </ProfileTabBar>

        <TicketCount>Requested tickets ({mockTickets.length}) · {mockTickets.length} tickets</TicketCount>

        <TicketTable>
          <thead>
            <tr>
              <Th>Status</Th>
              <Th>ID</Th>
              <Th>Subject</Th>
              <Th>Requested</Th>
              <Th>Updated</Th>
            </tr>
          </thead>
          <tbody>
            {mockTickets.map(ticket => (
              <tr key={ticket.id}>
                <Td><StatusBadge $status={ticket.status}>{ticket.status}</StatusBadge></Td>
                <Td>#{ticket.id}</Td>
                <Td>{ticket.subject}</Td>
                <Td>{ticket.requested}</Td>
                <Td>{ticket.updated}</Td>
              </tr>
            ))}
          </tbody>
        </TicketTable>
      </MainArea>
      </ContentArea>
    </Container>
  )
}
