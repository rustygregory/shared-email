import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Tooltip } from '@zendeskgarden/react-tooltips'
import { sharedEmailUsers } from '../data/mockUsers'

const Panel = styled.div`
  width: 312px;
  border-right: 1px solid #eae9e8;
  overflow-y: auto;
  padding: 16px;
  flex-shrink: 0;
`

const PropLabel = styled.label`
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: #2f3130;
  margin-bottom: 4px;
  margin-top: 16px;
  &:first-child { margin-top: 0; }
`

const PropLabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  margin-bottom: 4px;
`

const PropLink = styled.span`
  font-size: 11px;
  color: #406cc4;
  cursor: pointer;
`

const PropSelect = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 10px;
  border: 1px solid ${props => props.$focused ? '#406cc4' : '#dcdcda'};
  border-radius: 4px;
  font-size: 13px;
  color: #2f3130;
  cursor: pointer;
  height: 32px;
  box-sizing: border-box;
  box-shadow: ${props => props.$focused ? '0 0 0 2px #fff, 0 0 0 4px #406cc4' : 'none'};
  &:hover { border-color: ${props => props.$focused ? '#406cc4' : '#b7b7b3'}; }
`

const PropSelectChevron = styled.span`
  margin-left: auto;
  display: flex;
  align-items: center;
  color: #68737d;
`

const PropInput = styled.div`
  display: flex;
  align-items: center;
  padding: 0 8px;
  border: 1px solid #dcdcda;
  border-radius: 4px;
  font-size: 13px;
  color: #8b8e89;
  height: 32px;
  box-sizing: border-box;
`

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 4px 8px;
  border: 1px solid #dcdcda;
  border-radius: 4px;
  min-height: 32px;
  box-sizing: border-box;
  align-items: center;
`

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #f3f6fb;
  border: 1px solid #d4ddf0;
  border-radius: 3px;
  padding: 2px 6px;
  font-size: 11px;
  color: #2f3130;
`

const TagRemove = styled.span`
  cursor: pointer;
  color: #8b8e89;
  font-size: 10px;
`

const BrandDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #406cc4;
  flex-shrink: 0;
`

const WarningText = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: ${props => props.$info ? '#646864' : '#af5626'};
  margin-top: 4px;
  padding: 2px 0;
  cursor: ${props => props.$hasTooltip ? 'default' : 'auto'};
`

const TooltipAnchor = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  position: relative;
`

const PropRow = styled.div`
  display: flex;
  gap: 12px;
`

const PropHalf = styled.div`
  flex: 1;
`

const ApplyMacro = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  border: 1px solid #dcdcda;
  border-radius: 4px;
  font-size: 13px;
  color: #2f3130;
  cursor: pointer;
  margin-top: 16px;
  height: 32px;
  box-sizing: border-box;
  &:hover { background: #f7f7f7; }
`

const RequesterWrapper = styled.div`
  position: relative;
`

const RequesterInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 13px;
  color: #2f3130;
  background: transparent;
  min-width: 0;
`

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background: #fff;
  border: 1px solid #dcdcda;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  max-height: 280px;
  overflow-y: auto;
  z-index: 100;
`

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  cursor: pointer;
  &:hover { background: #f7f7f7; }
`

const DropdownAvatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${props => props.$color || '#b7b7b3'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  flex-shrink: 0;
`

const DropdownUserInfo = styled.div`
  flex: 1;
  min-width: 0;
`

const DropdownName = styled.div`
  font-size: 13px;
  color: #2f3130;
  font-weight: 500;
`

const DropdownEmail = styled.div`
  font-size: 12px;
  color: #646864;
`

export default function PropertiesPanel({ requester, onReassign, showWarning = true, mode = 'mvp', requesterFocused, onRequesterBlur }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [search, setSearch] = useState('')
  const dropdownRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (requesterFocused) {
      setDropdownOpen(false)
      setSearch('')
    }
  }, [requesterFocused])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
        setSearch('')
        if (onRequesterBlur) onRequesterBlur()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onRequesterBlur])

  const filteredUsers = sharedEmailUsers.filter(u => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.organization.toLowerCase().includes(q) || (u.phone && u.phone.includes(q)) || (u.id && String(u.id).includes(q))
  }).sort((a, b) => a.name.localeCompare(b.name))

  const handleSelectUser = (user) => {
    if (onReassign) onReassign(user)
    setDropdownOpen(false)
    setSearch('')
  }

  return (
    <Panel>
      <PropLabel>Brand</PropLabel>
      <PropSelect>
        <BrandDot />
        Global Retail
        <PropSelectChevron>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </PropSelectChevron>
      </PropSelect>

      <PropLabel style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        Requester
        {(mode === 'mvp2' || mode === 'workspace' || mode === 'workspace2' || mode === 'workspace3') && (
          <Tooltip content="Shared email" placement="top">
            <span style={{ display: 'inline-flex', alignItems: 'center', cursor: 'default', color: '#68737d' }}>
              <svg width="12" height="12" viewBox="0 0 12 12">
                <g stroke="currentColor">
                  <circle cx="5.5" cy="6.5" r="5" fill="none"/>
                  <path strokeLinecap="round" d="M5.5 9.5v-3"/>
                </g>
                <circle cx="5.5" cy="4" r="1" fill="currentColor"/>
              </svg>
            </span>
          </Tooltip>
        )}
      </PropLabel>
      <RequesterWrapper ref={dropdownRef}>
        <PropSelect $focused={dropdownOpen || requesterFocused} onClick={() => { if (!dropdownOpen) { setDropdownOpen(true); setSearch(''); setTimeout(() => inputRef.current?.focus(), 0); } }}>
          {(mode === 'mvp2' || mode === 'workspace' || mode === 'workspace2' || mode === 'workspace3') ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#68737d">
              <circle cx="11" cy="6" r="2.5"/>
              <circle cx="4.5" cy="3.5" r="2"/>
              <path strokeLinecap="round" d="M15.5 14.5c-.2-2.2-2.2-4-4.5-4s-4.3 1.8-4.5 4m1-5c-.4-1.2-1.7-2-3-2s-2.6.8-3 2"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#68737d" strokeWidth="1.5">
              <circle cx="8" cy="5" r="3"/>
              <path d="M2 14c0-3 2.7-5 6-5s6 2 6 5"/>
            </svg>
          )}
          {dropdownOpen ? (
            <RequesterInput
              ref={inputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              placeholder={requester}
            />
          ) : (
            <span style={{ flex: 1 }}>{requester}</span>
          )}
          <PropSelectChevron onClick={(e) => { e.stopPropagation(); setDropdownOpen(!dropdownOpen); setSearch(''); if (onRequesterBlur) onRequesterBlur(); }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none' }}>
              <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </PropSelectChevron>
        </PropSelect>
        {dropdownOpen && (
          <Dropdown>
            {filteredUsers.map((user, index) => (
              <DropdownItem key={user.id || `user-${index}`} onClick={() => handleSelectUser(user)}>
                <DropdownAvatar $color={user.avatarColor}>
                  {user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                </DropdownAvatar>
                <DropdownUserInfo>
                  <DropdownName>{user.name}</DropdownName>
                  <DropdownEmail>{user.email}</DropdownEmail>
                </DropdownUserInfo>
              </DropdownItem>
            ))}
          </Dropdown>
        )}
      </RequesterWrapper>
      {mode === 'scaled' ? (
        showWarning ? (
          <Tooltip content="Email, Phone number" placement="bottom-start">
            <WarningText $hasTooltip style={{ width: 'fit-content' }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path stroke="#af5626" strokeLinecap="round" d="M5.06 1.27l-4.5 8.5c-.18.33.06.73.44.73h9c.38 0 .62-.4.44-.73l-4.5-8.5a.494.494 0 00-.88 0zM5.5 4v2"/>
                <circle cx="5.5" cy="8" r=".8" fill="#af5626"/>
              </svg>
              Shared identity, verify requester
            </WarningText>
          </Tooltip>
        ) : (
          <Tooltip content="Email, Phone number" placement="bottom-start">
            <WarningText $info $hasTooltip style={{ width: 'fit-content' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <g stroke="#646864">
                    <circle cx="5.5" cy="6.5" r="5" fill="none"/>
                    <path strokeLinecap="round" d="M5.5 9.5v-3"/>
                  </g>
                  <circle cx="5.5" cy="4" r="1" fill="#646864"/>
                </svg>
              </span>
              Shared identity
            </WarningText>
          </Tooltip>
        )
      ) : mode === 'mvp' ? (
        <WarningText $info>
          <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <g stroke="#646864">
                <circle cx="5.5" cy="6.5" r="5" fill="none"/>
                <path strokeLinecap="round" d="M5.5 9.5v-3"/>
              </g>
              <circle cx="5.5" cy="4" r="1" fill="#646864"/>
            </svg>
          </span>
          Shared email
        </WarningText>
      ) : null}

      <PropLabelRow>
        <PropLabel style={{ margin: 0 }}>Assignee*</PropLabel>
        <PropLink>take it</PropLink>
      </PropLabelRow>
      <PropSelect>
        Support/Roger Smith
        <PropSelectChevron>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </PropSelectChevron>
      </PropSelect>

      <PropLabelRow>
        <PropLabel style={{ margin: 0 }}>Followers</PropLabel>
        <PropLink>follow</PropLink>
      </PropLabelRow>
      <PropInput />

      <PropLabel>Tags</PropLabel>
      <TagsContainer>
        <Tag>shipping_issue <TagRemove>×</TagRemove></Tag>
        <Tag>order_inquiry <TagRemove>×</TagRemove></Tag>
        <Tag>language__en <TagRemove>×</TagRemove></Tag>
        <Tag>sentiment__frustrated <TagRemove>×</TagRemove></Tag>
      </TagsContainer>

      <PropRow style={{ marginTop: 16 }}>
        <PropHalf>
          <PropLabel style={{ marginTop: 0 }}>Type</PropLabel>
          <PropSelect>Problem<PropSelectChevron><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/></svg></PropSelectChevron></PropSelect>
        </PropHalf>
        <PropHalf>
          <PropLabel style={{ marginTop: 0 }}>Priority</PropLabel>
          <PropSelect>Normal<PropSelectChevron><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/></svg></PropSelectChevron></PropSelect>
        </PropHalf>
      </PropRow>

      <PropLabel>Summary</PropLabel>
      <PropInput />

      <PropLabel>Intent ⓘ</PropLabel>
      <PropSelect>
        Shipping inquiry
        <PropSelectChevron>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </PropSelectChevron>
      </PropSelect>

      <PropLabel>Language ⓘ</PropLabel>
      <PropSelect>
        English
        <PropSelectChevron>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </PropSelectChevron>
      </PropSelect>

      <PropLabel>Sentiment ⓘ</PropLabel>
      <PropSelect>
        Frustrated
        <PropSelectChevron>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </PropSelectChevron>
      </PropSelect>

      <ApplyMacro>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#8b8e89" strokeWidth="1.5">
          <path d="M8 2l1.5 3.5L13 7l-3.5 1.5L8 12l-1.5-3.5L3 7l3.5-1.5L8 2z"/>
        </svg>
        Apply macro
        <PropSelectChevron style={{ marginLeft: 'auto' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </PropSelectChevron>
      </ApplyMacro>
    </Panel>
  )
}
