import { useState, useMemo } from 'react'
import styled from 'styled-components'
import { Button } from '@zendeskgarden/react-buttons'
import SharedEmailItem from './SharedEmailItem'
import { sharedEmailUsers, currentRequester } from '../data/mockUsers'
import { ticketComments } from '../data/mockTicket'
import { getAISuggestions } from '../logic/aiSuggestions'

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
  gap: 6px;
`

const CountBadge = styled.span`
  background: #eae9e8;
  color: #2f3130;
  font-size: 10px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 10px;
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

const SearchInput = styled.input`
  width: 100%;
  height: 32px;
  padding: 0 10px 0 32px;
  border: 1px solid #dcdcda;
  border-radius: 4px;
  font-size: 13px;
  color: #2f3130;
  outline: none;
  box-sizing: border-box;
  &:focus { border-color: #406cc4; }
`

const SearchWrapper = styled.div`
  position: relative;
  margin-bottom: 12px;
`

const SearchIcon = styled.div`
  position: absolute;
  left: 10px;
  top: 0;
  height: 32px;
  display: flex;
  align-items: center;
  color: #646864;
`

const SubSectionLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #646864;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
`


const SharedList = styled.div`
  max-height: 185px;
  overflow-y: auto;
  margin-bottom: 8px;
`

const ReassignWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
`

const SuggestedList = styled.div`
  margin-bottom: 12px;
`

export default function SharedEmailSection({ onOpenProfile, onReassign, onError }) {
  const [collapsed, setCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUserId, setSelectedUserId] = useState(null)

  const otherUsers = sharedEmailUsers.filter(u => u.id !== currentRequester.id)

  const aiSuggested = useMemo(() => {
    return getAISuggestions(ticketComments, otherUsers)
  }, [])

  const aiSuggestedIds = aiSuggested.map(u => u.id)

  const allOthers = useMemo(() => {
    return otherUsers
      .filter(u => !aiSuggestedIds.includes(u.id))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [aiSuggestedIds])

  const filteredOthers = useMemo(() => {
    if (!searchQuery.trim()) return allOthers
    const q = searchQuery.toLowerCase()
    return allOthers.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.organization.toLowerCase().includes(q) ||
      String(u.id).includes(q)
    )
  }, [searchQuery, allOthers])

  const handleReassign = () => {
    if (!selectedUserId) {
      if (onError) onError('Select a requester before reassigning')
      return
    }
    const user = sharedEmailUsers.find(u => u.id === selectedUserId)
    if (user && onReassign) {
      onReassign(user)
    }
  }

  return (
    <div>
      <SectionHeader>
        <SectionTitle>
          Shared email
          <CountBadge>{otherUsers.length}</CountBadge>
        </SectionTitle>
        <CollapseButton $collapsed={collapsed} onClick={() => setCollapsed(!collapsed)}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <path d="M1.646 3.646a.5.5 0 01.638-.057l.07.057L6 7.293l3.646-3.647a.5.5 0 01.638-.057l.07.057a.5.5 0 01.057.638l-.057.07-4 4a.5.5 0 01-.638.057l-.07-.057-4-4a.5.5 0 010-.708z"/>
          </svg>
        </CollapseButton>
      </SectionHeader>

      {!collapsed && (
        <>
          <SearchWrapper>
            <SearchIcon>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="7" cy="7" r="5"/>
                <path d="M11 11l3 3" strokeLinecap="round"/>
              </svg>
            </SearchIcon>
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchWrapper>

          <SubSectionLabel>Suggested requesters</SubSectionLabel>
          <SuggestedList>
            {aiSuggested.map(user => (
              <SharedEmailItem
                key={user.id}
                user={user}
                selected={selectedUserId === user.id}
                onSelect={() => setSelectedUserId(user.id)}
                onOpenProfile={() => onOpenProfile(user)}
              />
            ))}
          </SuggestedList>

          <SubSectionLabel>{filteredOthers.length} shared email addresses</SubSectionLabel>
          <SharedList>
            {filteredOthers.map(user => (
              <SharedEmailItem
                key={user.id}
                user={user}
                selected={selectedUserId === user.id}
                onSelect={() => setSelectedUserId(user.id)}
                onOpenProfile={() => onOpenProfile(user)}
              />
            ))}
          </SharedList>

          <ReassignWrapper>
            <Button size="small" onClick={handleReassign}>
              Reassign ticket
            </Button>
          </ReassignWrapper>
        </>
      )}
    </div>
  )
}
