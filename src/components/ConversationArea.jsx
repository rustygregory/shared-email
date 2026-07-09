import { useState, useMemo } from 'react'
import styled from 'styled-components'
import { Button } from '@zendeskgarden/react-buttons'
import { Radio, Field, Label } from '@zendeskgarden/react-forms'
import { Tooltip } from '@zendeskgarden/react-tooltips'
import { ticketData, ticketComments } from '../data/mockTicket'
import { sharedEmailUsers, currentRequester } from '../data/mockUsers'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`

const Header = styled.div`
  padding: 16px 20px 0;
  flex-shrink: 0;
`

const Title = styled.h1`
  font-size: 18px;
  font-weight: 500;
  color: #2f3130;
  margin: 0;
`

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
  padding-bottom: 12px;
  border-bottom: 1px solid #dcdcda;
  font-size: 12px;
  color: #8b8e89;
`

const MetaPipe = styled.span`
  color: #dcdcda;
`

const ViewSummary = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 20px;
  border-bottom: 1px solid #eae9e8;
  font-size: 13px;
  color: #406cc4;
  cursor: pointer;
`

const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`

const MessageBlock = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
`

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.$color || '#b7b7b3'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
`

const MessageContent = styled.div`
  flex: 1;
`

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`

const MessageAuthor = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #2f3130;
`

const MessageTime = styled.span`
  font-size: 12px;
  color: #999b97;
`

const MessageBody = styled.div`
  font-size: 14px;
  color: #2f3130;
  line-height: 1.5;
  white-space: pre-wrap;
  ${props => props.$isRequester && `
    background: #ecf9f9;
    border-radius: 4px;
    padding: 12px;
    margin-top: 4px;
  `}
`

const ComposerArea = styled.div`
  border-top: 1px solid #eae9e8;
  flex-shrink: 0;
`

const ComposerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  font-size: 13px;
  color: #2f3130;
`

const ComposerReplyType = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #646864;
  cursor: pointer;
`

const ComposerTo = styled.span`
  color: #8b8e89;
`

const RequesterChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #eae9e8;
  border-radius: 100px;
  padding: 4px 10px 4px 6px;
  font-size: 13px;
  color: #2f3130;
  font-weight: 400;
  cursor: default;
`

const ChipIcon = styled.span`
  display: inline-flex;
  align-items: center;
  color: #68737d;
`

const ComposerCC = styled.span`
  margin-left: auto;
  color: #406cc4;
  font-weight: 600;
  cursor: pointer;
`

const ComposerBody = styled.div`
  padding: 0 20px 12px;
  font-size: 14px;
  color: #999b97;
  min-height: 40px;
  font-style: italic;
`

const ComposerToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 20px;
  border-top: 1px solid #f7f7f7;
`

const ToolbarBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #999b97;
  padding: 0;
  display: flex;
  align-items: center;
  &:hover { color: #2f3130; }
`

/* Verify shared email Capsule Styles */
const CapsuleCollapsed = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  width: 380px;
  padding: 6px 12px;
  border: 1px solid #d4a373;
  border-radius: 4px;
  background: #fef7ed;
  font-size: 13px;
  font-weight: 500;
  color: #2f3130;
  cursor: pointer;
  margin: 8px 0 16px;
  box-sizing: border-box;
  &:hover { background: #fdf0dc; }
`

const CapsuleExpanded = styled.div`
  margin: 8px 0 16px;
  width: 380px;
  border: 1px solid #d4a373;
  border-radius: 4px;
  background: #fef7ed;
  overflow: hidden;
`

const CapsuleHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #fef7ed;
  font-size: 13px;
  font-weight: 500;
  color: #2f3130;
  cursor: pointer;
  border-bottom: 1px solid #d4a373;
  &:hover { background: #fdf0dc; }
`

const CapsuleChevron = styled.span`
  margin-left: auto;
  display: flex;
  align-items: center;
  color: #68737d;
`

const CapsuleBody = styled.div`
  max-height: 350px;
  overflow-y: auto;
  padding: 12px;
  background: #fff;
`

const CapsuleSearchWrapper = styled.div`
  position: relative;
  margin-bottom: 10px;
`

const CapsuleSearchInput = styled.input`
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

const CapsuleSearchIcon = styled.div`
  position: absolute;
  left: 10px;
  top: 0;
  height: 32px;
  display: flex;
  align-items: center;
  color: #646864;
`

const CapsuleUserItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #f7f7f7;
  }
`

const RadioWrapper = styled.div`
  flex-shrink: 0;
  margin-top: 1px;
`

const CapsuleUserAvatar = styled.div`
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
  margin-top: 1px;
`

const CapsuleUserInfo = styled.div`
  flex: 1;
  min-width: 0;
`

const CapsuleUserName = styled.span`
  font-size: 13px;
  color: #406cc4;
  font-weight: 500;
  cursor: pointer;
  &:hover { text-decoration: underline; }
`

const CapsuleUserEmail = styled.div`
  font-size: 12px;
  color: #646864;
  margin-bottom: 2px;
`

const CapsuleUserOrg = styled.div`
  font-size: 12px;
  color: #646864;
  margin-bottom: 2px;
`

const CapsuleUserId = styled.div`
  font-size: 12px;
  color: #646864;
`

const CapsuleFooter = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-top: 1px solid #eae9e8;
  background: #fff;
  gap: 12px;
`



const SuggestionBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 20px;
  height: 60px;
  background: #f7f7f7;
  border-top: 1px solid #dcdcda;
  font-size: 14px;
  color: #2f3130;
  flex-shrink: 0;
`

const BannerBold = styled.span`
  font-weight: 600;
  color: #2f3130;
`

const BannerLink = styled.span`
  color: #1f73b7;
  cursor: pointer;
  text-decoration: underline;
  &:hover { color: #144a75; }
`

const BannerClose = styled.button`
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  color: #646864;
  padding: 4px;
  display: flex;
  align-items: center;
  &:hover { color: #2f3130; }
`

export default function ConversationArea({ mode, onReassign, onOpenProfile, rightPanelOpen, onOpenRightPanel, bannerDismissed, onDismissBanner, requester, reassigned, onComposerEditClick }) {
  const [capsuleOpen, setCapsuleOpen] = useState(false)
  const [capsuleDismissed, setCapsuleDismissed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUserId, setSelectedUserId] = useState(null)

  const isWorkspace = mode === 'workspace'
  const isWorkspace2 = mode === 'workspace2'

  const showCapsule = isWorkspace && !capsuleDismissed && !reassigned

  const otherUsers = sharedEmailUsers.filter(u => u.id !== currentRequester.id)

  const filteredUsers = useMemo(() => {
    const list = otherUsers.sort((a, b) => a.name.localeCompare(b.name))
    if (!searchQuery.trim()) return list
    const q = searchQuery.toLowerCase()
    return list.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.organization.toLowerCase().includes(q) ||
      (u.id && String(u.id).includes(q))
    )
  }, [searchQuery, otherUsers])

  const handleSetAsRequester = () => {
    if (!selectedUserId) return
    const user = otherUsers.find(u => `${u.name}-${u.organization}-${u.id || u.phone || u.notes}` === selectedUserId)
    if (user && onReassign) {
      onReassign(user)
      setCapsuleDismissed(true)
    }
  }

  const handleIgnore = () => {
    setCapsuleDismissed(true)
    setCapsuleOpen(false)
  }

  return (
    <Container>
      <Header>
        <Title>{ticketData.subject}</Title>
        <Meta>
          <span>Via {ticketData.channel}</span>
          <MetaPipe>|</MetaPipe>
          <span>☹ {ticketData.sentiment}</span>
        </Meta>
      </Header>

      <ViewSummary>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#406cc4" strokeWidth="1.5">
          <circle cx="8" cy="8" r="6"/>
          <path d="M8 5v3l2 2" strokeLinecap="round"/>
        </svg>
        View ticket summary
      </ViewSummary>

      <Messages>
        {ticketComments.map((comment, index) => (
          <MessageBlock key={comment.id}>
            <Avatar $color={comment.authorType === 'agent' ? '#404241' : '#406cc4'}>
              {comment.authorType === 'requester' ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="1.5">
                  <circle cx="8" cy="5" r="3"/>
                  <path d="M2 14c0-3 2.7-5 6-5s6 2 6 5"/>
                </svg>
              ) : (
                comment.author.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
              )}
            </Avatar>
            <MessageContent>
              <MessageHeader>
                <MessageAuthor>{comment.author}</MessageAuthor>
                <MessageTime>{comment.timestamp}</MessageTime>
              </MessageHeader>

              {/* Verify shared email Capsule - shows after first requester message header */}
              {showCapsule && index === 0 && comment.authorType === 'requester' && (
                <>
                  {!capsuleOpen ? (
                    <CapsuleCollapsed onClick={() => setCapsuleOpen(true)}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path stroke="#af5626" strokeLinecap="round" d="M6.06 2.27l-4.5 8.5c-.18.33.06.73.44.73h9c.38 0 .62-.4.44-.73l-4.5-8.5a.494.494 0 00-.88 0zM6.5 5v2"/>
                        <circle cx="6.5" cy="9" r=".8" fill="#af5626"/>
                      </svg>
                      Verify shared email
                      <CapsuleChevron>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </CapsuleChevron>
                    </CapsuleCollapsed>
                  ) : (
                    <CapsuleExpanded>
                      <CapsuleHeader onClick={() => setCapsuleOpen(false)}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path stroke="#af5626" strokeLinecap="round" d="M6.06 2.27l-4.5 8.5c-.18.33.06.73.44.73h9c.38 0 .62-.4.44-.73l-4.5-8.5a.494.494 0 00-.88 0zM6.5 5v2"/>
                          <circle cx="6.5" cy="9" r=".8" fill="#af5626"/>
                        </svg>
                        Verify shared email
                        <CapsuleChevron>
                          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: 'rotate(180deg)' }}>
                            <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </CapsuleChevron>
                      </CapsuleHeader>
                      <CapsuleBody>
                        <CapsuleSearchWrapper>
                          <CapsuleSearchIcon>
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <circle cx="7" cy="7" r="5"/>
                              <path d="M11 11l3 3" strokeLinecap="round"/>
                            </svg>
                          </CapsuleSearchIcon>
                          <CapsuleSearchInput
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder=""
                          />
                        </CapsuleSearchWrapper>
                        {filteredUsers.map(user => {
                          const uniqueKey = `${user.name}-${user.organization}-${user.id || user.phone || user.notes}`
                          return (
                          <CapsuleUserItem key={uniqueKey} onClick={() => setSelectedUserId(uniqueKey)}>
                            <RadioWrapper>
                              <Radio
                                name="capsule-requester"
                                checked={selectedUserId === uniqueKey}
                                onChange={() => setSelectedUserId(uniqueKey)}
                              >
                                <Label hidden>Select {user.name}</Label>
                              </Radio>
                            </RadioWrapper>
                            <CapsuleUserAvatar $color={user.avatarColor}>
                              {user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                            </CapsuleUserAvatar>
                            <CapsuleUserInfo>
                              <CapsuleUserName onClick={(e) => { e.stopPropagation(); if (onOpenProfile) onOpenProfile(user); }}>{user.name}</CapsuleUserName>
                              {user.email && <CapsuleUserEmail>{user.email}</CapsuleUserEmail>}
                              <CapsuleUserOrg>{user.organization}</CapsuleUserOrg>
                              {user.id && <CapsuleUserId>ID: {user.id}</CapsuleUserId>}
                            </CapsuleUserInfo>
                          </CapsuleUserItem>
                          )
                        })}
                      </CapsuleBody>
                      <CapsuleFooter>
                        <Button size="small" isBasic onClick={handleIgnore}>Ignore</Button>
                        <Button size="small" isBasic onClick={() => setSelectedUserId(null)} style={{ marginLeft: 'auto' }}>Clear</Button>
                        <Button size="small" onClick={handleSetAsRequester}>Set as requester</Button>
                      </CapsuleFooter>
                    </CapsuleExpanded>
                  )}
                </>
              )}

              <MessageBody $isRequester={comment.authorType === 'requester'}>{comment.body}</MessageBody>
            </MessageContent>
          </MessageBlock>
        ))}
      </Messages>

      {isWorkspace2 && !bannerDismissed && (
        <SuggestionBanner>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <g stroke="#646864">
              <circle cx="7.5" cy="8.5" r="7" fill="none"/>
              <path strokeLinecap="round" d="M7.5 12.5V8"/>
            </g>
            <circle cx="7.5" cy="5" r="1" fill="#646864"/>
          </svg>
          <BannerBold>Shared email</BannerBold>
          <BannerLink onClick={onOpenRightPanel}>Check requester</BannerLink>
          <Tooltip content="Ignore and close" placement="top">
            <BannerClose onClick={onDismissBanner}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#646864" strokeWidth="1.5">
                <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round"/>
              </svg>
            </BannerClose>
          </Tooltip>
        </SuggestionBanner>
      )}

      <ComposerArea>
        <ComposerHeader>
          <ComposerReplyType>
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="#646864" strokeWidth="1.5">
              <path d="M4 10l6-6v4c6 0 8 3 8 8-2-3-4-4-8-4v4l-6-6z" strokeLinejoin="round"/>
            </svg>
            Public reply
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="#646864" strokeWidth="1.5">
              <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </ComposerReplyType>
          <ComposerTo>To</ComposerTo>
          <RequesterChip>
            <ChipIcon>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="8" cy="5" r="3"/>
                <path d="M2 14c0-3 2.7-5 6-5s6 2 6 5"/>
              </svg>
            </ChipIcon>
            {requester || ticketData.requester}
            <ChipIcon style={{ cursor: 'pointer' }} onClick={onComposerEditClick}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M11.5 1.5l3 3-8 8H3.5v-3l8-8z" strokeLinejoin="round"/>
              </svg>
            </ChipIcon>
          </RequesterChip>
          <ComposerCC>CC</ComposerCC>
        </ComposerHeader>
        <ComposerBody>Type your reply here...</ComposerBody>
        <ComposerToolbar>
          <ToolbarBtn><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 13V3h3c1.7 0 3 1 3 2.5S7.7 8 6 8H3"/></svg></ToolbarBtn>
          <ToolbarBtn><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 13l6-10"/><path d="M4 9h7"/></svg></ToolbarBtn>
          <ToolbarBtn><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 3l-1 10M7 3l-1 10M3 6h11M2 10h11"/></svg></ToolbarBtn>
          <ToolbarBtn><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="12" height="12" rx="1"/><path d="M2 10l3-3 2 2 4-4 3 3"/></svg></ToolbarBtn>
          <ToolbarBtn><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 9l-2 2c-.7.7-.7 2 0 2.7s2 .7 2.7 0l4-4c.7-.7.7-2 0-2.7"/><path d="M9 7l2-2c.7-.7.7-2 0-2.7s-2-.7-2.7 0l-4 4c-.7.7-.7 2 0 2.7"/></svg></ToolbarBtn>
        </ComposerToolbar>
      </ComposerArea>
    </Container>
  )
}
