import { useState, useMemo, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Button } from '@zendeskgarden/react-buttons'
import SharedEmailItem from './SharedEmailItem'
import { sharedEmailUsers, currentRequester, emailBundles } from '../data/mockUsers'
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
  &:focus {
    border-color: #406cc4;
    box-shadow: 0 0 0 2px #fff, 0 0 0 4px #406cc4;
  }
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

const BundleGroup = styled.div`
  border: 1px solid #e9ebed;
  border-radius: 6px;
  margin-bottom: 8px;
  overflow: hidden;
`

const BundleHeader = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: #f7f7f7;
  border: none;
  border-bottom: ${props => props.$open ? '1px solid #e9ebed' : 'none'};
  cursor: pointer;
  text-align: left;
  &:hover { background: #f0f1f2; }
`

const BundleEmail = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #2f3130;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const BundleCount = styled.span`
  background: #eae9e8;
  color: #2f3130;
  font-size: 10px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 10px;
  flex-shrink: 0;
`

const BundleCaret = styled.span`
  margin-left: auto;
  display: flex;
  align-items: center;
  color: #8b8e89;
  flex-shrink: 0;
  transform: ${props => props.$open ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.2s;
`

const BundleBody = styled.div`
  padding: 4px;
`

export default function SharedEmailSection({ onOpenProfile, onReassign, onError, mode = 'mvp', searchFocusCount }) {
  const [collapsed, setCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUserId, setSelectedUserId] = useState(null)
  const searchInputRef = useRef(null)

  useEffect(() => {
    if (searchFocusCount > 0) {
      if (collapsed) setCollapsed(false)
      setTimeout(() => searchInputRef.current?.focus(), 50)
    }
  }, [searchFocusCount])

  const isScaled = mode === 'scaled'
  const isBundles = mode === 'workspace3'

  // Bundles: which email groups are expanded. First one open by default.
  const [openBundles, setOpenBundles] = useState(() => ({ [emailBundles[0].email]: true }))
  const toggleBundle = (email) => setOpenBundles(prev => ({ ...prev, [email]: !prev[email] }))

  // Total requesters across all bundles (counts a person once per bundle they're in)
  const bundleTotal = useMemo(
    () => emailBundles.reduce((sum, b) => sum + b.requesters.length, 0),
    []
  )

  // Filter each bundle's requesters by the search query
  const filteredBundles = useMemo(() => {
    if (!searchQuery.trim()) return emailBundles
    const q = searchQuery.toLowerCase()
    return emailBundles
      .map(b => ({
        ...b,
        requesters: b.requesters.filter(u =>
          u.name.toLowerCase().includes(q) ||
          b.email.toLowerCase().includes(q) ||
          u.organization.toLowerCase().includes(q) ||
          String(u.id).includes(q) ||
          (u.phone && u.phone.includes(q))
        ),
      }))
      .filter(b => b.requesters.length > 0)
  }, [searchQuery])

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
    let user
    if (isBundles) {
      for (const b of emailBundles) {
        const found = b.requesters.find(u => `${b.email}-${u.id}` === selectedUserId)
        if (found) { user = { ...found, email: b.email }; break }
      }
    } else if (isScaled) {
      user = sharedEmailUsers.find(u => u.id === selectedUserId)
    } else {
      user = filteredAll.find((u, i) => `${u.name}-${u.organization}-${u.id || i}` === selectedUserId)
    }
    if (user && onReassign) {
      onReassign(user)
    }
  }

  const sectionTitle = isScaled ? 'Shared identity' : 'Shared email'
  const headerCount = isBundles ? bundleTotal : otherUsers.length

  return (
    <div>
      <SectionHeader>
        <SectionTitle>
          {sectionTitle}
          <CountBadge>{headerCount}</CountBadge>
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
              ref={searchInputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder=""
            />
          </SearchWrapper>

          {isBundles ? (
            <SharedList>
              {filteredBundles.map((bundle) => {
                const isOpen = !!openBundles[bundle.email]
                return (
                  <BundleGroup key={bundle.email}>
                    <BundleHeader $open={isOpen} onClick={() => toggleBundle(bundle.email)}>
                      <BundleEmail>{bundle.email}</BundleEmail>
                      <BundleCount>{bundle.requesters.length}</BundleCount>
                      <BundleCaret $open={isOpen}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                          <path d="M1.646 3.646a.5.5 0 01.638-.057l.07.057L6 7.293l3.646-3.647a.5.5 0 01.638-.057l.07.057a.5.5 0 01.057.638l-.057.07-4 4a.5.5 0 01-.638.057l-.07-.057-4-4a.5.5 0 010-.708z"/>
                        </svg>
                      </BundleCaret>
                    </BundleHeader>
                    {isOpen && (
                      <BundleBody>
                        {bundle.requesters.map((user) => {
                          const uniqueKey = `${bundle.email}-${user.id}`
                          return (
                            <SharedEmailItem
                              key={uniqueKey}
                              user={user}
                              selected={selectedUserId === uniqueKey}
                              onSelect={() => setSelectedUserId(uniqueKey)}
                              onOpenProfile={() => onOpenProfile({ ...user, email: bundle.email })}
                              showPhone
                              hideEmail
                            />
                          )
                        })}
                      </BundleBody>
                    )}
                  </BundleGroup>
                )
              })}
            </SharedList>
          ) : isScaled ? (
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
              {filteredAll.map((user, index) => {
                const uniqueKey = `${user.name}-${user.organization}-${user.id || index}`
                return (
                  <SharedEmailItem
                    key={uniqueKey}
                    user={user}
                    selected={selectedUserId === uniqueKey}
                    onSelect={() => setSelectedUserId(uniqueKey)}
                    onOpenProfile={() => onOpenProfile(user)}
                    showPhone
                  />
                )
              })}
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
