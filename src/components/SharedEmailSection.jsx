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

const SearchWrapper = styled.div`
  position: relative;
  margin-bottom: 12px;
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


const ScrollableList = styled.div`
  max-height: 480px;
  overflow-y: auto;
  margin-bottom: 8px;
`

const SharedList = styled.div`
  max-height: 270px;
  overflow-y: auto;
  margin-bottom: 8px;
`

const ReassignWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 24px;
`

const ClearButton = styled.button`
  background: none;
  border: none;
  font-size: 12px;
  color: #406cc4;
  cursor: pointer;
  padding: 0;
  &:hover { text-decoration: underline; }
`

const SuggestedList = styled.div`
  margin-bottom: 12px;
`

export default function SharedEmailSection({ onOpenProfile, onReassign, onError, mode = 'mvp' }) {
  const [collapsed, setCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUserId, setSelectedUserId] = useState(null)

  const isScaled = mode === 'scaled'

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

  const filteredAll = useMemo(() => {
    const list = isScaled ? allOthers : otherUsers.sort((a, b) => a.name.localeCompare(b.name))
    if (!searchQuery.trim()) return list
    const q = searchQuery.toLowerCase()
    return list.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.organization.toLowerCase().includes(q) ||
      String(u.id).includes(q) ||
      (u.phone && u.phone.includes(q))
    )
  }, [searchQuery, allOthers, isScaled, otherUsers])

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

  const sectionTitle = isScaled ? 'Shared identity' : 'Shared email'

  return (
    <div>
      <SectionHeader>
        <SectionTitle>
          {sectionTitle}
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

          {isScaled ? (
            <ScrollableList>
              <SubSectionLabel>Suggested requesters</SubSectionLabel>
              <SuggestedList>
                {aiSuggested.map(user => (
                  <SharedEmailItem
                    key={user.id}
                    user={user}
                    selected={selectedUserId === user.id}
                    onSelect={() => setSelectedUserId(user.id)}
                    onOpenProfile={() => onOpenProfile(user)}
                    reason={user.reason}
                    showPhone
                  />
                ))}
              </SuggestedList>

              <SubSectionLabel>{filteredAll.length} requesters</SubSectionLabel>
              {filteredAll.map(user => (
                <SharedEmailItem
                  key={user.id}
                  user={user}
                  selected={selectedUserId === user.id}
                  onSelect={() => setSelectedUserId(user.id)}
                  onOpenProfile={() => onOpenProfile(user)}
                  showPhone
                />
              ))}
            </ScrollableList>
          ) : (
            <SharedList>
              {filteredAll.map(user => (
                <SharedEmailItem
                  key={user.id}
                  user={user}
                  selected={selectedUserId === user.id}
                  onSelect={() => setSelectedUserId(user.id)}
                  onOpenProfile={() => onOpenProfile(user)}
                  showPhone
                />
              ))}
            </SharedList>
          )}

          <ReassignWrapper>
            <ClearButton onClick={() => setSelectedUserId(null)}>
              Clear selection
            </ClearButton>
            <Button size="small" onClick={handleReassign}>
              Set as requester
            </Button>
          </ReassignWrapper>
        </>
      )}
    </div>
  )
}
