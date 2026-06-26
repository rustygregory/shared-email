import styled from 'styled-components'
import { interactionHistory } from '../data/mockTicket'

const List = styled.div`
  display: flex;
  flex-direction: column;
`

const HistoryItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #f7f7f7;
  &:last-child { border-bottom: none; }
`

const StatusDot = styled.span`
  width: 16px;
  height: 16px;
  border-radius: 3px;
  background: ${props => props.$status === 'Open' ? '#c63f46' : '#4b7d04'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
`

const ItemInfo = styled.div`
  flex: 1;
  min-width: 0;
`

const ItemTitle = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #2f3130;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const ItemMeta = styled.div`
  font-size: 11px;
  color: #999b97;
`

export default function InteractionHistory() {
  return (
    <List>
      {interactionHistory.map(item => (
        <HistoryItem key={item.id}>
          <StatusDot $status={item.status} />
          <ItemInfo>
            <ItemTitle>{item.subject}</ItemTitle>
            <ItemMeta>{item.date} · Status {item.status}</ItemMeta>
          </ItemInfo>
        </HistoryItem>
      ))}
    </List>
  )
}
